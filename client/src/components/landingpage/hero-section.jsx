import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ChevronRight, 
  Check, 
  Truck, 
  ShieldCheck, 
  RefreshCw,
  Star,
} from "lucide-react";
import { motion } from "framer-motion"; 

const smoothContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, 
    },
  },
};

const smoothItemVariants = {
  hidden: { opacity: 0, y: 40, x: 0 }, 
  visible: { 
    opacity: 1, 
    y: 0, 
    x: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    } 
  },
};

export function HeroSection() {
  return (
    <main id="home" className="w-full mx-auto px-2 md:px-10 overflow-hidden bg-white scroll-mt-16">
      
      {/* Container එකේ Desktop වලට විතරක් min-h දුන්නා */}
      <div className="grid lg:grid-cols-2 items-center lg:min-h-[calc(100dvh-4rem)] mx-2 lg:mx-10 gap-8">
        
        {/* ================= LEFT COLUMN ================= */}
        <motion.div 
          variants={smoothContainerVariants}
          initial="hidden"
          animate="visible"
          /* 🚀 මෙතන තමයි වෙනස් කළේ: min-h-[calc(100dvh-4rem)] දාලා මේ කොටස විතරක් හරියටම Full Screen වෙන විදිහට හැදුවා */
          className="flex flex-col justify-center space-y-8 min-h-[calc(100dvh-4rem)] lg:min-h-0 py-8 lg:py-0 w-full"
        >
          
          <motion.div variants={smoothItemVariants} className="space-y-3">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              Discover the Perfect Look for Every Occasion
            </h1>
          </motion.div>
          
          <motion.div variants={smoothItemVariants}>
            <p className="text-lg text-muted-foreground max-w-[500px] leading-relaxed">
              Discover quality, comfortable fashion perfect for the Sri Lankan lifestyle. Shop the latest trends with free islandwide delivery on all orders.
            </p>
          </motion.div>
          
          <motion.div variants={smoothItemVariants} className="flex flex-col sm:flex-row gap-4 w-full">
            <a href="/clothing" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base font-medium rounded-lg bg-black text-white hover:bg-white hover:text-black hover:border-black border border-transparent transition-all shadow-sm">
                Shop Now <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </motion.div>

          <motion.div variants={smoothItemVariants} className="pt-0 space-y-2">
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
          </motion.div>

        </motion.div>

        {/* ================= RIGHT COLUMN ================= */}
        <motion.div 
          variants={smoothContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} 
          className="flex flex-col gap-3 pb-12 lg:pb-0 w-full"
        >
          
          <motion.div variants={smoothItemVariants} className="relative overflow-hidden rounded-2xl bg-muted aspect-[4/3] md:aspect-[3/2] lg:aspect-[14/9]">
            <motion.img
              whileHover={{ scale: 1.05 }} 
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
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {[
              { icon: Check, title: "Premium", value: "100+ items" },
              { icon: Truck, title: "Shipping", value: "Global" },
              { icon: ShieldCheck, title: "Secure", value: "100% Safe" },
              { icon: RefreshCw, title: "Returns", value: "30 Days" },
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                variants={smoothItemVariants}
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