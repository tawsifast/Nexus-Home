"use client";

import Link from "next/link";
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button, Avatar, Dropdown } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import {
  IoMenuSharp,
  IoLogOutOutline,
  IoGridOutline,
  IoPersonOutline,
} from "react-icons/io5";

// রোল অনুযায়ী ড্যাশবোর্ডের সঠিক পাথ রিটার্ন করে
const getDashboardPath = (role) => {
  switch (role) {
    case "owner":
      return "/dashboard/owner";
    case "admin":
      return "/dashboard/admin";
    default:
      return "/dashboard/tenant";
  }
};

export default function Navbar() {
  const { data: session } = authClient?.useSession();
  const user = session?.user;

  // ইউজার রোল ডিটেক্ট করা (Tenant / Owner / Admin)
  const userRole = user?.role || user?.metadata?.role || "Tenant";
  const dashboardPath = getDashboardPath(userRole);

  // বেসিক লিংক সবার জন্য (লগইন না থাকলেও দেখা যাবে)
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "All Properties", href: "/all-client/all-properties" },
    { label: "Service", href: "/all-client/services" },
    { label: "Blogs", href: "/all-client/blogs" },
  ];

  // 🔒 লগইন থাকলে রোল অনুযায়ী একটাই Dashboard লিংক পুশ হবে
  if (user) {
    navLinks.push({ label: "Dashboard", href: dashboardPath });
  }

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  return (
    <HeroNavbar
      className="sticky top-0 left-0 w-full h-16 z-50 backdrop-blur-md bg-[#0a0a0f]/80 border-b border-white/5 text-white"
      maxWidth="xl"
    >
      {/* Mobile toggle */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label="Toggle menu" className="text-white" />
      </NavbarContent>

      {/* Logo */}
      <NavbarContent justify="start">
        <NavbarBrand>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-white font-black text-lg">
              N
            </div>
            <span className="font-bold tracking-wider text-white text-lg uppercase">
              Nexus<span className="text-cyan-400">Home</span>
            </span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Links (লগইন স্ট্যাটাস অনুযায়ী ডাইনামিক) */}
      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem className="flex gap-6">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="text-slate-300 hover:text-cyan-400 transition text-sm font-medium tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </NavbarItem>
      </NavbarContent>

      {/* Auth Control Side */}
      <NavbarContent justify="end">
        {user ? (
          <>
            {/* ✅ DESKTOP / LARGE DEVICE — ছবি, Welcome নাম, এবং সরাসরি Logout বাটন */}
            <div className="hidden sm:flex items-center gap-3">
              <Avatar size="sm" className="w-9 h-9">
                <Avatar.Image src={user?.image} alt={user?.name} />
                <Avatar.Fallback className="bg-gradient-to-tr from-cyan-400 to-purple-500 text-white font-bold text-xs">
                  {user?.name?.charAt(0).toUpperCase()}
                </Avatar.Fallback>
              </Avatar>

              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold text-white">
                  Welcome, {user?.name}
                </span>
                <span className="text-[10px] text-cyan-400 uppercase tracking-widest">
                  {userRole}
                </span>
              </div>

              <Button
                onClick={handleSignOut}
                className="bg-white/5 border border-white/10 hover:bg-rose-500/10 hover:border-rose-500/30 text-rose-400 font-medium text-xs rounded-xl px-4 h-9 cursor-pointer flex items-center gap-1.5"
              >
                <IoLogOutOutline size={15} /> Logout
              </Button>
            </div>

            {/* ✅ MOBILE — শুধুমাত্র ছোট স্ক্রিনে এই ড্রপডাউন মেনুটি দেখাবে */}
            <div className="sm:hidden">
              <Dropdown
                placement="bottom-end"
                className="bg-[#111622] border border-white/[0.08] text-white rounded-2xl min-w-[220px] shadow-2xl"
              >
                <Dropdown.Trigger>
                  <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] transition-all cursor-pointer select-none">
                    <Avatar size="sm" className="w-7 h-7">
                      <Avatar.Image src={user?.image} alt={user?.name} />
                      <Avatar.Fallback className="bg-gradient-to-tr from-cyan-400 to-purple-500 text-white font-bold text-xs">
                        {user?.name?.charAt(0).toUpperCase()}
                      </Avatar.Fallback>
                    </Avatar>
                    <IoMenuSharp className="text-lg text-slate-300 pr-0.5" />
                  </div>
                </Dropdown.Trigger>

                <Dropdown.Menu aria-label="User Actions" className="p-1.5">
                  <Dropdown.Item
                    key="profile-info"
                    className="h-14 flex flex-col items-start justify-center gap-0.5 pointer-events-none px-3 border-b border-white/[0.05] mb-1"
                  >
                    <p className="text-xs text-slate-400 font-light">
                      Signed in as
                    </p>
                    <p className="text-sm font-bold text-white truncate max-w-[180px]">
                      {user?.name}
                    </p>
                  </Dropdown.Item>

                  <Dropdown.Item
                    key="dashboard"
                    className="rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <Link
                      href={dashboardPath}
                      className="flex items-center gap-2 w-full text-xs text-slate-300"
                    >
                      <IoGridOutline className="text-purple-400" /> Dashboard
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item
                    key="profile"
                    className="rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <Link
                      href={`${dashboardPath}/profile`}
                      className="flex items-center gap-2 w-full text-xs text-slate-300"
                    >
                      <IoPersonOutline className="text-cyan-400" /> My Profile
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item
                    key="logout"
                    onClick={handleSignOut}
                    className="rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer mt-1"
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <IoLogOutOutline size={15} /> Log Out Account
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </>
        ) : (
          /* ❌ ইউজার লগইন না থাকলে এই বাটনগুলো দেখাবে */
          <div className="flex items-center gap-4">
            <Link
              href="/signin"
              className="text-sm text-slate-300 hover:text-white"
            >
              Login
            </Link>

            <Link href="/signup">
              <Button
                className="bg-linear-to-r from-cyan-500 to-purple-600 text-white"
                size="sm"
              >
                Register
              </Button>
            </Link>
          </div>
        )}
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="bg-[#0a0a0f]/95 pt-6 space-y-4">
        {navLinks.map((link, i) => (
          <NavbarMenuItem key={i}>
            <Link
              className="w-full text-base text-slate-300 hover:text-cyan-400 transition"
              href={link.href}
            >
              {link.label}
            </Link>
          </NavbarMenuItem>
        ))}

        {user && (
          <NavbarMenuItem>
            <button
              onClick={handleSignOut}
              className="w-full text-left text-base text-rose-400 hover:text-rose-300 transition"
            >
              Log Out
            </button>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </HeroNavbar>
  );
}
