import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Eye, Package, Truck, CheckCircle2, XCircle, Calendar, MapPin, ShoppingBag, Search } from "lucide-react";

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders');
      const sortedOrders = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sortedOrders);
    } catch (err) { console.error("Error fetching orders:", err); }
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}/status`, { status });
      fetchOrders(); // Status එක වෙනස් උනාම Table එක Refresh වෙනවා
    } catch (err) { console.error("Error updating status:", err); }
  };

  const filteredOrders = orders.filter((o) => {
    const query = searchQuery.toLowerCase();
    const orderId = o._id ? o._id.toLowerCase() : "";
    const customerName = o.user?.name ? o.user.name.toLowerCase() : "";
    return orderId.includes(query) || customerName.includes(query);
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Processing': return { bg: 'bg-orange-100', text: 'text-orange-700', icon: <Package className="w-3 h-3 mr-1"/> };
      case 'Shipped': return { bg: 'bg-blue-100', text: 'text-blue-700', icon: <Truck className="w-3 h-3 mr-1"/> };
      case 'Delivered': return { bg: 'bg-green-100', text: 'text-green-700', icon: <CheckCircle2 className="w-3 h-3 mr-1"/> };
      case 'Cancelled': return { bg: 'bg-red-100', text: 'text-red-700', icon: <XCircle className="w-3 h-3 mr-1"/> };
      default: return { bg: 'bg-slate-100', text: 'text-slate-700', icon: null };
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="p-4 w-full max-w-7xl mx-auto h-[88vh] min-h-[600px] flex flex-col">
      <div className="shrink-0 pb-4 pt-2 mb-4 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-blue-950">Orders Management</h1>
          <p className="text-slate-500 font-medium mt-1">Track, update, and manage customer orders.</p>
        </div>
        
        <div className="flex items-center gap-4">
           
            <div className="relative w-80 group">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <Input 
                placeholder="Search by id..." 
                className="pl-11 py-6 rounded-2xl bg-white border-slate-200 shadow-sm focus:border-blue-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="bg-blue-50 px-5 py-3 rounded-2xl border border-blue-100">
                <span className="text-sm font-bold text-blue-800">Total: {orders.length}</span>
            </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-4">
        <Card className="rounded-3xl border border-slate-100 shadow-sm p-6 bg-white min-w-[800px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-400 text-[10px] uppercase font-bold tracking-widest border-b border-slate-100">
                <th className="pb-4 px-4">Order Info</th>
                <th className="pb-4 px-4">Customer</th>
                <th className="pb-4 px-4">Status</th>
                <th className="pb-4 px-4">Total</th>
                <th className="pb-4 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredOrders.length > 0 ? filteredOrders.map((order) => {
                const statusStyle = getStatusStyle(order.status);
                return (
                  <tr key={order._id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-black text-blue-950 text-sm">#{order._id.slice(-6).toUpperCase()}</div>
                      <div className="text-xs text-slate-400 font-medium">{formatDate(order.createdAt)}</div>
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-800">{order.user?.name || "Guest User"}</td>
                    <td className="py-4 px-4">
                      <Select defaultValue={order.status} onValueChange={(value) => updateStatus(order._id, value)}>
                        <SelectTrigger className={`w-32 h-8 rounded-full font-bold text-xs border-none ${statusStyle.bg} ${statusStyle.text}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl">
                          <SelectItem value="Processing">Processing</SelectItem>
                          <SelectItem value="Shipped">Shipped</SelectItem>
                          <SelectItem value="Delivered">Delivered</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-4 px-4 font-black text-blue-600">${order.totalPrice.toFixed(2)}</td>
                    <td className="py-4 px-4 text-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-blue-600 font-semibold" onClick={() => setSelectedOrder(order)}><Eye className="w-4 h-4 mr-2"/> View</Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-3xl max-w-lg">
                           <DialogHeader><DialogTitle>Order Details #{selectedOrder?._id.slice(-6).toUpperCase()}</DialogTitle></DialogHeader>
                           {/* Details එක මෙතන පෙන්නන්න */}
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                );
              }) : (
                <tr><td colSpan="5" className="text-center py-10 text-slate-400">No orders found.</td></tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}