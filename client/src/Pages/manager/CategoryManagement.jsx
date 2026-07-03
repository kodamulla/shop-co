import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Edit2 } from "lucide-react";

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  const imageMap = {
    "Men's T-Shirts": "/man.png",
    "Women's Dresses": "/woman.png",
    "Men's Trousers": "/man.png",
    "Kids' Wear": "/girll.png",
    "Watches": "/watch.png",
    "Toys": "/toy.png",
    "Sneakers": "/snikearss.png"
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleSave = async () => {
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/categories/${editingId}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/categories', formData);
      }
      setFormData({ name: '', description: '' });
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      console.error("Error saving category:", err);
    }
  };

  const handleEdit = (cat) => {
    setEditingId(cat._id);
    setFormData({ name: cat.name, description: cat.description || '' });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      fetchCategories();
    }
  };

  return (
    <div className="p-2 w-full max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-blue-950">Category Management</h1>
          <p className="text-slate-500 font-medium">Manage and organize store collections.</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl font-bold px-6" onClick={() => {setEditingId(null); setFormData({name:'', description:''})}}>
              <Plus className="w-4 h-4 mr-2"/> Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl p-8 border-slate-100">
            <DialogHeader><DialogTitle>{editingId ? 'Edit Category' : 'Add New Category'}</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
              <Input placeholder="Category Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <Input placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              <Button className="w-full bg-blue-600" onClick={handleSave}>{editingId ? 'Update' : 'Save'}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-[10px] uppercase font-bold tracking-widest border-b border-slate-100">
              <th className="pb-4 px-4">Category</th>
              <th className="pb-4 px-4">Description</th>
              <th className="pb-4 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {categories.map((cat) => (
              <tr key={cat._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border border-slate-200">
                    {imageMap[cat.name] ? (
                        <img src={imageMap[cat.name]} alt={cat.name} className="w-full h-full object-cover"/>
                    ) : (
                        <span className="font-black text-blue-600 text-[10px]">{cat.name.charAt(0)}</span>
                    )}
                  </div>
                  <span className="font-bold text-slate-800">{cat.name}</span>
                </td>
                <td className="py-4 px-4 text-slate-500 text-sm">{cat.description || "No description"}</td>
                <td className="py-4 px-4 text-right flex justify-end gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-blue-600" onClick={() => handleEdit(cat)}><Edit2 className="w-4 h-4"/></Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-3xl p-8 border-slate-100">
                        <DialogHeader><DialogTitle>Edit Category</DialogTitle></DialogHeader>
                        <div className="space-y-4 py-4">
                            <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                            <Input value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                            <Button className="w-full bg-blue-600" onClick={handleSave}>Update Category</Button>
                        </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-600" onClick={() => handleDelete(cat._id)}><Trash2 className="w-4 h-4"/></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-blue-950 rounded-3xl p-8 flex items-center justify-between shadow-xl">
        <div>
          <h2 className="text-2xl font-black text-white">Trending Categories Overview</h2>
          <p className="text-blue-300 text-sm mt-1">Real-time update: {categories.length} total categories active.</p>
        </div>
        <div className="flex gap-4">
          {categories.slice(0, 4).map((c, i) => (
            <div key={i} className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl text-white font-bold text-sm border border-white/10">
              {c.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}