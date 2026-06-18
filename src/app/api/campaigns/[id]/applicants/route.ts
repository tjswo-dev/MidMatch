import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/campaigns/[id]/applicants
 * 인증 필요 (BRAND 본인 캠페인만)
 * Query: ?status=PENDING|APPROVED|REJECTED
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: campaignId } = await params;
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const supabase = await createClient();

    // 인증 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }

    // 브랜드가 자신의 캠페인인지 확인
    const { data: campaign } = await supabase
      .from("campaigns")
      .select("id")
      .eq("id", campaignId)
      .eq("brand_id", user.id)
      .single();

    if (!campaign) {
      return NextResponse.json({ error: "접근 권한이 없습니다." }, { status: 403 });
    }

    // 신청자 목록 + 인플루언서 프로필 join
    let query = supabase
      .from("applications")
      .select(`
        *,
        influencer_profiles (
          name,
          instagram_url,
          instagram_followers,
          tiktok_url,
          tiktok_followers
        )
      `)
      .eq("campaign_id", campaignId)
      .order("applied_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ applicants: data });
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
