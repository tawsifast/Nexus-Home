"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// ✅ শুধুমাত্র Avatar এবং Button হিরোইউআই থেকে ইম্পোর্ট করা হয়েছে
import { Avatar, Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { 
  IoLogOutOutline, 
  IoGridOutline, 
  IoPersonOutline, 
  IoMenuOutline, 
  IoCloseOutline 
} from "react-icons/io5";

const getDashboardPath = (role) => {
  switch (role) {
    case "owner": return "/dashboard/owner";
    case "admin": return "/dashboard/admin";
    default: return "/dashboard/tenant";
  }
};

export default function CustomNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // মোবাইল ড্রয়ার কন্ট্রোল স্টেট
  const pathname = usePathname();
  const { data: session } = authClient?.useSession();
  const user = session?.user;
  const userRole = user?.role || "tenant";
  const dashboardPath = getDashboardPath(userRole);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "All Properties", href: "/all-client/all-properties" },
    { label: "Service", href: "/all-client/services" },
    { label: "Blogs", href: "/all-client/blogs" },
    ...(user ? [{ label: "Dashboard", href: dashboardPath }] : []),
  ];

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 left-0 w-full h-16 z-50 backdrop-blur-md bg-[#0a0a0f]/80 border-b border-white/5 text-white select-none">
      <div className="max-w-[1280px] mx-auto h-full px-6 flex items-center justify-between">
        
        {/* Left Side: Mobile Toggle + Logo */}
        <div className="flex items-center gap-3">
          {/* কাস্টম মোবাইল হ্যামবার্গার বাটন */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden text-white text-2xl focus:outline-none focus:text-cyan-400 transition"
          >
            {isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
          </button>

          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-white font-black text-lg">
              N
            </div>
            <span className="font-bold tracking-wider text-white text-lg uppercase">
              Nexus<span className="text-cyan-400">Home</span>
            </span>
          </Link>
        </div>

        {/* Center: Desktop Nav Links */}
        <div className="hidden sm:flex items-center gap-6 h-full">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={i}
                href={link.href}
                className={`relative py-2 text-sm font-medium tracking-wide transition-all duration-300 ${
                  isActive
                    ? "text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Side: Auth Controls */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {/* ইউজার প্রোফাইল ইমেজ (HeroUI Avatar) */}
              <Avatar size="sm" className="w-8 h-8 sm:w-9 sm:h-9">
                <Avatar.Image src={user?.image} alt={user?.name} />
                <Avatar.Fallback className="bg-gradient-to-tr from-cyan-400 to-purple-500 text-white font-bold text-xs">
                  {user?.name?.charAt(0).toUpperCase()}
                </Avatar.Fallback>
              </Avatar>

              {/* ডেটা ডেকোরেশন (Desktop Only) */}
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-sm font-semibold text-white">
                  Welcome, {user?.name}
                </span>
                <span className="text-[10px] text-cyan-400 uppercase tracking-widest">
                  {userRole}
                </span>
              </div>

              {/* সাইন আউট বাটন (HeroUI Button) */}
              <Button
                onClick={handleSignOut}
                className="hidden sm:flex bg-white/5 border border-white/10 hover:bg-rose-500/10 hover:border-rose-500/30 text-rose-400 font-medium text-xs rounded-xl px-4 h-9 flex items-center gap-1.5"
              >
                <IoLogOutOutline size={15} /> Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/signin" className="text-sm text-slate-300 hover:text-white">
                Login
              </Link>
              <Link href="/signup">
                <Button
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                  size="sm"
                >
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================
          Custom Mobile Drawer Overlay 
          ======================================================== */}
      <div 
        className={`fixed top-16 left-0 w-full bg-[#0a0a0f]/95 border-b border-white/5 backdrop-blur-lg pt-4 pb-8 px-6 space-y-2 z-40 transition-all duration-300 transform ${
          isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"
        } sm:hidden`}
      >
        {navLinks.map((link, i) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={i}
              onClick={() => setIsMenuOpen(false)}
              href={link.href}
              className={`w-full block py-3 px-4 rounded-xl text-base transition-all ${
                isActive
                  ? "text-cyan-400 font-semibold bg-cyan-500/10"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </Link>
          );
        })}

        {/* মোবাইল ভিউতে লগইন থাকা ইউজারের এক্সট্রা ইনফো ও লগআউট */}
        {user && (
          <div className="pt-2 border-t border-white/5 space-y-1">
            <div className="px-4 py-2">
              <p className="text-xs text-slate-500">Signed in as</p>
              <p className="text-sm font-bold text-white truncate">{user?.name}</p>
              <p className="text-[10px] text-cyan-400 uppercase">{userRole}</p>
            </div>
            
            <Link
              onClick={() => setIsMenuOpen(false)}
              href={dashboardPath}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-slate-300 hover:bg-white/5"
            >
              <IoGridOutline className="text-purple-400" /> Dashboard
            </Link>
            
            <Link
              onClick={() => setIsMenuOpen(false)}
              href={`${dashboardPath}/profile`}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-slate-300 hover:bg-white/5"
            >
              <IoPersonOutline className="text-cyan-400" /> My Profile
            </Link>
            
            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleSignOut();
              }}
              className="flex items-center gap-2 w-full px-4 py-3 rounded-xl text-sm text-rose-400 hover:bg-rose-500/10 transition text-left"
            >
              <IoLogOutOutline size={15} /> Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}