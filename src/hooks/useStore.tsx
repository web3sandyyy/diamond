import { createContext, useContext, type ReactNode } from "react";
import { useCart } from "./useCart";
import { useWishlist } from "./useWishlist";
import { useRecentlyViewed } from "./useRecentlyViewed";

type CartContextType = ReturnType<typeof useCart>;
type WishlistContextType = ReturnType<typeof useWishlist>;
type RecentlyViewedContextType = ReturnType<typeof useRecentlyViewed>;

interface StoreContextType {
  cart: CartContextType;
  wishlist: WishlistContextType;
  recentlyViewed: RecentlyViewedContextType;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const cart = useCart();
  const wishlist = useWishlist();
  const recentlyViewed = useRecentlyViewed();

  return (
    <StoreContext.Provider value={{ cart, wishlist, recentlyViewed }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
