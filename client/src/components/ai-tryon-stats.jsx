import { Card, CardContent } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import { AiCloud01Icon, CheckmarkCircle01Icon } from "@hugeicons/core-free-icons";

export function AiTryOnStats() {
  return (
    <Card className="rounded-3xl border border-slate-100 shadow-sm bg-white h-full p-6 flex flex-col justify-between">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
          <HugeiconsIcon icon={AiCloud01Icon} className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-sm font-black text-blue-950">AI Virtual Try-On</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Performance</p>
        </div>
      </div>
      
      <div className="mt-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[11px] font-bold text-slate-500">Usage Count</span>
          <span className="text-sm font-black text-blue-950">1,248</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[11px] font-bold text-slate-500">Sales Conversion</span>
          <span className="text-sm font-black text-emerald-600">+15.2%</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2 text-[10px] font-bold text-indigo-600">
        <HugeiconsIcon icon={CheckmarkCircle01Icon} className="w-3 h-3" />
        AI Engine Active & Optimized
      </div>
    </Card>
  );
}