import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Package, Truck, CheckCircle2, XCircle, Calendar, MapPin, ShoppingBag } from "lucide-react";

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders');
     
      const sortedOrders = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sortedOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}/status`, { status });
      fetchOrders();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  
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
    <div className="p-2 w-full max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-black text-blue-950">Orders Management</h1>
          <p className="text-slate-500 font-medium mt-1">Track, update, and manage customer orders.</p>
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
            <span className="text-sm font-bold text-blue-800">Total Orders: {orders.length}</span>
        </div>
      </div>

      <Card className="rounded-3xl border border-slate-100 shadow-sm p-6 bg-white overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
            <thead>
                <tr className="text-slate-400 text-[10px] uppercase font-bold tracking-widest border-b border-slate-100">
                <th className="pb-4 px-4 whitespace-nowrap">Order Info</th>
                <th className="pb-4 px-4 whitespace-nowrap">Customer</th>
                <th className="pb-4 px-4 whitespace-nowrap">Status</th>
                <th className="pb-4 px-4 whitespace-nowrap">Total Price</th>
                <th className="pb-4 px-4 text-right whitespace-nowrap">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
                {orders.map((order) => {
                const statusStyle = getStatusStyle(order.status);
                return (
                <tr key={order._id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="py-4 px-4">
                        <div className="font-black text-blue-950 text-sm">#{order._id.slice(-6).toUpperCase()}</div>
                        <div className="flex items-center text-xs text-slate-400 font-medium mt-1">
                            <Calendar className="w-3 h-3 mr-1"/> {formatDate(order.createdAt)}
                        </div>
                    </td>
                    
                    <td className="py-4 px-4">
                        <div className="font-bold text-slate-800 text-sm">{order.user?.name || "Guest User"}</div>
                        <div className="text-xs text-slate-500">{order.user?.email || "No email provided"}</div>
                    </td>
                    
                    <td className="py-4 px-4">
                        <Select defaultValue={order.status} onValueChange={(value) => updateStatus(order._id, value)}>
                            <SelectTrigger className={`w-[140px] h-8 rounded-full font-bold text-xs border-none ${statusStyle.bg} ${statusStyle.text} focus:ring-0 focus:ring-offset-0`}>
                                <div className="flex items-center">
                                    {statusStyle.icon}
                                    <SelectValue />
                                </div>
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-slate-100 shadow-xl font-medium text-sm">
                                <SelectItem value="Processing">Processing</SelectItem>
                                <SelectItem value="Shipped">Shipped</SelectItem>
                                <SelectItem value="Delivered">Delivered</SelectItem>
                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </td>

                    <td className="py-4 px-4">
                        <div className="font-black text-blue-600 text-base">${order.totalPrice.toFixed(2)}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">{order.orderItems.length} Items</div>
                    </td>
                    
                    <td className="py-4 px-4 text-right">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="rounded-xl font-bold text-blue-600 border-blue-100 hover:bg-blue-50" onClick={() => setSelectedOrder(order)}>
                                    <Eye className="w-4 h-4 mr-2"/> View Details
                                </Button>
                            </DialogTrigger>
                            
                          
                            <DialogContent className="rounded-3xl p-0 border-slate-100 max-w-2xl overflow-hidden">
                                <div className="bg-blue-950 p-6 text-white flex justify-between items-center">
                                    <div>
                                        <DialogTitle className="text-xl font-black">Order #{selectedOrder?._id.slice(-6).toUpperCase()}</DialogTitle>
                                        <p className="text-blue-300 text-sm font-medium mt-1">{formatDate(selectedOrder?.createdAt)}</p>
                                    </div>
                                    <div className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center ${selectedOrder?.status === 'Processing' ? 'bg-orange-500 text-white' : selectedOrder?.status === 'Delivered' ? 'bg-green-500 text-white' : selectedOrder?.status === 'Cancelled' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}>
                                        {selectedOrder?.status}
                                    </div>
                                </div>
                                
                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center mb-3"><ShoppingBag className="w-4 h-4 mr-2"/> Items Ordered</h3>
                                            <div className="space-y-3">
                                                {selectedOrder?.orderItems.map((item, idx) => (
                                                    <div key={idx} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                                                        <div>
                                                            <p className="font-bold text-blue-950 text-sm line-clamp-1">{item.name}</p>
                                                            <p className="text-xs text-slate-500 font-medium">Qty: {item.qty} × ${item.price.toFixed(2)}</p>
                                                        </div>
                                                        <p className="font-black text-blue-600">${(item.qty * item.price).toFixed(2)}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center mb-3"><MapPin className="w-4 h-4 mr-2"/> Shipping Info</h3>
                                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm text-slate-700 font-medium">
                                                <p className="font-bold text-blue-950 mb-1">{selectedOrder?.user?.name || "Guest"}</p>
                                                <p>{selectedOrder?.shippingAddress?.address}</p>
                                                <p>{selectedOrder?.shippingAddress?.city}</p>
                                                <p>Postal Code: {selectedOrder?.shippingAddress?.postalCode}</p>
                                            </div>
                                        </div>

                                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                            <div className="flex justify-between items-center">
                                                <span className="font-bold text-blue-900">Total Amount</span>
                                                <span className="text-xl font-black text-blue-600">${selectedOrder?.totalPrice.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </td>
                </tr>
                )})}
            </tbody>
            </table>
        </div>
      </Card>
    </div>
  );
}