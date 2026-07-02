"use client"

import { NavLink, useLocation } from "react-router-dom"
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
  SidebarGroupLabel,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HugeiconsIcon } from "@hugeicons/react"
import { 
  UserGroupIcon, PackageIcon, File01Icon, Database01Icon, 
  Analytics01Icon, ChartHistogramIcon, MoreVerticalCircle01Icon, 
  UserCircle02Icon, Logout01Icon 
} from "@hugeicons/core-free-icons"

const data = {
  user: {
    name: "Adithya Semina",
    email: "adithya@example.com",
    avatar: "/avatars/shadcn.jpg", 
  },
  navMain: [
    { title: "Manager Management", url: "/admindashboard/managers", icon: <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2} /> },
    { title: "User Management", url: "/admindashboard/users", icon: <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2} /> },
    { title: "Product Management", url: "/admindashboard/products", icon: <HugeiconsIcon icon={PackageIcon} strokeWidth={2} /> },
  ],
  documents: [
    { name: "Data Library", url: "/admindashboard/documents?tab=data", icon: <HugeiconsIcon icon={Database01Icon} strokeWidth={2} /> },
    { name: "Reports", url: "/admindashboard/documents?tab=reports", icon: <HugeiconsIcon icon={Analytics01Icon} strokeWidth={2} /> },
    { name: "Word Assistant", url: "/admindashboard/documents?tab=assistant", icon: <HugeiconsIcon icon={File01Icon} strokeWidth={2} /> },
  ],
}

export function AppSidebar({ ...props }) {
  const { isMobile } = useSidebar()
  const location = useLocation()

  return (
    <Sidebar collapsible="offcanvas" className="border-r border-slate-100 bg-white shadow-sm" {...props}>
      <SidebarHeader className="pt-8 pb-4 px-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-auto p-0 hover:bg-transparent active:bg-transparent">
              <NavLink to="/admindashboard" className="flex items-center gap-3">
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
                <SidebarMenuButton
                  asChild
                  className={`h-11 rounded-xl transition-all duration-300 ${
                    location.pathname === "/admindashboard" 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:text-white" 
                      : "text-slate-500 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  <NavLink to="/admindashboard" end className="flex items-center gap-3 px-3 w-full">
                    <HugeiconsIcon icon={ChartHistogramIcon} strokeWidth={2.5} className="w-5 h-5" />
                    <span className="text-sm font-semibold">Analytics</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            <div className="mt-6 mb-2 px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Management</div>
            
            <SidebarMenu className="gap-1.5">
              {data.navMain.map((item) => {
                const isActive = location.pathname.startsWith(item.url)
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className={`h-11 rounded-xl transition-all duration-300 ${isActive ? "bg-blue-50 text-blue-700 font-bold" : "text-slate-500 hover:bg-blue-50 hover:text-blue-700"}`}>
                      <NavLink to={item.url} className="flex items-center gap-3 px-3 w-full">
                        {item.icon} <span className="text-sm font-semibold">{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="group-data-[collapsible=icon]:hidden mt-2">
          <SidebarGroupLabel className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Documents</SidebarGroupLabel>
          <SidebarMenu className="gap-1.5 mt-2">
            {data.documents.map((item) => {
              const isActive = location.pathname + location.search === item.url
              return (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild className={`h-11 rounded-xl transition-all duration-300 ${isActive ? "bg-blue-50 text-blue-700 font-bold" : "text-slate-500 hover:bg-blue-50 hover:text-blue-700"}`}>
                    <NavLink to={item.url} className="flex items-center gap-3 px-3 w-full">
                      {item.icon} <span className="text-sm font-semibold">{item.name}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 mb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="rounded-2xl p-2 h-auto hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100">
                  <Avatar className="h-10 w-10 rounded-xl"><AvatarImage src={data.user.avatar} /><AvatarFallback className="bg-blue-600 text-white font-bold">AS</AvatarFallback></Avatar>
                  <div className="grid flex-1 text-left text-sm ml-1">
                    <span className="font-bold text-blue-950">{data.user.name}</span>
                    <span className="text-[11px] font-semibold text-slate-400">{data.user.email}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-60 rounded-2xl p-2" side="right" align="end">
                <DropdownMenuItem className="p-3 font-semibold text-slate-600"><HugeiconsIcon icon={UserCircle02Icon} className="mr-3 size-4" /> Account Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-3 font-semibold text-red-500"><HugeiconsIcon icon={Logout01Icon} className="mr-3 size-4" /> Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}