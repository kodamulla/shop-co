import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Ticket, Plus, Trash2, Calendar, Percent, CheckCircle2, XCircle, Tag } from "lucide-react";

export default function CouponManagement() {
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
    <div className="p-4 w-full max-w-7xl mx-auto h-[88vh] min-h-[600px] flex flex-col">
      
      {/* FIXED HEADER */}
      <div className="shrink-0 pb-4 pt-2 mb-4 border-b border-slate-200">
        <h1 className="text-3xl font-black text-blue-950 flex items-center gap-2">
          <Tag className="w-8 h-8 text-blue-600"/>
          Coupon Management
        </h1>
        <p className="text-slate-500 font-medium mt-1">Create and manage store discount codes for customers.</p>
      </div>

      {/* SCROLLABLE TABLE */}
      <div className="flex-1 overflow-y-auto pr-2 pb-4">
        <Card className="rounded-3xl border border-slate-100 shadow-sm p-6 bg-white min-w-[800px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-400 text-xs uppercase tracking-widest font-bold border-b border-slate-100">
                <th className="pb-4 px-4 whitespace-nowrap">Coupon Code</th>
                <th className="pb-4 px-4 whitespace-nowrap">Discount</th>
                <th className="pb-4 px-4 whitespace-nowrap">Expiry Date</th>
                <th className="pb-4 px-4 whitespace-nowrap">Status</th>
                <th className="pb-4 px-4 text-center whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {coupons.map((coupon) => {
                const isExpired = new Date(coupon.expiryDate) < new Date();
                return (
                  <tr key={coupon._id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-4 px-4">
                      <div className="inline-flex items-center gap-2 border-2 border-dashed border-blue-200 bg-blue-50 px-3 py-1.5 rounded-lg">
                        <Ticket className="w-4 h-4 text-blue-500"/>
                        <span className="font-black text-blue-700 tracking-wider text-sm">{coupon.code}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-700">{coupon.discount}% Off</td>
                    <td className="py-4 px-4 text-slate-500 font-medium">{formatDate(coupon.expiryDate)}</td>
                    <td className="py-4 px-4">
                      {isExpired ? (
                        <span className="text-red-600 font-bold text-xs flex items-center bg-red-50 px-2 py-1 rounded-md w-fit"><XCircle className="w-3 h-3 mr-1"/> Expired</span>
                      ) : (
                        <span className="text-emerald-600 font-bold text-xs flex items-center bg-emerald-50 px-2 py-1 rounded-md w-fit"><CheckCircle2 className="w-3 h-3 mr-1"/> Active</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center">
                        <Button variant="ghost" size="sm" className="text-red-500 font-semibold hover:bg-red-50" onClick={() => handleDelete(coupon._id)}>
                          <Trash2 className="w-4 h-4 mr-1"/> Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>

      {/* FIXED FOOTER (Add Button) */}
      <div className="shrink-0 pt-4 flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-full font-bold px-6 h-12 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <Plus className="w-5 h-5 mr-2"/> Add New Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl p-8 border-slate-100">
            <DialogHeader><DialogTitle className="text-xl font-black text-blue-950">Create New Coupon</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Coupon Code</label>
                <Input className="rounded-xl mt-1" placeholder="e.g. SUMMER24" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})} />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Discount (%)</label>
                <Input className="rounded-xl mt-1" type="number" placeholder="e.g. 20" value={formData.discount} onChange={(e) => setFormData({...formData, discount: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Expiry Date</label>
                <Input className="rounded-xl mt-1" type="date" value={formData.expiryDate} onChange={(e) => setFormData({...formData, expiryDate: e.target.value})} />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl font-bold py-6 mt-4" onClick={handleSave}>Create Coupon</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}