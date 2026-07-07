import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Eye, Package, Truck, CheckCircle2, XCircle, Calendar, MapPin, ShoppingBag, Search, CreditCard, User } from "lucide-react";
import { ModernAlert } from "@/components/ui/ModernAlert"; 

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [alertConfig, setAlertConfig] = useState({
    isOpen: false, type: "success", title: "", message: "", showCancel: false, confirmText: "OK", onConfirm: null
  });

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
      fetchOrders(); 
      
      setAlertConfig({
        isOpen: true, type: "success", title: "Status Updated!",
        message: `Order status has been changed to ${status}.`,
        showCancel: false, confirmText: "OK", onConfirm: () => setAlertConfig(prev => ({ ...prev, isOpen: false }))
      });

    } catch (err) { 
      console.error("Error updating status:", err); 
      
      setAlertConfig({
        isOpen: true, type: "error", title: "Error!",
        message: "Failed to update order status.",
        showCancel: false, confirmText: "Try Again", onConfirm: () => setAlertConfig(prev => ({ ...prev, isOpen: false }))
      });
    }
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
                placeholder="Search by ID or Customer..." 
                className="pl-11 py-6 rounded-2xl bg-white border-slate-200 shadow-sm focus:border-blue-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="bg-blue-50 px-5 py-3 rounded-2xl border border-blue-100 shadow-sm">
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
                      <div className="text-xs text-slate-400 font-medium mt-0.5">{formatDate(order.createdAt)}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-800 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                           <User className="w-3 h-3 text-slate-500"/>
                        </div>
                        {order.user?.name || "Guest User"}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Select defaultValue={order.status} onValueChange={(value) => updateStatus(order._id, value)}>
                        <SelectTrigger className={`w-36 h-9 rounded-full font-bold text-xs border-none shadow-sm ${statusStyle.bg} ${statusStyle.text}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl">
                          <SelectItem value="Processing"><span className="flex items-center"><Package className="w-3 h-3 mr-2"/>Processing</span></SelectItem>
                          <SelectItem value="Shipped"><span className="flex items-center"><Truck className="w-3 h-3 mr-2"/>Shipped</span></SelectItem>
                          <SelectItem value="Delivered"><span className="flex items-center"><CheckCircle2 className="w-3 h-3 mr-2"/>Delivered</span></SelectItem>
                          <SelectItem value="Cancelled"><span className="flex items-center"><XCircle className="w-3 h-3 mr-2"/>Cancelled</span></SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-4 px-4 font-black text-blue-600 text-base">${order.totalPrice?.toFixed(2)}</td>
                    <td className="py-4 px-4 text-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-blue-600 font-bold hover:bg-blue-50 rounded-xl px-4" onClick={() => setSelectedOrder(order)}>
                            <Eye className="w-4 h-4 mr-2"/> View Details
                          </Button>
                        </DialogTrigger>
                        
                        {/* 👈 ලස්සන කරපු Order Details Card එක */}
                        <DialogContent className="rounded-[2rem] max-w-2xl p-0 overflow-hidden border-none shadow-2xl">
                           
                           {/* Header Section */}
                           <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white relative">
                             <div className="absolute top-0 right-0 p-8 opacity-10">
                               <ShoppingBag className="w-32 h-32"/>
                             </div>
                             <DialogHeader>
                               <DialogTitle className="text-2xl font-black text-white flex items-center gap-3">
                                 Order Summary
                                 <span className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                                   #{selectedOrder?._id.slice(-6).toUpperCase()}
                                 </span>
                               </DialogTitle>
                             </DialogHeader>
                             {selectedOrder && (
                               <div className="mt-4 flex items-center gap-4 text-blue-100 text-sm font-medium">
                                 <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4"/> {formatDate(selectedOrder.createdAt)}</span>
                                 <span className="w-1.5 h-1.5 rounded-full bg-blue-300"></span>
                                 <span className="flex items-center gap-1.5"><User className="w-4 h-4"/> {selectedOrder.user?.name || "Guest"}</span>
                               </div>
                             )}
                           </div>
                           
                           {selectedOrder && (
                             <div className="p-8 bg-slate-50">
                               
                               {/* Info Cards */}
                               <div className="grid grid-cols-2 gap-4 text-sm mb-8">
                                 <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                                   <h3 className="font-black text-slate-800 mb-3 flex items-center gap-2 text-base">
                                     <MapPin className="w-5 h-5 text-blue-500"/> Shipping Address
                                   </h3>
                                   <div className="text-slate-500 space-y-1 font-medium leading-relaxed">
                                     <p className="text-slate-800 font-bold">{selectedOrder.user?.name || "Customer"}</p>
                                     <p>{selectedOrder.shippingAddress?.address || 'N/A'}</p>
                                     <p>{selectedOrder.shippingAddress?.city || 'N/A'}, {selectedOrder.shippingAddress?.postalCode || ''}</p>
                                     <p>{selectedOrder.shippingAddress?.country || 'N/A'}</p>
                                   </div>
                                 </div>
                                 <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                                   <h3 className="font-black text-slate-800 mb-3 flex items-center gap-2 text-base">
                                     <CreditCard className="w-5 h-5 text-blue-500"/> Order Status
                                   </h3>
                                   <div className="space-y-3 font-medium">
                                     <div className="flex justify-between items-center">
                                       <span className="text-slate-500">Payment Method:</span>
                                       <span className="text-slate-800 font-bold bg-slate-100 px-2.5 py-1 rounded-md">{selectedOrder.paymentMethod || 'N/A'}</span>
                                     </div>
                                     <div className="flex justify-between items-center">
                                       <span className="text-slate-500">Payment Status:</span>
                                       <span className={`font-bold px-2.5 py-1 rounded-md ${selectedOrder.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                         {selectedOrder.isPaid ? 'Paid' : 'Pending'}
                                       </span>
                                     </div>
                                     <div className="flex justify-between items-center">
                                       <span className="text-slate-500">Delivery Status:</span>
                                       <span className="text-slate-800 font-bold bg-slate-100 px-2.5 py-1 rounded-md">{selectedOrder.status}</span>
                                     </div>
                                   </div>
                                 </div>
                               </div>

                               {/* Items List */}
                               <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                                 <div className="px-5 py-4 bg-slate-50/50 border-b border-slate-100 font-black text-slate-800 flex justify-between items-center">
                                   <span>Purchased Items ({selectedOrder.orderItems?.length || 0})</span>
                                 </div>
                                 <div className="p-5 space-y-4 max-h-[35vh] overflow-y-auto">
                                   {selectedOrder.orderItems?.map((item, index) => (
                                     <div key={index} className="flex items-center gap-4 group">
                                       <div className="w-16 h-16 rounded-xl bg-slate-50 overflow-hidden shrink-0 border border-slate-100 group-hover:border-blue-200 transition-colors">
                                         {/* 👈 Image URL එක Backend එකෙන් හරියටම ගන්නවා */}
                                         <img 
                                           src={item.image && item.image.startsWith('/uploads') ? `http://localhost:5000${item.image}` : (item.image || "/Logoicon.png")} 
                                           alt={item.name} 
                                           className="w-full h-full object-cover" 
                                           onError={(e) => { e.target.src = "/Logoicon.png" }}
                                         />
                                       </div>
                                       <div className="flex-1">
                                         <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{item.name}</h4>
                                         <p className="text-sm text-slate-500 mt-0.5 font-medium">Qty: {item.qty} × ${item.price?.toFixed(2)}</p>
                                       </div>
                                       <div className="font-black text-slate-800 text-lg">
                                         ${(item.qty * item.price).toFixed(2)}
                                       </div>
                                     </div>
                                   ))}
                                 </div>
                                 
                                 {/* Total Footer */}
                                 <div className="p-6 bg-slate-800 text-white flex justify-between items-center mt-2">
                                   <span className="font-bold text-slate-300 uppercase tracking-widest text-sm">Total Amount</span>
                                   <span className="text-3xl font-black text-white flex items-center gap-1">
                                     <span className="text-blue-400 text-xl">$</span>{selectedOrder.totalPrice?.toFixed(2)}
                                   </span>
                                 </div>
                               </div>

                             </div>
                           )}

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