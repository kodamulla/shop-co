import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Edit2, Trash2, Ban, Unlock, Users, Search } from "lucide-react"; 
import { ModernAlert } from "@/components/ui/ModernAlert"; // 👈 අලුත් Alert එක Import කළා

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // 👈 Alert එක පාලනය කරන State එක
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
    showCancel: false,
    confirmText: "Continue",
    onConfirm: null
  });

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const data = res.data;
      const userList = Array.isArray(data) ? data : (data.users || []);
      setUsers(userList.filter(u => u.role === 'user'));
    } catch (err) { 
      console.error("Error fetching users:", err); 
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const filteredUsers = users.filter((u) => {
    const query = searchQuery.toLowerCase();
    const fullName = `${u.firstName || ''} ${u.lastName || ''}`.toLowerCase();
    const email = (u.email || '').toLowerCase();
    return fullName.includes(query) || email.includes(query);
  });

  const handleBlockToggle = async (id, isBlocked) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/users/block/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
      
      setAlertConfig({
        isOpen: true, type: "success", title: "Success!",
        message: `User has been ${isBlocked ? 'unblocked' : 'blocked'} successfully.`,
        showCancel: false, confirmText: "OK", 
        onConfirm: () => setAlertConfig(prev => ({ ...prev, isOpen: false }))
      });
    } catch (err) { 
      setAlertConfig({
        isOpen: true, type: "error", title: "Error!", message: "Error updating status",
        showCancel: false, confirmText: "OK", 
        onConfirm: () => setAlertConfig(prev => ({ ...prev, isOpen: false }))
      });
    }
  };

  const handleUpdate = async () => {
   
    try {
      const token = localStorage.getItem('token');

      const updateData = {
        firstName: editingUser.firstName,
        lastName: editingUser.lastName
      };
      
      await axios.put(`http://localhost:5000/api/users/update-profile/${editingUser._id}`, editingUser, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingUser(null);
      fetchUsers();
      
      setAlertConfig({
        isOpen: true, type: "success", title: "Updated!", message: "User details updated successfully.",
        showCancel: false, confirmText: "OK", 
        onConfirm: () => setAlertConfig(prev => ({ ...prev, isOpen: false }))
      });
    } catch (err) { 
      console.error("Full Update Error:", err);
      setAlertConfig({
        isOpen: true, type: "error", title: "Error!", message: "Error updating user",
        showCancel: false, confirmText: "Try Again", 
        onConfirm: () => setAlertConfig(prev => ({ ...prev, isOpen: false }))
      });
    }
  };

  const deleteUser = async (id) => {
    setAlertConfig({
      isOpen: true, type: "error", title: "Delete User",
      message: "Are you sure you want to delete this user? This action cannot be undone.",
      showCancel: true, confirmText: "Delete",
      onConfirm: async () => {
        try {
          const token = localStorage.getItem('token');
          await axios.delete(`http://localhost:5000/api/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          fetchUsers();
          setAlertConfig({
            isOpen: true, type: "success", title: "Deleted!", message: "User deleted successfully.",
            showCancel: false, confirmText: "OK", 
            onConfirm: () => setAlertConfig(prev => ({ ...prev, isOpen: false }))
          });
        } catch (err) { 
          setAlertConfig({
            isOpen: true, type: "error", title: "Error!", message: "Error deleting user",
            showCancel: false, confirmText: "OK", 
            onConfirm: () => setAlertConfig(prev => ({ ...prev, isOpen: false }))
          });
        }
      }
    });
  };

  return (
    <div className="p-4 w-full max-w-7xl mx-auto h-[88vh] flex flex-col">
      <div className="shrink-0 pb-4 pt-2 mb-4 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-blue-950 flex items-center gap-2">
            <Users className="w-8 h-8 text-blue-600"/>
            User Management
          </h1>
          <p className="text-slate-500 font-medium mt-1">View and manage all registered customers.</p>
        </div>

        <div className="relative w-80 group">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <Input 
            placeholder="Search by name or email..." 
            className="pl-11 py-6 rounded-2xl bg-white border-slate-200 shadow-sm focus:border-blue-500 transition-all duration-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-4">
        <Card className="rounded-3xl border border-slate-100 shadow-sm p-6 bg-white min-w-[800px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-400 text-xs uppercase tracking-widest font-bold border-b border-slate-100">
                <th className="pb-4 px-4">Name</th>
                <th className="pb-4 px-4">Email</th>
                <th className="pb-4 px-4">Joined Date</th>
                <th className="pb-4 px-4">Status</th>
                <th className="pb-4 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-800">{u.firstName} {u.lastName}</td>
                    <td className="py-4 px-4 text-slate-500">{u.email}</td>
                    <td className="py-4 px-4 text-slate-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 px-4">
                      {u.isBlocked ? (
                        <span className="text-red-600 bg-red-50 px-2 py-1 rounded-md text-xs font-bold flex items-center w-fit"><Ban className="w-3 h-3 mr-1"/> Blocked</span>
                      ) : (
                        <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md text-xs font-bold flex items-center w-fit"><Unlock className="w-3 h-3 mr-1"/> Active</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setEditingUser(u)} className="text-blue-600 font-semibold"><Edit2 className="w-4 h-4 mr-1"/> Edit</Button>
                          </DialogTrigger>
                          <DialogContent className="rounded-3xl">
                             <DialogHeader><DialogTitle>Edit User Details</DialogTitle></DialogHeader>
                             <div className="space-y-4">
                               <Input value={editingUser?.firstName || ''} onChange={(e) => setEditingUser({...editingUser, firstName: e.target.value})} placeholder="First Name" />
                               <Input value={editingUser?.lastName || ''} onChange={(e) => setEditingUser({...editingUser, lastName: e.target.value})} placeholder="Last Name" />
                               <Button onClick={handleUpdate} className="w-full">Save Changes</Button>
                             </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="sm" className={u.isBlocked ? "text-emerald-600" : "text-orange-500"} onClick={() => handleBlockToggle(u._id, u.isBlocked)}>{u.isBlocked ? "Unblock" : "Block"}</Button>
                        <Button variant="ghost" size="sm" className="text-red-500" onClick={() => deleteUser(u._id)}><Trash2 className="w-4 h-4 mr-1"/> Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="5" className="text-center py-10 text-slate-400">No users found matching your search.</td></tr>
              )}
            </tbody>
          </table>
        </Card>
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