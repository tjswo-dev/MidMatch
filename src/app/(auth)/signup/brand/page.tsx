"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setMockUser } from "@/lib/dummy-data";
import { ArrowLeft, Building2, CheckCircle } from "lucide-react";

export default function BrandSignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    companyName: "",
    brandName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    website: "",
    category: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = ["스킨케어", "메이크업", "헤어케어", "바디케어", "향수", "기타"];

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.companyName) e.companyName = "회사명을 입력해주세요.";
    if (!form.brandName) e.brandName = "브랜드명을 입력해주세요.";
    if (!form.email) e.email = "이메일을 입력해주세요.";
    if (!form.password || form.password.length < 8) e.password = "비밀번호는 8자 이상이어야 합니다.";
    if (form.password !== form.passwordConfirm) e.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validate()) setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMockUser("brand", form.brandName || form.companyName);
    setStep(3);
    setTimeout(() => router.push("/brand/dashboard"), 2000);
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">가입 완료!</h2>
          <p className="text-gray-500 text-sm">대시보드로 이동합니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="px-4 py-4 flex items-center">
        <Link href="/login" className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <Link href="/" className="mx-auto flex items-center gap-0.5">
          <span className="text-xl font-bold text-rose-500">mid</span>
          <span className="text-xl font-bold text-gray-900">match</span>
        </Link>
        <div className="w-8" />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  step >= s ? "bg-rose-500 text-white" : "bg-gray-200 text-gray-500"
                }`}>
                  {s}
                </div>
                {s < 2 && <div className={`flex-1 h-0.5 w-20 ${step > s ? "bg-rose-500" : "bg-gray-200"}`} />}
              </div>
            ))}
            <span className="ml-2 text-sm text-gray-500">{step === 1 ? "기본 정보" : "브랜드 정보"}</span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <Building2 size={20} className="text-rose-500" />
            <h1 className="text-2xl font-bold text-gray-900">브랜드 회원가입</h1>
          </div>
          <p className="text-gray-500 text-sm mb-8">K-뷰티 캠페인을 등록하고 인플루언서를 모집하세요</p>

          {step === 1 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">회사명 <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  placeholder="(주)회사명"
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 ${errors.companyName ? "border-red-300" : "border-gray-200"}`}
                />
                {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">브랜드명 <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  placeholder="브랜드 이름"
                  value={form.brandName}
                  onChange={(e) => setForm({ ...form, brandName: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 ${errors.brandName ? "border-red-300" : "border-gray-200"}`}
                />
                {errors.brandName && <p className="text-red-500 text-xs mt-1">{errors.brandName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">이메일 <span className="text-rose-500">*</span></label>
                <input
                  type="email"
                  placeholder="brand@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 ${errors.email ? "border-red-300" : "border-gray-200"}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">비밀번호 <span className="text-rose-500">*</span></label>
                <input
                  type="password"
                  placeholder="8자 이상"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 ${errors.password ? "border-red-300" : "border-gray-200"}`}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">비밀번호 확인 <span className="text-rose-500">*</span></label>
                <input
                  type="password"
                  placeholder="비밀번호 재입력"
                  value={form.passwordConfirm}
                  onChange={(e) => setForm({ ...form, passwordConfirm: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 ${errors.passwordConfirm ? "border-red-300" : "border-gray-200"}`}
                />
                {errors.passwordConfirm && <p className="text-red-500 text-xs mt-1">{errors.passwordConfirm}</p>}
              </div>

              <button
                onClick={handleNext}
                className="w-full py-3.5 bg-rose-500 text-white font-semibold rounded-xl hover:bg-rose-600 transition-colors text-sm"
              >
                다음 단계
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">브랜드 웹사이트</label>
                <input
                  type="url"
                  placeholder="https://your-brand.com"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">주력 카테고리</label>
                <div className="grid grid-cols-3 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setForm({ ...form, category: cat })}
                      className={`py-2.5 rounded-xl text-xs font-medium border transition-colors ${
                        form.category === cat
                          ? "bg-rose-50 border-rose-300 text-rose-600"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3.5 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm"
                >
                  이전
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-rose-500 text-white font-semibold rounded-xl hover:bg-rose-600 transition-colors text-sm"
                >
                  가입 완료
                </button>
              </div>
            </form>
          )}

          <p className="text-center text-sm text-gray-500 mt-5">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="text-rose-500 font-medium hover:underline">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
