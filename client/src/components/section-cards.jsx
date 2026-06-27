"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import { ChartUpIcon, ChartDownIcon } from "@hugeicons/core-free-icons"

export function SectionCards({ stats }) {
  
  if (!stats) return <div className="p-4">Loading...</div>;

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-4">
      {/* 1. Revenue Card */}
      <Card>
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-3xl">
            ${stats?.totalRevenue ? stats.totalRevenue.toLocaleString() : "0"}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* 2. Orders Card */}
      <Card>
        <CardHeader>
          <CardDescription>Total Orders</CardDescription>
          <CardTitle className="text-3xl">
            {stats?.totalOrders || 0}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* 3. Customers Card */}
      <Card>
        <CardHeader>
          <CardDescription>Total Customers</CardDescription>
          <CardTitle className="text-3xl">
            {stats?.totalCustomers || 0}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* 4. Products Card */}
      <Card>
        <CardHeader>
          <CardDescription>Active Products</CardDescription>
          <CardTitle className="text-3xl">
            {stats?.activeProducts || 0}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}