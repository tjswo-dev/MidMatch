"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { dummyCampaigns, getMockUser, formatFee } from "@/lib/dummy-data";
import {
  User,
  Phone,
  MapPin,
  AtSign,
  CheckCircle,
  Clock,
  XCircle,
  Package,
  ChevronRight,
  Edit3,
} from "lucide-react";

type TabType = "profile" | "applications";
type AppStatus = "pending" | "selected" | "rejected";

const mockApplications = [
  { campaignId: "c1", status: "selected" as AppStatus, appliedAt: "2026-06-15" },
  { campaignId: "c3", status: "pending" as AppStatus, appliedAt: "2026-06-16" },
  { campaignId: "c5", status: "rejected" as AppStatus, appliedAt: "2026-06-10" },
];

const STATUS_CONFIG: Record<AppStatus, { label: string; icon: React.ReactNode; color: string }> = {
  pending: {
    label: "대기 중",
    icon: <Clock size={14} />,
    color: "bg-yellow-50 text-yellow-600 border-yellow-200",
  },
  selected: {
    label: "선정 완료",
    icon: <CheckCircle size={14} />,
    color: "bg-green-50 text-green-600 border-green-200",
  },
  rejected: {
    label: "탈락",
    icon: <XCircle size={14} />,
    color: "bg-gray-50 text-gray-400 border-gray-200",
  },
};

export default function InfluencerProfilePage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [tab, setTab] = useState<TabType>("profile");
  const [profileForm, setProfileForm] = useState({
    name: "",
    phone: "",
    address: "",
    zipCode: "",
    instagram: "",
    tiktok: "",
    followers: "",
  });
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const { type, name } = getMockUser();
    if (type !== "influencer") {
      router.push("/login");
      return;
    }
    setUserName(name);
    setProfileForm((prev) => ({ ...prev, name }));
  }, [router]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const appliedCampaigns = mockApplications.map((app) => ({
    ...app,
    campaign: dummyCampaigns.find((c) => c.id === app.campaignId),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {userName.charAt(0) || "U"}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{userName || "인플루언서"} 님</h1>
              <p className="text-sm text-gray-400">인플루언서 계정</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-gray-50">
            <div className="text-center">
              <p className="text-xl font-bold text-gray-900">{mockApplications.length}</p>
              <p className="text-xs text-gray-400">총 신청</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-green-500">
                {mockApplications.filter((a) => a.status === "selected").length}
              </p>
              <p className="text-xs text-gray-400">선정</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-yellow-500">
                {mockApplications.filter((a) => a.status === "pending").length}
              </p>
              <p className="text-xs text-gray-400">대기 중</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            onClick={() => setTab("profile")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
              tab === "profile"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <User size={16} />
            본인 정보
          </button>
          <button
            onClick={() => setTab("applications")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
              tab === "applications"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Package size={16} />
            캠페인 이력
          </button>
        </div>

        {/* Profile Tab */}
        {tab === "profile" && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-gray-900">기본 정보</h2>
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-1.5 text-sm text-rose-500 hover:text-rose-600 transition-colors"
                >
                  <Edit3 size={14} />
                  수정
                </button>
              ) : null}
            </div>

            {saved && (
              <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm flex items-center gap-2">
                <CheckCircle size={16} />
                저장되었습니다.
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 flex items-center gap-1">
                  <User size={12} /> 이름
                </label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  disabled={!editing}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 flex items-center gap-1">
                  <Phone size={12} /> 전화번호
                </label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  disabled={!editing}
                  placeholder="010-0000-0000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 flex items-center gap-1">
                  <MapPin size={12} /> 주소
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={profileForm.zipCode}
                    onChange={(e) => setProfileForm({ ...profileForm, zipCode: e.target.value })}
                    disabled={!editing}
                    placeholder="우편번호"
                    className="w-32 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                  {editing && (
                    <button
                      type="button"
                      className="px-4 py-3 bg-gray-100 text-gray-700 text-sm rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      검색
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={profileForm.address}
                  onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                  disabled={!editing}
                  placeholder="상세 주소"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 flex items-center gap-1">
                  <AtSign size={12} /> Instagram
                </label>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-rose-300">
                  <span className="pl-4 text-gray-400 text-sm">@</span>
                  <input
                    type="text"
                    value={profileForm.instagram}
                    onChange={(e) => setProfileForm({ ...profileForm, instagram: e.target.value })}
                    disabled={!editing}
                    placeholder="계정명"
                    className="flex-1 px-2 py-3 text-sm focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">TikTok</label>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-rose-300">
                  <span className="pl-4 text-gray-400 text-sm">@</span>
                  <input
                    type="text"
                    value={profileForm.tiktok}
                    onChange={(e) => setProfileForm({ ...profileForm, tiktok: e.target.value })}
                    disabled={!editing}
                    placeholder="계정명"
                    className="flex-1 px-2 py-3 text-sm focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">팔로워 수</label>
                <select
                  value={profileForm.followers}
                  onChange={(e) => setProfileForm({ ...profileForm, followers: e.target.value })}
                  disabled={!editing}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 disabled:bg-gray-50 disabled:text-gray-500 bg-white"
                >
                  <option value="">선택해주세요</option>
                  <option value="10000-30000">1만 ~ 3만</option>
                  <option value="30000-50000">3만 ~ 5만</option>
                  <option value="50000-100000">5만 ~ 10만</option>
                </select>
              </div>

              {editing && (
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="flex-1 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-rose-500 text-white font-semibold rounded-xl hover:bg-rose-600 transition-colors text-sm"
                  >
                    저장
                  </button>
                </div>
              )}
            </form>
          </div>
        )}

        {/* Applications Tab */}
        {tab === "applications" && (
          <div className="space-y-3">
            {appliedCampaigns.map(({ campaign, status, appliedAt }) => {
              if (!campaign) return null;
              const config = STATUS_CONFIG[status];
              return (
                <Link
                  key={campaign.id}
                  href={`/influencer/campaigns/${campaign.id}`}
                  className="block bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={campaign.productImage}
                      alt={campaign.productName}
                      className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-xs text-gray-400">{campaign.brandName}</p>
                        <span className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.color}`}>
                          {config.icon}
                          {config.label}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">{campaign.productName}</h3>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span>{formatFee(campaign.fee)}</span>
                        <span>신청일: {appliedAt}</span>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
                  </div>
                </Link>
              );
            })}

            {appliedCampaigns.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <Package size={40} className="mx-auto mb-3 text-gray-200" />
                <p className="text-sm">아직 신청한 캠페인이 없습니다</p>
                <Link
                  href="/"
                  className="inline-block mt-4 px-5 py-2.5 bg-rose-500 text-white text-sm font-medium rounded-xl hover:bg-rose-600 transition-colors"
                >
                  캠페인 둘러보기
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
