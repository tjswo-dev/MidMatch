"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { setMockUser } from "@/lib/dummy-data";

export default function InfluencerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    setMockUser(null, "");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-0.5">
            <span className="text-lg font-bold text-rose-500">mid</span>
            <span className="text-lg font-bold text-gray-900">match</span>
          </Link>
          <nav className="flex items-center gap-1">
            <Link
              href="/influencer/dashboard"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                pathname === "/influencer/dashboard" ? "text-rose-500" : "text-gray-600 hover:text-rose-500"
              }`}
            >
              캠페인
            </Link>
            <Link
              href="/influencer/profile"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                pathname === "/influencer/profile" ? "text-rose-500" : "text-gray-600 hover:text-rose-500"
              }`}
            >
              마이페이지
            </Link>
            <button
              onClick={handleLogout}
              className="px-2 py-2 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <LogOut size={16} />
            </button>
          </nav>
        </div>
      </header>

      <div className="pt-14">
        {children}
      </div>
    </div>
  );
}
