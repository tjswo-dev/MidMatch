"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, CheckCircle } from "lucide-react";

const STEPS = ["기본 정보", "모집 조건", "가이드라인"];

const PLATFORMS = ["Instagram", "TikTok", "YouTube", "YouTube Shorts"];
const COUNTRIES = ["미국", "일본", "베트남", "호주", "동남아시아", "캐나다", "영국", "기타"];
const AGE_GROUPS = ["10대", "20대 초반", "20대 후반", "30대", "40대 이상"];
const GENDERS = ["전체", "여성", "남성"];

export default function NewCampaignPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    brandName: "",
    productName: "",
    productDescription: "",
    selectedPlatforms: [] as string[],
    targetCountries: [] as string[],
    targetAges: [] as string[],
    targetGender: "전체",
    fee: "",
    slots: "",
    applicationDeadline: "",
    confirmDate: "",
    shippingPeriod: "",
    contentDeadline: "",
    guidelines: "",
  });

  const toggleArray = (arr: string[], value: string): string[] =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => router.push("/brand/dashboard"), 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">캠페인이 등록되었습니다</h2>
          <p className="text-gray-500 text-sm">대시보드로 이동합니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 pt-8 pb-12">
        {/* Back */}
        <Link
          href="/brand/dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          대시보드로
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">캠페인 등록</h1>
        <p className="text-gray-500 text-sm mb-8">K-뷰티 캠페인 정보를 입력하세요</p>

        {/* Step Indicator */}
        <div className="flex items-center mb-8">
          {STEPS.map((label, i) => (
            <div key={i} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step > i
                    ? "bg-rose-500 text-white"
                    : step === i
                    ? "bg-rose-500 text-white ring-4 ring-rose-100"
                    : "bg-gray-200 text-gray-500"
                }`}>
                  {step > i ? <CheckCircle size={16} /> : i + 1}
                </div>
                <span className={`text-xs mt-1 ${step === i ? "text-rose-500 font-medium" : "text-gray-400"}`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 mb-4 ${step > i ? "bg-rose-500" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          {/* Step 0: 기본 정보 */}
          {step === 0 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">브랜드명 <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  value={form.brandName}
                  onChange={(e) => setForm({ ...form, brandName: e.target.value })}
                  placeholder="예: LANEIGE"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">제품명 <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  value={form.productName}
                  onChange={(e) => setForm({ ...form, productName: e.target.value })}
                  placeholder="예: 립 슬리핑 마스크"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">제품 설명 <span className="text-rose-500">*</span></label>
                <textarea
                  value={form.productDescription}
                  onChange={(e) => setForm({ ...form, productDescription: e.target.value })}
                  placeholder="제품의 주요 특징과 효능을 설명해주세요"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">제품 이미지 업로드</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-rose-300 transition-colors cursor-pointer">
                  <Upload size={24} className="text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">클릭하여 이미지 업로드</p>
                  <p className="text-xs text-gray-300 mt-1">PNG, JPG 최대 10MB</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">희망 플랫폼 <span className="text-rose-500">*</span></label>
                <div className="flex flex-wrap gap-2">
                  {PLATFORMS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setForm({ ...form, selectedPlatforms: toggleArray(form.selectedPlatforms, p) })}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                        form.selectedPlatforms.includes(p)
                          ? "bg-rose-50 border-rose-300 text-rose-600"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 1: 모집 조건 */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">타겟 국가 <span className="text-rose-500">*</span></label>
                <div className="flex flex-wrap gap-2">
                  {COUNTRIES.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setForm({ ...form, targetCountries: toggleArray(form.targetCountries, c) })}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                        form.targetCountries.includes(c)
                          ? "bg-rose-50 border-rose-300 text-rose-600"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">타겟 연령대</label>
                <div className="flex flex-wrap gap-2">
                  {AGE_GROUPS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setForm({ ...form, targetAges: toggleArray(form.targetAges, a) })}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                        form.targetAges.includes(a)
                          ? "bg-rose-50 border-rose-300 text-rose-600"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">타겟 성별</label>
                <div className="flex gap-2">
                  {GENDERS.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setForm({ ...form, targetGender: g })}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                        form.targetGender === g
                          ? "bg-rose-50 border-rose-300 text-rose-600"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">원고료 (원) <span className="text-rose-500">*</span></label>
                  <input
                    type="number"
                    value={form.fee}
                    onChange={(e) => setForm({ ...form, fee: e.target.value })}
                    placeholder="150000"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">모집 명수 <span className="text-rose-500">*</span></label>
                  <input
                    type="number"
                    value={form.slots}
                    onChange={(e) => setForm({ ...form, slots: e.target.value })}
                    placeholder="10"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">모집 마감일</label>
                  <input
                    type="date"
                    value={form.applicationDeadline}
                    onChange={(e) => setForm({ ...form, applicationDeadline: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">선정 발표일</label>
                  <input
                    type="date"
                    value={form.confirmDate}
                    onChange={(e) => setForm({ ...form, confirmDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">배송 예정일</label>
                  <input
                    type="date"
                    value={form.shippingPeriod}
                    onChange={(e) => setForm({ ...form, shippingPeriod: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">콘텐츠 마감일</label>
                  <input
                    type="date"
                    value={form.contentDeadline}
                    onChange={(e) => setForm({ ...form, contentDeadline: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: 가이드라인 */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">가이드라인 <span className="text-rose-500">*</span></label>
                <textarea
                  value={form.guidelines}
                  onChange={(e) => setForm({ ...form, guidelines: e.target.value })}
                  placeholder="콘텐츠 형식, 필수 포함 요소, 해시태그 등을 상세히 작성해주세요."
                  rows={8}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none"
                />
              </div>

              {/* Preview Summary */}
              <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-2">
                <p className="font-medium text-gray-700 mb-3">등록 요약</p>
                {form.brandName && <p className="text-gray-600">브랜드: <span className="font-medium text-gray-900">{form.brandName}</span></p>}
                {form.productName && <p className="text-gray-600">제품: <span className="font-medium text-gray-900">{form.productName}</span></p>}
                {form.fee && <p className="text-gray-600">원고료: <span className="font-medium text-rose-500">{Number(form.fee).toLocaleString()}원</span></p>}
                {form.slots && <p className="text-gray-600">모집: <span className="font-medium text-gray-900">{form.slots}명</span></p>}
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-rose-500 text-white font-semibold rounded-xl hover:bg-rose-600 transition-colors"
              >
                캠페인 등록 완료
              </button>
            </form>
          )}

          {/* Navigation Buttons */}
          {step < 2 && (
            <div className="flex gap-3 mt-6">
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex-1 py-3.5 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm"
                >
                  이전
                </button>
              )}
              <button
                onClick={() => setStep(step + 1)}
                className="flex-1 py-3.5 bg-rose-500 text-white font-semibold rounded-xl hover:bg-rose-600 transition-colors text-sm"
              >
                다음
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
