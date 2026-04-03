import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Shield, Truck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/hooks";

export function CartPage() {
  const { cart } = useStore();

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

  const shipping = cart.subtotal >= 2500 ? 0 : 50;
  const total = cart.subtotal + shipping;

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingBag className="w-20 h-20 text-neutral-200 mx-auto mb-6" />
            <h1 className="font-serif text-3xl text-neutral-900 mb-4">
              Your Bag is Empty
            </h1>
            <p className="text-neutral-500 mb-8 max-w-md mx-auto">
              Discover our exquisite collection of lab-grown diamond jewelry and
              find the perfect piece for any occasion.
            </p>
            <Button asChild size="lg" className="bg-neutral-900 hover:bg-neutral-800">
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
        <h1 className="font-serif text-3xl lg:text-4xl text-neutral-900 mb-8">
          Shopping Bag
        </h1>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {cart.items.map((item, index) => (
                <div key={`${item.product.id}-${item.selectedSize}-${item.selectedMetal}`}>
                  <div className="flex gap-4 lg:gap-6">
                    <Link
                      to={`/product/${item.product.slug}`}
                      className="w-28 h-28 lg:w-36 lg:h-36 flex-shrink-0 bg-neutral-50"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-4">
                        <div>
                          <Link
                            to={`/product/${item.product.slug}`}
                            className="font-serif text-lg text-neutral-900 hover:underline block"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-neutral-500 mt-1 capitalize">
                            {metalLabels[item.selectedMetal] || item.selectedMetal}
                            {item.selectedSize && ` • Size ${item.selectedSize}`}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            cart.removeItem(
                              item.product.id,
                              item.selectedSize,
                              item.selectedMetal
                            )
                          }
                          className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors self-start"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-end justify-between mt-4">
                        {/* Quantity Controls */}
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
                            className="p-2 lg:p-3 hover:bg-neutral-50 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 lg:px-6 text-sm min-w-[3rem] text-center">
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
                            className="p-2 lg:p-3 hover:bg-neutral-50 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="font-medium text-lg">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                  {index < cart.items.length - 1 && <Separator className="mt-6" />}
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-8 pt-8 border-t">
              <Link
                to="/collection/all"
                className="inline-flex items-center text-sm font-medium hover:underline"
              >
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-50 p-6 lg:p-8 sticky top-32">
              <h2 className="font-serif text-xl text-neutral-900 mb-6">
                Order Summary
              </h2>

              {/* Coupon */}
              <div className="flex gap-2 mb-6">
                <Input placeholder="Discount code" className="flex-1" />
                <Button variant="outline">Apply</Button>
              </div>

              <Separator className="my-6" />

              {/* Totals */}
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Subtotal</span>
                  <span>{formatPrice(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">Complimentary</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-neutral-500">
                    Add {formatPrice(2500 - cart.subtotal)} more for free shipping
                  </p>
                )}
              </div>

              <Separator className="my-6" />

              <div className="flex justify-between text-lg font-medium mb-6">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <Button
                asChild
                className="w-full h-14 bg-neutral-900 hover:bg-neutral-800 text-base"
              >
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>

              {/* Trust Indicators */}
              <div className="mt-8 pt-6 border-t space-y-4">
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <Shield className="w-5 h-5 text-neutral-400" />
                  <span>Secure SSL Encrypted Checkout</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <Truck className="w-5 h-5 text-neutral-400" />
                  <span>Insured Express Delivery</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <RotateCcw className="w-5 h-5 text-neutral-400" />
                  <span>30-Day Returns</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t">
                <p className="text-xs text-neutral-500 text-center mb-3">
                  We Accept
                </p>
                <div className="flex justify-center gap-2 text-neutral-400">
                  {["Visa", "Mastercard", "Amex", "PayPal"].map((method) => (
                    <span
                      key={method}
                      className="text-xs bg-white border px-2 py-1 rounded"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
