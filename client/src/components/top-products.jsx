import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const getThemedImage = (productName) => {
  const name = productName.toLowerCase();
  if (name.includes("jeans") || name.includes("denim")) return "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=200&q=80"; 
  if (name.includes("dress")) return "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=200&q=80"; 
  if (name.includes("t-shirt") || name.includes("tshirt") || name.includes("shirt")) return "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=200&q=80"; 
  if (name.includes("hoodie") || name.includes("jacket") || name.includes("winter")) return "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=200&q=80"; 
  if (name.includes("sneaker") || name.includes("shoe")) return "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=200&q=80"; 
  return "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=200&q=80"; 
};

export function TopProducts({ products }) {
  if (!products || products.length === 0) return null;

  return (
    <Card className="rounded-3xl border border-slate-100 shadow-sm bg-white overflow-hidden flex flex-col h-full">
      <CardHeader className="border-b border-slate-50 pb-4 pt-5 px-6 shrink-0 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-extrabold tracking-tight text-blue-950">Trending Pieces</CardTitle>
        <button className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">View All</button>
      </CardHeader>
      
      <CardContent className="p-0 flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        <div className="divide-y divide-slate-50">
          {products.map((product) => {
            const hasBackendImage = product.images && product.images.length > 0;
            const displayImage = hasBackendImage ? product.images[0] : getThemedImage(product.name);
            
            // රුපියල් දහස් ගණන් වලින් තියෙන ඒවා ඩොලර් දශම ස්ථාන දෙකකට හැරවීම (උදා: 4500 -> 45.00)
            const realisticPrice = product.price > 100 ? (product.price / 100).toFixed(2) : parseFloat(product.price).toFixed(2);

            return (
              <div key={product._id} className="flex items-center justify-between p-4 px-6 hover:bg-blue-50/40 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 overflow-hidden flex items-center justify-center flex-shrink-0 border border-slate-100 shadow-sm relative">
                    <img src={displayImage} alt={product.name} className="w-full flex-1 object-cover transition-transform duration-500 group-hover:scale-125" onError={(e) => { e.target.src = getThemedImage("default"); }}/>
                    <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-colors duration-300"></div>
                  </div>

                  <div className="flex flex-col">
                    <h4 className="font-extrabold text-blue-950 text-sm tracking-tight">{product.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">{product.category || "FASHION"}</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-1.5">
                  <p className="font-black text-blue-950 text-base flex items-start gap-0.5">
                    <span className="text-[10px] mt-0.5 text-blue-600">$</span>
                    {realisticPrice}
                  </p>
                  <Badge variant="secondary" className="rounded-md bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors font-extrabold text-[10px] px-2 py-0 border-none">
                    {product.soldCount || 0} Sold
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  );
}