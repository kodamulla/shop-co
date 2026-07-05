import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from "@/components/ui/card";
import { Users, Mail, ShieldCheck, User, Search } from "lucide-react"; // Search එක import කරා
import { Input } from "@/components/ui/input";

export default function UsersView() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search State එක

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
      
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get('http://localhost:5000/api/users', config);
      const sortedUsers = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setUsers(sortedUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  // Search Logic: නම හෝ email එක හරහා පෙරීම
  const filteredUsers = users.filter((u) => {
    const query = searchQuery.toLowerCase();
    const fullName = `${u.firstName || ''} ${u.lastName || ''}`.toLowerCase();
    const email = (u.email || '').toLowerCase();
    return fullName.includes(query) || email.includes(query);
  });

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="p-4 w-full max-w-7xl mx-auto h-[88vh] min-h-[600px] flex flex-col">
      
      {/* HEADER SECTION */}
      <div className="shrink-0 pb-4 pt-2 mb-4 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-blue-950">Users Overview</h1>
          <p className="text-slate-500 font-medium mt-1">View and monitor registered store customers.</p>
        </div>

        <div className="flex items-center gap-4">
            {/* ලස්සන Search Bar එක */}
            <div className="relative w-80 group">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <Input 
                placeholder="Search by name or email..." 
                className="pl-11 py-6 rounded-2xl bg-white border-slate-200 shadow-sm focus:border-blue-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="bg-blue-50 px-4 py-3 rounded-2xl border border-blue-100 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600"/>
                <span className="text-sm font-bold text-blue-800">Total: {filteredUsers.length}</span>
            </div>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="flex-1 overflow-y-auto pr-2 pb-4">
        <Card className="rounded-3xl border border-slate-100 shadow-sm p-6 bg-white overflow-hidden min-w-[800px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-400 text-[10px] uppercase font-bold tracking-widest border-b border-slate-100">
                <th className="pb-4 px-4">Customer Info</th>
                <th className="pb-4 px-4">Contact Details</th>
                <th className="pb-4 px-4">Role</th>
                <th className="pb-4 px-4 text-right">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => {
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
                  })
                ) : (
                  <tr><td colSpan="4" className="text-center py-10 text-slate-400">No users found matching your search.</td></tr>
                )}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}