"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getMockUser, setMockUser } from "@/lib/dummy-data";
import { LogOut, Menu, X } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const [userType, setUserType] = useState<"brand" | "influencer" | null>(null);
  const [userName, setUserName] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const { type, name } = getMockUser();
    setUserType(type);
    setUserName(name);
  }, []);

  const handleLogout = () => {
    setMockUser(null, "");
    setUserType(null);
    setUserName("");
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-rose-500 tracking-tight">mid</span>
          <span className="text-xl font-bold text-gray-900 tracking-tight">match</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-3">
          {!userType && (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-rose-500 transition-colors"
              >
                로그인
              </Link>
              <Link
                href="/signup/brand"
                className="px-4 py-2 text-sm font-medium bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
              >
                회원가입
              </Link>
            </>
          )}

          {userType === "brand" && (
            <>
              <Link
                href="/brand/campaigns/new"
                className="px-4 py-2 text-sm font-medium bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
              >
                캠페인 등록하기
              </Link>
              <Link
                href="/brand/dashboard"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-rose-500 transition-colors"
              >
                마이페이지
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-2 text-sm text-gray-400 hover:text-gray-700 transition-colors"
              >
                <LogOut size={16} />
              </button>
            </>
          )}

          {userType === "influencer" && (
            <>
              <Link
                href="/influencer/profile"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-rose-500 transition-colors"
              >
                내 신청 현황
              </Link>
              <Link
                href="/influencer/profile"
                className="px-4 py-2 text-sm font-medium bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
              >
                마이페이지
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-2 text-sm text-gray-400 hover:text-gray-700 transition-colors"
              >
                <LogOut size={16} />
              </button>
            </>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3">
          {!userType && (
            <>
              <Link href="/login" className="py-2 text-sm font-medium text-gray-700" onClick={() => setMobileOpen(false)}>
                로그인
              </Link>
              <Link href="/signup/brand" className="py-2 text-sm font-medium text-rose-500" onClick={() => setMobileOpen(false)}>
                브랜드 회원가입
              </Link>
              <Link href="/signup/influencer" className="py-2 text-sm font-medium text-rose-500" onClick={() => setMobileOpen(false)}>
                인플루언서 회원가입
              </Link>
            </>
          )}
          {userType === "brand" && (
            <>
              <Link href="/brand/campaigns/new" className="py-2 text-sm font-medium text-gray-700" onClick={() => setMobileOpen(false)}>캠페인 등록하기</Link>
              <Link href="/brand/dashboard" className="py-2 text-sm font-medium text-gray-700" onClick={() => setMobileOpen(false)}>마이페이지</Link>
              <button onClick={handleLogout} className="py-2 text-sm font-medium text-left text-gray-400">로그아웃</button>
            </>
          )}
          {userType === "influencer" && (
            <>
              <Link href="/influencer/profile" className="py-2 text-sm font-medium text-gray-700" onClick={() => setMobileOpen(false)}>내 신청 현황</Link>
              <Link href="/influencer/profile" className="py-2 text-sm font-medium text-gray-700" onClick={() => setMobileOpen(false)}>마이페이지</Link>
              <button onClick={handleLogout} className="py-2 text-sm font-medium text-left text-gray-400">로그아웃</button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
