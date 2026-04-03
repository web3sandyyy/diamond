import { Link } from "react-router-dom";
import { Check, ShoppingBag } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";

interface AddToCartModalProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  selectedMetal?: string;
  selectedSize?: string;
}

export function AddToCartModal({
  open,
  onClose,
  product,
  selectedMetal,
  selectedSize,
}: AddToCartModalProps) {
  if (!product) return null;

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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="font-serif text-xl text-neutral-900">Added to Your Bag</h2>
        </div>

        <div className="flex gap-4 p-4 bg-neutral-50 rounded-lg">
          <div className="w-20 h-20 flex-shrink-0">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-neutral-900 truncate">
              {product.name}
            </h3>
            <p className="text-sm text-neutral-500 mt-1 capitalize">
              {metalLabels[selectedMetal || product.metal] || selectedMetal}
              {selectedSize && ` • Size ${selectedSize}`}
            </p>
            <p className="font-medium mt-2">{formatPrice(product.price)}</p>
          </div>
        </div>

        <div className="space-y-3 mt-6">
          <Button
            className="w-full h-12 bg-neutral-900 hover:bg-neutral-800"
            asChild
          >
            <Link to="/cart" onClick={onClose}>
              <ShoppingBag className="w-4 h-4 mr-2" />
              View Bag
            </Link>
          </Button>
          <Button variant="outline" className="w-full h-12" onClick={onClose}>
            Continue Shopping
          </Button>
        </div>

        <div className="mt-4 pt-4 border-t text-center">
          <p className="text-xs text-neutral-500">
            Complimentary shipping on orders over €2,500
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
