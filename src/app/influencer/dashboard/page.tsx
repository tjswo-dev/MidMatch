"use client";

import { useState } from "react";
import CampaignCard from "@/components/common/CampaignCard";
import { dummyCampaigns } from "@/lib/dummy-data";
import { Search, Filter } from "lucide-react";

const PLATFORMS = ["전체", "Instagram", "TikTok", "YouTube"];
const COUNTRIES = ["전체", "미국", "일본", "베트남", "호주", "동남아시아"];

export default function InfluencerDashboardPage() {
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("전체");
  const [country, setCountry] = useState("전체");

  const filtered = dummyCampaigns.filter((c) => {
    const matchSearch = c.brandName.includes(search) || c.productName.includes(search);
    const matchPlatform = platform === "전체" || c.platform.includes(platform);
    const matchCountry = country === "전체" || c.targetCountry.includes(country);
    return matchSearch && matchPlatform && matchCountry;
  });

  return (
    <>
      {/* Search */}
      <section className="pt-6 pb-6 px-4 bg-gradient-to-b from-rose-50 to-gray-50">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-xl font-bold text-gray-900 mb-4">캠페인 탐색</h1>
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="브랜드명 또는 제품명 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-300"
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-2xl mx-auto flex gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 flex-shrink-0">
            <Filter size={14} className="text-gray-400" />
            <span className="text-xs text-gray-500 font-medium">플랫폼:</span>
            {PLATFORMS.map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  platform === p ? "bg-rose-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 ml-2 pl-2 border-l border-gray-100">
            <span className="text-xs text-gray-500 font-medium">국가:</span>
            {COUNTRIES.map((c) => (
              <button
                key={c}
                onClick={() => setCountry(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  country === c ? "bg-rose-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Grid */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        <p className="text-sm font-semibold text-gray-900 mb-4">
          진행 중인 캠페인 <span className="text-rose-500">{filtered.length}</span>개
        </p>
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p>검색 결과가 없습니다</p>
            <p className="text-xs mt-1">다른 검색어나 필터를 시도해보세요</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                href={`/influencer/campaigns/${campaign.id}`}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
