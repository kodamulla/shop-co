import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Edit2, Trash2, Plus } from "lucide-react"; 

export default function ManagerManagement() {
  const [managers, setManagers] = useState([]);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'manager' });
  const [editingUser, setEditingUser] = useState(null);

  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchManagers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users', config);
      const allUsers = Array.isArray(res.data) ? res.data : (res.data.users || []);
      setManagers(allUsers.filter(u => u.role === 'manager' || u.role === 'admin'));
    } catch (err) { console.error("Error:", err); }
  };

  useEffect(() => { fetchManagers(); }, []);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/${editingUser._id}`, editingUser, config);
      setEditingUser(null);
      fetchManagers();
    } catch (err) { alert("Error updating"); }
  };

  const deleteManager = async (id) => {
    if (window.confirm("Delete this staff member?")) {
      await axios.delete(`http://localhost:5000/api/users/${id}`, config);
      fetchManagers();
    }
  };

  return (
    <div className="p-8 bg-slate-50/50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-blue-950">Manager Management</h1>
          <p className="text-slate-400 font-medium">Manage and assign roles to your staff.</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 rounded-xl font-bold px-6"><Plus className="w-4 h-4 mr-2"/> Add New Manager</Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl p-8">
            <DialogHeader><DialogTitle>Add New Staff Member</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
              <Input placeholder="First Name" onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
              <Input placeholder="Last Name" onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
              <Input placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} />
              <Button className="w-full bg-blue-600" onClick={async () => {
                await axios.post('http://localhost:5000/api/users/signup', formData, config);
                fetchManagers();
              }}>Save Staff Member</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="rounded-3xl border-slate-100 shadow-sm p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-xs uppercase tracking-widest font-bold border-b border-slate-100">
              <th className="pb-4">Name</th><th className="pb-4">Email</th><th className="pb-4">Role</th><th className="pb-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {managers.map((m) => (
              <tr key={m._id} className="hover:bg-blue-50/30 transition-colors">
                <td className="py-4 font-bold text-blue-950">{m.firstName} {m.lastName}</td>
                <td className="py-4 text-slate-500">{m.email}</td>
                <td className="py-4"><span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold uppercase">{m.role}</span></td>
                <td className="py-4 text-right flex justify-end gap-1">
                  
                  {/* EDIT Button */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="text-blue-600 font-bold flex items-center gap-1.5 px-3" onClick={() => setEditingUser(m)}>
                        <Edit2 className="w-3.5 h-3.5"/> Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-3xl p-8">
  <DialogHeader>
    <DialogTitle className="text-xl font-black text-blue-950">Edit Staff Member</DialogTitle>
    <p className="text-slate-400 text-sm">Update staff profile information below.</p>
  </DialogHeader>
  
  <div className="space-y-5 py-4">
    {/* Name Fields */}
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-500 uppercase">First Name</label>
        <Input 
          value={editingUser?.firstName || ''} 
          onChange={(e) => setEditingUser({...editingUser, firstName: e.target.value})} 
        />
      </div>
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-500 uppercase">Last Name</label>
        <Input 
          value={editingUser?.lastName || ''} 
          onChange={(e) => setEditingUser({...editingUser, lastName: e.target.value})} 
        />
      </div>
    </div>

    {/* Email Field */}
    <div className="space-y-1">
      <label className="text-[10px] font-bold text-slate-500 uppercase">Email Address</label>
      <Input 
        value={editingUser?.email || ''} 
        onChange={(e) => setEditingUser({...editingUser, email: e.target.value})} 
      />
    </div>

    {/* Role Select Field */}
    <div className="space-y-1">
      <label className="text-[10px] font-bold text-slate-500 uppercase">Role</label>
      <select 
        className="w-full h-10 rounded-xl border border-slate-200 px-3 text-sm font-bold text-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={editingUser?.role || 'manager'}
        onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
      >
        <option value="manager">Manager</option>
        <option value="admin">Admin</option>
      </select>
    </div>

    <Button 
      className="w-full h-11 bg-blue-600 hover:bg-blue-700 rounded-xl font-black text-sm mt-2" 
      onClick={handleUpdate}
    >
      Update Changes
    </Button>
  </div>
</DialogContent>
                  </Dialog>

                  {/* DELETE Button */}
                  <Button variant="ghost" className="text-red-500 font-bold flex items-center gap-1.5 px-3" onClick={() => deleteManager(m._id)}>
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