import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit2, Trash2, Plus, Ban, Unlock, ShieldAlert, Search } from "lucide-react";

export default function ManagerManagement() {
  const [managers, setManagers] = useState([]);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'manager' });
  const [editingId, setEditingId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Search State එක

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

  // Search Logic එක මෙතන තියෙනවා
  const filteredManagers = managers.filter((m) => {
    const query = searchQuery.toLowerCase();
    const fullName = `${m.firstName || ''} ${m.lastName || ''}`.toLowerCase();
    const email = (m.email || '').toLowerCase();
    return fullName.includes(query) || email.includes(query);
  });

  const handleBlockToggle = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/users/block/${id}`, {}, getConfig());
      fetchManagers();
    } catch (err) { alert("Error updating block status"); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/users/delete/${id}`, getConfig());
        fetchManagers();
      } catch (err) { alert("Error deleting user"); }
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
    } catch (err) { alert(err.response?.data?.message || "Error saving details"); }
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
    <div className="p-4 w-full max-w-7xl mx-auto h-[88vh] min-h-[600px] flex flex-col">
      
      <div className="shrink-0 pb-4 pt-2 mb-4 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-blue-950 flex items-center gap-2">
            <ShieldAlert className="w-8 h-8 text-blue-600"/>
            Manager Management
          </h1>
          <p className="text-slate-500 font-medium mt-1">Manage and assign roles to your staff.</p>
        </div>

        {/* ලස්සන Search Bar එක */}
        <div className="relative w-80 group">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <Input 
            placeholder="Search manager by name or email..." 
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
                <tr className="text-slate-400 text-xs uppercase font-bold tracking-widest border-b border-slate-100">
                  <th className="pb-4 px-4">Name</th>
                  <th className="pb-4 px-4">Email</th>
                  <th className="pb-4 px-4">Role</th>
                  <th className="pb-4 px-4">Status</th>
                  <th className="pb-4 px-4 text-center">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
                {filteredManagers.length > 0 ? (
                  filteredManagers.map((m) => (
                    <tr key={m._id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 font-bold text-slate-800">{m.firstName} {m.lastName}</td>
                      <td className="py-4 px-4 text-slate-500">{m.email}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${m.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-blue-100 text-blue-700'}`}>
                            {m.role}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                          {m.isBlocked ? (
                            <span className="text-red-600 bg-red-50 px-2 py-1 rounded-md text-xs font-bold flex items-center w-fit"><Ban className="w-3 h-3 mr-1"/> Blocked</span>
                          ) : (
                            <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md text-xs font-bold flex items-center w-fit"><Unlock className="w-3 h-3 mr-1"/> Active</span>
                          )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex justify-center gap-2">
                          <Button variant="ghost" size="sm" className="text-blue-600 font-semibold" onClick={() => openEditDialog(m)}><Edit2 className="w-4 h-4 mr-1"/> Edit</Button>
                          <Button variant="ghost" size="sm" className={m.isBlocked ? "text-emerald-600" : "text-orange-500"} onClick={() => handleBlockToggle(m._id)}>{m.isBlocked ? "Unblock" : "Block"}</Button>
                          <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDelete(m._id)}><Trash2 className="w-4 h-4 mr-1"/> Delete</Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5" className="text-center py-10 text-slate-400">No managers found.</td></tr>
                )}
            </tbody>
            </table>
        </Card>
      </div>

      <div className="shrink-0 pt-4 flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-full font-bold px-6 h-12 shadow-md">
              <Plus className="w-5 h-5 mr-2"/> Add New Manager
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl">
            <DialogHeader><DialogTitle>{editingId ? 'Edit Role' : 'Add New Manager'}</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
                {!editingId && (
                    <>
                        <Input placeholder="First Name" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                        <Input placeholder="Last Name" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                        <Input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                        <Input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                    </>
                )}
                <Select value={formData.role} onValueChange={(val) => setFormData({...formData, role: val})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="manager">Manager</SelectItem><SelectItem value="admin">Admin</SelectItem></SelectContent>
                </Select>
                <Button onClick={handleSave} className="w-full">Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}