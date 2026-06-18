export type UserType = "brand" | "influencer" | null;

export interface Campaign {
  id: string;
  brandName: string;
  productName: string;
  productDescription: string;
  productImage: string;
  targetCountry: string;
  targetAge: string;
  targetGender: string;
  platform: string;
  fee: number;
  slots: number;
  applicationDeadline: string;
  confirmDate: string;
  shippingPeriod: string;
  contentDeadline: string;
  guidelines: string;
  applicantCount: number;
  status: "active" | "closed";
}

export interface Applicant {
  id: string;
  campaignId: string;
  name: string;
  instagram: string;
  followers: number;
  engagementRate: number;
  categories: string[];
  profileImage: string;
  applicationDate: string;
  status: "pending" | "selected" | "rejected";
  message: string;
}

export const dummyCampaigns: Campaign[] = [
  {
    id: "c1",
    brandName: "LANEIGE",
    productName: "립 슬리핑 마스크",
    productDescription: "밤새 촉촉한 수분을 공급하는 베스트셀러 립 케어 제품. 달콤한 베리 향으로 수면 중에도 특별한 케어를.",
    productImage: "https://images.unsplash.com/photo-1631730486784-74757d4ab7f0?w=400&h=400&fit=crop",
    targetCountry: "미국",
    targetAge: "20-35",
    targetGender: "여성",
    platform: "Instagram",
    fee: 150000,
    slots: 10,
    applicationDeadline: "2026-07-10",
    confirmDate: "2026-07-15",
    shippingPeriod: "2026-07-20",
    contentDeadline: "2026-08-10",
    guidelines: "제품 사용 전후 비교 영상 또는 사진. 브랜드 해시태그 #LANEIGE #립슬리핑마스크 필수 포함.",
    applicantCount: 23,
    status: "active",
  },
  {
    id: "c2",
    brandName: "innisfree",
    productName: "그린티 씨드 세럼",
    productDescription: "제주 녹차 성분으로 피부 속 깊은 수분을 채워주는 시그니처 세럼.",
    productImage: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
    targetCountry: "일본",
    targetAge: "25-40",
    targetGender: "전체",
    platform: "Instagram, TikTok",
    fee: 200000,
    slots: 5,
    applicationDeadline: "2026-07-05",
    confirmDate: "2026-07-12",
    shippingPeriod: "2026-07-18",
    contentDeadline: "2026-08-05",
    guidelines: "세럼 사용 루틴 영상. 피부 개선 효과 강조. 일본어 캡션 작성 우대.",
    applicantCount: 41,
    status: "active",
  },
  {
    id: "c3",
    brandName: "COSRX",
    productName: "어드밴시드 스네일 에센스",
    productDescription: "달팽이 분비물 여과액 96% 함유. 피부 재생과 보습을 동시에.",
    productImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
    targetCountry: "미국, 캐나다",
    targetAge: "18-45",
    targetGender: "전체",
    platform: "TikTok",
    fee: 120000,
    slots: 15,
    applicationDeadline: "2026-07-20",
    confirmDate: "2026-07-25",
    shippingPeriod: "2026-07-30",
    contentDeadline: "2026-08-20",
    guidelines: "TikTok 쇼트폼 30-60초. Before/After 형식 권장. 영어 자막 필수.",
    applicantCount: 67,
    status: "active",
  },
  {
    id: "c4",
    brandName: "MISSHA",
    productName: "타임 레볼루션 에센스",
    productDescription: "발효 성분으로 피부 본연의 생기를 되살리는 안티에이징 에센스.",
    productImage: "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=400&h=400&fit=crop",
    targetCountry: "베트남",
    targetAge: "30-50",
    targetGender: "여성",
    platform: "Instagram",
    fee: 180000,
    slots: 8,
    applicationDeadline: "2026-07-15",
    confirmDate: "2026-07-22",
    shippingPeriod: "2026-07-28",
    contentDeadline: "2026-08-15",
    guidelines: "피부 케어 루틴에 자연스럽게 녹인 콘텐츠. 베트남어 캡션 필수.",
    applicantCount: 12,
    status: "active",
  },
  {
    id: "c5",
    brandName: "Dr.Jart+",
    productName: "시카페어 크림",
    productDescription: "민감한 피부를 위한 진정 크림. 호랑이 풀 추출물로 자극받은 피부를 즉각 케어.",
    productImage: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop",
    targetCountry: "호주",
    targetAge: "20-40",
    targetGender: "전체",
    platform: "Instagram, YouTube",
    fee: 250000,
    slots: 6,
    applicationDeadline: "2026-07-08",
    confirmDate: "2026-07-14",
    shippingPeriod: "2026-07-21",
    contentDeadline: "2026-08-08",
    guidelines: "민감성 피부 고민 공유 후 제품 소개. 영어 캡션. 진정성 있는 후기 형식 선호.",
    applicantCount: 34,
    status: "active",
  },
  {
    id: "c6",
    brandName: "SOME BY MI",
    productName: "AHA BHA PHA 30 Days Toner",
    productDescription: "30일 기적의 토너. 트러블 피부를 위한 산 성분 집약 케어.",
    productImage: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop",
    targetCountry: "동남아시아",
    targetAge: "15-30",
    targetGender: "전체",
    platform: "TikTok, Instagram",
    fee: 100000,
    slots: 20,
    applicationDeadline: "2026-07-25",
    confirmDate: "2026-07-30",
    shippingPeriod: "2026-08-05",
    contentDeadline: "2026-09-05",
    guidelines: "30일 챌린지 형식 권장. Day 1 / Day 30 비교 필수. 현지어 캡션 우대.",
    applicantCount: 89,
    status: "active",
  },
];

export const dummyApplicants: Applicant[] = [
  {
    id: "a1",
    campaignId: "c1",
    name: "김미래",
    instagram: "@beauty_mirae",
    followers: 45000,
    engagementRate: 4.2,
    categories: ["뷰티", "라이프스타일"],
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    applicationDate: "2026-06-15",
    status: "pending",
    message: "평소 스킨케어에 관심이 많고 립 제품 리뷰 경험이 풍부합니다. 진정성 있는 콘텐츠로 제품의 효과를 잘 전달하겠습니다.",
  },
  {
    id: "a2",
    campaignId: "c1",
    name: "이하늘",
    instagram: "@sky_beauty",
    followers: 82000,
    engagementRate: 3.8,
    categories: ["뷰티", "패션"],
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    applicationDate: "2026-06-16",
    status: "selected",
    message: "미국 거주 중으로 현지 타겟 오디언스에게 효과적으로 전달 가능합니다.",
  },
  {
    id: "a3",
    campaignId: "c1",
    name: "박소연",
    instagram: "@soyeon_glow",
    followers: 28000,
    engagementRate: 6.1,
    categories: ["뷰티", "건강"],
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    applicationDate: "2026-06-17",
    status: "pending",
    message: "높은 참여율로 실제 구매로 이어지는 콘텐츠를 제작합니다.",
  },
  {
    id: "a4",
    campaignId: "c1",
    name: "최윤서",
    instagram: "@yunseo_beauty",
    followers: 61000,
    engagementRate: 3.2,
    categories: ["뷰티", "여행"],
    profileImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
    applicationDate: "2026-06-18",
    status: "rejected",
    message: "뷰티 제품 리뷰 전문으로 팔로워들의 신뢰를 얻고 있습니다.",
  },
  {
    id: "a5",
    campaignId: "c1",
    name: "정다은",
    instagram: "@daeun_style",
    followers: 39000,
    engagementRate: 5.5,
    categories: ["뷰티", "라이프스타일"],
    profileImage: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop",
    applicationDate: "2026-06-18",
    status: "pending",
    message: "20-30대 여성 팔로워 85% 보유. 뷰티 제품 구매 전환율이 높습니다.",
  },
];

// Mock auth helpers
export function getMockUser(): { type: UserType; name: string } {
  if (typeof window === "undefined") return { type: null, name: "" };
  const type = localStorage.getItem("mm_user_type") as UserType;
  const name = localStorage.getItem("mm_user_name") || "";
  return { type, name };
}

export function setMockUser(type: UserType, name: string) {
  if (typeof window === "undefined") return;
  if (type) {
    localStorage.setItem("mm_user_type", type);
    localStorage.setItem("mm_user_name", name);
  } else {
    localStorage.removeItem("mm_user_type");
    localStorage.removeItem("mm_user_name");
  }
}

export function formatFee(fee: number): string {
  return fee.toLocaleString("ko-KR") + "원";
}

export function getDday(deadline: string): string {
  const today = new Date();
  const target = new Date(deadline);
  const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return "마감";
  if (diff === 0) return "D-Day";
  return `D-${diff}`;
}
