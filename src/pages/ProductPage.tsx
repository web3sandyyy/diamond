import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronRight, Heart, Share2, Star, Truck, Shield, RotateCcw, Ruler, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ProductGallery, ProductCard, SizeGuideModal, ConsultationModal, AddToCartModal } from "@/components";
import { getProductBySlug, getProductsByCategory, getReviewsByProductId, type Product } from "@/data";
import { useStore } from "@/hooks";
import { BRAND } from "@/constants";
import { cn } from "@/lib/utils";

export function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { cart, wishlist, recentlyViewed } = useStore();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedMetal, setSelectedMetal] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [addToCartOpen, setAddToCartOpen] = useState(false);

  const isWishlisted = product ? wishlist.isInWishlist(product.id) : false;

  useEffect(() => {
    if (slug) {
      const foundProduct = getProductBySlug(slug);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedMetal(foundProduct.metal);
        recentlyViewed.addItem(foundProduct);
      } else {
        navigate("/collection/all");
      }
    }
  }, [slug, navigate, recentlyViewed.addItem]);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <p className="text-neutral-500">Loading...</p>
        </div>
      </div>
    );
  }

  const reviews = getReviewsByProductId(product.id);
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

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
    if (product.sizes && !selectedSize) {
      return;
    }
    cart.addItem(product, 1, selectedSize || undefined, selectedMetal);
    setAddToCartOpen(true);
  };

  const handleBuyNow = () => {
    if (product.sizes && !selectedSize) {
      return;
    }
    cart.addItem(product, 1, selectedSize || undefined, selectedMetal);
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
          <Link to="/" className="hover:text-neutral-900">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link
            to={`/collection/${product.category}`}
            className="hover:text-neutral-900 capitalize"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-neutral-900 truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Gallery */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <ProductGallery
              images={product.images}
              lifestyleImages={product.lifestyleImages}
              video={product.video}
              productName={product.name}
            />
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                {product.isNew && (
                  <Badge className="mb-3 bg-neutral-900">New Arrival</Badge>
                )}
                {product.isBestseller && (
                  <Badge className="mb-3 bg-amber-600 ml-2">Bestseller</Badge>
                )}
                <h1 className="font-serif text-2xl lg:text-3xl text-neutral-900">
                  {product.name}
                </h1>
              </div>
              <button
                onClick={() => wishlist.toggleItem(product)}
                className="p-2 border border-neutral-200 hover:border-neutral-400 transition-colors"
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  className={cn(
                    "w-5 h-5",
                    isWishlisted && "fill-rose-500 text-rose-500"
                  )}
                />
              </button>
            </div>

            {/* Rating */}
            {product.reviewCount > 0 && (
              <div className="flex items-center gap-2 mt-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < Math.floor(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-neutral-200"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-neutral-500">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-3 mt-6">
              <span className="text-2xl lg:text-3xl font-medium text-neutral-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-neutral-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-sm text-neutral-500 mt-2">
              {product.carat}ct {product.shape} diamond •{" "}
              {metalLabels[product.metal]}
            </p>

            <Separator className="my-6" />

            {/* Metal Selection */}
            {product.metalOptions.length > 1 && (
              <div className="mb-6">
                <label className="text-sm font-medium text-neutral-900 block mb-3">
                  Metal: {metalLabels[selectedMetal]}
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.metalOptions.map((metal) => (
                    <button
                      key={metal}
                      onClick={() => setSelectedMetal(metal)}
                      className={cn(
                        "px-4 py-2 border text-sm transition-all",
                        selectedMetal === metal
                          ? "border-neutral-900 bg-neutral-900 text-white"
                          : "border-neutral-200 hover:border-neutral-400"
                      )}
                    >
                      {metalLabels[metal]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-neutral-900">
                    Size
                  </label>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    className="text-sm text-neutral-500 hover:text-neutral-900 underline flex items-center gap-1"
                  >
                    <Ruler className="w-4 h-4" />
                    Size Guide
                  </button>
                </div>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full h-12">
                    <SelectValue placeholder="Select a size" />
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

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                className="w-full h-14 bg-neutral-900 hover:bg-neutral-800 text-base"
                onClick={handleAddToCart}
                disabled={product.sizes && !selectedSize}
              >
                Add to Bag
              </Button>
              <Button
                variant="outline"
                className="w-full h-14 text-base"
                onClick={handleBuyNow}
                disabled={product.sizes && !selectedSize}
              >
                Buy Now
              </Button>
            </div>

            {/* Book Consultation */}
            <div className="mt-6 p-4 bg-neutral-50 flex items-center justify-between">
              <div>
                <p className="font-medium text-neutral-900 text-sm">
                  Need guidance?
                </p>
                <p className="text-sm text-neutral-500">
                  Speak with a diamond specialist
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setConsultationOpen(true)}>
                Book Consultation
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-3 text-sm text-neutral-600">
                <Truck className="w-5 h-5 text-neutral-400" />
                <span>Free Shipping Over €2,500</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-600">
                <Shield className="w-5 h-5 text-neutral-400" />
                <span>Lifetime Warranty</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-600">
                <RotateCcw className="w-5 h-5 text-neutral-400" />
                <span>30-Day Returns</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-600">
                <Star className="w-5 h-5 text-neutral-400" />
                <span>IGI Certified</span>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Accordion Sections */}
            <Accordion type="single" collapsible defaultValue="details">
              <AccordionItem value="details">
                <AccordionTrigger className="text-base font-medium">
                  Product Details
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-neutral-600 mb-4">{product.description}</p>
                  <ul className="space-y-2 text-sm text-neutral-600">
                    <li>
                      <strong>Material:</strong> {product.details.material}
                    </li>
                    <li>
                      <strong>Stone:</strong> {product.details.stone}
                    </li>
                    <li>
                      <strong>Setting:</strong> {product.details.setting}
                    </li>
                    <li>
                      <strong>Certification:</strong> {product.details.certification}
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger className="text-base font-medium">
                  Shipping & Returns
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-neutral-600 mb-4">{product.shipping}</p>
                  <p className="text-neutral-600">
                    We offer a 30-day return policy for unworn items in original
                    condition. Custom and engraved pieces are final sale.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq">
                <AccordionTrigger className="text-base font-medium">
                  FAQ
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 text-sm text-neutral-600">
                    <div>
                      <p className="font-medium text-neutral-900 mb-1">
                        Is this a real diamond?
                      </p>
                      <p>
                        Yes, lab-grown diamonds are 100% real diamonds with
                        identical chemical composition to mined diamonds.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900 mb-1">
                        Can I resize this piece?
                      </p>
                      <p>
                        Most rings can be resized within 2 sizes. Contact our
                        team for specific inquiries.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900 mb-1">
                        Is engraving available?
                      </p>
                      <p>
                        Yes, we offer complimentary engraving on select pieces.
                        Contact us for details.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Share */}
            <div className="flex items-center gap-4 mt-8">
              <span className="text-sm text-neutral-500">Share:</span>
              <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <a
                href={`https://wa.me/${BRAND.whatsapp}?text=Check out this beautiful piece: ${product.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <section className="mt-20 pt-20 border-t">
            <h2 className="font-serif text-2xl lg:text-3xl text-neutral-900 mb-8">
              Customer Reviews
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {reviews.map((review) => (
                <div key={review.id} className="p-6 bg-neutral-50">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium text-neutral-900">
                        {review.author}
                      </p>
                      <p className="text-sm text-neutral-500">
                        {review.location}
                      </p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-4 h-4",
                            i < review.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-neutral-200"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="font-medium text-neutral-900 mb-2">
                    {review.title}
                  </p>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {review.content}
                  </p>
                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 mt-4">
                      {review.images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`Review image ${i + 1}`}
                          className="w-20 h-20 object-cover"
                        />
                      ))}
                    </div>
                  )}
                  {review.verified && (
                    <Badge variant="secondary" className="mt-4">
                      Verified Purchase
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-20 border-t">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl lg:text-3xl text-neutral-900">
                You May Also Like
              </h2>
              <Link
                to={`/collection/${product.category}`}
                className="text-sm font-medium hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        {recentlyViewed.items.length > 1 && (
          <section className="mt-20 pt-20 border-t">
            <h2 className="font-serif text-2xl lg:text-3xl text-neutral-900 mb-8">
              Recently Viewed
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              {recentlyViewed.items
                .filter((p) => p.id !== product.id)
                .slice(0, 4)
                .map((viewedProduct) => (
                  <ProductCard key={viewedProduct.id} product={viewedProduct} />
                ))}
            </div>
          </section>
        )}
      </div>

      {/* Sticky Mobile CTA */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-40 bg-white border-t border-neutral-100 p-4 safe-bottom">
        <div className="flex gap-3">
          <Button
            className="flex-1 h-12 bg-neutral-900 hover:bg-neutral-800"
            onClick={handleAddToCart}
            disabled={product.sizes && !selectedSize}
          >
            Add to Bag - {formatPrice(product.price)}
          </Button>
          <Button
            variant="outline"
            className="h-12 w-12"
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
      </div>

      {/* Modals */}
      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
      <ConsultationModal open={consultationOpen} onClose={() => setConsultationOpen(false)} />
      <AddToCartModal
        open={addToCartOpen}
        onClose={() => setAddToCartOpen(false)}
        product={product}
        selectedMetal={selectedMetal}
        selectedSize={selectedSize}
      />
    </div>
  );
}
