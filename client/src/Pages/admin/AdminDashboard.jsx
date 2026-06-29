import { useEffect, useState } from 'react';
import axios from 'axios';
import { SectionCards } from "@/components/section-cards";
import { RevenueBarChart } from "@/components/revenue-bar-chart";
import { CustomerGrowth } from "@/components/customer-growth";

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
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome to the ShopCo admin analytics.</p>
      </div>

      {/* Top 4 Cards */}
      <SectionCards stats={stats} />
      
      {/* Modern Charts Section (ChartAreaInteractive එක වෙනුවට) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* වම් පැත්තේ Bar Chart එක (ඉඩ වැඩිපුර ගන්නවා - 3 columns) */}
        <div className="lg:col-span-3">
          <RevenueBarChart />
        </div>
        
        {/* දකුණු පැත්තේ Customer Growth එක (ඉඩ අඩුවෙන් ගන්නවා - 2 columns) */}
        <div className="lg:col-span-2">
          <CustomerGrowth />
        </div>
      </div>
    </div>
  );
}