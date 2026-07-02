import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#1e40af", "#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"]; 

export function CategoryAnalytics() {
  
  const chartData = [
    { name: "Menswear", value: 30 },
    { name: "Womenswear", value: 25 },
    { name: "Kidswear", value: 15 },
    { name: "Watches", value: 10 },
    { name: "Toys", value: 10 },
    { name: "Sneakers", value: 10 }
  ];

  return (
    <Card className="rounded-3xl border border-slate-100 shadow-sm bg-white h-full flex flex-col">
      <CardHeader className="pb-0 pt-6 px-6 shrink-0">
        <CardTitle className="text-lg font-extrabold tracking-tight text-blue-950">Categories</CardTitle>
        <p className="text-sm font-medium text-slate-400 mt-1">Sales by collection</p>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col items-center justify-center pb-6 pt-2">
        <div className="h-[170px] w-full shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={55} 
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px -5px rgb(0 0 0 / 0.1)', padding: '8px 14px' }}
                itemStyle={{ color: '#1e3a8a', fontWeight: 700, fontSize: '14px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 w-full mt-3 px-2">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}