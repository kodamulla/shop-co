import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export function TrafficLineChart({ data }) {
  const chartData = data && data.length > 0 ? data : [
    { day: 'Mon', orders: 12, visits: 150 },
    { day: 'Tue', orders: 18, visits: 220 },
    { day: 'Wed', orders: 15, visits: 180 },
    { day: 'Thu', orders: 25, visits: 290 },
    { day: 'Fri', orders: 35, visits: 380 },
    { day: 'Sat', orders: 45, visits: 500 },
    { day: 'Sun', orders: 30, visits: 410 },
  ];

  return (
    <Card className="rounded-3xl border border-slate-100 shadow-sm bg-white h-full flex flex-col">
      <CardHeader className="pb-2 pt-6 px-6">
        <CardTitle className="text-lg font-black tracking-tight text-blue-950">Store Traffic</CardTitle>
        <p className="text-xs font-semibold text-slate-400 mt-1">Visits vs Conversions</p>
      </CardHeader>
      
      
      <CardContent className="flex-1 min-h-[250px] pb-4 px-2 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            
           
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }} 
              dy={15} 
            />
            
            <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }} />
            <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }} />
            
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)' }}
              labelStyle={{ fontWeight: 'black', color: '#1e3a8a' }}
            />
            <Line yAxisId="left" type="monotone" dataKey="visits" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
            <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}