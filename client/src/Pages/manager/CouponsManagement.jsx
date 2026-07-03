import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Ticket, Plus, Trash2, Calendar, Percent, CheckCircle2, XCircle } from "lucide-react";

export default function CouponsManagement() {
  const [coupons, setCoupons] = useState([]);
  const [formData, setFormData] = useState({ code: '', discount: '', expiryDate: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchCoupons = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/coupons');
      setCoupons(res.data);
    } catch (err) {
      console.error("Error fetching coupons:", err);
    }
  };

  useEffect(() => { fetchCoupons(); }, []);

  const handleSave = async () => {
    try {
      if (!formData.code || !formData.discount || !formData.expiryDate) {
        alert("Please fill all fields!");
        return;
      }
      await axios.post('http://localhost:5000/api/coupons/create', formData);
      setFormData({ code: '', discount: '', expiryDate: '' });
      setIsDialogOpen(false);
      fetchCoupons();
    } catch (err) {
      console.error("Error saving coupon:", err);
      alert(err.response?.data?.message || "Error creating coupon");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      try {
        await axios.delete(`http://localhost:5000/api/coupons/${id}`);
        fetchCoupons();
      } catch (err) {
        console.error("Error deleting coupon:", err);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="p-2 w-full max-w-7xl mx-auto space-y-6 pb-12 flex flex-col h-full">
      
      {/* Top Header Section */}
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-2xl font-black text-blue-950">Coupons Management</h1>
          <p className="text-slate-500 font-medium mt-1">Create and manage store discount codes.</p>
        </div>
        
        <div className="bg-blue-50 px-5 py-2.5 rounded-xl border border-blue-100 flex items-center gap-2">
            <Ticket className="w-4 h-4 text-blue-600"/>
            <span className="text-sm font-bold text-blue-800">Total Coupons: {coupons.length}</span>
        </div>
      </div>

      {/* Coupons Table */}
      <Card className="rounded-3xl border border-slate-100 shadow-sm p-6 bg-white overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
            <thead>
                <tr className="text-slate-400 text-[10px] uppercase font-bold tracking-widest border-b border-slate-100">
                <th className="pb-4 px-4 whitespace-nowrap">Coupon Code</th>
                <th className="pb-4 px-4 whitespace-nowrap">Discount</th>
                <th className="pb-4 px-4 whitespace-nowrap">Expiry Date</th>
                <th className="pb-4 px-4 whitespace-nowrap">Status</th>
                <th className="pb-4 px-4 text-right whitespace-nowrap">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
                {coupons.map((coupon) => {
                  const isExpired = new Date(coupon.expiryDate) < new Date();
                  
                  return (
                    <tr key={coupon._id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="py-4 px-4">
                            <div className="inline-flex items-center gap-2 border-2 border-dashed border-blue-200 bg-blue-50 px-3 py-1.5 rounded-lg">
                                <Ticket className="w-4 h-4 text-blue-500"/>
                                <span className="font-black text-blue-700 tracking-wider text-sm">{coupon.code}</span>
                            </div>
                        </td>
                        
                        <td className="py-4 px-4">
                            <div className="flex items-center text-sm font-bold text-slate-700">
                                <Percent className="w-4 h-4 mr-1 text-slate-400"/>
                                {coupon.discount}% Off
                            </div>
                        </td>
                        
                        <td className="py-4 px-4">
                            <div className="flex items-center text-sm text-slate-600 font-medium">
                                <Calendar className="w-4 h-4 mr-2 text-slate-400"/>
                                {formatDate(coupon.expiryDate)}
                            </div>
                        </td>

                        <td className="py-4 px-4">
                            {isExpired ? (
                              <div className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700">
                                <XCircle className="w-3 h-3 mr-1"/> Expired
                              </div>
                            ) : (
                              <div className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700">
                                <CheckCircle2 className="w-3 h-3 mr-1"/> Active
                              </div>
                            )}
                        </td>

                        <td className="py-4 px-4 text-right">
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors" onClick={() => handleDelete(coupon._id)}>
                                <Trash2 className="w-4 h-4"/>
                            </Button>
                        </td>
                    </tr>
                  );
                })}
                {coupons.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-slate-400 font-medium">
                      No coupons found. Create your first discount code!
                    </td>
                  </tr>
                )}
            </tbody>
            </table>
        </div>
      </Card>

      <div className="flex justify-end mt-6 pt-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-full font-bold px-6 h-12 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <Plus className="w-5 h-5 mr-2"/> Add Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl p-8 border-slate-100">
            <DialogHeader><DialogTitle className="text-xl font-black text-blue-950">Create New Coupon</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Coupon Code</label>
                <Input 
                  className="rounded-xl mt-1 font-bold text-blue-950 uppercase" 
                  placeholder="e.g. SUMMER24" 
                  value={formData.code} 
                  onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})} 
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Discount Percentage (%)</label>
                <Input 
                  className="rounded-xl mt-1" 
                  type="number" 
                  placeholder="e.g. 15" 
                  value={formData.discount} 
                  onChange={(e) => setFormData({...formData, discount: e.target.value})} 
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Expiry Date</label>
                <Input 
                  className="rounded-xl mt-1" 
                  type="date" 
                  value={formData.expiryDate} 
                  onChange={(e) => setFormData({...formData, expiryDate: e.target.value})} 
                />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl font-bold py-6 mt-4" onClick={handleSave}>Create Coupon</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

    </div>
  );
}