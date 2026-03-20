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
