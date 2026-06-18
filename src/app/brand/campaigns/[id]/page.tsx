"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  dummyCampaigns,
  dummyApplicants,
  formatFee,
  Applicant,
} from "@/lib/dummy-data";
import {
  ArrowLeft,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  AtSign,
  TrendingUp,
  MessageSquare,
} from "lucide-react";

const STATUS_LABEL: Record<Applicant["status"], { label: string; color: string }> = {
  pending: { label: "검토 중", color: "bg-yellow-50 text-yellow-600 border-yellow-200" },
  selected: { label: "선정 완료", color: "bg-green-50 text-green-600 border-green-200" },
  rejected: { label: "미선정", color: "bg-gray-50 text-gray-400 border-gray-200" },
};

export default function BrandCampaignDetailPage() {
  const { id } = useParams();
  const campaign = dummyCampaigns.find((c) => c.id === id);
  const [applicants, setApplicants] = useState(
    dummyApplicants.filter((a) => a.campaignId === id)
  );
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | Applicant["status"]>("all");

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">캠페인을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const handleSelect = (applicantId: string) => {
    setApplicants((prev) =>
      prev.map((a) =>
        a.id === applicantId ? { ...a, status: "selected" } : a
      )
    );
    setSelectedApplicant(null);
  };

  const handleReject = (applicantId: string) => {
    setApplicants((prev) =>
      prev.map((a) =>
        a.id === applicantId ? { ...a, status: "rejected" } : a
      )
    );
    setSelectedApplicant(null);
  };

  const filtered = applicants.filter(
    (a) => filterStatus === "all" || a.status === filterStatus
  );

  const selectedCount = applicants.filter((a) => a.status === "selected").length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-12">
        <Link
          href="/brand/dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          대시보드로
        </Link>

        {/* Campaign Header */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center gap-4">
            <img
              src={campaign.productImage}
              alt={campaign.productName}
              className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <p className="text-xs text-gray-400 mb-1">{campaign.brandName}</p>
              <h1 className="text-xl font-bold text-gray-900 mb-2">{campaign.productName}</h1>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>{formatFee(campaign.fee)}</span>
                <span>·</span>
                <span>{campaign.targetCountry}</span>
                <span>·</span>
                <span>{campaign.platform}</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-2xl font-bold text-rose-500">{selectedCount}</div>
              <div className="text-xs text-gray-400">/ {campaign.slots}명 선정</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
              <span>선정 현황</span>
              <span>{Math.round((selectedCount / campaign.slots) * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-rose-500 rounded-full transition-all"
                style={{ width: `${Math.min((selectedCount / campaign.slots) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Applicant Section */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">
            신청자 목록{" "}
            <span className="text-rose-500">{applicants.length}명</span>
          </h2>
          {/* Filter */}
          <div className="flex gap-2">
            {(["all", "pending", "selected", "rejected"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  filterStatus === s
                    ? "bg-rose-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {s === "all" ? "전체" : s === "pending" ? "검토 중" : s === "selected" ? "선정" : "미선정"}
              </button>
            ))}
          </div>
        </div>

        {/* Applicant Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-sm">해당하는 신청자가 없습니다.</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">인플루언서</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-3 py-3">팔로워</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-3 py-3">참여율</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-3 py-3">상태</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-3 py-3">액션</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((applicant) => (
                  <tr key={applicant.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={applicant.profileImage}
                          alt={applicant.name}
                          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                        />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{applicant.name}</p>
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <AtSign size={11} />
                            {applicant.instagram}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <span className="text-sm text-gray-700 font-medium">
                        {(applicant.followers / 10000).toFixed(1)}만
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <span className={`text-sm font-medium ${
                        applicant.engagementRate >= 5 ? "text-green-600" : "text-gray-700"
                      }`}>
                        {applicant.engagementRate}%
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${STATUS_LABEL[applicant.status].color}`}>
                        {STATUS_LABEL[applicant.status].label}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedApplicant(applicant)}
                          className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors"
                          title="상세 보기"
                        >
                          <MessageSquare size={15} />
                        </button>
                        {applicant.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleSelect(applicant.id)}
                              className="p-1.5 text-gray-400 hover:text-green-500 transition-colors"
                              title="선정하기"
                            >
                              <CheckCircle size={15} />
                            </button>
                            <button
                              onClick={() => handleReject(applicant.id)}
                              className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"
                              title="미선정"
                            >
                              <XCircle size={15} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Applicant Detail Modal */}
      {selectedApplicant && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedApplicant(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-5">
                <img
                  src={selectedApplicant.profileImage}
                  alt={selectedApplicant.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-gray-900">{selectedApplicant.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <AtSign size={12} />
                    {selectedApplicant.instagram}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Users size={12} />
                      {(selectedApplicant.followers / 10000).toFixed(1)}만
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <TrendingUp size={12} />
                      {selectedApplicant.engagementRate}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {selectedApplicant.categories.map((cat) => (
                  <span key={cat} className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    {cat}
                  </span>
                ))}
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-5">
                <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                  <MessageSquare size={12} />
                  신청 메시지
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">{selectedApplicant.message}</p>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400 mb-5">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  신청일: {selectedApplicant.applicationDate}
                </span>
              </div>

              {selectedApplicant.status === "pending" ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleReject(selectedApplicant.id)}
                    className="flex-1 py-3 border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <XCircle size={16} />
                    미선정
                  </button>
                  <button
                    onClick={() => handleSelect(selectedApplicant.id)}
                    className="flex-1 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <CheckCircle size={16} />
                    선정하기
                  </button>
                </div>
              ) : (
                <div className={`py-3 rounded-xl text-center text-sm font-medium ${STATUS_LABEL[selectedApplicant.status].color} border`}>
                  {STATUS_LABEL[selectedApplicant.status].label}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
