import { Card, CardContent } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import { ShoppingCart01Icon } from "@hugeicons/core-free-icons";

export function AbandonedCart() {
  return (
    <Card className="rounded-3xl border border-blue-100 bg-blue-600 shadow-xl shadow-blue-600/20 text-white p-6 h-full flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
          <HugeiconsIcon icon={ShoppingCart01Icon} className="w-6 h-6 text-white" />
        </div>
        <span className="text-[10px] font-black bg-white/20 px-2 py-1 rounded-md">ACTION REQUIRED</span>
      </div>
      <div>
        <h3 className="text-xl font-black mt-4">$1,240.00</h3>
        <p className="text-sm font-semibold text-blue-100">Recoverable value in carts</p>
      </div>
      <button className="mt-4 w-full py-2 bg-white text-blue-600 font-black text-xs rounded-xl hover:bg-blue-50 transition-colors">
        Send Reminders
      </button>
    </Card>
  );
}