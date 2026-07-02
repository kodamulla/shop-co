import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function ReturnRates() {
  const reasons = [
    { name: "Size Issues", value: 45 },
    { name: "Fabric Quality", value: 25 },
    { name: "Color Match", value: 20 },
    { name: "Damaged", value: 10 },
  ];

  return (
    <Card className="rounded-3xl border border-slate-100 shadow-sm bg-white h-full">
      <CardHeader className="pb-4 pt-6 px-6">
        <CardTitle className="text-lg font-black text-blue-950">Return Reasons</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-6">
        {reasons.map((r) => (
          <div key={r.name}>
            <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-1">
              <span>{r.name}</span>
              <span>{r.value}%</span>
            </div>
            <Progress value={r.value} className="h-2 bg-slate-100" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}