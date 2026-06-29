import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown, DollarSign, Users, CreditCard, Package } from "lucide-react";

export function SectionCards({ stats }) {
  // Backend එකෙන් දත්ත එනකම් (Loading state) ලස්සන Skeleton එකක් පෙන්වන්න
  if (!stats) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="rounded-2xl border-none shadow-sm p-5 bg-white h-[140px] flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="mt-4 flex items-end justify-between">
              <Skeleton className="h-8 w-28" />
              <div className="space-y-1">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  // Backend එකෙන් එන 'stats' object එකෙන් දත්ත අරගෙන මේ විදියට සකස් කරගන්නවා
  const dashboardStats = [
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue?.toLocaleString() || 0}`,
      trend: stats.revenueTrend || "+0%",
      isPositive: !(stats.revenueTrend || "").toString().startsWith("-"),
      timeframe: "vs last month",
      icon: <DollarSign className="w-5 h-5 text-red-500" />,
      iconBg: "bg-red-100",
    },
    {
      title: "Total Customers",
      value: stats.totalCustomers?.toLocaleString() || 0,
      trend: stats.customerTrend || "+0%",
      isPositive: !(stats.customerTrend || "").toString().startsWith("-"),
      timeframe: "vs last month",
      icon: <Users className="w-5 h-5 text-orange-500" />,
      iconBg: "bg-orange-100",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders?.toLocaleString() || 0,
      trend: stats.orderTrend || "+0%",
      isPositive: !(stats.orderTrend || "").toString().startsWith("-"),
      timeframe: "vs last month",
      icon: <CreditCard className="w-5 h-5 text-emerald-500" />,
      iconBg: "bg-emerald-100",
    },
    {
      title: "Total Products",
      value: stats.totalProducts?.toLocaleString() || 0,
      trend: stats.productTrend || "+0%",
      isPositive: !(stats.productTrend || "").toString().startsWith("-"),
      timeframe: "vs last month",
      icon: <Package className="w-5 h-5 text-blue-500" />,
      iconBg: "bg-blue-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {dashboardStats.map((stat, index) => (
        <Card key={index} className="rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow duration-200 p-5 bg-white">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2.5 rounded-full ${stat.iconBg}`}>
              {stat.icon}
            </div>
            <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
          </div>
          
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800">{stat.value}</h2>
            <div className="flex flex-col items-end">
              <span className={`flex items-center text-sm font-semibold ${stat.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                {stat.isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                {stat.trend}
              </span>
              <span className="text-xs text-muted-foreground mt-0.5">{stat.timeframe}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}