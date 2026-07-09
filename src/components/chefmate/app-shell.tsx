import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FileText,
  Mail,
  CalendarClock,
  Search,
  Wrench,
  BookOpen,
  HelpCircle,
  ShieldCheck,
  ChefHat,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

const nav = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Proposals", url: "/proposals", icon: FileText },
  { title: "Emails", url: "/emails", icon: Mail },
  { title: "Event Planner", url: "/planner", icon: CalendarClock },
  { title: "Research", url: "/research", icon: Search },
  { title: "Productivity Toolkit", url: "/toolkit", icon: Wrench },
  { title: "Prompt Library", url: "/prompts", icon: BookOpen },
] as const;

const secondary = [
  { title: "Help", url: "/help", icon: HelpCircle },
  { title: "Responsible AI", url: "/responsible-ai", icon: ShieldCheck },
] as const;

function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (url: string) => (url === "/" ? pathname === "/" : pathname.startsWith(url));

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link to="/" className="flex items-center gap-2 px-2 py-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground shadow-sm">
            <ChefHat className="h-5 w-5" />
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <div className="truncate font-display text-base font-bold text-sidebar-foreground">
              ChefMate AI
            </div>
            <div className="truncate text-[11px] text-sidebar-foreground/70">
              Hospitality productivity
            </div>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondary.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset>
          <header className="no-print sticky top-0 z-20 flex h-14 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur">
            <SidebarTrigger />
            <div className="text-sm text-muted-foreground">
              ChefMate AI · No login · Nothing saved to a server
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="no-print border-t px-6 py-4 text-xs text-muted-foreground">
            ChefMate AI assists with drafting. Always review AI-generated content for accuracy,
            pricing, and legal suitability before business use.
          </footer>
        </SidebarInset>
      </div>
      <Toaster position="top-right" richColors />
    </SidebarProvider>
  );
}