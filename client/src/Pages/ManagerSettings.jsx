import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail, Phone, Edit, User as UserIcon } from "lucide-react";

export default function ManagerSettings() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: ""
  });

  useEffect(() => {
    const fetchManagerData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Backend එකෙන් ඇත්තටම එන්නේ මේ ටික:", res.data);
        // Backend එකෙන් කෙලින්ම එන්නේ User object එක නිසා, මේක හරියටම පේනවා
        setUser(res.data);
      } catch (err) {
        console.error("Error loading manager settings:", err);
      }
    };
    fetchManagerData();
  }, []);

  return (
    <div className="p-8 w-full max-w-6xl mx-auto">
      <h1 className="text-3xl font-black text-blue-950 mb-8">Manager Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <Card className="rounded-3xl border-slate-100 shadow-sm p-8 flex flex-col items-center text-center bg-white h-fit">
          <div className="h-28 w-28 rounded-full bg-blue-100 flex items-center justify-center text-4xl font-black text-blue-600 mb-6">
            {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
          </div>
          <h2 className="text-2xl font-black text-blue-950">{user.firstName} {user.lastName}</h2>
          
          <div className="w-full mt-8 pt-6 border-t border-slate-100 space-y-4 text-left">
            <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
              <Mail className="w-4 h-4 text-slate-400"/> {user.email}
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
              <Phone className="w-4 h-4 text-slate-400"/> {user.phoneNumber || "0770000000"}
            </div>
          </div>
        </Card>

        {/* Form */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-3xl border-slate-100 shadow-sm p-8 bg-white">
            <h3 className="text-lg font-black text-blue-950 mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">First Name</label>
                <Input className="rounded-xl mt-1.5 h-12 bg-slate-50" value={user.firstName || ""} disabled />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Last Name</label>
                <Input className="rounded-xl mt-1.5 h-12 bg-slate-50" value={user.lastName || ""} disabled />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}