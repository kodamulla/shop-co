import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, Edit } from "lucide-react";

export default function AccountSettings() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        // Backend එකෙන් අලුත්ම දත්ත ටික ගේන්න
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="p-8 w-full max-w-6xl mx-auto">
      <h1 className="text-3xl font-black text-blue-950 mb-8">Account Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="rounded-3xl border-slate-100 shadow-sm p-8 flex flex-col items-center text-center bg-white h-fit">
          <div className="h-28 w-28 rounded-full bg-blue-100 flex items-center justify-center text-4xl font-black text-blue-600 mb-6 shadow-inner">
            {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
          </div>
          <h2 className="text-2xl font-black text-blue-950">{user.firstName} {user.lastName}</h2>
          
          <div className="w-full mt-8 pt-6 border-t border-slate-100 space-y-4 text-left">
            <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
              <Mail className="w-4 h-4 text-slate-400"/> {user.email}
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
              <Phone className="w-4 h-4 text-slate-400"/> {user.phoneNumber || "0771234567"}
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-3xl border-slate-100 shadow-sm p-8 bg-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-blue-950">Personal Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">First Name</label>
                <Input className="rounded-xl mt-1.5 h-12 bg-slate-50 border-none" value={user.firstName || ""} disabled />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Last Name</label>
                <Input className="rounded-xl mt-1.5 h-12 bg-slate-50 border-none" value={user.lastName || ""} disabled />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}