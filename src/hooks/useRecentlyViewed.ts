import { useState, useEffect, useCallback } from "react";
import type { Product } from "@/data/products";

const RECENTLY_VIEWED_STORAGE_KEY = "lumiere_recently_viewed";
const MAX_ITEMS = 10;

const getInitialRecentlyViewed = (): Product[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(RECENTLY_VIEWED_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export function useRecentlyViewed() {
  const [items, setItems] = useState<Product[]>(getInitialRecentlyViewed);

  useEffect(() => {
    localStorage.setItem(RECENTLY_VIEWED_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      // Remove if already exists
      const filtered = prev.filter((item) => item.id !== product.id);
      // Add to beginning
      const updated = [product, ...filtered];
      // Keep only MAX_ITEMS
      return updated.slice(0, MAX_ITEMS);
    });
  }, []);

  const clearItems = useCallback(() => {
    setItems([]);
  }, []);

  return {
    items,
    addItem,
    clearItems,
  };
}
