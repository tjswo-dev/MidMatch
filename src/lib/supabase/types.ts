export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: "BRAND" | "INFLUENCER";
          created_at: string;
        };
        Insert: {
          id: string;
          role: "BRAND" | "INFLUENCER";
          created_at?: string;
        };
        Update: {
          role?: "BRAND" | "INFLUENCER";
        };
      };
      influencer_profiles: {
        Row: {
          id: string;
          user_id: string;
          name: string | null;
          phone: string | null;
          address: string | null;
          zip_code: string | null;
          contact_email: string | null;
          instagram_url: string | null;
          instagram_followers: number;
          tiktok_url: string | null;
          tiktok_followers: number;
          paypal_email: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name?: string | null;
          phone?: string | null;
          address?: string | null;
          zip_code?: string | null;
          contact_email?: string | null;
          instagram_url?: string | null;
          instagram_followers?: number;
          tiktok_url?: string | null;
          tiktok_followers?: number;
          paypal_email?: string | null;
        };
        Update: {
          name?: string | null;
          phone?: string | null;
          address?: string | null;
          zip_code?: string | null;
          contact_email?: string | null;
          instagram_url?: string | null;
          instagram_followers?: number;
          tiktok_url?: string | null;
          tiktok_followers?: number;
          paypal_email?: string | null;
        };
      };
      brand_profiles: {
        Row: {
          id: string;
          user_id: string;
          company_name: string | null;
          brand_name: string | null;
          website: string | null;
          category: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          company_name?: string | null;
          brand_name?: string | null;
          website?: string | null;
          category?: string | null;
        };
        Update: {
          company_name?: string | null;
          brand_name?: string | null;
          website?: string | null;
          category?: string | null;
        };
      };
      campaigns: {
        Row: {
          id: string;
          brand_id: string;
          brand_name: string;
          product_name: string;
          product_description: string | null;
          product_image_url: string | null;
          target_country: string | null;
          target_age: string | null;
          target_gender: string;
          desired_platform: string | null;
          reward_amount: number;
          capacity: number;
          recruitment_period: string | null;
          confirm_date: string | null;
          shipping_period: string | null;
          upload_deadline: string | null;
          guidelines: string | null;
          status: "ACTIVE" | "CLOSED" | "DRAFT";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          brand_id: string;
          brand_name: string;
          product_name: string;
          product_description?: string | null;
          product_image_url?: string | null;
          target_country?: string | null;
          target_age?: string | null;
          target_gender?: string;
          desired_platform?: string | null;
          reward_amount: number;
          capacity: number;
          recruitment_period?: string | null;
          confirm_date?: string | null;
          shipping_period?: string | null;
          upload_deadline?: string | null;
          guidelines?: string | null;
          status?: "ACTIVE" | "CLOSED" | "DRAFT";
        };
        Update: {
          brand_name?: string;
          product_name?: string;
          product_description?: string | null;
          product_image_url?: string | null;
          target_country?: string | null;
          target_age?: string | null;
          target_gender?: string;
          desired_platform?: string | null;
          reward_amount?: number;
          capacity?: number;
          recruitment_period?: string | null;
          confirm_date?: string | null;
          shipping_period?: string | null;
          upload_deadline?: string | null;
          guidelines?: string | null;
          status?: "ACTIVE" | "CLOSED" | "DRAFT";
        };
      };
      applications: {
        Row: {
          id: string;
          campaign_id: string;
          influencer_id: string;
          status: "PENDING" | "APPROVED" | "REJECTED";
          message: string | null;
          agree_secondary: boolean;
          applied_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          campaign_id: string;
          influencer_id: string;
          status?: "PENDING" | "APPROVED" | "REJECTED";
          message?: string | null;
          agree_secondary?: boolean;
        };
        Update: {
          status?: "PENDING" | "APPROVED" | "REJECTED";
          message?: string | null;
        };
      };
    };
  };
};

// 편의 타입
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type InfluencerProfile = Database["public"]["Tables"]["influencer_profiles"]["Row"];
export type BrandProfile = Database["public"]["Tables"]["brand_profiles"]["Row"];
export type Campaign = Database["public"]["Tables"]["campaigns"]["Row"];
export type Application = Database["public"]["Tables"]["applications"]["Row"];
export type ApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";
export type UserRole = "BRAND" | "INFLUENCER";
