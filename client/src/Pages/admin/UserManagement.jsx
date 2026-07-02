import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Edit2, Trash2 } from "lucide-react"; // අයිකන ඉම්පෝට් කිරීම

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data.filter(u => u.role === 'user'));
    } catch (err) { console.error("Error fetching users:", err); }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/users/${editingUser._id}`, editingUser, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingUser(null);
      fetchUsers();
    } catch (err) { alert("Error updating"); }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchUsers();
      } catch (err) { alert("Error deleting user"); }
    }
  };

  return (
    <div className="p-8 bg-slate-50/50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-blue-950">User Management</h1>
        <p className="text-slate-400 font-medium">View and manage all registered customers.</p>
      </div>

      <Card className="rounded-3xl border-slate-100 shadow-sm p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-xs uppercase tracking-widest font-bold border-b border-slate-100">
              <th className="pb-4">Name</th>
              <th className="pb-4">Email</th>
              <th className="pb-4">Joined Date</th>
              <th className="pb-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-blue-50/30 transition-colors">
                <td className="py-4 font-bold text-blue-950">{u.firstName} {u.lastName}</td>
                <td className="py-4 text-slate-500">{u.email}</td>
                <td className="py-4 text-slate-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                <td className="py-4 text-right flex justify-end gap-2">
                  
                  {/* EDIT Button */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="text-blue-600 font-bold flex items-center gap-1.5" onClick={() => setEditingUser(u)}>
                        <Edit2 className="w-3.5 h-3.5"/> Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-3xl p-8">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-black text-blue-950">Edit User Details</DialogTitle>
                        <p className="text-slate-400 text-sm">Update customer profile information below.</p>
                      </DialogHeader>
                      <div className="space-y-5 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">First Name</label>
                            <Input value={editingUser?.firstName || ''} onChange={(e) => setEditingUser({...editingUser, firstName: e.target.value})} />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Last Name</label>
                            <Input value={editingUser?.lastName || ''} onChange={(e) => setEditingUser({...editingUser, lastName: e.target.value})} />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Email Address</label>
                          <Input value={editingUser?.email || ''} onChange={(e) => setEditingUser({...editingUser, email: e.target.value})} />
                        </div>
                        <Button className="w-full h-11 bg-blue-600 hover:bg-blue-700 rounded-xl font-black text-sm mt-2" onClick={handleUpdate}>Update Changes</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  {/* DELETE Button */}
                  <Button variant="ghost" className="text-red-500 font-bold flex items-center gap-1.5" onClick={() => deleteUser(u._id)}>
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