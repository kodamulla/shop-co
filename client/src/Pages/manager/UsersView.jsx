import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from "@/components/ui/card";
import { Users, Mail, ShieldCheck, User } from "lucide-react";

export default function UsersView() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
     
      const userInfoString = localStorage.getItem('userInfo');
      let token = '';

      if (userInfoString) {
        const userInfo = JSON.parse(userInfoString);
        token = userInfo.token;
      } else {
        token = localStorage.getItem('token'); 
      }

      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      
      const res = await axios.get('http://localhost:5000/api/users', config);
      
      
      const sortedUsers = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setUsers(sortedUsers);
      
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="p-2 w-full max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-black text-blue-950">Users Overview</h1>
          <p className="text-slate-500 font-medium mt-1">View and monitor registered store customers.</p>
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600"/>
            <span className="text-sm font-bold text-blue-800">Total Users: {users.length}</span>
        </div>
      </div>

      <Card className="rounded-3xl border border-slate-100 shadow-sm p-6 bg-white overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
            <thead>
                <tr className="text-slate-400 text-[10px] uppercase font-bold tracking-widest border-b border-slate-100">
                <th className="pb-4 px-4 whitespace-nowrap">Customer Info</th>
                <th className="pb-4 px-4 whitespace-nowrap">Contact Details</th>
                <th className="pb-4 px-4 whitespace-nowrap">Role</th>
                <th className="pb-4 px-4 text-right whitespace-nowrap">Joined Date</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
                {users.map((user) => {
                 
                  const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
                  
                  return (
                    <tr key={user._id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-black text-blue-600 uppercase">
                                    {user.firstName ? user.firstName.charAt(0) : <User className="w-5 h-5"/>}
                                </div>
                                <div>
                                    <div className="font-bold text-blue-950 text-sm">{fullName || "Unknown User"}</div>
                                    <div className="text-xs text-slate-400 font-medium mt-0.5">ID: {user._id?.slice(-6).toUpperCase()}</div>
                                </div>
                            </div>
                        </td>
                        
                        <td className="py-4 px-4">
                            <div className="flex items-center text-sm text-slate-600 font-medium">
                                <Mail className="w-4 h-4 mr-2 text-slate-400"/>
                                {user.email}
                            </div>
                        </td>
                        
                        <td className="py-4 px-4">
                            <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${user.role === 'admin' || user.role === 'manager' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>
                                {user.role === 'admin' || user.role === 'manager' ? <ShieldCheck className="w-3 h-3 mr-1"/> : null}
                                {user.role || "user"}
                            </div>
                        </td>

                        <td className="py-4 px-4 text-right">
                            <div className="text-sm font-bold text-slate-700">{formatDate(user.createdAt)}</div>
                        </td>
                    </tr>
                  );
                })}
            </tbody>
            </table>
        </div>
      </Card>
    </div>
  );
}