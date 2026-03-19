"use client";

import { useState, useCallback } from "react";
import { Place } from "@/lib/types";

interface UseSavedPlacesReturn {
  savedPlaceIds: Set<string>;
  savedPlaces: Place[];
  isLoading: boolean;
  isSaved: (placeId: string) => boolean;
  toggleSave: (place: Place) => Promise<void>;
  fetchSaved: () => Promise<void>;
}

export function useSavedPlaces(): UseSavedPlacesReturn {
  const [savedPlaceIds, setSavedPlaceIds] = useState<Set<string>>(new Set());
  const [savedPlaces, setSavedPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSaved = useCallback(async () => {
    setIsLoading(true);
    try {
      // In production: fetch from Supabase
      // const { data } = await supabase
      //   .from('saved_places')
      //   .select('*, place:places(*)')
      //   .eq('user_id', user.id);
      // setSavedPlaceIds(new Set(data?.map(s => s.place_id) ?? []));
      // setSavedPlaces(data?.map(s => s.place).filter(Boolean) ?? []);
    } catch (err) {
      console.error("Failed to fetch saved places:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const isSaved = useCallback(
    (placeId: string) => savedPlaceIds.has(placeId),
    [savedPlaceIds]
  );

  const toggleSave = useCallback(
    async (place: Place) => {
      const wasSaved = savedPlaceIds.has(place.id);

      // Optimistic update
      setSavedPlaceIds((prev) => {
        const next = new Set(prev);
        if (wasSaved) {
          next.delete(place.id);
        } else {
          next.add(place.id);
        }
        return next;
      });

      setSavedPlaces((prev) => {
        if (wasSaved) {
          return prev.filter((p) => p.id !== place.id);
        } else {
          return [place, ...prev];
        }
      });

      try {
        if (wasSaved) {
          // In production: delete from Supabase
          // await supabase.from('saved_places').delete()
          //   .eq('user_id', user.id).eq('place_id', place.id);
        } else {
          // In production: insert to Supabase
          // await supabase.from('saved_places').insert({
          //   user_id: user.id, place_id: place.id
          // });
        }
      } catch (err) {
        // Revert on error
        setSavedPlaceIds((prev) => {
          const next = new Set(prev);
          if (wasSaved) {
            next.add(place.id);
          } else {
            next.delete(place.id);
          }
          return next;
        });
        setSavedPlaces((prev) => {
          if (wasSaved) {
            return [place, ...prev];
          } else {
            return prev.filter((p) => p.id !== place.id);
          }
        });
        console.error("Failed to toggle saved place:", err);
      }
    },
    [savedPlaceIds]
  );

  return { savedPlaceIds, savedPlaces, isLoading, isSaved, toggleSave, fetchSaved };
}
