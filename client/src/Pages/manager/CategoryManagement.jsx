import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { ModernAlert } from "@/components/ui/ModernAlert"; 

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  // 👈 image: null එකතු කළා
  const [formData, setFormData] = useState({ name: '', description: '', image: null });
  const [editingId, setEditingId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [alertConfig, setAlertConfig] = useState({
    isOpen: false, type: "success", title: "", message: "", showCancel: false, confirmText: "OK", onConfirm: null
  });

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
      if (!formData.name) {
        setAlertConfig({ isOpen: true, type: "error", title: "Error", message: "Category name is required!", showCancel: false, confirmText: "OK", onConfirm: () => setAlertConfig(prev => ({ ...prev, isOpen: false })) });
        return;
      }

      // 👈 JSON වෙනුවට FormData භාවිතා කිරීම (Image එක යවන්න)
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description || "");
      
      // Image එකක් තෝරලා තියෙනවා නම් ඒක එකතු කරනවා
      if (formData.image) {
        data.append('image', formData.image);
      }

      if (editingId) {
        await axios.put(`http://localhost:5000/api/categories/${editingId}`, data);
      } else {
        await axios.post('http://localhost:5000/api/categories', data);
      }
      
      setFormData({ name: '', description: '', image: null });
      setEditingId(null);
      setIsDialogOpen(false);
      fetchCategories();

      setAlertConfig({
        isOpen: true, type: "success", title: "Success!",
        message: "Category saved successfully!",
        showCancel: false, confirmText: "OK", onConfirm: () => setAlertConfig(prev => ({ ...prev, isOpen: false }))
      });
    } catch (err) {
      console.error("Error saving category:", err);
      setAlertConfig({
        isOpen: true, type: "error", title: "Error!",
        message: "Error saving category.",
        showCancel: false, confirmText: "Try Again", onConfirm: () => setAlertConfig(prev => ({ ...prev, isOpen: false }))
      });
    }
  };

  const handleEdit = (cat) => {
    setEditingId(cat._id);
    setFormData({ name: cat.name, description: cat.description || '', image: null });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    setAlertConfig({
      isOpen: true, type: "error", title: "Delete Category",
      message: "Are you sure you want to delete this category?",
      showCancel: true, confirmText: "Delete",
      onConfirm: async () => {
        try {
          await axios.delete(`http://localhost:5000/api/categories/${id}`);
          fetchCategories();
          setAlertConfig(prev => ({ ...prev, isOpen: false }));
        } catch (err) {
          console.error("Error deleting category:", err);
          setAlertConfig({
            isOpen: true, type: "error", title: "Error!",
            message: "Failed to delete category.",
            showCancel: false, confirmText: "OK", onConfirm: () => setAlertConfig(prev => ({ ...prev, isOpen: false }))
          });
        }
      }
    });
  };

  return (
    <div className="p-4 w-full max-w-7xl mx-auto h-[88vh] min-h-[600px] flex flex-col">
      
      <div className="shrink-0 pb-4 pt-2 mb-4 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-blue-950">Category Management</h1>
          <p className="text-slate-500 font-medium mt-1">Manage and organize store collections.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) { setEditingId(null); setFormData({ name: '', description: '', image: null }); }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl font-bold px-6 h-12" onClick={() => {setEditingId(null); setFormData({name:'', description:'', image: null})}}>
              <Plus className="w-4 h-4 mr-2"/> Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl p-8 border-slate-100">
            <DialogHeader><DialogTitle>{editingId ? 'Edit Category' : 'Add New Category'}</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
              <Input placeholder="Category Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <Input placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              
              {/* 👈 අලුතින් Image Upload Input එක දැම්මා */}
              <label className="text-xs font-bold text-slate-500">Category Image</label>
              <Input type="file" onChange={(e) => setFormData({...formData, image: e.target.files[0]})} />

              <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl font-bold py-6" onClick={handleSave}>{editingId ? 'Update' : 'Save'}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

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
                      {/* 👈 Hardcode කරපු imageMap අයින් කරලා Backend එකෙන් එන Image URL එක දැම්මා */}
                      {cat.imageUrl ? (
                          <img 
                            src={cat.imageUrl.startsWith('/uploads') ? `http://localhost:5000${cat.imageUrl}` : cat.imageUrl} 
                            alt={cat.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = "/Logoicon.png" }}
                          />
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