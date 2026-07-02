import { useEffect, useState } from 'react';
import axios from 'axios';
import { SectionCards } from "@/components/section-cards";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/dashboard/stats');
        setStats(res.data.stats);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

 return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome to the ShopCo admin analytics.</p>
      </div>

      <SectionCards stats={stats} />
      
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-4">
        <ChartAreaInteractive />
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch pb-10">
        
        
        <div className="flex flex-col gap-6">
          <div className="flex-1 min-h-[300px]"><TopProducts products={dashboardData.topProducts} /></div>
          <div className="flex-1 min-h-[300px]"><FeaturedOutfit /></div>
        </div>

        
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