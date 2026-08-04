import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  MoonStar,
  Search,
  ShieldCheck,
  SunMedium,
} from "lucide-react";
import { useMemo, useState, type PropsWithChildren } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { adminNavGroups, adminRoleDescriptions, adminRouteLabels, canAccessModule, getQuickStatsBadge } from "@/admin/config";
import { useAdminStore } from "@/admin/store";
import type { AdminModuleId, ContentType } from "@/admin/types";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/routes/routeConfig.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

const routeByContentType: Record<ContentType, string> = {
  Page: ROUTES.adminPages,
  Blog: ROUTES.adminBlogs,
  "Learn Resource": ROUTES.adminLearn,
  "Compliance Guide": ROUTES.adminCompliance,
  FAQ: ROUTES.adminFaqs,
};

type SearchHit = {
  id: string;
  label: string;
  meta: string;
  to: string;
};

function buildBreadcrumbs(pathname: string) {
  if (pathname === ROUTES.adminDashboard) {
    return [{ label: "Dashboard", to: ROUTES.adminDashboard }];
  }

  return [
    { label: "Dashboard", to: ROUTES.adminDashboard },
    { label: adminRouteLabels[pathname] ?? "Workspace", to: pathname },
  ];
}

export function AdminShell({ children }: PropsWithChildren) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { counts, logout, markAllNotificationsRead, sessionUser, store, theme, toggleTheme } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const visibleGroups = useMemo(
    () =>
      adminNavGroups.map((group) => ({
        ...group,
        items: group.items.filter((item) => sessionUser && canAccessModule(sessionUser.role, item.id)),
      })),
    [sessionUser],
  );

  const searchHits = useMemo<SearchHit[]>(() => {
    if (!searchTerm.trim()) {
      return [];
    }

    const query = searchTerm.toLowerCase();
    const routeHits = visibleGroups
      .flatMap((group) => group.items)
      .filter((item) => item.label.toLowerCase().includes(query))
      .map((item) => ({
        id: item.id,
        label: item.label,
        meta: "Admin module",
        to: item.to,
      }));

    const contentHits = store.content
      .filter((item) => `${item.title} ${item.slug} ${item.focusKeyword}`.toLowerCase().includes(query))
      .map((item) => ({
        id: item.id,
        label: item.title,
        meta: `${item.type} · ${item.status}`,
        to: routeByContentType[item.type],
      }));

    const leadHits = store.leads
      .filter((item) => `${item.name} ${item.company} ${item.email}`.toLowerCase().includes(query))
      .map((item) => ({
        id: item.id,
        label: item.name,
        meta: `${item.kind} · ${item.company}`,
        to: item.kind === "Demo Request" ? ROUTES.adminDemoRequests : ROUTES.adminContactEnquiries,
      }));

    return [...routeHits, ...contentHits, ...leadHits].slice(0, 8);
  }, [searchTerm, store.content, store.leads, visibleGroups]);

  const currentBreadcrumbs = buildBreadcrumbs(pathname);
  const unreadNotifications = store.notifications.filter((item) => item.unread);

  return (
    <SidebarProvider defaultOpen>
      <Sidebar variant="inset" collapsible="icon" className="admin-sidebar">
        <SidebarHeader className="gap-3 px-3 pt-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sidebar-foreground">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 font-semibold">
                AH
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">Altroz Admin</p>
                <p className="truncate text-xs text-sidebar-foreground/70">Enterprise HRMS control center</p>
              </div>
            </div>
          </div>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          {visibleGroups.map((group) =>
            group.items.length ? (
              <SidebarGroup key={group.label}>
                <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => {
                      const isActive = pathname === item.to || pathname.startsWith(`${item.to}/`);
                      const badge = getQuickStatsBadge(item.id, counts);

                      return (
                        <SidebarMenuItem key={item.id}>
                          <SidebarMenuButton
                            asChild
                            isActive={isActive}
                            tooltip={item.label}
                            className="text-sidebar-foreground data-[active=true]:bg-white/12 data-[active=true]:text-white"
                          >
                            <NavLink to={item.to}>
                              <item.icon />
                              <span>{item.label}</span>
                            </NavLink>
                          </SidebarMenuButton>
                          {badge ? <SidebarMenuBadge>{badge}</SidebarMenuBadge> : null}
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ) : null,
          )}
        </SidebarContent>
        <SidebarFooter className="p-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-sidebar-foreground/80">
            <div className="mb-1 flex items-center gap-2 font-medium text-sidebar-foreground">
              <ShieldCheck className="h-4 w-4" />
              {sessionUser?.role}
            </div>
            <p className="leading-5">{sessionUser ? adminRoleDescriptions[sessionUser.role] : ""}</p>
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset className="admin-shell min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(11,92,255,0.12),transparent_22%),linear-gradient(180deg,rgba(248,250,252,1),rgba(244,247,251,1))] dark:bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_20%),linear-gradient(180deg,rgba(2,6,23,1),rgba(15,23,42,1))]">
        <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur-xl">
          <div className="flex flex-wrap items-center gap-4 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="md:hidden" />
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:inline-flex"
                onClick={() => navigate(ROUTES.adminDashboard)}
              >
                <Menu />
                <span className="sr-only">Go to dashboard</span>
              </Button>
              <div>
                <p className="text-sm font-semibold text-foreground">Admin workspace</p>
                <p className="text-xs text-muted-foreground">Tuesday, August 4, 2026</p>
              </div>
            </div>

            <div className="relative min-w-[240px] flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => window.setTimeout(() => setSearchFocused(false), 100)}
                className="h-11 rounded-2xl border-border/70 bg-background pl-9"
                placeholder="Search modules, content, leads..."
              />
              {searchFocused && searchHits.length ? (
                <div className="absolute left-0 right-0 top-14 z-30 rounded-2xl border border-border bg-card p-2 shadow-2xl">
                  {searchHits.map((hit) => (
                    <button
                      key={hit.id}
                      type="button"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => {
                        navigate(hit.to);
                        setSearchTerm("");
                      }}
                      className="flex w-full items-start justify-between rounded-xl px-3 py-2 text-left transition hover:bg-muted"
                    >
                      <span>
                        <span className="block text-sm font-medium text-foreground">{hit.label}</span>
                        <span className="block text-xs text-muted-foreground">{hit.meta}</span>
                      </span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
                {theme === "light" ? <MoonStar /> : <SunMedium />}
                <span className="sr-only">Toggle theme</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative rounded-full">
                    <Bell />
                    {unreadNotifications.length ? (
                      <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-amber-500" />
                    ) : null}
                    <span className="sr-only">Notifications</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-84 rounded-2xl">
                  <DropdownMenuLabel className="flex items-center justify-between">
                    Notifications
                    <button
                      type="button"
                      onClick={markAllNotificationsRead}
                      className="text-xs font-medium text-primary"
                    >
                      Mark all read
                    </button>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {store.notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="items-start rounded-xl py-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{notification.title}</span>
                          {notification.unread ? <span className="h-2 w-2 rounded-full bg-primary" /> : null}
                        </div>
                        <p className="text-xs text-muted-foreground">{notification.description}</p>
                        <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                          {notification.priority} priority · {notification.createdAt}
                        </p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-11 rounded-full px-3">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {sessionUser?.avatar}
                    </span>
                    <span className="hidden text-left sm:block">
                      <span className="block text-sm font-medium">{sessionUser?.name}</span>
                      <span className="block text-xs text-muted-foreground">{sessionUser?.role}</span>
                    </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-2xl">
                  <DropdownMenuLabel>{sessionUser?.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={toggleTheme}>
                    {theme === "light" ? <MoonStar /> : <SunMedium />}
                    Switch to {theme === "light" ? "dark" : "light"} mode
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      logout();
                      navigate(ROUTES.adminLogin);
                    }}
                  >
                    <LogOut />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="px-4 pb-3 sm:px-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <NavLink to={ROUTES.adminDashboard}>Admin</NavLink>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {currentBreadcrumbs.map((item, index) => (
                  <div key={item.to} className="contents">
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {index === currentBreadcrumbs.length - 1 ? (
                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <NavLink to={item.to}>{item.label}</NavLink>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex-1 px-4 py-6 sm:px-6"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </SidebarInset>
    </SidebarProvider>
  );
}

export function AdminSection({
  title,
  description,
  actions,
  children,
  className,
}: PropsWithChildren<{
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}>) {
  return (
    <section className={cn("rounded-[28px] border border-border/70 bg-card/90 p-5 shadow-card sm:p-6", className)}>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}

export function AdminMetricCard({
  title,
  value,
  meta,
  accent = "blue",
}: {
  title: string;
  value: string | number;
  meta: string;
  accent?: "blue" | "green" | "amber" | "rose";
}) {
  const accentClass =
    accent === "green"
      ? "from-emerald-500/20 to-emerald-500/5"
      : accent === "amber"
        ? "from-amber-500/20 to-amber-500/5"
        : accent === "rose"
          ? "from-rose-500/20 to-rose-500/5"
          : "from-blue-500/20 to-blue-500/5";

  return (
    <div className={cn("rounded-[24px] border border-border/70 bg-gradient-to-br p-5", accentClass)}>
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{value}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">{meta}</p>
    </div>
  );
}

export function AccessDeniedState({ moduleId }: { moduleId: AdminModuleId }) {
  return (
    <div className="grid min-h-[50vh] place-items-center">
      <div className="max-w-lg rounded-[32px] border border-border/70 bg-card p-8 text-center shadow-card">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-3xl bg-amber-500/10 text-amber-600">
          <ShieldCheck className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-semibold text-foreground">Access limited for this role</h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Your current role can sign in and navigate the admin panel, but it does not have permission for{" "}
          <span className="font-medium text-foreground">{adminRouteLabels[routeByModule(moduleId)]}</span>.
        </p>
      </div>
    </div>
  );
}

function routeByModule(moduleId: AdminModuleId) {
  return adminNavGroups.flatMap((group) => group.items).find((item) => item.id === moduleId)?.to ?? ROUTES.adminDashboard;
}
