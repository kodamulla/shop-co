"use client"

import { NavLink, useLocation, useNavigate } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HugeiconsIcon } from "@hugeicons/react"
import { 
  UserGroupIcon, PackageIcon, 
  ChartHistogramIcon, UserCircle02Icon, 
  Logout01Icon, Ticket01Icon
} from "@hugeicons/core-free-icons"

export function AppSidebar({ ...props }) {
  const location = useLocation()
  const navigate = useNavigate();
  
  // User ගේ තොරතුරු සහ Role එක ලබා ගැනීම
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const role = storedUser.role || "admin"; 
  
  // URL සඳහා path එක තීරණය කිරීම (admin නම් admindashboard, නැත්නම් managerdashboard)
  const dashboardPath = role === 'admin' ? "admindashboard" : "managerdashboard";
  const settingsUrl = `/${dashboardPath}/settings`;

  const data = {
    user: {
      name: storedUser.firstName ? `${storedUser.firstName} ${storedUser.lastName}` : "Adithya Semina",
      email: storedUser.email || "adithya@example.com",
    },
    navMain: role === 'admin' 
      ? [
          { title: "Manager Management", url: "/admindashboard/managers", icon: <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2} /> },
          { title: "User Management", url: "/admindashboard/users", icon: <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2} /> },
          { title: "Product Management", url: "/admindashboard/products", icon: <HugeiconsIcon icon={PackageIcon} strokeWidth={2} /> },
          { title: "Coupon Management", url: "/admindashboard/coupons", icon: <HugeiconsIcon icon={Ticket01Icon} strokeWidth={2} /> },
        ]
      : [
          { title: "Products", url: "/managerdashboard/products", icon: <HugeiconsIcon icon={PackageIcon} strokeWidth={2} /> },
          { title: "Orders", url: "/managerdashboard/orders", icon: <HugeiconsIcon icon={ChartHistogramIcon} strokeWidth={2} /> },
        ]
  };

  // ලොග් අවුට් ෆන්ෂන් එක මෙතන තමයි තියෙන්නේ 👇
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/signin";
  };

  return (
    <Sidebar collapsible="offcanvas" className="border-r border-slate-100 bg-white shadow-sm" {...props}>
      <SidebarHeader className="pt-8 pb-4 px-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-auto p-0 hover:bg-transparent active:bg-transparent">
              <NavLink to={`/${dashboardPath}`} className="flex items-center gap-3">
                <img src="/Logoicon.png" alt="Shop Co Logo" className="w-8 h-8 object-contain" />
                <span className="text-2xl font-black tracking-tighter text-blue-950">ShopCo</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-4 mt-2">
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-1.5">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className={`h-11 rounded-xl transition-all duration-300 ${location.pathname === `/${dashboardPath}` ? "bg-blue-600 text-white" : "text-slate-500"}`}>
                  <NavLink to={`/${dashboardPath}`} end className="flex items-center gap-3 px-3 w-full">
                    <HugeiconsIcon icon={ChartHistogramIcon} strokeWidth={2.5} className="w-5 h-5" />
                    <span className="text-sm font-semibold">Analytics</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            <div className="mt-6 mb-2 px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Management</div>
            
            <SidebarMenu className="gap-1.5">
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={`h-11 rounded-xl transition-all ${location.pathname.startsWith(item.url) ? "bg-blue-50 text-blue-700 font-bold" : "text-slate-500 hover:bg-blue-50"}`}>
                    <NavLink to={item.url} className="flex items-center gap-3 px-3 w-full">
                      {item.icon} <span className="text-sm font-semibold">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 mb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="rounded-2xl p-2 hover:bg-blue-50">
                  <Avatar className="h-10 w-10 rounded-xl"><AvatarFallback className="bg-blue-600 text-white font-bold">AS</AvatarFallback></Avatar>
                  <div className="grid flex-1 text-left text-sm ml-1">
                    <span className="font-bold text-blue-950">{data.user.name}</span>
                    <span className="text-[11px] font-semibold text-slate-400">{data.user.email}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent className="w-60 rounded-2xl p-2" side="right" align="end">
                <DropdownMenuItem 
                  className="p-3 font-semibold text-slate-600 cursor-pointer"
                  onClick={() => navigate(`/${dashboardPath}/settings`)}
                >
                  <HugeiconsIcon icon={UserCircle02Icon} className="mr-3 size-4" /> 
                  Account Settings
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem 
                  className="p-3 font-semibold text-red-500 cursor-pointer"
                  onClick={handleLogout}
                >
                  <HugeiconsIcon icon={Logout01Icon} className="mr-3 size-4" /> 
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}