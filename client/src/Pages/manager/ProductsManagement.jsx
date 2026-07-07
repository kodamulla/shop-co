import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Edit2, Trash2, Plus, Package, Search } from "lucide-react"; 
import { ModernAlert } from "@/components/ui/ModernAlert"; 

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', stock: '', category: '', description: '', sizes: '', image: null });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false, type: "success", title: "", message: "", showCancel: false, confirmText: "OK", onConfirm: null
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) { console.error("Error fetching products:", err); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const filteredProducts = products.filter((p) => {
    const query = searchQuery.toLowerCase();
    const name = (p.name || '').toLowerCase();
    const category = (p.category || '').toLowerCase();
    return name.includes(query) || category.includes(query);
  });

  const handleDelete = async (id) => {
    setAlertConfig({
      isOpen: true, type: "error", title: "Delete Product",
      message: "Are you sure you want to delete this product?",
      showCancel: true, confirmText: "Delete",
      onConfirm: async () => {
        try {
          await axios.delete(`http://localhost:5000/api/products/${id}`);
          fetchProducts();
          setAlertConfig(prev => ({ ...prev, isOpen: false }));
        } catch (err) { 
            setAlertConfig({ isOpen: true, type: "error", title: "Error", message: "Error deleting!", showCancel: false, confirmText: "OK", onConfirm: () => setAlertConfig(prev => ({ ...prev, isOpen: false })) });
        }
      }
    });
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({ 
      name: product.name, 
      price: product.price, 
      stock: product.stock ?? product.countInStock ?? '', 
      category: product.category,
      description: product.description || '',
      sizes: product.sizes ? product.sizes.join(', ') : '',
      image: null 
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (!formData.name || !formData.price || !formData.stock || !formData.category || !formData.sizes) {
        setAlertConfig({ isOpen: true, type: "error", title: "Error", message: "Please fill all fields (including sizes)!", showCancel: false, confirmText: "OK", onConfirm: () => setAlertConfig(prev => ({ ...prev, isOpen: false })) });
        return;
      }
      
      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', Number(formData.price));
      data.append('countInStock', Number(formData.stock));
      data.append('category', formData.category);
      data.append('description', formData.description);
      
      const sizesArray = formData.sizes.split(',').map(s => s.trim());
      data.append('sizes', JSON.stringify(sizesArray));
      
      if (formData.image) data.append('image', formData.image);
      else data.append('imageUrl', "/Logoicon.png");
      
      if (editingId) {
        await axios.put(`http://localhost:5000/api/products/${editingId}`, data);
      } else {
        await axios.post('http://localhost:5000/api/products', data);
      }
      
      fetchProducts();
      setIsDialogOpen(false);
      setEditingId(null);
      setFormData({ name: '', price: '', stock: '', category: '', description: '', sizes: '', image: null });
      
      setAlertConfig({
        isOpen: true, type: "success", title: "Success!",
        message: "Product saved successfully!",
        showCancel: false, confirmText: "OK", onConfirm: () => setAlertConfig(prev => ({ ...prev, isOpen: false }))
      });
    } catch (error) {
      console.error("DEBUG ERROR:", error.response?.data);
      setAlertConfig({
        isOpen: true, type: "error", title: "Error!",
        message: "Error saving product. Please check fields.",
        showCancel: false, confirmText: "Try Again", onConfirm: () => setAlertConfig(prev => ({ ...prev, isOpen: false }))
      });
    }
  };

  return (
    <div className="p-4 w-full max-w-7xl mx-auto h-[88vh] min-h-[600px] flex flex-col">
      <div className="shrink-0 pb-4 pt-2 mb-4 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-blue-950 flex items-center gap-2">
            <Package className="w-8 h-8 text-blue-600"/> Product Management
          </h1>
          <p className="text-slate-500 font-medium mt-1">Manage inventory and stock items.</p>
        </div>
        <div className="relative w-80 group">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <Input 
            placeholder="Search products..." 
            className="pl-11 py-6 rounded-2xl bg-white border-slate-200 shadow-sm focus:border-blue-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-4">
        <Card className="rounded-3xl border border-slate-100 shadow-sm p-6 bg-white min-w-[800px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-400 text-xs uppercase tracking-widest font-bold border-b border-slate-100">
                <th className="pb-4 px-4">Product</th>
                <th className="pb-4 px-4">Category</th>
                <th className="pb-4 px-4">Price</th>
                <th className="pb-4 px-4">Stock</th>
                <th className="pb-4 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredProducts.map((p) => (
                <tr key={p._id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="py-4 px-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                      {/* 👈 මෙතන තමයි වෙනස් කළේ. URL එක හරියටම ගත්තා */}
                      <img 
                        src={p.imageUrl && p.imageUrl.startsWith('/uploads') ? `http://localhost:5000${p.imageUrl}` : (p.imageUrl || "/Logoicon.png")} 
                        alt={p.name} 
                        className="w-full h-full object-cover" 
                        onError={(e) => { e.target.src = "/Logoicon.png" }} 
                      />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 text-sm">{p.name}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">ID: {p._id.slice(-6)}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4"><span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold uppercase tracking-wider">{p.category}</span></td>
                  <td className="py-4 px-4 font-black text-blue-600 text-base">${p.price}</td>
                  <td className="py-4 px-4 font-bold text-slate-600">{p.stock ?? p.countInStock} Units</td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center gap-2">
                      <Button variant="ghost" size="sm" className="text-blue-600 font-semibold hover:bg-blue-50" onClick={() => handleEdit(p)}><Edit2 className="w-3.5 h-3.5 mr-1"/> Edit</Button>
                      <Button variant="ghost" size="sm" className="text-red-500 font-semibold hover:bg-red-50" onClick={() => handleDelete(p._id)}><Trash2 className="w-3.5 h-3.5 mr-1"/> Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      <div className="shrink-0 pt-4 flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) { setEditingId(null); setFormData({ name: '', price: '', stock: '', category: '', description: '', sizes: '', image: null }); }
        }}>
          <DialogTrigger asChild>
            <Button onClick={() => {setEditingId(null); setFormData({ name: '', price: '', stock: '', category: '', description: '', sizes: '', image: null });}} className="bg-blue-600 hover:bg-blue-700 rounded-full font-bold px-6 h-12 shadow-md">
              <Plus className="w-5 h-5 mr-2"/> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl p-8">
            <DialogHeader><DialogTitle>{editingId ? 'Edit Product' : 'Add New Product'}</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
              <Input placeholder="Product Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Price ($)" type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                <Input placeholder="Stock" type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} />
              </div>
              <Input placeholder="Category" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
              <Input placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              <Input placeholder="Sizes (e.g. S, M, L)" value={formData.sizes} onChange={(e) => setFormData({...formData, sizes: e.target.value})} />
              <label className="text-xs font-bold text-slate-500">Product Image</label>
              <Input type="file" onChange={(e) => setFormData({...formData, image: e.target.files[0]})} />
              <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl font-bold py-6" onClick={handleSave}>
                {editingId ? 'Update Product' : 'Save Product'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <ModernAlert 
        isOpen={alertConfig.isOpen}
        onClose={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))}
        onConfirm={alertConfig.onConfirm || (() => setAlertConfig(prev => ({ ...prev, isOpen: false })))}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        showCancel={alertConfig.showCancel}
        confirmText={alertConfig.confirmText}
      />
    </div>
  );
}