import { Navbar } from "@/components/landingpage/navbar";
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

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      
      <Navbar />

      {/* Hero Section */}
      <main className="container mx-auto px-4 md:px-6 py-12 md:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          
          {/* Left Column (Text Content) */}
          <div className="flex flex-col space-y-8">
            <div className="space-y-6">
              <Badge variant="secondary" className="w-fit bg-muted hover:bg-muted text-muted-foreground font-medium px-3 py-1 rounded-md cursor-pointer flex items-center gap-1">
                Summer Collection 2024 <ChevronRight className="h-3 w-3" />
              </Badge>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                Elevate Your <br /> Style with Our <br /> Latest Collection
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-[500px] leading-relaxed">
                Discover handpicked fashion that combines comfort, quality, and style. Shop the season's must-haves with free shipping on orders over $50.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-12 px-8 text-base font-medium rounded-lg">
                Shop Now <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base font-medium rounded-lg">
                View Lookbook
              </Button>
            </div>

            {/* Social Proof */}
            <div className="pt-4 space-y-3">
              <p className="text-sm text-muted-foreground font-medium">
                Trusted by 15,000+ happy customers worldwide
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
                  <span>+2.5k</span>
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span>4.9/5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Image and Feature Cards) */}
          <div className="flex flex-col gap-6">
            
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-2xl bg-muted aspect-[4/3] md:aspect-[3/2] lg:aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop"
                alt="Latest Collection"
                className="object-cover w-full h-full"
              />
              <div className="absolute top-6 right-6">
                <Badge className="bg-zinc-900 text-white hover:bg-zinc-800 px-4 py-1.5 text-sm font-semibold rounded-md shadow-lg">
                  Summer Sale: 30% OFF
                </Badge>
              </div>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Check, title: "Premium Products", value: "10k+" },
                { icon: Truck, title: "Global Shipping", value: "25+ Countries" },
                { icon: ShieldCheck, title: "Secure Checkout", value: "100% Safe" },
                { icon: RefreshCw, title: "Easy Returns", value: "30 Days" },
              ].map((feature, i) => (
                <div key={i} className="border bg-card text-card-foreground rounded-xl p-4 flex flex-col justify-between space-y-4 shadow-sm">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <feature.icon className="h-4 w-4 text-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-1 line-clamp-1">{feature.title}</p>
                    <p className="font-bold text-base md:text-lg text-foreground leading-tight">{feature.value}</p>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
          
        </div>
      </main>
    </div>
  );
}