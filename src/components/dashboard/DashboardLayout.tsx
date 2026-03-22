"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { LogOut, Home, Calendar, FileText, Users, Menu, X, ArrowLeft } from "lucide-react";
import { signOut } from "next-auth/react";

const studentNav = [
  { name: "Dashboard", href: "/app/dashboard", icon: Home },
  { name: "Sessions", href: "/app/sessions", icon: Calendar },
  { name: "Assignments", href: "/app/assignments", icon: FileText },
];

const coachNav = [
  { name: "Dashboard", href: "/admin/dashboard", icon: Home },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Sessions", href: "/admin/sessions", icon: Calendar },
  { name: "Assignments", href: "/admin/assignments", icon: FileText },
];

export function DashboardLayout({ children, role, userName }: { children: React.ReactNode; role: string; userName: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = router.pathname;
  const navigation = role === "COACH" ? coachNav : studentNav;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-primary-950 text-white z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex-shrink-0 flex flex-col ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-16 flex items-center justify-between px-6 bg-primary-900 border-b border-primary-800">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Career<span className="text-accent-500">Coach</span>
          </Link>
          <button className="lg:hidden text-primary-100 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== "/app/dashboard" && item.href !== "/admin/dashboard");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                  isActive 
                    ? "bg-primary-800 text-white" 
                    : "text-primary-100 hover:bg-primary-800 hover:text-white"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-primary-800">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-primary-100 hover:bg-primary-800 hover:text-white transition-colors mb-2">
            <ArrowLeft className="w-5 h-5" />
            Back to Site
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-red-300 hover:bg-red-900/50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200 shadow-sm relative z-10">
          <button
            className="lg:hidden text-slate-500 hover:text-slate-700 focus:outline-none"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex-1 text-slate-800 lg:hidden font-semibold ml-4">
            {role === "COACH" ? "Coach Dashboard" : "Dashboard"}
          </div>
          
          <div className="flex-1 hidden lg:block" />
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 border-l pl-4 border-slate-200">
               <div className="text-sm font-medium text-slate-700 hidden sm:block">
                 {userName}
               </div>
               <span className="text-xs font-bold text-accent-700 bg-accent-100 px-2 py-1 rounded-md">
                 {role}
               </span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
