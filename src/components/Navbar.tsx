import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Search, Heart, ShoppingBag, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { BRAND, NAV_LINKS } from "@/constants";
import { useStore } from "@/hooks";

interface NavbarProps {
  onCartOpen: () => void;
  onSearchOpen?: () => void;
}

export function Navbar({ onCartOpen }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cart, wishlist } = useStore();

  // Check if we're on the homepage for transparent header
  const isHomePage = location.pathname === "/";
  const showWhiteText = isHomePage && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      {/* Top Bar */}
      <div className={cn(
        "hidden lg:block text-center py-2 text-sm tracking-wide transition-colors",
        showWhiteText ? "bg-black/20 text-white backdrop-blur-sm" : "bg-neutral-900 text-white"
      )}>
        Complimentary Shipping on Orders Over €2,500 | Book a Private Consultation
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                className="lg:hidden p-2 -ml-2"
                aria-label="Open menu"
              >
                <Menu className={cn("w-6 h-6", showWhiteText ? "text-white" : "text-neutral-900")} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:w-96 p-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-6 py-4 border-b">
                  <Link to="/" className="font-serif text-xl tracking-wider">
                    {BRAND.name}
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto py-6">
                  <nav className="space-y-1 px-4">
                    {NAV_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className="block px-4 py-3 text-lg hover:bg-neutral-50 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                    <div className="border-t my-4" />
                    <Link
                      to="/faq"
                      className="block px-4 py-3 text-lg hover:bg-neutral-50 transition-colors"
                    >
                      FAQs
                    </Link>
                    <Link
                      to="/stores"
                      className="block px-4 py-3 text-lg hover:bg-neutral-50 transition-colors"
                    >
                      Find a Store
                    </Link>
                    <Link
                      to="/testimonials"
                      className="block px-4 py-3 text-lg hover:bg-neutral-50 transition-colors"
                    >
                      Testimonials
                    </Link>
                  </nav>
                </div>
                <div className="border-t px-6 py-4">
                  <p className="text-sm text-neutral-500">{BRAND.phone}</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link
            to="/"
            className={cn(
              "font-serif text-xl lg:text-2xl tracking-wider transition-colors",
              showWhiteText ? "text-white" : "text-neutral-900"
            )}
          >
            {BRAND.name}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm tracking-wide transition-colors",
                  showWhiteText 
                    ? "text-white/90 hover:text-white" 
                    : "text-neutral-700 hover:text-neutral-900",
                  location.pathname === link.href && "font-medium"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            <button
              className={cn(
                "hidden lg:flex p-2 rounded-full transition-colors",
                showWhiteText ? "hover:bg-white/10" : "hover:bg-neutral-100"
              )}
              aria-label="Search"
            >
              <Search className={cn("w-5 h-5", showWhiteText ? "text-white" : "text-neutral-900")} />
            </button>
            <button
              className={cn(
                "p-2 rounded-full transition-colors hidden lg:flex",
                showWhiteText ? "hover:bg-white/10" : "hover:bg-neutral-100"
              )}
              aria-label="Account"
            >
              <User className={cn("w-5 h-5", showWhiteText ? "text-white" : "text-neutral-900")} />
            </button>
            <Link
              to="/wishlist"
              className={cn(
                "relative p-2 rounded-full transition-colors",
                showWhiteText ? "hover:bg-white/10" : "hover:bg-neutral-100"
              )}
              aria-label="Wishlist"
            >
              <Heart className={cn("w-5 h-5", showWhiteText ? "text-white" : "text-neutral-900")} />
              {wishlist.count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-neutral-900 text-xs flex items-center justify-center rounded-full font-medium">
                  {wishlist.count}
                </span>
              )}
            </Link>
            <button
              onClick={onCartOpen}
              className={cn(
                "relative p-2 rounded-full transition-colors",
                showWhiteText ? "hover:bg-white/10" : "hover:bg-neutral-100"
              )}
              aria-label="Cart"
            >
              <ShoppingBag className={cn("w-5 h-5", showWhiteText ? "text-white" : "text-neutral-900")} />
              {cart.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-neutral-900 text-xs flex items-center justify-center rounded-full font-medium">
                  {cart.totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
