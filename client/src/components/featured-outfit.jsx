import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon, FireIcon } from "@hugeicons/core-free-icons";

export function FeaturedOutfit() {
  return (
    <Card className="rounded-3xl border-none shadow-sm hover:shadow-xl hover:shadow-blue-900/10 overflow-hidden h-full relative group cursor-pointer transition-all duration-500">
      {/* High-quality Fashion Image (Blue/White theme matched) */}
      <img 
        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80" 
        alt="Featured Campaign" 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-900/40 to-transparent"></div>

      <CardContent className="relative flex-1 flex flex-col justify-between p-6 z-10">
        <div className="flex justify-between items-start">
          <Badge className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border-none font-bold tracking-wider text-[10px] uppercase px-3 py-1">
            <HugeiconsIcon icon={FireIcon} className="w-3 h-3 mr-1.5 text-orange-400 inline-block" strokeWidth={2.5} />
            Hot Campaign
          </Badge>
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <HugeiconsIcon icon={ArrowUpRight01Icon} strokeWidth={2.5} className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-auto">
          <p className="text-blue-200 text-xs font-bold tracking-widest uppercase mb-1">Summer Collection '26</p>
          <h3 className="text-2xl font-black text-white leading-tight mb-3">
            Blue Elegance <br/> Lookbook
          </h3>
          <div className="flex items-center gap-4 text-sm font-semibold text-white/90">
            <div>
              <span className="block text-xl font-black text-white">+42%</span>
              <span className="text-[10px] text-blue-200 uppercase tracking-wider">Engagement</span>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div>
              <span className="block text-xl font-black text-white">1.2K</span>
              <span className="text-[10px] text-blue-200 uppercase tracking-wider">Clicks</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}