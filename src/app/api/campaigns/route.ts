import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/campaigns
 * Query: ?platform=Instagram&country=미국&search=키워드&limit=20&offset=0
 * 공개 캠페인 목록 (로그인 불필요)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get("platform");
    const country = searchParams.get("country");
    const search = searchParams.get("search");
    const limit = Number(searchParams.get("limit") ?? "20");
    const offset = Number(searchParams.get("offset") ?? "0");

    const supabase = await createClient();

    let query = supabase
      .from("campaigns")
      .select("*", { count: "exact" })
      .eq("status", "ACTIVE")
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (platform) {
      query = query.ilike("desired_platform", `%${platform}%`);
    }
    if (country) {
      query = query.ilike("target_country", `%${country}%`);
    }
    if (search) {
      query = query.or(
        `brand_name.ilike.%${search}%,product_name.ilike.%${search}%`
      );
    }

    const { data, error, count } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ campaigns: data, total: count });
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

/**
 * POST /api/campaigns
 * 인증 필요 (BRAND 전용)
 * Body: Campaign 등록 데이터
 */
export async function POST(request: NextRequest) {
  try {
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
      return NextResponse.json({ error: "브랜드 계정만 캠페인을 등록할 수 있습니다." }, { status: 403 });
    }

    const body = await request.json();
    const {
      brand_name,
      product_name,
      product_description,
      product_image_url,
      target_country,
      target_age,
      target_gender,
      desired_platform,
      reward_amount,
      capacity,
      recruitment_period,
      confirm_date,
      shipping_period,
      upload_deadline,
      guidelines,
    } = body;

    if (!brand_name || !product_name || !reward_amount || !capacity) {
      return NextResponse.json(
        { error: "brand_name, product_name, reward_amount, capacity는 필수입니다." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("campaigns")
      .insert({
        brand_id: user.id,
        brand_name,
        product_name,
        product_description,
        product_image_url,
        target_country,
        target_age,
        target_gender: target_gender ?? "전체",
        desired_platform,
        reward_amount: Number(reward_amount),
        capacity: Number(capacity),
        recruitment_period,
        confirm_date,
        shipping_period,
        upload_deadline,
        guidelines,
        status: "ACTIVE",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ campaign: data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
