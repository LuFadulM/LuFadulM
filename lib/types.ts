export type PriceLevel = "$" | "$$" | "$$$" | "$$$$";

export type Category =
  | "Restaurants"
  | "Cafés"
  | "Bars"
  | "Hotels"
  | "Attractions"
  | "Nightlife";

export interface Profile {
  id: string;
  display_name: string;
  avatar_url?: string | null;
  bio?: string | null;
  city?: string | null;
  is_business_owner: boolean;
  created_at: string;
  updated_at: string;
}

export interface Place {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  city: string;
  neighborhood?: string | null;
  category: Category;
  cuisine?: string | null;
  price_level?: PriceLevel | null;
  hours?: string | null;
  phone?: string | null;
  website?: string | null;
  instagram?: string | null;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  cover_image_url?: string | null;
  is_featured: boolean;
  is_claimed: boolean;
  claimed_by?: string | null;
  avg_rating: number;
  review_count: number;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface PlaceImage {
  id: string;
  place_id: string;
  image_url: string;
  caption?: string | null;
  uploaded_by?: string | null;
  created_at: string;
}

export interface Review {
  id: string;
  place_id: string;
  user_id: string;
  rating: number;
  text?: string | null;
  helpful_count: number;
  created_at: string;
  updated_at: string;
  profile?: Profile;
}

export interface ReviewImage {
  id: string;
  review_id: string;
  image_url: string;
  created_at: string;
}

export interface HelpfulVote {
  user_id: string;
  review_id: string;
}

export interface SavedPlace {
  user_id: string;
  place_id: string;
  created_at: string;
  place?: Place;
}

export type PlacementType = "category_top" | "city_spotlight" | "homepage_featured" | "curated_list" | "search_boost";
export type PaymentStatus = "pending" | "paid" | "expired" | "cancelled";
export type PlanType = "monthly" | "quarterly" | "founding_partner" | "custom";

export interface FeaturedPlacement {
  id: string;
  place_id: string;
  place_slug?: string; // used in mock/seed data for easy lookup
  city?: string | null;
  category?: string | null;
  placement_type: PlacementType;
  label_text: string;
  is_active: boolean;
  start_at: string;
  end_at: string;
  payment_status: PaymentStatus;
  plan_type: PlanType;
  price_paid?: number | null;
  rank_priority: number; // 1–10
  notes?: string | null;
  created_at: string;
  updated_at: string;
  place?: Place; // joined
}

export interface RankedPlace extends Place {
  rankScore: number;
  isFeaturedPlacement: boolean;
  featuredLabelText?: string;
  featuredPriority?: number;
  placementId?: string;
}

export type AnalyticsEventType =
  | "impression"
  | "card_click"
  | "profile_view"
  | "save"
  | "share"
  | "directions_click"
  | "website_click"
  | "instagram_click"
  | "phone_click";

export type AnalyticsSurface =
  | "homepage"
  | "category_page"
  | "city_page"
  | "search_results"
  | "curated_list";

export type PlaceTier = "iconic" | "hidden_gem" | "solid_pick";
export type PlaceStatus = "approved" | "candidate" | "watchlist" | "rejected";
export type PlaceConfidence = "high" | "medium" | "low";

export interface CuratedPlace extends Place {
  subcategory?: string;
  short_description?: string;
  hyex_score?: number;
  tier?: PlaceTier;
  why_hyex?: string;
  editorial_notes?: string;
  status?: PlaceStatus;
  confidence?: PlaceConfidence;
  source_urls?: string[];
}

export type FilterCity =
  | "All"
  | "Bogotá"
  | "Medellín"
  | "Cartagena"
  | "Cali"
  | "Santa Marta"
  | "Barranquilla"
  | "Salento"
  | "Villa de Leyva"
  | "Popayán"
  | "San Andrés"
  | "Barichara"
  | "San Gil"
  | "Manizales"
  | "Pereira"
  | "Bucaramanga"
  | "Leticia"
  | string;

export type FilterPrice = "All" | "$" | "$$" | "$$$" | "$$$$";

export type SortOption = "Rating" | "Newest" | "Most Reviewed";

export interface PlaceFilters {
  city: FilterCity;
  price: FilterPrice;
  sort: SortOption;
  category: Category | "All";
  search: string;
}
