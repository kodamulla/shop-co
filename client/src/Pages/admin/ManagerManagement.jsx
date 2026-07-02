import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function ManagerManagement() {
  const [managers, setManagers] = useState([]);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'manager' });

  // Token එක ගන්න (Login වුණාම සේව් කළා නම් මේක වැඩ)
  const token = localStorage.getItem('token'); 

  // Axios config එකක් හදාගන්න (සෑම රික්වෙස්ට් එකකටම Token එක යවන්න)
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const fetchManagers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users', config);
      const allUsers = Array.isArray(res.data) ? res.data : (res.data.users || []);
      const filtered = allUsers.filter(u => u.role === 'manager' || u.role === 'admin');
      setManagers(filtered);
    } catch (err) {
      console.error("Error fetching managers:", err);
    }
  };

  useEffect(() => { fetchManagers(); }, []);

  const handleAddManager = async () => {
    try {
      await axios.post('http://localhost:5000/api/users/signup', formData, config);
      fetchManagers(); 
      alert("Manager added successfully!");
    } catch (err) {
      alert("Error adding manager: " + err.response?.data?.message);
    }
  };

  const deleteManager = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, config);
      fetchManagers();
    } catch (err) {
      alert("Error deleting manager");
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
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl font-bold px-6">+ Add New Manager</Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl p-8">
  <DialogHeader>
    <DialogTitle className="text-xl font-black text-blue-950">Add New Staff Member</DialogTitle>
    <p className="text-slate-400 text-sm">Fill in the details to create a new manager account.</p>
  </DialogHeader>
  
  <div className="space-y-5 py-4">
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-500 uppercase">First Name</label>
        <Input placeholder="John" onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
      </div>
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-500 uppercase">Last Name</label>
        <Input placeholder="Doe" onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
      </div>
    </div>
    
    <div className="space-y-1">
      <label className="text-[10px] font-bold text-slate-500 uppercase">Email Address</label>
      <Input placeholder="john@shopco.com" type="email" onChange={(e) => setFormData({...formData, email: e.target.value})} />
    </div>

    <div className="space-y-1">
      <label className="text-[10px] font-bold text-slate-500 uppercase">Password</label>
      <Input placeholder="••••••••" type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
    </div>

    {/* Role Select එක */}
    <div className="space-y-1">
      <label className="text-[10px] font-bold text-slate-500 uppercase">Assign Role</label>
      <select 
        className="w-full h-10 rounded-xl border border-slate-200 px-3 text-sm font-bold text-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setFormData({...formData, role: e.target.value})}
      >
        <option value="manager">Manager</option>
        <option value="admin">Admin</option>
      </select>
    </div>

    <Button 
      className="w-full h-11 bg-blue-600 hover:bg-blue-700 rounded-xl font-black text-sm mt-2" 
      onClick={handleAddManager}
    >
      Save Staff Member
    </Button>
  </div>
</DialogContent>
        </Dialog>
      </div>

      <Card className="rounded-3xl border-slate-100 shadow-sm p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-xs uppercase tracking-widest font-bold border-b border-slate-100">
              <th className="pb-4">Name</th>
              <th className="pb-4">Email</th>
              <th className="pb-4">Role</th>
              <th className="pb-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {managers.map((m) => (
              <tr key={m._id} className="hover:bg-blue-50/30 transition-colors">
                {/* මම මෙතන firstName සහ lastName වෙන වෙනම දැම්මා */}
                <td className="py-4 font-bold text-blue-950">{m.firstName} {m.lastName}</td>
                <td className="py-4 text-slate-500">{m.email}</td>
                <td className="py-4"><span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold uppercase">{m.role}</span></td>
                <td className="py-4 text-right">
                  <Button variant="ghost" className="text-red-500 hover:bg-red-50" onClick={() => deleteManager(m._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}