import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { name: "Sun", website: 400, ecommerce: 240 },
  { name: "Mon", website: 300, ecommerce: 139 },
  { name: "Tue", website: 500, ecommerce: 980 },
  { name: "Wed", website: 878, ecommerce: 390 },
  { name: "Thu", website: 589, ecommerce: 480 },
  { name: "Fri", website: 839, ecommerce: 380 },
  { name: "Sat", website: 1049, ecommerce: 430 },
];

export function RevenueAreaChart() {
  return (
    <Card className="rounded-3xl border border-slate-100/80 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] bg-white h-full flex flex-col">
      <CardHeader className="pb-4 pt-6 px-6">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-black tracking-tight text-blue-950">Revenue Growth</CardTitle>
            <p className="text-xs font-semibold text-slate-400 mt-1">Website vs E-commerce Trends</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 pb-4 px-2 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorWeb" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorEcom" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7dd3fc" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#7dd3fc" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }} tickFormatter={(value) => `$${value}`} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
              labelStyle={{ fontWeight: 'black', color: '#1e3a8a', marginBottom: '8px' }}
            />
            <Area type="monotone" dataKey="ecommerce" stroke="#38bdf8" strokeWidth={3} fillOpacity={1} fill="url(#colorEcom)" />
            <Area type="monotone" dataKey="website" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorWeb)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}