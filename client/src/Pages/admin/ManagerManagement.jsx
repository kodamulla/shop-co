import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit2, Trash2, Plus, Ban, Unlock, ShieldAlert } from "lucide-react";

export default function ManagerManagement() {
  const [managers, setManagers] = useState([]);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'manager' });
  const [editingId, setEditingId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getConfig = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo?.token || localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchManagers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users', getConfig());
      const filteredManagers = res.data.filter(u => u.role === 'admin' || u.role === 'manager');
      setManagers(filteredManagers);
    } catch (err) {
      console.error("Error fetching managers:", err);
    }
  };

  useEffect(() => { fetchManagers(); }, []);

  const handleBlockToggle = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/users/block/${id}`, {}, getConfig());
      fetchManagers();
    } catch (err) {
      console.error("Error blocking/unblocking manager:", err);
      alert(err.response?.data?.message || "Error updating block status");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/users/delete/${id}`, getConfig());
        fetchManagers();
      } catch (err) {
        console.error("Error deleting manager:", err);
        alert(err.response?.data?.message || "Error deleting user");
      }
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await axios.patch(`http://localhost:5000/api/users/role/${editingId}`, { role: formData.role }, getConfig());
      } else {
        await axios.post('http://localhost:5000/api/users/signup', formData);
      }
      setFormData({ firstName: '', lastName: '', email: '', password: '', role: 'manager' });
      setEditingId(null);
      setIsDialogOpen(false);
      fetchManagers();
    } catch (err) {
      console.error("Error saving manager:", err);
      alert(err.response?.data?.message || "Error saving details");
    }
  };

  const openEditDialog = (manager) => {
    setEditingId(manager._id);
    setFormData({ 
      firstName: manager.firstName || '', 
      lastName: manager.lastName || '', 
      email: manager.email || '', 
      password: '',
      role: manager.role 
    });
    setIsDialogOpen(true);
  };

  return (
    // 1. මේක තමයි ප්‍රධාන වෙනස. මුළු පේජ් එකටම Fixed Height එකක් දීලා (h-[85vh]) Flex Column කරලා තියෙන්නේ.
    <div className="p-4 w-full max-w-7xl mx-auto h-[88vh] min-h-[600px] flex flex-col">
      
      {/* 2. FIXED HEADER - මේක කවදාවත් Scroll වෙන්නේ නැහැ */}
      <div className="shrink-0 pb-4 pt-2 mb-4 border-b border-slate-200">
        <h1 className="text-3xl font-black text-blue-950 flex items-center gap-2">
          <ShieldAlert className="w-8 h-8 text-blue-600"/>
          Manager Management
        </h1>
        <p className="text-slate-500 font-medium mt-1">Manage and assign roles to your staff.</p>
      </div>

      {/* 3. SCROLLABLE CONTENT - Table එක විතරයි මේක අස්සේ Scroll වෙන්නේ */}
      <div className="flex-1 overflow-y-auto pr-2 pb-4">
        <Card className="rounded-3xl border border-slate-100 shadow-sm p-6 bg-white min-w-[800px]">
            <table className="w-full text-left border-collapse">
            <thead>
                <tr className="text-slate-400 text-xs uppercase font-bold tracking-widest border-b border-slate-100">
                <th className="pb-4 px-4 whitespace-nowrap">Name</th>
                <th className="pb-4 px-4 whitespace-nowrap">Email</th>
                <th className="pb-4 px-4 whitespace-nowrap">Role</th>
                <th className="pb-4 px-4 whitespace-nowrap">Status</th>
                {/* Actions ටික හරියටම මැදට වෙන්න text-center දැම්මා */}
                <th className="pb-4 px-4 text-center whitespace-nowrap">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
                {managers.map((manager) => (
                <tr key={manager._id} className={`hover:bg-slate-50/80 transition-colors ${manager.isBlocked ? 'opacity-70' : ''}`}>
                    <td className="py-4 px-4 font-bold text-slate-800">
                        {manager.firstName} {manager.lastName}
                        {manager.name && !manager.firstName ? manager.name : ''}
                    </td>
                    <td className="py-4 px-4 text-slate-500 font-medium">{manager.email}</td>
                    <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${manager.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-blue-100 text-blue-700'}`}>
                            {manager.role}
                        </span>
                    </td>
                    <td className="py-4 px-4">
                        {manager.isBlocked ? (
                            <span className="text-red-600 font-bold text-xs flex items-center bg-red-50 px-2 py-1 rounded-md w-fit"><Ban className="w-3 h-3 mr-1"/> Blocked</span>
                        ) : (
                            <span className="text-emerald-600 font-bold text-xs flex items-center bg-emerald-50 px-2 py-1 rounded-md w-fit"><Unlock className="w-3 h-3 mr-1"/> Active</span>
                        )}
                    </td>
                    <td className="py-4 px-4">
                        {/* බටන් ටික මැදට ගන්න justify-center දැම්මා */}
                        <div className="flex justify-center gap-2">
                            <Button variant="ghost" size="sm" className="text-blue-600 font-semibold" onClick={() => openEditDialog(manager)}>
                                <Edit2 className="w-4 h-4 mr-1"/> Edit
                            </Button>
                            
                            <Button variant="ghost" size="sm" className={`${manager.isBlocked ? 'text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50' : 'text-orange-500 hover:text-orange-600 hover:bg-orange-50'} font-semibold`} onClick={() => handleBlockToggle(manager._id)}>
                                {manager.isBlocked ? <><Unlock className="w-4 h-4 mr-1"/> Unblock</> : <><Ban className="w-4 h-4 mr-1"/> Block</>}
                            </Button>

                            <Button variant="ghost" size="sm" className="text-red-500 font-semibold hover:bg-red-50" onClick={() => handleDelete(manager._id)}>
                                <Trash2 className="w-4 h-4 mr-1"/> Delete
                            </Button>
                        </div>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </Card>
      </div>

      {/* 4. FIXED FOOTER (Add Button) - මේක කවදාවත් Scroll වෙන්නේ නැහැ, දකුණු පැත්තටම වෙලා තියෙනවා */}
      <div className="shrink-0 pt-4 flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) { setEditingId(null); setFormData({ firstName: '', lastName: '', email: '', password: '', role: 'manager' }); }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-full font-bold px-6 h-12 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <Plus className="w-5 h-5 mr-2"/> Add New Manager
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl p-8 border-slate-100">
            <DialogHeader><DialogTitle className="text-xl font-black text-blue-950">{editingId ? 'Edit Role' : 'Add New Manager'}</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
              {!editingId && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1">First Name</label>
                      <Input className="rounded-xl mt-1" placeholder="John" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1">Last Name</label>
                      <Input className="rounded-xl mt-1" placeholder="Doe" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email</label>
                    <Input className="rounded-xl mt-1" type="email" placeholder="manager@shop.co" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Password</label>
                    <Input className="rounded-xl mt-1" type="password" placeholder="Secure Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                  </div>
                </>
              )}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Role</label>
                <Select value={formData.role} onValueChange={(val) => setFormData({...formData, role: val})}>
                    <SelectTrigger className="w-full rounded-xl mt-1">
                        <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl">
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl font-bold py-6 mt-4" onClick={handleSave}>
                {editingId ? 'Update Role' : 'Create Account'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

    </div>
  );
}