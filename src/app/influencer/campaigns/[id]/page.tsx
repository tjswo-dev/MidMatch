"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  dummyCampaigns,
  getMockUser,
  formatFee,
  getDday,
} from "@/lib/dummy-data";
import {
  ArrowLeft,
  MapPin,
  Users,
  Calendar,
  Package,
  Clock,
  CheckCircle,
  Send,
  X,
} from "lucide-react";

export default function CampaignDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const campaign = dummyCampaigns.find((c) => c.id === id);
  const [userType, setUserType] = useState<"brand" | "influencer" | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [agree2nd, setAgree2nd] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const { type } = getMockUser();
    setUserType(type);
  }, []);

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">캠페인을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const handleApplyClick = () => {
    if (!userType) {
      router.push("/login");
      return;
    }
    setShowModal(true);
  };

  const handleApplySubmit = () => {
    setApplied(true);
    setShowModal(false);
  };

  const dday = getDday(campaign.applicationDeadline);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-12">
        {/* Back */}
        <Link
          href="/influencer/dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          목록으로
        </Link>

        {/* Hero Image */}
        <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[16/7]">
          <img
            src={campaign.productImage}
            alt={campaign.productName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white/70 text-sm font-medium">{campaign.brandName}</p>
            <h1 className="text-white text-2xl font-bold">{campaign.productName}</h1>
          </div>
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-rose-500 text-white text-sm font-bold rounded-full">
            {dday}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <p className="text-xs text-gray-400 mb-1">원고료</p>
            <p className="font-bold text-rose-500">{formatFee(campaign.fee)}</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <p className="text-xs text-gray-400 mb-1">모집 인원</p>
            <p className="font-bold text-gray-900">{campaign.slots}명</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <p className="text-xs text-gray-400 mb-1">신청자</p>
            <p className="font-bold text-gray-900">{campaign.applicantCount}명</p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="space-y-4 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-900 mb-4 text-sm">캠페인 정보</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="text-rose-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">타겟 국가</p>
                  <p className="text-gray-800 font-medium">{campaign.targetCountry}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Users size={15} className="text-rose-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">타겟</p>
                  <p className="text-gray-800 font-medium">{campaign.targetGender} / {campaign.targetAge}세</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar size={15} className="text-rose-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">모집 기간</p>
                  <p className="text-gray-800 font-medium">~ {campaign.applicationDeadline}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle size={15} className="text-rose-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">선정 발표</p>
                  <p className="text-gray-800 font-medium">{campaign.confirmDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Package size={15} className="text-rose-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">배송 예정일</p>
                  <p className="text-gray-800 font-medium">{campaign.shippingPeriod}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={15} className="text-rose-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">콘텐츠 마감</p>
                  <p className="text-gray-800 font-medium">{campaign.contentDeadline}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-900 mb-3 text-sm">제품 설명</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{campaign.productDescription}</p>
          </div>

          <div className="bg-rose-50 rounded-2xl p-5 border border-rose-100">
            <h2 className="font-semibold text-rose-700 mb-3 text-sm">콘텐츠 가이드라인</h2>
            <p className="text-rose-600 text-sm leading-relaxed">{campaign.guidelines}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-900 mb-3 text-sm">희망 조건</h2>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                플랫폼: {campaign.platform}
              </span>
              <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                타겟 연령: {campaign.targetAge}세
              </span>
              <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                팔로워 1만~10만
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        {userType !== "brand" && (
          <div className="sticky bottom-4">
            {applied ? (
              <div className="flex items-center justify-center gap-2 py-4 bg-green-500 text-white font-semibold rounded-2xl shadow-lg">
                <CheckCircle size={20} />
                신청이 완료되었습니다
              </div>
            ) : (
              <button
                onClick={handleApplyClick}
                className="w-full py-4 bg-rose-500 text-white font-semibold rounded-2xl hover:bg-rose-600 transition-colors shadow-lg shadow-rose-200 text-base"
              >
                {!userType ? "로그인 후 신청하기" : "캠페인 신청하기"}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Apply Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
            <div className="flex items-center gap-3 p-5 border-b border-gray-100">
              <img
                src={campaign.productImage}
                alt={campaign.productName}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400">{campaign.brandName}</p>
                <p className="font-semibold text-gray-900 text-sm truncate">{campaign.productName}</p>
                <p className="text-xs text-rose-500">{formatFee(campaign.fee)}</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  브랜드에게 전달할 메시지
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="자신을 소개하고, 이 캠페인에 잘 맞는 이유를 작성해주세요."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none"
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agree2nd}
                  onChange={(e) => setAgree2nd(e.target.checked)}
                  className="mt-0.5 accent-rose-500"
                />
                <span className="text-xs text-gray-600 leading-relaxed">
                  콘텐츠 2차 활용(광고, 홍보물 등)에 동의합니다.
                </span>
              </label>

              <button
                onClick={handleApplySubmit}
                className="w-full py-3.5 bg-rose-500 text-white font-semibold rounded-xl hover:bg-rose-600 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Send size={16} />
                신청 완료
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
