import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Edit2, Trash2, Plus, Package, Search } from "lucide-react";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', stock: '', category: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search State එක

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // Search Logic එක: නම හෝ Category හරහා සොයන්න
  const filteredProducts = products.filter((p) => {
    const query = searchQuery.toLowerCase();
    const name = (p.name || '').toLowerCase();
    const category = (p.category || '').toLowerCase();
    return name.includes(query) || category.includes(query);
  });

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

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({ 
      name: product.name, 
      price: product.price, 
      stock: product.stock || product.countInStock || '', 
      category: product.category 
    });
    setIsDialogOpen(true);
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
      
      fetchProducts();
      setFormData({ name: '', price: '', stock: '', category: '' });
      setEditingId(null);
      setIsDialogOpen(false); 
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product!");
    }
  };

  return (
    <div className="p-4 w-full max-w-7xl mx-auto h-[88vh] min-h-[600px] flex flex-col">
      
      <div className="shrink-0 pb-4 pt-2 mb-4 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-blue-950 flex items-center gap-2">
            <Package className="w-8 h-8 text-blue-600"/>
            Product Management
          </h1>
          <p className="text-slate-500 font-medium mt-1">Manage inventory and stock items.</p>
        </div>

        {/* ලස්සන Search Bar එක */}
        <div className="relative w-80 group">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <Input 
            placeholder="Search products by name or category..." 
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
                <th className="pb-4 px-4 whitespace-nowrap">Product</th>
                <th className="pb-4 px-4 whitespace-nowrap">Category</th>
                <th className="pb-4 px-4 whitespace-nowrap">Price</th>
                <th className="pb-4 px-4 whitespace-nowrap">Stock</th>
                <th className="pb-4 px-4 text-center whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-4 px-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                        <img 
                          src={p.imageUrl} 
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
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold uppercase tracking-wider">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-black text-blue-600 text-base">${p.price}</td>
                    <td className="py-4 px-4 font-bold text-slate-600">{p.stock || p.countInStock} Units</td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center gap-2">
                        <Button variant="ghost" size="sm" className="text-blue-600 font-semibold gap-1.5 hover:bg-blue-50" onClick={() => handleEdit(p)}>
                          <Edit2 className="w-3.5 h-3.5"/> Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500 font-semibold gap-1.5 hover:bg-red-50" onClick={() => handleDelete(p._id)}>
                          <Trash2 className="w-3.5 h-3.5"/> Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" className="text-center py-10 text-slate-400">No products found.</td></tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>

      <div className="shrink-0 pt-4 flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) { setEditingId(null); setFormData({ name: '', price: '', stock: '', category: '' }); }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-full font-bold px-6 h-12 shadow-md hover:shadow-lg transition-all duration-300">
              <Plus className="w-5 h-5 mr-2"/> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl p-8 border-slate-100">
            <DialogHeader><DialogTitle className="text-xl font-black text-blue-950">{editingId ? 'Edit Product' : 'Add New Product'}</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
              <Input placeholder="Product Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Price ($)" type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                <Input placeholder="Stock" type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} />
              </div>
              <Input placeholder="Category" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
              <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl font-bold py-6 mt-4" onClick={handleSave}>
                {editingId ? 'Update Product' : 'Save Product'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}