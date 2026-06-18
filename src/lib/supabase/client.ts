import { createBrowserClient } from "@supabase/ssr";

// Supabase 프로젝트 연결 후 `supabase gen types typescript` 로 타입 자동 생성 권장
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
