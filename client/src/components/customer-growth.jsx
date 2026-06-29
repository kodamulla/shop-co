import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const countries = [
  { name: "United States", code: "US", percentage: 38, value: "20,489", color: "bg-blue-500", lightBg: "bg-blue-100" },
  { name: "United Kingdom", code: "UK", percentage: 27, value: "14,552", color: "bg-indigo-500", lightBg: "bg-indigo-100" },
  { name: "France", code: "FR", percentage: 20, value: "10,780", color: "bg-sky-500", lightBg: "bg-sky-100" },
  { name: "Argentina", code: "AR", percentage: 15, value: "8,085", color: "bg-cyan-500", lightBg: "bg-cyan-100" },
];

export function CustomerGrowth() {
  return (
    <Card className="rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 bg-white h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-extrabold text-slate-800">Customer Growth</CardTitle>
            <p className="text-sm text-slate-400 mt-1">Based on country demographics</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-6 flex flex-col gap-5">
        {countries.map((country, index) => (
          <div key={index} className="group flex flex-col gap-3 p-3 -mx-3 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${country.lightBg} flex items-center justify-center`}>
                  <span className={`text-sm font-bold ${country.color.replace('bg-', 'text-')}`}>
                    {country.code}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-700">{country.name}</h4>
                  <p className="text-xs text-slate-400">{country.value} customers</p>
                </div>
              </div>
              <span className="text-lg font-bold text-slate-700">{country.percentage}%</span>
            </div>
            
            {/* Custom Modern Progress Bar */}
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full ${country.color} rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${country.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}