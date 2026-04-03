import { Link } from "react-router-dom";
import { Heart, ArrowRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components";
import { useStore } from "@/hooks";

export function WishlistPage() {
  const { wishlist } = useStore();

  if (wishlist.items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <Heart className="w-20 h-20 text-neutral-200 mx-auto mb-6" />
            <h1 className="font-serif text-3xl text-neutral-900 mb-4">
              Your Wishlist is Empty
            </h1>
            <p className="text-neutral-500 mb-8 max-w-md mx-auto">
              Save your favorite pieces to your wishlist and access them anytime.
              Start exploring our collection to find something you love.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-neutral-900 hover:bg-neutral-800"
            >
              <Link to="/collection/all">
                Explore Collections
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl lg:text-4xl text-neutral-900 mb-2">
              My Wishlist
            </h1>
            <p className="text-neutral-500">
              {wishlist.count} {wishlist.count === 1 ? "item" : "items"}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={wishlist.clearWishlist}
            className="text-neutral-500 hover:text-neutral-900"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 lg:gap-x-8 lg:gap-y-12">
          {wishlist.items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/collection/all">
              Continue Shopping
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
