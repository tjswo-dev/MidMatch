"use client";

import { useState } from "react";
import Header from "@/components/common/Header";
import CampaignCard from "@/components/common/CampaignCard";
import { dummyCampaigns } from "@/lib/dummy-data";
import { Search, Filter, Sparkles } from "lucide-react";

const PLATFORMS = ["전체", "Instagram", "TikTok", "YouTube"];
const COUNTRIES = ["전체", "미국", "일본", "베트남", "호주", "동남아시아"];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("전체");
  const [country, setCountry] = useState("전체");

  const filtered = dummyCampaigns.filter((c) => {
    const matchSearch =
      c.brandName.includes(search) || c.productName.includes(search);
    const matchPlatform =
      platform === "전체" || c.platform.includes(platform);
    const matchCountry =
      country === "전체" || c.targetCountry.includes(country);
    return matchSearch && matchPlatform && matchCountry;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-rose-50 to-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-100 rounded-full text-rose-600 text-xs font-medium mb-4">
            <Sparkles size={12} />
            K-뷰티 × 미드티어 인플루언서 매칭 플랫폼
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
            브랜드와 인플루언서를
            <br className="md:hidden" /> 연결합니다
          </h1>
          <p className="text-gray-500 text-sm md:text-base mb-8">
            팔로워 1만~10만의 진정성 있는 인플루언서와 K-뷰티 캠페인을 매칭하세요
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
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
      <section className="sticky top-16 z-40 bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-6xl mx-auto flex gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 flex-shrink-0">
            <Filter size={14} className="text-gray-400" />
            <span className="text-xs text-gray-500 font-medium">플랫폼:</span>
            {PLATFORMS.map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  platform === p
                    ? "bg-rose-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
                  country === c
                    ? "bg-rose-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Grid */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-gray-900">
            진행 중인 캠페인{" "}
            <span className="text-rose-500">{filtered.length}</span>개
          </h2>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-base">검색 결과가 없습니다</p>
            <p className="text-sm mt-1">다른 검색어나 필터를 시도해보세요</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
    </div>
  );
}
