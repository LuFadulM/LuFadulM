import { notFound } from "next/navigation";
import { MOCK_PLACES } from "@/app/data/places";
import PlaceDetail from "@/components/places/PlaceDetail";
import type { Metadata } from "next";

interface PlacePageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return MOCK_PLACES.map((place) => ({ slug: place.slug }));
}

export async function generateMetadata({
  params,
}: PlacePageProps): Promise<Metadata> {
  const place = MOCK_PLACES.find((p) => p.slug === params.slug);
  if (!place) return { title: "Place Not Found" };

  return {
    title: `${place.name} — ${place.city}`,
    description:
      place.description?.slice(0, 155) ??
      `Discover ${place.name} in ${place.city}, Colombia.`,
  };
}

export default function PlacePage({ params }: PlacePageProps) {
  const place = MOCK_PLACES.find((p) => p.slug === params.slug);

  if (!place) {
    notFound();
  }

  // Mock reviews for demo
  const mockReviews = [
    {
      id: "r1",
      place_id: place.id,
      user_id: "u1",
      rating: 5,
      text: "Absolutely incredible experience. One of the best places I've visited in Colombia. The atmosphere, the food, everything was perfect.",
      helpful_count: 12,
      created_at: "2024-03-10T18:00:00Z",
      updated_at: "2024-03-10T18:00:00Z",
      profile: {
        id: "u1",
        display_name: "María García",
        avatar_url: null,
        bio: null,
        city: "Bogotá",
        is_business_owner: false,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
    },
    {
      id: "r2",
      place_id: place.id,
      user_id: "u2",
      rating: 4,
      text: "Really great spot. Highly recommend visiting if you're in the area. The service was attentive and the quality was consistent throughout.",
      helpful_count: 5,
      created_at: "2024-02-20T14:30:00Z",
      updated_at: "2024-02-20T14:30:00Z",
      profile: {
        id: "u2",
        display_name: "Carlos Ramírez",
        avatar_url: null,
        bio: null,
        city: "Medellín",
        is_business_owner: false,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
    },
  ];

  return <PlaceDetail place={place} reviews={mockReviews} isAuthenticated={false} />;
}
