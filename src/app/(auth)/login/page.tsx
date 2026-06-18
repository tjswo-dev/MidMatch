"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setMockUser } from "@/lib/dummy-data";
import { ArrowLeft, Building2, User } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"brand" | "influencer">("influencer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    const name = email.split("@")[0];
    setMockUser(tab, name);

    if (tab === "brand") {
      router.push("/brand/dashboard");
    } else {
      router.push("/influencer/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 flex items-center">
        <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors">
          <ArrowLeft size={18} />
          <span className="text-sm">메인으로</span>
        </Link>
        <Link href="/" className="mx-auto flex items-center gap-0.5">
          <span className="text-xl font-bold text-rose-500">mid</span>
          <span className="text-xl font-bold text-gray-900">match</span>
        </Link>
        <div className="w-20" />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">로그인</h1>
          <p className="text-gray-500 text-sm text-center mb-8">계정 유형을 선택하고 로그인하세요</p>

          {/* Tab */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => setTab("influencer")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === "influencer"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <User size={16} />
              인플루언서
            </button>
            <button
              onClick={() => setTab("brand")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === "brand"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Building2 size={16} />
              브랜드
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
            {error && (
              <div className="px-4 py-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">이메일</label>
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-rose-500 text-white font-semibold rounded-xl hover:bg-rose-600 transition-colors text-sm mt-2"
            >
              {tab === "brand" ? "브랜드로 로그인" : "인플루언서로 로그인"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            아직 계정이 없으신가요?{" "}
            <Link
              href={tab === "brand" ? "/signup/brand" : "/signup/influencer"}
              className="text-rose-500 font-medium hover:underline"
            >
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
