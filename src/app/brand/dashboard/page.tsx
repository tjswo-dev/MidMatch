"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { dummyCampaigns, getMockUser, formatFee, getDday } from "@/lib/dummy-data";
import { Plus, Users, ChevronRight, TrendingUp, Clock } from "lucide-react";

export default function BrandDashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const { type, name } = getMockUser();
    if (type !== "brand") {
      router.push("/login");
      return;
    }
    setUserName(name);
  }, [router]);

  const totalApplicants = dummyCampaigns.reduce((sum, c) => sum + c.applicantCount, 0);
  const activeCampaigns = dummyCampaigns.filter((c) => c.status === "active").length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-12">
        {/* Welcome */}
        <div className="mb-8">
          <p className="text-gray-500 text-sm">안녕하세요,</p>
          <h1 className="text-2xl font-bold text-gray-900">{userName || "브랜드"} 님의 대시보드</h1>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center mb-3">
              <TrendingUp size={20} className="text-rose-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{activeCampaigns}</p>
            <p className="text-xs text-gray-400 mt-1">진행 중 캠페인</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
              <Users size={20} className="text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalApplicants}</p>
            <p className="text-xs text-gray-400 mt-1">총 신청자</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mb-3">
              <Clock size={20} className="text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">3</p>
            <p className="text-xs text-gray-400 mt-1">처리 필요</p>
          </div>
        </div>

        {/* Campaign List Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">내 캠페인</h2>
          <Link
            href="/brand/campaigns/new"
            className="flex items-center gap-1.5 px-4 py-2 bg-rose-500 text-white text-sm font-medium rounded-xl hover:bg-rose-600 transition-colors"
          >
            <Plus size={15} />
            캠페인 등록
          </Link>
        </div>

        {/* Campaign Cards */}
        <div className="space-y-3">
          {dummyCampaigns.map((campaign) => {
            const dday = getDday(campaign.applicationDeadline);
            return (
              <Link
                key={campaign.id}
                href={`/brand/campaigns/${campaign.id}`}
                className="block bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={campaign.productImage}
                    alt={campaign.productName}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">{campaign.productName}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                        campaign.status === "active"
                          ? "bg-green-50 text-green-600"
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        {campaign.status === "active" ? "진행 중" : "마감"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{formatFee(campaign.fee)} · {campaign.targetCountry}</p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1 text-rose-500 font-medium">
                        <Users size={12} />
                        신청자 {campaign.applicantCount}명
                      </span>
                      <span className={`font-medium ${
                        dday === "마감" ? "text-gray-400" : "text-orange-500"
                      }`}>
                        {dday}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-300 flex-shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
