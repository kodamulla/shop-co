import * as React from "react"
import {
  LayoutDashboard,
  Package,
  Users,
  ShieldAlert,
  Ticket
} from "lucide-react"

import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// 👇 ඔයාගේ Pages/admin ෆෝල්ඩර් එකේ තියෙන ඇත්තම ෆයිල්ස් වලට අදාළ paths විතරයි මෙතන තියෙන්නේ
const data = {
  user: {
    name: "Admin User",
    email: "admin@shopco.com",
    avatar: "/Logoicon.png",
  },
  navMain: [
    { 
      title: "Dashboard", 
      url: "/", // AdminDashboard.jsx එකට
      icon: LayoutDashboard, 
      isActive: true 
    },
    { 
      title: "Products", 
      url: "/admin/products", // ProductManagement.jsx එකට
      icon: Package 
    },
    { 
      title: "Users", 
      url: "/admin/users", // UserManagement.jsx එකට
      icon: Users 
    },
    { 
      title: "Managers", 
      url: "/admin/managers", // ManagerManagement.jsx එකට
      icon: ShieldAlert 
    },
    { 
      title: "Coupons", 
      url: "/admin/coupons", // AdminCouponsManagement.jsx එකට
      icon: Ticket 
    }
  ]
}

export function AppSidebar({ ...props }) {
  return (
    <Sidebar variant="inset" {...props}>
      
      {/* Header - Logo Section */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
                   <img src="/Logoicon.png" alt="ShopCo" className="w-5 h-5 object-contain filter invert" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight ml-1">
                  <span className="truncate font-black text-blue-950 text-base">Shop.co</span>
                  <span className="truncate text-xs font-semibold text-slate-500">Admin Portal</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      {/* Main Menu - Only the 5 clean items */}
      <SidebarContent className="mt-4">
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => {
              const Icon = item.icon; 
              
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive} tooltip={item.title}>
                    <a href={item.url} className="flex items-center gap-2">
                      {Icon && <Icon className="w-4 h-4" />}
                      <span className="font-semibold text-sm">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      {/* Footer - User Profile */}
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      
    </Sidebar>
  )
}