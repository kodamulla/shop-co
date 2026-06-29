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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HugeiconsIcon } from "@hugeicons/react"
import { 
  UserGroupIcon, 
  PackageIcon, 
  File01Icon, 
  Database01Icon, 
  Analytics01Icon,
  ChartHistogramIcon,
  MoreVerticalCircle01Icon, 
  UserCircle02Icon, 
  Logout01Icon 
} from "@hugeicons/core-free-icons"

// ඔයාගේ Data එක කිසිම වෙනසක් කරලා නෑ (ඔයා එවපු විදියටමයි)
const data = {
  user: {
    name: "Adithya Semina",
    email: "adithya@example.com",
    avatar: "/avatars/shadcn.jpg", 
  },
  navMain: [
    {
      title: "Manager Management",
      url: "/admindashboard/managers",
      icon: <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2} />,
    },
    {
      title: "User Management",
      url: "/admindashboard/users",
      icon: <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2} />,
    },
    {
      title: "Product Management",
      url: "/admindashboard/products",
      icon: <HugeiconsIcon icon={PackageIcon} strokeWidth={2} />,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "/admindashboard/data-library",
      icon: <HugeiconsIcon icon={Database01Icon} strokeWidth={2} />,
    },
    {
      name: "Reports",
      url: "/admindashboard/reports",
      icon: <HugeiconsIcon icon={Analytics01Icon} strokeWidth={2} />,
    },
    {
      name: "Word Assistant",
      url: "/admindashboard/word-assistant",
      icon: <HugeiconsIcon icon={File01Icon} strokeWidth={2} />,
    },
  ],
}

export function AppSidebar({ ...props }) {
  const { isMobile } = useSidebar()
  const location = useLocation() // දැනට ඉන්න පිටුව අඳුරගන්න

  return (
    <Sidebar collapsible="offcanvas" className="border-r border-slate-100 bg-white" {...props}>
      <SidebarHeader className="pt-8 pb-4 px-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-auto p-0 hover:bg-transparent active:bg-transparent">
              {/* Logo එකට අදාළ ලින්ක් එක හැදුවා */}
              <NavLink to="/admindashboard" className="flex items-center gap-3">
                <img 
                  src="/Logoicon.png" 
                  alt="Shop Co Logo" 
                  className="w-8 h-8 object-contain" 
                />
                <span className="text-2xl font-black tracking-tighter text-slate-950">ShopCo</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-4 mt-2">
        {/* NavMain */}
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-1.5">
            <SidebarMenu>
              <SidebarMenuItem>
                {/* Analytics එකට අදාළ ලින්ක් එක (NavLink) හැදුවා */}
                <SidebarMenuButton
                  asChild
                  className={`h-11 rounded-xl transition-all duration-300 ${
                    location.pathname === "/admindashboard" 
                      ? "bg-slate-700 text-white shadow-md hover:bg-slate-800 hover:text-white" 
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <NavLink to="/admindashboard" end className="flex items-center gap-3 px-3 w-full">
                    <HugeiconsIcon icon={ChartHistogramIcon} strokeWidth={2.5} className="w-5 h-5" />
                    <span className="text-sm font-semibold">Analytics</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            <div className="mt-6 mb-2 px-3 text-[10px] font-black text-slate-300 uppercase tracking-widest">
              Management
            </div>
            
            <SidebarMenu className="gap-1.5">
              {data.navMain.map((item) => {
                const isActive = location.pathname.startsWith(item.url)
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={`h-11 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? "bg-blue-50 text-blue-700 font-bold" 
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <NavLink to={item.url} className="flex items-center gap-3 px-3 w-full">
                        {item.icon}
                        <span className="text-sm font-semibold">{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* NavDocuments */}
        <SidebarGroup className="group-data-[collapsible=icon]:hidden mt-2">
          <SidebarGroupLabel className="px-3 text-[10px] font-black text-slate-300 uppercase tracking-widest">
            Documents
          </SidebarGroupLabel>
          <SidebarMenu className="gap-1.5 mt-2">
            {data.documents.map((item) => {
              const isActive = location.pathname.startsWith(item.url)
              return (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    asChild 
                    className={`h-11 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? "bg-blue-50 text-blue-700 font-bold" 
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <NavLink to={item.url} className="flex items-center gap-3 px-3 w-full">
                      {item.icon}
                      <span className="text-sm font-semibold">{item.name}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Modern Footer Profile Section */}
      <SidebarFooter className="p-4 mb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="rounded-2xl p-2 h-auto hover:bg-slate-50 transition-all data-[state=open]:bg-slate-50 border border-transparent hover:border-slate-100"
                >
                  <Avatar className="h-10 w-10 rounded-xl">
                    <AvatarImage src={data.user.avatar} alt={data.user.name} />
                    <AvatarFallback className="rounded-xl bg-slate-900 text-white font-bold">AS</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight ml-1">
                    <span className="truncate font-bold text-slate-950">{data.user.name}</span>
                    <span className="truncate text-[11px] font-semibold text-slate-400">
                      {data.user.email}
                    </span>
                  </div>
                  <HugeiconsIcon icon={MoreVerticalCircle01Icon} strokeWidth={2} className="ml-auto size-5 text-slate-300" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-60 rounded-2xl border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] p-2"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={12}
              >
                <DropdownMenuLabel className="p-2 font-normal">
                  <div className="flex items-center gap-3 text-left text-sm">
                    <Avatar className="h-10 w-10 rounded-xl">
                      <AvatarImage src={data.user.avatar} alt={data.user.name} />
                      <AvatarFallback className="rounded-xl bg-slate-900 text-white font-bold">AS</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-bold text-slate-950">{data.user.name}</span>
                      <span className="truncate text-[11px] font-semibold text-slate-400">
                        {data.user.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-100 my-2" />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="rounded-xl focus:bg-slate-50 cursor-pointer p-3 font-semibold text-slate-600">
                    <HugeiconsIcon icon={UserCircle02Icon} strokeWidth={2} className="mr-3 size-4" />
                    Account Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-slate-100 my-2" />
                <DropdownMenuItem className="rounded-xl focus:bg-red-50 focus:text-red-600 cursor-pointer p-3 font-semibold text-red-500 transition-colors">
                  <HugeiconsIcon icon={Logout01Icon} strokeWidth={2} className="mr-3 size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}