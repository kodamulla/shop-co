import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ChevronRight, 
  Check, 
  Truck, 
  ShieldCheck, 
  RefreshCw,
  Star
} from "lucide-react";
import { motion } from "framer-motion"; 

export function HeroSection() {
  return (
    <main className="w-full container mx-auto px-4 md:px-6 overflow-hidden">
      <div className="grid lg:grid-cols-2 items-center lg:min-h-[calc(100vh-4rem)] mx-2 lg:mx-10 gap-8">
        
        {/* Left Column (Text Content) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center space-y-8 min-h-[calc(100vh-4rem)] lg:min-h-0 py-8 lg:py-0"
        >
          <div className="space-y-3">
            <Badge variant="secondary" className="w-fit bg-muted hover:bg-muted text-black font-medium px-3 py-4 rounded-md cursor-pointer flex items-center gap-1">
              Summer Collection 2026 <ChevronRight className="h-5 w-3" />
            </Badge>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              Discover the <br /> Perfect Look for <br /> Every Occasion
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-[500px] leading-relaxed">
              Discover quality, comfortable fashion perfect for the Sri Lankan lifestyle. Shop the latest trends with free islandwide delivery on all orders.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="h-12 px-8 text-base font-medium rounded-lg hover:scale-105 transition-transform">
              Shop Now <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Social Proof */}
          <div className="pt-0 space-y-2">
            <p className="text-sm text-muted-foreground font-medium">
              Trusted by 10,000+ happy customers worldwide
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[32, 12, 44, 25, 31].map((img, i) => (
                  <Avatar key={i} className="h-10 w-10 border-2 border-background">
                    <AvatarImage src={`https://i.pravatar.cc/150?img=${img}`} />
                    <AvatarFallback>C</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="flex items-center gap-1 text-sm font-medium">
                <span>+1.3k</span>
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                <span>4.9/5</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column (Image and Feature Cards) */}
        {/* දකුණු පැත්තේ ඉඳන් එන Animation එක (පොඩි පමාවක් එක්ක) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          // animate වෙනුවට whileInView දැම්මා 👇
          whileInView={{ opacity: 1, x: 0 }}
          // තිරයට ආවම එක පාරක් විතරක් වැඩ කරන්න මේක දැම්මා 👇
          viewport={{ once: true, amount: 0.2 }} 
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col gap-3 pb-12 lg:pb-0"
        >
          
          {/* Main Image */}
          <div className="relative overflow-hidden rounded-2xl bg-muted aspect-[4/3] md:aspect-[3/2] lg:aspect-[14/9]">
            <motion.img
              whileHover={{ scale: 1.05 }} // මවුස් එක ගෙනිච්චම පින්තූරය ලොකු වෙන Animation එක
              transition={{ duration: 0.5 }}
              src="/landinggirl.png"
              alt="Latest Collection"
              className="object-cover w-full h-full"
            />
            <div className="absolute top-4 right-6">
              <Badge className="bg-zinc-900 text-white hover:bg-zinc-800 px-4 py-3 text-sm font-semibold rounded-md shadow-lg">
                Summer Sale: 30% OFF
              </Badge>
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {[
              { icon: Check, title: "Premium Products", value: "100+" },
              { icon: Truck, title: "Global Shipping", value: "10+ Countries" },
              { icon: ShieldCheck, title: "Secure Checkout", value: "100% Safe" },
              { icon: RefreshCw, title: "Easy Returns", value: "30 Days" },
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                // කොටු 4 ටත් whileInView දැම්මා 👇
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
                className="border bg-card text-card-foreground rounded-xl p-4 flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                  <feature.icon className="h-4 w-4 text-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1 ">{feature.title}</p>
                  <p className="font-bold text-base md:text-lg text-foreground leading-tight">{feature.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
        </motion.div>
        
      </div>
    </main>
  );
}