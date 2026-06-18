"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Plus, LogOut } from "lucide-react";
import { setMockUser } from "@/lib/dummy-data";

const navItems = [
  { href: "/brand/dashboard", label: "대시보드", icon: LayoutDashboard },
  { href: "/brand/campaigns/new", label: "캠페인 등록", icon: Plus },
];

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    setMockUser(null, "");
    router.push("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col fixed h-full z-40">
        <div className="px-5 py-5 border-b border-gray-50">
          <Link href="/" className="flex items-center gap-0.5">
            <span className="text-xl font-bold text-rose-500">mid</span>
            <span className="text-xl font-bold text-gray-900">match</span>
          </Link>
          <p className="text-xs text-gray-400 mt-0.5">브랜드 대시보드</p>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                pathname === href || (href !== "/brand/dashboard" && pathname.startsWith(href))
                  ? "bg-rose-50 text-rose-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={17} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-gray-50">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <LogOut size={17} />
            로그아웃
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-56">
        {children}
      </main>
    </div>
  );
}
