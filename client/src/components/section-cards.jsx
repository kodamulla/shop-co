"use client"

import { Card, CardContent } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import { 
  MoneyBag02Icon, 
  ShoppingBasket01Icon, 
  UserGroupIcon, 
  Tag01Icon 
} from "@hugeicons/core-free-icons"

export function SectionCards({ stats }) {
  if (!stats) return <div className="p-4 flex gap-4 w-full h-32 animate-pulse bg-muted/20 rounded-xl"></div>;

  const cardData = [
    {
      title: "Total Revenue",
      value: `$${stats?.totalRevenue ? stats.totalRevenue.toLocaleString() : "0"}`,
      subtitle: "+20.1% from last month",
      icon: MoneyBag02Icon,
      color: "text-blue-600",
      bgColor: "bg-blue-600/10",
    },
    {
      title: "Total Orders",
      value: stats?.totalOrders || "0",
      subtitle: "+180 new orders",
      icon: ShoppingBasket01Icon,
      color: "text-emerald-600",
      bgColor: "bg-emerald-600/10",
    },
    {
      title: "Total Customers",
      value: stats?.totalCustomers || "0",
      subtitle: "+12 new this week",
      icon: UserGroupIcon,
      color: "text-violet-600",
      bgColor: "bg-violet-600/10",
    },
    {
      title: "Active Products",
      value: stats?.activeProducts || "0",
      subtitle: "34 low in stock",
      icon: Tag01Icon,
      color: "text-orange-600",
      bgColor: "bg-orange-600/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cardData.map((card, index) => (
        <Card key={index} className="border-none shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden relative group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <p className="text-sm font-medium text-muted-foreground">
                {card.title}
              </p>
              <div className={`p-2.5 rounded-xl ${card.bgColor} transition-transform group-hover:scale-110`}>
                <HugeiconsIcon icon={card.icon} className={`h-5 w-5 ${card.color}`} strokeWidth={2} />
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-1">
              <span className="text-3xl font-bold tracking-tight">{card.value}</span>
              <span className="text-xs text-muted-foreground font-medium">
                {card.subtitle}
              </span>
            </div>
          </CardContent>
          {/* Subtle bottom line for a pop of color */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-muted to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </Card>
      ))}
    </div>
  );
}