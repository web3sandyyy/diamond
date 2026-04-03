import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, ChevronLeft, Lock, CreditCard, Truck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/hooks";
import { BRAND, REGIONS } from "@/constants";
import { cn } from "@/lib/utils";

type Step = "information" | "shipping" | "payment";

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cart } = useStore();
  const [currentStep, setCurrentStep] = useState<Step>("information");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    shippingMethod: "standard",
    paymentMethod: "card",
    cardNumber: "",
    expiry: "",
    cvv: "",
    saveInfo: true,
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-EU", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const steps: { id: Step; label: string; icon: typeof User }[] = [
    { id: "information", label: "Information", icon: User },
    { id: "shipping", label: "Shipping", icon: Truck },
    { id: "payment", label: "Payment", icon: CreditCard },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const shipping = formData.shippingMethod === "express" ? 75 : (cart.subtotal >= 2500 ? 0 : 50);
  const total = cart.subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = () => {
    if (currentStep === "information") setCurrentStep("shipping");
    else if (currentStep === "shipping") setCurrentStep("payment");
  };

  const handleBack = () => {
    if (currentStep === "payment") setCurrentStep("shipping");
    else if (currentStep === "shipping") setCurrentStep("information");
  };

  const handleSubmit = () => {
    // Simulate order completion
    cart.clearCart();
    navigate("/order-confirmation");
  };

  if (cart.items.length === 0) {
    navigate("/cart");
    return null;
  }

  const metalLabels: Record<string, string> = {
    "white-gold": "18K White Gold",
    "yellow-gold": "18K Yellow Gold",
    "rose-gold": "18K Rose Gold",
    platinum: "Platinum",
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="font-serif text-xl lg:text-2xl tracking-wider text-neutral-900"
          >
            {BRAND.name}
          </Link>
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <Lock className="w-4 h-4" />
            Secure Checkout
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 lg:gap-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => index < currentStepIndex && setCurrentStep(step.id)}
                  disabled={index > currentStepIndex}
                  className={cn(
                    "flex items-center gap-2 transition-colors",
                    index <= currentStepIndex
                      ? "text-neutral-900"
                      : "text-neutral-400"
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                      index < currentStepIndex
                        ? "bg-green-600 text-white"
                        : index === currentStepIndex
                        ? "bg-neutral-900 text-white"
                        : "bg-neutral-200 text-neutral-500"
                    )}
                  >
                    {index < currentStepIndex ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="hidden sm:block text-sm font-medium">
                    {step.label}
                  </span>
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-8 lg:w-16 h-px mx-2 lg:mx-4",
                      index < currentStepIndex
                        ? "bg-green-600"
                        : "bg-neutral-300"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Main Form */}
          <div className="lg:col-span-3 bg-white p-6 lg:p-8">
            {/* Information Step */}
            {currentStep === "information" && (
              <div className="space-y-6">
                <h2 className="font-serif text-xl text-neutral-900">
                  Contact Information
                </h2>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="mt-1"
                    required
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="saveInfo"
                    checked={formData.saveInfo}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, saveInfo: !!checked }))
                    }
                  />
                  <Label htmlFor="saveInfo" className="text-sm font-normal">
                    Email me with news and offers
                  </Label>
                </div>

                <Separator />

                <h2 className="font-serif text-xl text-neutral-900">
                  Shipping Address
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+971 50 123 4567"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, country: value }))
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {REGIONS.map((region) => (
                        <SelectItem key={region.code} value={region.code}>
                          {region.flag} {region.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleNext}
                  className="w-full h-12 bg-neutral-900 hover:bg-neutral-800"
                >
                  Continue to Shipping
                </Button>
              </div>
            )}

            {/* Shipping Step */}
            {currentStep === "shipping" && (
              <div className="space-y-6">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to Information
                </button>

                <h2 className="font-serif text-xl text-neutral-900">
                  Shipping Method
                </h2>

                <RadioGroup
                  value={formData.shippingMethod}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, shippingMethod: value }))
                  }
                >
                  <div
                    className={cn(
                      "flex items-center justify-between p-4 border cursor-pointer",
                      formData.shippingMethod === "standard"
                        ? "border-neutral-900 bg-neutral-50"
                        : "border-neutral-200"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="cursor-pointer">
                        <p className="font-medium">Standard Delivery</p>
                        <p className="text-sm text-neutral-500">
                          5-7 business days
                        </p>
                      </Label>
                    </div>
                    <span className="font-medium">
                      {cart.subtotal >= 2500 ? "Free" : formatPrice(50)}
                    </span>
                  </div>

                  <div
                    className={cn(
                      "flex items-center justify-between p-4 border cursor-pointer",
                      formData.shippingMethod === "express"
                        ? "border-neutral-900 bg-neutral-50"
                        : "border-neutral-200"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="cursor-pointer">
                        <p className="font-medium">Express Delivery</p>
                        <p className="text-sm text-neutral-500">
                          2-3 business days
                        </p>
                      </Label>
                    </div>
                    <span className="font-medium">{formatPrice(75)}</span>
                  </div>
                </RadioGroup>

                <div className="bg-neutral-50 p-4 text-sm text-neutral-600">
                  <p>
                    All orders are shipped in our signature gift packaging and
                    include full insurance coverage.
                  </p>
                </div>

                <Button
                  onClick={handleNext}
                  className="w-full h-12 bg-neutral-900 hover:bg-neutral-800"
                >
                  Continue to Payment
                </Button>
              </div>
            )}

            {/* Payment Step */}
            {currentStep === "payment" && (
              <div className="space-y-6">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to Shipping
                </button>

                <h2 className="font-serif text-xl text-neutral-900">Payment</h2>

                <p className="text-sm text-neutral-500">
                  All transactions are secure and encrypted.
                </p>

                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, paymentMethod: value }))
                  }
                >
                  <div
                    className={cn(
                      "border transition-all",
                      formData.paymentMethod === "card"
                        ? "border-neutral-900"
                        : "border-neutral-200"
                    )}
                  >
                    <div className="flex items-center gap-3 p-4">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="cursor-pointer flex-1">
                        Credit Card
                      </Label>
                      <div className="flex gap-1 text-neutral-400">
                        {["Visa", "MC", "Amex"].map((card) => (
                          <span
                            key={card}
                            className="text-xs bg-neutral-100 px-2 py-1 rounded"
                          >
                            {card}
                          </span>
                        ))}
                      </div>
                    </div>

                    {formData.paymentMethod === "card" && (
                      <div className="p-4 pt-0 space-y-4 bg-neutral-50">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="1234 5678 9012 3456"
                            className="mt-1"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry</Label>
                            <Input
                              id="expiry"
                              name="expiry"
                              value={formData.expiry}
                              onChange={handleInputChange}
                              placeholder="MM / YY"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              name="cvv"
                              type="password"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              placeholder="123"
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    className={cn(
                      "flex items-center gap-3 p-4 border cursor-pointer",
                      formData.paymentMethod === "paypal"
                        ? "border-neutral-900 bg-neutral-50"
                        : "border-neutral-200"
                    )}
                  >
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="cursor-pointer">
                      PayPal
                    </Label>
                  </div>

                  <div
                    className={cn(
                      "flex items-center gap-3 p-4 border cursor-pointer",
                      formData.paymentMethod === "bank"
                        ? "border-neutral-900 bg-neutral-50"
                        : "border-neutral-200"
                    )}
                  >
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="cursor-pointer">
                      Bank Transfer
                    </Label>
                  </div>
                </RadioGroup>

                <Button
                  onClick={handleSubmit}
                  className="w-full h-14 bg-neutral-900 hover:bg-neutral-800 text-base"
                >
                  Complete Order - {formatPrice(total)}
                </Button>

                <p className="text-xs text-neutral-500 text-center">
                  By completing this order, you agree to our{" "}
                  <Link to="/terms" className="underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 lg:p-8 sticky top-8">
              <h2 className="font-serif text-xl text-neutral-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 max-h-64 overflow-y-auto">
                {cart.items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedMetal}`}
                    className="flex gap-4"
                  >
                    <div className="relative w-16 h-16 flex-shrink-0 bg-neutral-50">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                      {item.quantity > 1 && (
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-neutral-500 text-white text-xs rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-neutral-500 capitalize">
                        {metalLabels[item.selectedMetal] || item.selectedMetal}
                        {item.selectedSize && ` / Size ${item.selectedSize}`}
                      </p>
                    </div>
                    <p className="text-sm font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Subtotal</span>
                  <span>{formatPrice(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="flex justify-between text-lg font-medium">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
