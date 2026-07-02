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
        
        <SidebarInset className="flex flex-col h-screen overflow-hidden">
          <SiteHeader />
          
          <main className="flex-1 overflow-y-auto p-4 md:p-6 w-full bg-muted/10">
            <div className="max-w-7xl mx-auto">
              <Outlet /> 
            </div>
          </main>
        </SidebarInset>
        
      </SidebarProvider>
    </TooltipProvider> 
  );
}