import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/influencer/profile
 * 내 인플루언서 프로필 조회
 */
export async function GET() {
  try {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("influencer_profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (error && error.code !== "PGRST116") {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ profile: data ?? null });
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

/**
 * PUT /api/influencer/profile
 * 인플루언서 프로필 생성 또는 수정 (upsert)
 * Body: influencer_profiles 필드들
 */
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();

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
      return NextResponse.json({ error: "인플루언서 계정만 접근할 수 있습니다." }, { status: 403 });
    }

    const body = await request.json();
    const {
      name,
      phone,
      address,
      zip_code,
      contact_email,
      instagram_url,
      instagram_followers,
      tiktok_url,
      tiktok_followers,
      paypal_email,
    } = body;

    const { data, error } = await supabase
      .from("influencer_profiles")
      .upsert({
        user_id: user.id,
        name,
        phone,
        address,
        zip_code,
        contact_email,
        instagram_url,
        instagram_followers: instagram_followers ? Number(instagram_followers) : 0,
        tiktok_url,
        tiktok_followers: tiktok_followers ? Number(tiktok_followers) : 0,
        paypal_email,
      }, { onConflict: "user_id" })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ profile: data });
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
