import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStore } from "@/hooks";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

interface QuickViewModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, open, onClose }: QuickViewModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedMetal, setSelectedMetal] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const { cart, wishlist } = useStore();

  if (!product) return null;

  const isWishlisted = wishlist.isInWishlist(product.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-EU", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const metalLabels: Record<string, string> = {
    "white-gold": "18K White Gold",
    "yellow-gold": "18K Yellow Gold",
    "rose-gold": "18K Rose Gold",
    platinum: "Platinum",
  };

  const handleAddToCart = () => {
    cart.addItem(
      product,
      1,
      selectedSize || undefined,
      selectedMetal || product.metal
    );
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 bg-white rounded-full hover:bg-neutral-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative bg-neutral-50">
            <div className="aspect-square">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 justify-center">
              {product.images.slice(0, 4).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "w-12 h-12 border-2 overflow-hidden",
                    selectedImage === index
                      ? "border-neutral-900"
                      : "border-white"
                  )}
                >
                  <img
                    src={img}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="p-8 flex flex-col">
            <div className="flex-1">
              <h2 className="font-serif text-2xl text-neutral-900">
                {product.name}
              </h2>
              <p className="text-neutral-500 mt-2 capitalize">
                {product.carat}ct {product.shape} Diamond • {product.metal.replace("-", " ")}
              </p>

              <div className="flex items-center gap-3 mt-4">
                <span className="text-2xl font-medium">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-neutral-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-sm text-neutral-600 mt-6 line-clamp-3">
                {product.description}
              </p>

              {/* Metal Selection */}
              {product.metalOptions.length > 1 && (
                <div className="mt-6">
                  <label className="text-sm font-medium text-neutral-900 block mb-2">
                    Metal
                  </label>
                  <Select
                    value={selectedMetal || product.metal}
                    onValueChange={setSelectedMetal}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select metal" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.metalOptions.map((metal) => (
                        <SelectItem key={metal} value={metal}>
                          {metalLabels[metal] || metal}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-4">
                  <label className="text-sm font-medium text-neutral-900 block mb-2">
                    Size
                  </label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          Size {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-3">
              <div className="flex gap-3">
                <Button
                  className="flex-1 h-12 bg-neutral-900 hover:bg-neutral-800"
                  onClick={handleAddToCart}
                  disabled={product.sizes && !selectedSize}
                >
                  Add to Bag
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-12 flex-shrink-0"
                  onClick={() => wishlist.toggleItem(product)}
                >
                  <Heart
                    className={cn(
                      "w-5 h-5",
                      isWishlisted && "fill-rose-500 text-rose-500"
                    )}
                  />
                </Button>
              </div>
              <Button variant="link" className="w-full" asChild>
                <Link to={`/product/${product.slug}`} onClick={onClose}>
                  View Full Details
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
