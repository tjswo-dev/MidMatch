import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * POST /api/campaigns/[id]/apply
 * 인증 필요 (INFLUENCER 전용)
 * Body: { message?, agree_secondary? }
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: campaignId } = await params;
    const supabase = await createClient();

    // 인증 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }

    // 인플루언서 권한 확인
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "INFLUENCER") {
      return NextResponse.json({ error: "인플루언서 계정만 신청할 수 있습니다." }, { status: 403 });
    }

    // 캠페인 존재 및 모집 중 확인
    const { data: campaign } = await supabase
      .from("campaigns")
      .select("id, status, capacity")
      .eq("id", campaignId)
      .single();

    if (!campaign) {
      return NextResponse.json({ error: "캠페인을 찾을 수 없습니다." }, { status: 404 });
    }
    if (campaign.status !== "ACTIVE") {
      return NextResponse.json({ error: "모집이 마감된 캠페인입니다." }, { status: 400 });
    }

    // 선정 완료 인원 확인 (capacity 초과 방지)
    const { count: approvedCount } = await supabase
      .from("applications")
      .select("*", { count: "exact", head: true })
      .eq("campaign_id", campaignId)
      .eq("status", "APPROVED");

    if ((approvedCount ?? 0) >= campaign.capacity) {
      return NextResponse.json({ error: "선정 인원이 마감되었습니다." }, { status: 400 });
    }

    const body = await request.json();
    const { message, agree_secondary } = body;

    // 신청 생성 (unique 제약으로 중복 신청 자동 방지)
    const { data, error } = await supabase
      .from("applications")
      .insert({
        campaign_id: campaignId,
        influencer_id: user.id,
        message: message || null,
        agree_secondary: agree_secondary ?? false,
        status: "PENDING",
      })
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ error: "이미 신청한 캠페인입니다." }, { status: 409 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ application: data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

/**
 * GET /api/campaigns/[id]/apply
 * 현재 유저의 해당 캠페인 신청 여부 확인
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: campaignId } = await params;
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ applied: false, application: null });
    }

    const { data } = await supabase
      .from("applications")
      .select("*")
      .eq("campaign_id", campaignId)
      .eq("influencer_id", user.id)
      .single();

    return NextResponse.json({ applied: !!data, application: data });
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
