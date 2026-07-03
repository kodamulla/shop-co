import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Edit2, Trash2, Plus, Package } from "lucide-react";


const getThemedImage = (productName) => {
  const name = productName.toLowerCase();
  if (name.includes("jeans") || name.includes("denim")) return "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=200&q=80"; 
  if (name.includes("dress")) return "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=200&q=80"; 
  if (name.includes("t-shirt") || name.includes("tshirt") || name.includes("shirt")) return "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=200&q=80"; 
  if (name.includes("hoodie") || name.includes("jacket") || name.includes("winter")) return "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=200&q=80"; 
  if (name.includes("sneaker") || name.includes("shoe")) return "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=200&q=80"; 
  return "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=200&q=80"; 
};

export default function ProductsManagement() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', stock: '', category: '' });
  const [editingId, setEditingId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({ name: product.name, price: product.price, stock: product.stock, category: product.category });
  };

  const handleSave = async () => {
    try {
      if (!formData.name || !formData.price || !formData.stock || !formData.category) {
        alert("Please fill all fields!");
        return;
      }
      
      if (editingId) {
        await axios.put(`http://localhost:5000/api/products/${editingId}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/products', formData);
      }
      
      setFormData({ name: '', price: '', stock: '', category: '' });
      setEditingId(null);
      setIsDialogOpen(false); 
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  return (
    <div className="p-2 w-full max-w-7xl mx-auto space-y-6 pb-12 flex flex-col h-full">
      
      {/* Top Header Section */}
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-2xl font-black text-blue-950">Store Inventory</h1>
          <p className="text-slate-500 font-medium mt-1">Manage products, pricing, and stock levels.</p>
        </div>
        <div className="bg-blue-50 px-5 py-2.5 rounded-xl border border-blue-100 flex items-center gap-2">
            <Package className="w-4 h-4 text-blue-600"/>
            <span className="text-sm font-bold text-blue-800">Total Products: {products.length}</span>
        </div>
      </div>

      {/* Products Table */}
      <Card className="rounded-3xl border border-slate-100 shadow-sm p-6 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-400 text-[10px] uppercase font-bold tracking-widest border-b border-slate-100">
                <th className="pb-4 px-4 whitespace-nowrap">Product Name</th>
                <th className="pb-4 px-4 whitespace-nowrap">Category</th>
                <th className="pb-4 px-4 whitespace-nowrap">Price</th>
                <th className="pb-4 px-4 whitespace-nowrap">Stock</th>
                <th className="pb-4 px-4 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="py-4 px-4 flex items-center gap-4">
                    
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                      <img 
                        src={getThemedImage(p.name)} 
                        alt={p.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">{p.name}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">ID: {p._id.slice(-6)}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold uppercase tracking-wider">
                      {p.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-black text-blue-600 text-base">${p.price}</td>
                  <td className="py-4 px-4 font-bold text-slate-600">{p.stock} Units</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-blue-600 font-semibold gap-1.5 hover:bg-blue-50" onClick={() => handleEdit(p)}>
                            <Edit2 className="w-3.5 h-3.5"/> Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-3xl p-8 border-slate-100">
                          <DialogHeader><DialogTitle className="text-xl font-black text-blue-950">Edit Product</DialogTitle></DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Product Name</label>
                              <Input className="rounded-xl mt-1" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Price ($)</label>
                                <Input className="rounded-xl mt-1" placeholder="Price" type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                              </div>
                              <div>
                                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Stock Units</label>
                                <Input className="rounded-xl mt-1" placeholder="Quantity" type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} />
                              </div>
                            </div>
                            <div>
                              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Category</label>
                              <Input className="rounded-xl mt-1" placeholder="Category" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
                            </div>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl font-bold py-6 mt-4" onClick={handleSave}>Update Product</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-red-500 hover:bg-red-50 font-semibold gap-1.5 transition-colors" onClick={() => handleDelete(p._id)}>
                        <Trash2 className="w-3.5 h-3.5"/>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-400 font-medium">
                    No products in inventory. Start by adding one!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add New Product Button at the Bottom Right */}
      <div className="flex justify-end mt-6 pt-4">
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if(open) { setEditingId(null); setFormData({ name: '', price: '', stock: '', category: '' }); }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-full font-bold px-6 h-12 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <Plus className="w-5 h-5 mr-2"/> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl p-8 border-slate-100">
            <DialogHeader><DialogTitle className="text-xl font-black text-blue-950">Add New Product</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Product Name</label>
                <Input className="rounded-xl mt-1" placeholder="e.g. Classic White T-Shirt" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Price ($)</label>
                  <Input className="rounded-xl mt-1" placeholder="e.g. 24.99" type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Stock Units</label>
                  <Input className="rounded-xl mt-1" placeholder="e.g. 150" type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Category</label>
                <Input className="rounded-xl mt-1" placeholder="e.g. Men's Wear" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl font-bold py-6 mt-4" onClick={handleSave}>Save Product</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

    </div>
  );
}