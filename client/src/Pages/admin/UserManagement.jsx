import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Edit2, Trash2, Ban, Unlock, Users } from "lucide-react"; // අලුත් අයිකන එකතු කළා

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

  // අලුතින් එකතු කරපු Block/Unblock Logic එක
  const handleBlockToggle = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/users/block/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (err) { alert("Error updating block status"); }
  };

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
    // 1. මුළු පේජ් එකම Fixed Height එකකින් තියලා (h-[88vh]) Scroll වෙන එක නැවැත්තුවා
    <div className="p-4 w-full max-w-7xl mx-auto h-[88vh] min-h-[600px] flex flex-col">
      
      {/* 2. FIXED HEADER - මේක කවදාවත් උඩට යන්නේ නැහැ */}
      <div className="shrink-0 pb-4 pt-2 mb-4 border-b border-slate-200">
        <h1 className="text-3xl font-black text-blue-950 flex items-center gap-2">
          <Users className="w-8 h-8 text-blue-600"/>
          User Management
        </h1>
        <p className="text-slate-500 font-medium mt-1">View and manage all registered customers.</p>
      </div>

      {/* 3. SCROLLABLE TABLE - Table එක විතරයි ඇතුලෙන් Scroll වෙන්නේ */}
      <div className="flex-1 overflow-y-auto pr-2 pb-4">
        <Card className="rounded-3xl border border-slate-100 shadow-sm p-6 bg-white min-w-[800px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-400 text-xs uppercase tracking-widest font-bold border-b border-slate-100">
                <th className="pb-4 px-4 whitespace-nowrap">Name</th>
                <th className="pb-4 px-4 whitespace-nowrap">Email</th>
                <th className="pb-4 px-4 whitespace-nowrap">Joined Date</th>
                <th className="pb-4 px-4 whitespace-nowrap">Status</th>
                <th className="pb-4 px-4 text-center whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map((u) => (
                <tr key={u._id} className={`hover:bg-slate-50/80 transition-colors ${u.isBlocked ? 'opacity-70' : ''}`}>
                  <td className="py-4 px-4 font-bold text-slate-800">{u.firstName} {u.lastName}</td>
                  <td className="py-4 px-4 text-slate-500 font-medium">{u.email}</td>
                  <td className="py-4 px-4 text-slate-500 font-medium">{new Date(u.createdAt).toLocaleDateString()}</td>
                  
                  {/* Status Column එක */}
                  <td className="py-4 px-4">
                    {u.isBlocked ? (
                        <span className="text-red-600 font-bold text-xs flex items-center bg-red-50 px-2 py-1 rounded-md w-fit"><Ban className="w-3 h-3 mr-1"/> Blocked</span>
                    ) : (
                        <span className="text-emerald-600 font-bold text-xs flex items-center bg-emerald-50 px-2 py-1 rounded-md w-fit"><Unlock className="w-3 h-3 mr-1"/> Active</span>
                    )}
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex justify-center gap-2">
                      
                      {/* EDIT Button */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-blue-600 font-semibold" onClick={() => setEditingUser(u)}>
                            <Edit2 className="w-4 h-4 mr-1"/> Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-3xl p-8 border-slate-100">
                          <DialogHeader>
                            <DialogTitle className="text-xl font-black text-blue-950">Edit User Details</DialogTitle>
                            <p className="text-slate-400 text-sm mt-1">Update customer profile information below.</p>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs font-bold text-slate-500 uppercase ml-1">First Name</label>
                                <Input className="rounded-xl mt-1" value={editingUser?.firstName || ''} onChange={(e) => setEditingUser({...editingUser, firstName: e.target.value})} />
                              </div>
                              <div>
                                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Last Name</label>
                                <Input className="rounded-xl mt-1" value={editingUser?.lastName || ''} onChange={(e) => setEditingUser({...editingUser, lastName: e.target.value})} />
                              </div>
                            </div>
                            <div>
                              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email Address</label>
                              <Input className="rounded-xl mt-1" value={editingUser?.email || ''} onChange={(e) => setEditingUser({...editingUser, email: e.target.value})} />
                            </div>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl font-bold py-6 mt-4" onClick={handleUpdate}>Update Changes</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      {/* BLOCK / UNBLOCK Button */}
                      <Button variant="ghost" size="sm" className={`${u.isBlocked ? 'text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50' : 'text-orange-500 hover:text-orange-600 hover:bg-orange-50'} font-semibold`} onClick={() => handleBlockToggle(u._id)}>
                          {u.isBlocked ? <><Unlock className="w-4 h-4 mr-1"/> Unblock</> : <><Ban className="w-4 h-4 mr-1"/> Block</>}
                      </Button>

                      {/* DELETE Button */}
                      <Button variant="ghost" size="sm" className="text-red-500 font-semibold hover:bg-red-50" onClick={() => deleteUser(u._id)}>
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

    </div>
  );
}