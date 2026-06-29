import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { name: "Sun", website: 400, ecommerce: 240 },
  { name: "Mon", website: 300, ecommerce: 139 },
  { name: "Tue", website: 200, ecommerce: 980 },
  { name: "Wed", website: 278, ecommerce: 390 },
  { name: "Thu", website: 189, ecommerce: 480 },
  { name: "Fri", website: 239, ecommerce: 380 },
  { name: "Sat", website: 349, ecommerce: 430 },
];

export function RevenueBarChart() {
  return (
    <Card className="rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 bg-white h-full overflow-hidden relative">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-extrabold text-slate-800">Revenue Growth <span className="text-sm font-medium text-slate-400">(USD)</span></CardTitle>
            <p className="text-sm text-slate-400 mt-1">Website vs E-commerce performance</p>
          </div>
          <button className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full hover:bg-indigo-100 transition-colors">
            View Detail
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[320px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorWebsite" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="colorEcommerce" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#93c5fd" stopOpacity={0.3}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 13 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 13 }} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }} 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                labelStyle={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '4px' }}
              />
              <Bar dataKey="website" fill="url(#colorWebsite)" radius={[6, 6, 0, 0]} barSize={16} />
              <Bar dataKey="ecommerce" fill="url(#colorEcommerce)" radius={[6, 6, 0, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}