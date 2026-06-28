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
    </div>
  );
}