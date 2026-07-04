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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      setIsDialogOpen(false);
      fetchCategories();
    } catch (err) {
      console.error("Error saving category:", err);
    }
  };

  const handleEdit = (cat) => {
    setEditingId(cat._id);
    setFormData({ name: cat.name, description: cat.description || '' });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      fetchCategories();
    }
  };

  return (
    // 1. Fixed container structure (h-[88vh])
    <div className="p-4 w-full max-w-7xl mx-auto h-[88vh] min-h-[600px] flex flex-col">
      
      {/* 2. FIXED HEADER */}
      <div className="shrink-0 pb-4 pt-2 mb-4 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-blue-950">Category Management</h1>
          <p className="text-slate-500 font-medium mt-1">Manage and organize store collections.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl font-bold px-6 h-12" onClick={() => {setEditingId(null); setFormData({name:'', description:''})}}>
              <Plus className="w-4 h-4 mr-2"/> Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl p-8 border-slate-100">
            <DialogHeader><DialogTitle>{editingId ? 'Edit Category' : 'Add New Category'}</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
              <Input placeholder="Category Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <Input placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl font-bold py-6" onClick={handleSave}>{editingId ? 'Update' : 'Save'}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* 3. SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto pr-2 pb-4 space-y-6">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
          <table className="w-full text-left border-collapse">
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
                    <Button variant="ghost" size="icon" className="text-blue-600" onClick={() => handleEdit(cat)}><Edit2 className="w-4 h-4"/></Button>
                    <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-600" onClick={() => handleDelete(cat._id)}><Trash2 className="w-4 h-4"/></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Info Card */}
        <div className="bg-blue-950 rounded-3xl p-8 flex items-center justify-between shadow-xl mb-4">
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
    </div>
  );
}