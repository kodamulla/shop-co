"use client"
import { Card, CardContent } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import { MoneyBag02Icon, ShoppingBasket01Icon, UserGroupIcon, Tag01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons"
import { LineChart, Line, ResponsiveContainer } from "recharts";

export function SectionCards({ stats }) {
  if (!stats) return <div className="flex gap-4 w-full h-[120px] animate-pulse bg-white rounded-3xl border border-slate-100"></div>;

  // Mini Chart සඳහා Dummy Data
  const generateData = () => Array.from({ length: 7 }, () => ({ value: Math.floor(Math.random() * 50) + 10 }));

  const cardData = [
    { 
      title: "Total Revenue", 
      value: `$${stats?.totalRevenue ? (stats.totalRevenue / 100).toLocaleString(undefined, {minimumFractionDigits: 2}) : "0.00"}`, 
      trend: "+24%", subtext: "vs last week",
      icon: MoneyBag02Icon, color: "text-blue-600", bg: "bg-blue-100", glow: "bg-blue-400", chartColor: "#2563eb", data: generateData()
    },
    { 
      title: "Total Orders", 
      value: stats?.totalOrders || "0", 
      trend: "+12%", subtext: "vs last week",
      icon: ShoppingBasket01Icon, color: "text-indigo-600", bg: "bg-indigo-100", glow: "bg-indigo-400", chartColor: "#4f46e5", data: generateData()
    },
    { 
      title: "Customers", 
      value: stats?.totalCustomers || "0", 
      trend: "+18%", subtext: "vs last week",
      icon: UserGroupIcon, color: "text-sky-600", bg: "bg-sky-100", glow: "bg-sky-400", chartColor: "#0284c7", data: generateData()
    },
    { 
      title: "Products", 
      value: stats?.activeProducts || "0", 
      trend: "+5%", subtext: "vs last week",
      icon: Tag01Icon, color: "text-violet-600", bg: "bg-violet-100", glow: "bg-violet-400", chartColor: "#7c3aed", data: generateData()
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {cardData.map((card, index) => (
        <Card key={index} className="rounded-3xl border border-slate-100/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-xl hover:shadow-blue-900/10 bg-white transition-all duration-500 relative overflow-hidden group cursor-pointer">
          <div className={`absolute -right-8 -top-8 w-28 h-28 rounded-full ${card.glow} blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
          
          <CardContent className="p-5 relative z-10 flex flex-col h-full justify-between gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-2xl ${card.bg} bg-opacity-60 shadow-sm backdrop-blur-sm group-hover:scale-110 transition-transform duration-300`}>
                  <HugeiconsIcon icon={card.icon} className={`h-5 w-5 ${card.color}`} strokeWidth={2.5} />
                </div>
                <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">{card.title}</span>
              </div>
            </div>
            
            <div className="flex items-end justify-between mt-2">
              <div className="flex flex-col">
                <span className="text-3xl font-black tracking-tighter text-blue-950">{card.value}</span>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="flex items-center text-emerald-500 text-[11px] font-extrabold tracking-wide">
                    <HugeiconsIcon icon={ArrowUpRight01Icon} className="w-3 h-3 mr-0.5" strokeWidth={3} />
                    {card.trend}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-300">{card.subtext}</span>
                </div>
              </div>

              {/* Mini Sparkline Chart */}
              <div className="w-20 h-10 opacity-70 group-hover:opacity-100 transition-opacity">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={card.data}>
                    <Line type="monotone" dataKey="value" stroke={card.chartColor} strokeWidth={2.5} dot={false} isAnimationActive={true} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}