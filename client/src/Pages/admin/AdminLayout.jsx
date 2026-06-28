import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admindashboard/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Outlet } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function AdminLayout() {
  return (
    <TooltipProvider>
      <SidebarProvider
        style={{
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        }}
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <main className="p-4 md:p-6 flex flex-1 flex-col w-full bg-muted/10">
            {/* Anith admin pages load wenne me thulata */}
            <Outlet /> 
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}