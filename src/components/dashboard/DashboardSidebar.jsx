"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";
import { Bars, Xmark } from "@gravity-ui/icons";
import {
  Briefcase, House, Person, LayoutCellsLarge,
  Bookmark, FileText, CreditCard, Persons,
  Display, MagnifierPlus, Calendar, PlusShape,
} from "@gravity-ui/icons";

const adminNavItems = [
  { icon: LayoutCellsLarge, href: "/dashboard/admin", label: "Dashboard" },
  { icon: Persons, href: "/dashboard/admin/all-users", label: "Users" },
  { icon: Display, href: "/dashboard/admin/all-properties", label: "Properties" },
  { icon: Briefcase, href: "/dashboard/admin/all-bookings", label: "Bookings" },
  { icon: CreditCard, href: "/dashboard/admin/transactions", label: "Transactions" },
];

const ownerNavLinks = [
  { icon: MagnifierPlus, href: "/dashboard/owner/overview", label: "Overview" },
  { icon: PlusShape, href: "/dashboard/owner/add-properties", label: "Add Property" },
  { icon: House, href: "/dashboard/owner/my-properties", label: "My Property" },
  { icon: Calendar, href: "/dashboard/owner/bookings", label: "Bookings" },
  { icon: Person, href: "/dashboard/owner/profile", label: "Profile" },
];

const tenantNavLinks = [
  { icon: Briefcase, href: "/dashboard/tenant/overview", label: "Overview" },
  { icon: Bookmark, href: "/dashboard/tenant/bookings", label: "My Bookings" },
  { icon: FileText, href: "/dashboard/tenant/favourites", label: "Favourite" },
  { icon: CreditCard, href: "/dashboard/tenant/profile", label: "Profile" },
];

const navLinksMap = {
  tenant: tenantNavLinks,
  owner: ownerNavLinks,
  admin: adminNavItems,
};

export function DashboardSidebar({ currentRole = "tenant" }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-white/5 p-4 bg-[#0a0a0f] sticky top-16 self-start h-[calc(100vh-4rem)] overflow-y-auto">
        <SidebarLinks role={currentRole} />
      </aside>

      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-16 left-0 w-full h-12 z-40 px-4 border-b border-white/5 bg-[#0a0a0f]/90 backdrop-blur-md flex items-center justify-between">
        <span className="text-xs font-bold tracking-wider uppercase text-cyan-400">
          Dashboard Menu
        </span>
        <Button
          isIconOnly
          variant="light"
          size="sm"
          onPress={() => setIsOpen(true)}
          className="hover:bg-white/5 rounded-xl text-white"
        >
          <Bars className="size-5" />
        </Button>
      </div>

      {/* Custom Mobile Drawer — HeroUI Drawer বাদ দিয়ে নিজের বানানো */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="lg:hidden fixed top-0 left-0 h-full w-[280px] z-50 bg-[#0a0a0f] border-r border-white/5 flex flex-col shadow-2xl transition-transform duration-300">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <span className="text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Navigation
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
              >
                <Xmark className="size-5" />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 overflow-y-auto px-3 py-4">
              <SidebarLinks
                role={currentRole}
                closeDrawer={() => setIsOpen(false)}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export function SidebarLinks({ role, closeDrawer }) {
  const pathname = usePathname();
  const normalizedRole = role?.toLowerCase() || "tenant";
  const items = navLinksMap[normalizedRole] || tenantNavLinks;
  const currentPath = pathname?.replace(/\/$/, "") || "";

  return (
    <nav className="flex flex-col gap-1.5 w-full">
      {items.map((item) => {
        const targetPath = item.href.replace(/\/$/, "");
        const isBaseDashboard =
          targetPath === "/dashboard/admin" ||
          targetPath === "/dashboard/owner/overview" ||
          targetPath === "/dashboard/tenant/overview";

        const isActive = isBaseDashboard
          ? currentPath === targetPath
          : currentPath.startsWith(targetPath);

        const IconComponent = item.icon;

        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => closeDrawer?.()}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200 ${
              isActive
                ? "bg-purple-500/10 border border-purple-500/30 text-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.1)] font-medium"
                : "text-slate-300 border border-transparent hover:bg-white/5 hover:text-white"
            }`}
          >
            <IconComponent
              className={`size-5 ${isActive ? "text-cyan-400" : "text-slate-400"}`}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}