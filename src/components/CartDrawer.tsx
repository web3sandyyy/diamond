import { Link } from "react-router-dom";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/hooks";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cart } = useStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-EU", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:w-[450px] p-0 flex flex-col">
        <SheetHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-serif text-xl">
              Shopping Bag ({cart.totalItems})
            </SheetTitle>
            <button onClick={onClose}>
              <X className="w-5 h-5" />
            </button>
          </div>
        </SheetHeader>

        {cart.items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <ShoppingBag className="w-16 h-16 text-neutral-200 mb-4" />
            <h3 className="font-serif text-xl text-neutral-900 mb-2">
              Your bag is empty
            </h3>
            <p className="text-neutral-500 text-sm mb-6">
              Discover our exquisite collection of lab-grown diamond jewelry.
            </p>
            <Button
              onClick={onClose}
              className="bg-neutral-900 hover:bg-neutral-800"
              asChild
            >
              <Link to="/collection/all">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-6">
                {cart.items.map((item, index) => (
                  <div key={`${item.product.id}-${item.selectedSize}-${item.selectedMetal}`}>
                    <div className="flex gap-4">
                      <Link
                        to={`/product/${item.product.slug}`}
                        onClick={onClose}
                        className="w-24 h-24 flex-shrink-0 bg-neutral-50"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.product.slug}`}
                          onClick={onClose}
                          className="font-medium text-neutral-900 hover:underline block truncate"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-neutral-500 mt-1 capitalize">
                          {item.selectedMetal.replace("-", " ")}
                          {item.selectedSize && ` • Size ${item.selectedSize}`}
                        </p>
                        <p className="font-medium mt-2">
                          {formatPrice(item.product.price)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-neutral-200">
                            <button
                              onClick={() =>
                                cart.updateQuantity(
                                  item.product.id,
                                  item.quantity - 1,
                                  item.selectedSize,
                                  item.selectedMetal
                                )
                              }
                              className="p-2 hover:bg-neutral-50 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 text-sm min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                cart.updateQuantity(
                                  item.product.id,
                                  item.quantity + 1,
                                  item.selectedSize,
                                  item.selectedMetal
                                )
                              }
                              className="p-2 hover:bg-neutral-50 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() =>
                              cart.removeItem(
                                item.product.id,
                                item.selectedSize,
                                item.selectedMetal
                              )
                            }
                            className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {index < cart.items.length - 1 && (
                      <Separator className="mt-6" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t bg-white p-6 space-y-4">
              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-6 text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                  <span className="w-4 h-4">🛡️</span> Secure Checkout
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-4 h-4">🚚</span> Free Shipping
                </span>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="font-medium">Subtotal</span>
                <span className="font-medium text-lg">
                  {formatPrice(cart.subtotal)}
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                Shipping and taxes calculated at checkout.
              </p>

              <div className="space-y-3">
                <Button
                  className="w-full bg-neutral-900 hover:bg-neutral-800 h-12 text-base"
                  asChild
                >
                  <Link to="/checkout" onClick={onClose}>
                    Checkout
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 text-base"
                  asChild
                >
                  <Link to="/cart" onClick={onClose}>
                    View Bag
                  </Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
