import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Edit2, Trash2, Plus } from "lucide-react";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', stock: '', category: '' });

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    setProducts(res.data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    }
  };

  return (
    <div className="p-8 bg-slate-50/50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-blue-950">Product Management</h1>
          <p className="text-slate-400 font-medium">Manage inventory and stock items.</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 rounded-xl font-bold px-6"><Plus className="w-4 h-4 mr-2"/> Add Product</Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl p-8">
            <DialogHeader><DialogTitle>Add New Product</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
              <Input placeholder="Product Name" onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <Input placeholder="Price ($)" type="number" onChange={(e) => setFormData({...formData, price: e.target.value})} />
              <Input placeholder="Stock Quantity" type="number" onChange={(e) => setFormData({...formData, stock: e.target.value})} />
              <Input placeholder="Category (e.g. T-Shirts)" onChange={(e) => setFormData({...formData, category: e.target.value})} />
              <Button className="w-full bg-blue-600" onClick={async () => {
                await axios.post('http://localhost:5000/api/products', formData);
                fetchProducts();
              }}>Save Product</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="rounded-3xl border-slate-100 shadow-sm p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-xs uppercase tracking-widest font-bold border-b border-slate-100">
              <th className="pb-4">Product</th>
              <th className="pb-4">Category</th>
              <th className="pb-4">Price</th>
              <th className="pb-4">Stock</th>
              <th className="pb-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((p) => (
              <tr key={p._id} className="hover:bg-blue-50/30 transition-colors">
                <td className="py-4 font-bold text-blue-950">{p.name}</td>
                <td className="py-4 text-slate-500 uppercase text-xs font-bold">{p.category}</td>
                <td className="py-4 font-bold text-blue-600">${p.price}</td>
                <td className="py-4 font-bold text-slate-600">{p.stock}</td>
                <td className="py-4 text-right flex justify-end gap-2">
                  <Button variant="ghost" className="text-blue-600 gap-1.5"><Edit2 className="w-4 h-4"/> Edit</Button>
                  <Button variant="ghost" className="text-red-500 gap-1.5" onClick={() => handleDelete(p._id)}><Trash2 className="w-4 h-4"/> Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}