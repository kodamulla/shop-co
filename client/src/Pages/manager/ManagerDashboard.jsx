import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HugeiconsIcon } from "@hugeicons/react";
import { ShoppingCart01Icon, PackageIcon, UserGroupIcon, Ticket01Icon } from "@hugeicons/core-free-icons";

import { RevenueAreaChart } from "@/components/revenue-area-chart";
import { TrafficLineChart } from "@/components/traffic-line-chart";
import { AbandonedCart } from "@/components/abandoned-cart";
import { AiTryOnStats } from "@/components/ai-tryon-stats";

const Sparkline = ({ color }) => (
  <svg className="w-16 h-8" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 25C15 25 20 10 35 15C50 20 55 5 70 10C85 15 90 25 100 20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const FashionCard = ({ title, subtitle, image, tag }) => (
  <div className="relative rounded-2xl overflow-hidden shadow-sm h-full min-h-[300px] border border-slate-100 group">
    <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>
    <div className="absolute bottom-0 left-0 p-6 w-full text-white z-10">
      <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest mb-3 inline-block">{tag}</span>
      <h3 className="text-2xl font-black leading-tight mb-1">{title}</h3>
      <p className="text-sm font-medium text-slate-300">{subtitle}</p>
    </div>
  </div>
);

export default function ManagerDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 32, coupons: 0 });
  const [dashboardData, setDashboardData] = useState({ weeklyAnalytics: [] });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const backendURL = "http://localhost:5000/api"; 
        
        const [productsRes, ordersRes, usersRes, couponsRes] = await Promise.all([
          axios.get(`${backendURL}/products`).catch(() => ({ data: [] })),
          axios.get(`${backendURL}/orders`).catch(() => ({ data: [] })),
          axios.get(`${backendURL}/users`).catch(() => ({ data: [] })),
          axios.get(`${backendURL}/coupons`).catch(() => ({ data: [] }))
        ]);

        setStats({
          products: productsRes.data.length || 0,
          orders: ordersRes.data.length || 0,
          users: Math.max(usersRes.data.length, 32), 
          coupons: couponsRes.data.length || 0
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchDashboardData();
  }, []);

  const topCards = [
    { title: "TODAY'S REVENUE", value: "$3,450.00", trend: "+14% vs yesterday", icon: <HugeiconsIcon icon={ShoppingCart01Icon} strokeWidth={2.5} className="w-5 h-5 text-blue-600"/>, color: "#3b82f6" },
    { title: "PENDING ORDERS", value: stats.orders, trend: "Requires attention", icon: <HugeiconsIcon icon={PackageIcon} strokeWidth={2.5} className="w-5 h-5 text-indigo-600"/>, color: "#6366f1" },
    { title: "ACTIVE USERS", value: stats.users, trend: "Live right now", icon: <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2.5} className="w-5 h-5 text-emerald-600"/>, color: "#10b981" },
    { title: "LOW STOCK ITEMS", value: "12", trend: "Needs restock", icon: <HugeiconsIcon icon={Ticket01Icon} strokeWidth={2.5} className="w-5 h-5 text-rose-600"/>, color: "#f43f5e" },
  ];

  return (
    // Fixed container structure
    <div className="p-4 w-full max-w-7xl mx-auto h-[88vh] min-h-[600px] flex flex-col">
      
      {/* FIXED HEADER */}
      <div className="shrink-0 pb-4 pt-2 mb-4 border-b border-slate-200">
        <h1 className="text-2xl font-black tracking-tight text-slate-800">Store Manager Hub</h1>
        <p className="text-sm font-semibold text-slate-500 mt-1">Manage daily operations, inventory, and live campaigns.</p>
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto pr-2 pb-4 space-y-6">
        
        {/* 1. Top Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topCards.map((card, index) => (
            <div key={index} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-slate-50 rounded-lg">{card.icon}</div>
                  <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">{card.title}</p>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-3xl font-black text-slate-800">{card.value}</h3>
                  <p className="text-xs font-bold text-slate-400 mt-1">{card.trend}</p>
                </div>
                <Sparkline color={card.color} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-1">
            <FashionCard 
              title="Summer Collection '26" 
              subtitle="Live Campaign Performance" 
              image="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800" 
              tag="Trending Now" 
            />
          </div>
          <div className="lg:col-span-1 h-full min-h-[300px] bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <AiTryOnStats />
          </div>
          <div className="lg:col-span-1 h-full min-h-[300px]">
            <AbandonedCart />
          </div>
        </div>

        {/* 3. Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pb-10">
          <div className="lg:col-span-7 min-h-[350px] bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <RevenueAreaChart />
          </div>
          <div className="lg:col-span-5 min-h-[350px] bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <TrafficLineChart data={dashboardData.weeklyAnalytics} />
          </div>
        </div>

      </div>
    </div>
  );
}