import { Home, Search, Heart, ShoppingBag, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useStore } from "@/hooks";

interface MobileBottomNavProps {
  onCartOpen: () => void;
}

export function MobileBottomNav({ onCartOpen }: MobileBottomNavProps) {
  const location = useLocation();
  const { cart, wishlist } = useStore();

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Search", href: "/collection/all" },
    { icon: Heart, label: "Wishlist", href: "/wishlist", badge: wishlist.count },
    { icon: ShoppingBag, label: "Bag", href: "#cart", badge: cart.totalItems, action: onCartOpen },
    { icon: User, label: "Account", href: "/account" },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-100 safe-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          const content = (
            <>
              <div className="relative">
                <item.icon
                  className={cn(
                    "w-6 h-6 transition-colors",
                    isActive ? "text-neutral-900" : "text-neutral-400"
                  )}
                />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-neutral-900 text-white text-[10px] flex items-center justify-center rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] mt-1",
                  isActive ? "text-neutral-900 font-medium" : "text-neutral-500"
                )}
              >
                {item.label}
              </span>
            </>
          );

          if (item.action) {
            return (
              <button
                key={item.label}
                onClick={item.action}
                className="flex flex-col items-center justify-center flex-1 py-2"
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={item.href}
              to={item.href}
              className="flex flex-col items-center justify-center flex-1 py-2"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
