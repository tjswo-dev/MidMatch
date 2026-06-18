import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { ApplicationStatus } from "@/lib/supabase/types";

/**
 * PATCH /api/applications/[id]
 * 신청 상태 변경 (BRAND만 — 선정/탈락 처리)
 * Body: { status: 'APPROVED' | 'REJECTED' }
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: applicationId } = await params;
    const supabase = await createClient();

    // 인증 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }

    // 브랜드 권한 확인
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "BRAND") {
      return NextResponse.json({ error: "브랜드 계정만 선정/탈락 처리할 수 있습니다." }, { status: 403 });
    }

    const body = await request.json();
    const status = body.status as ApplicationStatus;

    if (!["APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json(
        { error: "status는 APPROVED 또는 REJECTED여야 합니다." },
        { status: 400 }
      );
    }

    // 신청 조회
    const { data: application } = await supabase
      .from("applications")
      .select("id, campaign_id")
      .eq("id", applicationId)
      .single();

    if (!application) {
      return NextResponse.json({ error: "신청을 찾을 수 없습니다." }, { status: 404 });
    }

    // 해당 신청이 본인 캠페인의 것인지 확인
    const { data: relatedCampaign } = await supabase
      .from("campaigns")
      .select("brand_id, capacity")
      .eq("id", application.campaign_id)
      .single();

    if (relatedCampaign?.brand_id !== user.id) {
      return NextResponse.json({ error: "접근 권한이 없습니다." }, { status: 403 });
    }

    // APPROVED 처리 시 capacity 초과 확인
    if (status === "APPROVED") {
      const { count: approvedCount } = await supabase
        .from("applications")
        .select("*", { count: "exact", head: true })
        .eq("campaign_id", application.campaign_id)
        .eq("status", "APPROVED");

      if ((approvedCount ?? 0) >= (relatedCampaign?.capacity ?? 0)) {
        return NextResponse.json({ error: "모집 인원이 마감되었습니다." }, { status: 400 });
      }
    }

    // 상태 업데이트
    const { data, error } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", applicationId)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ application: data });
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
