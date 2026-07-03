import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Edit2, Trash2, Plus } from "lucide-react";

export default function ProductsManagement() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', stock: '', category: '' });
  const [editingId, setEditingId] = useState(null); // Edit කරන Product එක හඳුනාගන්න

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // Edit බටන් එක ක්ලික් කළාම විස්තර පෝරමයට පටවනවා
  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({ name: product.name, price: product.price, stock: product.stock, category: product.category });
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        // Update කිරීම
        await axios.put(`http://localhost:5000/api/products/${editingId}`, formData);
      } else {
        // අලුතින් Add කිරීම
        await axios.post('http://localhost:5000/api/products', formData);
      }
      setFormData({ name: '', price: '', stock: '', category: '' });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    }
  };

  return (
    <div className="p-2 w-full max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-blue-950">Store Inventory</h1>
          <p className="text-slate-500 font-medium mt-1">Manage products, pricing, and stock levels.</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold px-6">
              <Plus className="w-4 h-4 mr-2"/> Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl p-8 border-slate-100">
            <DialogHeader><DialogTitle className="text-xl font-black text-blue-950">{editingId ? 'Edit Product' : 'Add New Product'}</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
              <Input className="rounded-xl" placeholder="Product Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <Input className="rounded-xl" placeholder="Price ($)" type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
              <Input className="rounded-xl" placeholder="Stock Quantity" type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} />
              <Input className="rounded-xl" placeholder="Category" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
              <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl font-bold py-6 mt-4" onClick={handleSave}>
                {editingId ? 'Update Product' : 'Save Product'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="rounded-2xl border-slate-100 shadow-sm p-6 bg-white">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-xs uppercase font-bold border-b border-slate-100">
              <th className="pb-4 px-4">Product Name</th>
              <th className="pb-4 px-4">Category</th>
              <th className="pb-4 px-4">Price</th>
              <th className="pb-4 px-4">Stock</th>
              <th className="pb-4 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {products.map((p) => (
              <tr key={p._id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-4 px-4 font-bold text-slate-800">{p.name}</td>
                <td className="py-4 px-4"><span className="px-2 py-1 bg-slate-100 rounded-md text-[10px] font-bold uppercase">{p.category}</span></td>
                <td className="py-4 px-4 font-black text-blue-600">${p.price}</td>
                <td className="py-4 px-4 font-bold text-slate-600">{p.stock} Units</td>
                <td className="py-4 px-4 text-right flex justify-end gap-2">
                  {/* Dialog එක පේළිය ඇතුලටම දැම්මා */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-blue-600 font-semibold gap-1.5" onClick={() => handleEdit(p)}>
                        <Edit2 className="w-3.5 h-3.5"/> Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-3xl p-8 border-slate-100">
                      <DialogHeader><DialogTitle className="text-xl font-black text-blue-950">Edit Product</DialogTitle></DialogHeader>
                      <div className="space-y-4 py-4">
                        <Input className="rounded-xl" placeholder="Product Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                        <Input className="rounded-xl" placeholder="Price ($)" type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                        <Input className="rounded-xl" placeholder="Stock Quantity" type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} />
                        <Input className="rounded-xl" placeholder="Category" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl font-bold py-6 mt-4" onClick={handleSave}>Update Product</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="ghost" size="sm" className="text-red-500 font-semibold gap-1.5" onClick={() => handleDelete(p._id)}>
                    <Trash2 className="w-3.5 h-3.5"/> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}