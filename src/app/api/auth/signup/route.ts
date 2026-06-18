import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * POST /api/auth/signup
 * Body: { email, password, role: 'BRAND'|'INFLUENCER', name?, brandName?, companyName? }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, role, name, brandName, companyName, category, website } = body;

    if (!email || !password || !role) {
      return NextResponse.json(
        { error: "email, password, role은 필수입니다." },
        { status: 400 }
      );
    }

    if (!["BRAND", "INFLUENCER"].includes(role)) {
      return NextResponse.json(
        { error: "role은 BRAND 또는 INFLUENCER여야 합니다." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // 1. Supabase Auth 회원가입 (비밀번호는 Supabase가 bcrypt 암호화)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role }, // raw_user_meta_data → 트리거로 profiles 행 생성
      },
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    const userId = authData.user?.id;
    if (!userId) {
      return NextResponse.json({ error: "회원가입 처리 중 오류가 발생했습니다." }, { status: 500 });
    }

    // 2. 역할별 프로필 행 생성
    if (role === "INFLUENCER") {
      await supabase.from("influencer_profiles").insert({
        user_id: userId,
        name: name || null,
      });
    } else {
      await supabase.from("brand_profiles").insert({
        user_id: userId,
        brand_name: brandName || null,
        company_name: companyName || null,
        category: category || null,
        website: website || null,
      });
    }

    return NextResponse.json(
      { message: "회원가입이 완료되었습니다.", userId },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
