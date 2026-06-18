import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/brand/dashboard
 * 브랜드 대시보드 데이터: 내 캠페인 목록 + 신청자 수 집계
 */
export async function GET() {
  try {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }

    // 내 캠페인 목록
    const { data: campaigns, error } = await supabase
      .from("campaigns")
      .select("*")
      .eq("brand_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 캠페인별 신청자 수 집계
    const campaignIds = (campaigns ?? []).map((c) => c.id);
    let applicantCounts: Record<string, number> = {};

    if (campaignIds.length > 0) {
      const { data: counts } = await supabase
        .from("applications")
        .select("campaign_id")
        .in("campaign_id", campaignIds);

      (counts ?? []).forEach((row) => {
        applicantCounts[row.campaign_id] = (applicantCounts[row.campaign_id] ?? 0) + 1;
      });
    }

    const enriched = (campaigns ?? []).map((c) => ({
      ...c,
      applicant_count: applicantCounts[c.id] ?? 0,
    }));

    return NextResponse.json({ campaigns: enriched });
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
