import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";
import { useStore } from "@/hooks";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { wishlist } = useStore();

  const isWishlisted = wishlist.isInWishlist(product.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-EU", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link to={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden bg-neutral-50">
        {/* Skeleton loader */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-neutral-100 animate-pulse" />
        )}
        
        {/* Main Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out",
            isHovered && product.images[1] ? "opacity-0 scale-105" : "opacity-100 scale-100"
          )}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        {/* Hover Image */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} - alternate view`}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out",
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
            loading="lazy"
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="inline-flex items-center px-2.5 py-1 bg-white/90 backdrop-blur-sm text-neutral-800 text-[10px] font-medium tracking-wider uppercase">
              New In
            </span>
          )}
          {product.isBestseller && (
            <span className="inline-flex items-center px-2.5 py-1 bg-amber-50 text-amber-700 text-[10px] font-medium tracking-wider uppercase border border-amber-200/50">
              ★ Bestseller
            </span>
          )}
          {product.originalPrice && (
            <span className="inline-flex items-center px-2.5 py-1 bg-rose-50 text-rose-600 text-[10px] font-medium tracking-wider uppercase">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            wishlist.toggleItem(product);
          }}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full transition-all duration-300",
            "bg-white/80 backdrop-blur-sm hover:bg-white",
            "opacity-0 group-hover:opacity-100",
            isWishlisted && "opacity-100"
          )}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={cn(
              "w-5 h-5 transition-colors",
              isWishlisted ? "fill-rose-500 text-rose-500" : "text-neutral-700"
            )}
          />
        </button>

        {/* Quick View Button */}
        {onQuickView && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className={cn(
              "absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2.5",
              "bg-white/95 backdrop-blur-sm text-neutral-900 text-sm font-medium tracking-wide",
              "transition-all duration-300 ease-out",
              "opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0",
              "hover:bg-neutral-900 hover:text-white"
            )}
          >
            Quick View
          </button>
        )}
      </Link>

      {/* Product Info */}
      <div className="mt-4 text-center">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-serif text-lg text-neutral-900 hover:text-neutral-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-neutral-500 capitalize">
          {product.carat}ct {product.shape} • {product.metal.replace("-", " ")}
        </p>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="text-lg font-medium text-neutral-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-neutral-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
