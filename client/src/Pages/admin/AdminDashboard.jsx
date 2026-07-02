import { useEffect, useState } from 'react';
import axios from 'axios';
import { SectionCards } from "@/components/section-cards";
import { RevenueAreaChart } from "@/components/revenue-area-chart";
import { CategoryAnalytics } from "@/components/category-analytics";
import { TopProducts } from "@/components/top-products";
import { TrafficLineChart } from "@/components/traffic-line-chart";
import { FeaturedOutfit } from "@/components/featured-outfit";
import { ReturnRates } from "@/components/return-rates";
import { AbandonedCart } from "@/components/abandoned-cart";
import { AiTryOnStats } from "@/components/ai-tryon-stats";

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState({
    stats: null,
    topProducts: [],
    weeklyAnalytics: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/dashboard/stats');
        if(res.data.success) {
          setDashboardData({
            stats: res.data.stats,
            topProducts: res.data.topProducts,
            weeklyAnalytics: res.data.weeklyAnalytics
          });
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="mx-auto w-full max-w-7xl p-4 space-y-6 bg-slate-50/50 rounded-3xl pb-12">
      
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-2xl font-black tracking-tight text-blue-950">Store Overview</h1>
        <p className="text-sm font-semibold text-slate-400 mt-1">Real-time fashion analytics and store performance.</p>
      </div>

      {/* Top Stats Cards */}
      <div className="w-full">
        <SectionCards stats={dashboardData.stats} />
      </div>

      {/* Main Charts: Revenue & Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 min-h-[350px]">
          <RevenueAreaChart />
        </div>
        <div className="lg:col-span-4 min-h-[350px]">
          <CategoryAnalytics />
        </div>
      </div>

      {/* Bottom Section: Integrated Dashboard Widgets */}
      {/* items-stretch දාලා හැම කාඩ් එකක්ම එකම උසකට එන්න හැදුවා */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch pb-10">
        
        {/* වම් පස: Trending Products & Featured Campaign */}
        <div className="flex flex-col gap-6">
          <div className="flex-1 min-h-[300px]"><TopProducts products={dashboardData.topProducts} /></div>
          <div className="flex-1 min-h-[300px]"><FeaturedOutfit /></div>
        </div>

        {/* මැද සහ දකුණු පස: AI Stats, Traffic, Returns & Cart */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <div className="flex flex-col gap-6">
                <div className="flex-1 min-h-[200px]"><AiTryOnStats /></div>
                <div className="flex-1 min-h-[350px]"><TrafficLineChart data={dashboardData.weeklyAnalytics} /></div>
            </div>
            <div className="flex flex-col gap-6">
                <div className="flex-1 min-h-[250px]"><ReturnRates /></div>
                <div className="flex-1 min-h-[250px]"><AbandonedCart /></div>
            </div>
        </div>
      </div>

    </div>
  );
}