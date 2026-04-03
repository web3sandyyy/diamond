import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { StoreProvider } from "@/hooks";
import { Navbar, Footer, CartDrawer, MobileBottomNav } from "@/components";
import {
  HomePage,
  CollectionPage,
  ProductPage,
  CartPage,
  CheckoutPage,
  StoryPage,
  FAQPage,
  TestimonialsPage,
  StoresPage,
  WishlistPage,
} from "@/pages";
import "./App.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();

  // Hide navbar/footer on checkout
  const isCheckout = location.pathname === "/checkout";

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <ScrollToTop />

      {!isCheckout && <Navbar onCartOpen={() => setCartOpen(true)} />}

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection/:category" element={<CollectionPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/stores" element={<StoresPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>
      </main>

      {!isCheckout && (
        <>
          <div className="pb-20 lg:pb-0">
            <Footer />
          </div>
        </>
      )}
      {!isCheckout && (
        <MobileBottomNav onCartOpen={() => setCartOpen(true)} />
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <AppContent />
      </StoreProvider>
    </BrowserRouter>
  );
}

export default App;
