import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit2, Trash2, Plus, Ban, Unlock, ShieldAlert, Search } from "lucide-react";
import { ModernAlert } from "@/components/ui/ModernAlert"; // 👈 අලුත් Alert එක Import කළා

export default function ManagerManagement() {
  const [managers, setManagers] = useState([]);
  
  // 👈 phoneNumber එක State එකට අලුතින් ඇඩ් කළා
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '', password: '', role: 'manager' });
  const [editingId, setEditingId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  const filteredManagers = managers.filter((m) => {
    const query = searchQuery.toLowerCase();
    const fullName = `${m.firstName || ''} ${m.lastName || ''}`.toLowerCase();
    const email = (m.email || '').toLowerCase();
    return fullName.includes(query) || email.includes(query);
  });

  const handleBlockToggle = async (manager) => {
    try {
      await axios.put(`http://localhost:5000/api/users/block/${manager._id}`, {}, getConfig());
      fetchManagers();
      
      // 👈 Block/Unblock Success Alert
      setAlertConfig({
        isOpen: true,
        type: "success",
        title: "Success!",
        message: `User has been successfully ${manager.isBlocked ? 'unblocked' : 'blocked'}.`,
        showCancel: false,
        confirmText: "OK",
        onConfirm: () => setAlertConfig(prev => ({ ...prev, isOpen: false }))
      });
    } catch (err) { 
      setAlertConfig({
        isOpen: true,
        type: "error",
        title: "Error!",
        message: "Error updating block status",
        showCancel: false,
        confirmText: "OK",
        onConfirm: () => setAlertConfig(prev => ({ ...prev, isOpen: false }))
      }); 
    }
  };

  // 👈 Delete Alert එක පරණ Confirm එක වෙනුවට
  const handleDeleteClick = (id) => {
    setAlertConfig({
      isOpen: true,
      type: "error", // රතු අයිකන් එක
      title: "Delete Manager",
      message: "Are you sure you want to permanently delete this user? This action cannot be undone.",
      showCancel: true,
      confirmText: "Delete",
      onConfirm: async () => {
        try {
          await axios.delete(`http://localhost:5000/api/users/delete/${id}`, getConfig());
          fetchManagers();
          setAlertConfig({
            isOpen: true,
            type: "success",
            title: "Deleted!",
            message: "Manager has been deleted successfully.",
            showCancel: false,
            confirmText: "OK",
            onConfirm: () => setAlertConfig(prev => ({ ...prev, isOpen: false }))
          });
        } catch (err) { 
          setAlertConfig({
            isOpen: true,
            type: "error",
            title: "Error!",
            message: "Error deleting user",
            showCancel: false,
            confirmText: "OK",
            onConfirm: () => setAlertConfig(prev => ({ ...prev, isOpen: false }))
          });
        }
      }
    });
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await axios.patch(`http://localhost:5000/api/users/role/${editingId}`, { role: formData.role }, getConfig());
      } else {
        await axios.post('http://localhost:5000/api/users/signup', formData);
      }
      
      setFormData({ firstName: '', lastName: '', email: '', phoneNumber: '', password: '', role: 'manager' });
      setEditingId(null);
      setIsDialogOpen(false);
      fetchManagers();

      // 👈 Save Success Alert
      setAlertConfig({
        isOpen: true,
        type: "success",
        title: "Success!",
        message: editingId ? "Manager role updated successfully!" : "New manager added successfully!",
        showCancel: false,
        confirmText: "OK",
        onConfirm: () => setAlertConfig(prev => ({ ...prev, isOpen: false }))
      });

    } catch (err) { 
      // 👈 Error Alert
      setAlertConfig({
        isOpen: true,
        type: "error",
        title: "Error!",
        message: err.response?.data?.message || "Error saving details. Please check the fields.",
        showCancel: false,
        confirmText: "Try Again",
        onConfirm: () => setAlertConfig(prev => ({ ...prev, isOpen: false }))
      });
    }
  };

  const openEditDialog = (manager) => {
    setEditingId(manager._id);
    setFormData({ 
      firstName: manager.firstName || '', 
      lastName: manager.lastName || '', 
      email: manager.email || '', 
      phoneNumber: manager.phoneNumber || '', // 👈 Edit කරද්දි Phone එකත් ගන්නවා
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
                          <Button variant="ghost" size="sm" className={m.isBlocked ? "text-emerald-600" : "text-orange-500"} onClick={() => handleBlockToggle(m)}>{m.isBlocked ? "Unblock" : "Block"}</Button>
                          <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDeleteClick(m._id)}><Trash2 className="w-4 h-4 mr-1"/> Delete</Button>
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
            {/* 👇 මෙතන තමයි වෙනස් කළේ. setEditingId(null) එක ඇතුළත් කළා */}
            <Button onClick={() => {
              setFormData({ firstName: '', lastName: '', email: '', phoneNumber: '', password: '', role: 'manager' });
              setEditingId(null);
            }} className="bg-blue-600 hover:bg-blue-700 rounded-full font-bold px-6 h-12 shadow-md">
              <Plus className="w-5 h-5 mr-2"/> Add New Manager
            </Button>
          </DialogTrigger>
          
          <DialogContent className="rounded-[32px] p-6 sm:p-8 max-w-md border-0 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black text-slate-900 mb-2">
                {editingId ? 'Edit Manager Role' : 'Add New Manager'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-2 mt-2">
                {!editingId && (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-sm font-bold text-slate-700">First Name</label>
                            <Input className="h-12 bg-slate-50 border-slate-200 rounded-xl px-4" placeholder="Kamal" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-sm font-bold text-slate-700">Last Name</label>
                            <Input className="h-12 bg-slate-50 border-slate-200 rounded-xl px-4" placeholder="Perera" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                          </div>
                        </div>
                        
                        <div className="space-y-1.5">
                          <label className="text-sm font-bold text-slate-700">Email Address</label>
                          <Input type="email" className="h-12 bg-slate-50 border-slate-200 rounded-xl px-4" placeholder="kamal@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-sm font-bold text-slate-700">Phone Number</label>
                          <Input type="tel" className="h-12 bg-slate-50 border-slate-200 rounded-xl px-4" placeholder="07XXXXXXXX" value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-sm font-bold text-slate-700">Password</label>
                          <Input type="password" className="h-12 bg-slate-50 border-slate-200 rounded-xl px-4" placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                        </div>
                    </>
                )}
                
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700">Assign Role</label>
                  <Select value={formData.role} onValueChange={(val) => setFormData({...formData, role: val})}>
                      <SelectTrigger className="h-12 bg-slate-50 border-slate-200 rounded-xl px-4"><SelectValue /></SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleSave} className="w-full h-14 mt-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold text-base shadow-md transition-all">
                  {editingId ? 'Save Changes' : 'Create Manager Account'}
                </Button>
            </div>
          </DialogContent>
        </Dialog>
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