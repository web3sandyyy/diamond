import { useState, useEffect, useCallback } from "react";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedMetal: string;
}

const CART_STORAGE_KEY = "lumiere_cart";

const getInitialCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(getInitialCart);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback(
    (product: Product, quantity = 1, selectedSize?: string, selectedMetal?: string) => {
      setItems((prev) => {
        const existingIndex = prev.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.selectedSize === selectedSize &&
            item.selectedMetal === (selectedMetal || product.metal)
        );

        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex].quantity += quantity;
          return updated;
        }

        return [
          ...prev,
          {
            product,
            quantity,
            selectedSize,
            selectedMetal: selectedMetal || product.metal,
          },
        ];
      });
      setIsOpen(true);
    },
    []
  );

  const removeItem = useCallback((productId: string, selectedSize?: string, selectedMetal?: string) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === selectedSize &&
            item.selectedMetal === selectedMetal
          )
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number, selectedSize?: string, selectedMetal?: string) => {
      if (quantity < 1) {
        removeItem(productId, selectedSize, selectedMetal);
        return;
      }

      setItems((prev) =>
        prev.map((item) =>
          item.product.id === productId &&
          item.selectedSize === selectedSize &&
          item.selectedMetal === selectedMetal
            ? { ...item, quantity }
            : item
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return {
    items,
    isOpen,
    setIsOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
  };
}
