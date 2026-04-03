import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Leaf, Shield, Truck, Calendar, Phone, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard, TestimonialCarousel, QuickViewModal, ConsultationModal } from "@/components";
import { CATEGORIES, TRUST_BADGES, STORY, BRAND } from "@/constants";
import { getFeaturedProducts, type Product } from "@/data";

// Hero images for slideshow
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=80",
  "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1920&q=80",
  "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=1920&q=80",
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1920&q=80",
];


export function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const featuredProducts = getFeaturedProducts();

  const trustIcons = {
    certificate: Award,
    leaf: Leaf,
    shield: Shield,
    truck: Truck,
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Image Slideshow */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Slideshow Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGES[0]}
            alt="Luxury diamond jewelry"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
              Brilliance Redefined
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/90 leading-relaxed">
              Discover the extraordinary beauty of lab-grown diamonds — identical to mined, infinitely more conscious.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-neutral-900 hover:bg-neutral-100 h-14 px-8 text-base font-medium"
              >
                <Link to="/collection/all">
                  Explore Collections
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-neutral-900 h-14 px-8 text-base font-medium bg-transparent"
                onClick={() => setConsultationOpen(true)}
              >
                Book a Consultation
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl text-neutral-900 mb-4">
              Explore Our Collections
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Each piece is a testament to exceptional craftsmanship and timeless design,
              featuring our finest lab-grown diamonds.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                to={`/collection/${category.id}`}
                className="group relative aspect-[3/4] overflow-hidden"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-xl lg:text-2xl text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-white/80 text-sm hidden lg:block">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center text-white text-sm mt-3 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    Shop Now <ArrowRight className="ml-2 w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
            <div>
              <h2 className="font-serif text-3xl lg:text-4xl text-neutral-900 mb-4">
                Featured Pieces
              </h2>
              <p className="text-neutral-600 max-w-xl">
                Discover our most coveted creations, handpicked for their exceptional beauty
                and masterful design.
              </p>
            </div>
            <Link
              to="/collection/all"
              className="mt-6 lg:mt-0 inline-flex items-center text-neutral-900 font-medium hover:underline"
            >
              View All Collections <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 lg:gap-x-8 lg:gap-y-12">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us - Redesigned */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image Collage */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=80"
                    alt="Diamond crafting"
                    className="w-full aspect-[4/5] object-cover"
                  />
                  <div className="bg-amber-50 p-6">
                    <p className="font-serif text-3xl text-amber-700">95%</p>
                    <p className="text-sm text-neutral-600 mt-1">Less environmental impact</p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-neutral-900 text-white p-6">
                    <p className="font-serif text-3xl">IGI</p>
                    <p className="text-sm text-neutral-300 mt-1">Certified Excellence</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80"
                    alt="Diamond detail"
                    className="w-full aspect-[4/5] object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div>
              <span className="text-amber-600 text-sm tracking-widest uppercase">
                The Lumière Promise
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl text-neutral-900 mt-4 mb-8">
                Luxury With Conscience
              </h2>

              <div className="space-y-8">
                {TRUST_BADGES.map((badge, index) => {
                  const Icon = trustIcons[badge.icon as keyof typeof trustIcons];
                  return (
                    <div key={index} className="flex gap-5">
                      <div className="w-12 h-12 rounded-full bg-white border border-neutral-200 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-neutral-900 mb-1">
                          {badge.title}
                        </h3>
                        <p className="text-neutral-500 text-sm leading-relaxed">
                          {badge.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle Section - Updated */}
      <section className="relative">
        <div className="grid lg:grid-cols-2">
          <div className="relative h-[50vh] lg:h-[80vh]">
            <img
              src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=80"
              alt="Woman wearing diamond jewelry"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="flex items-center bg-neutral-900 p-8 lg:p-16">
            <div className="max-w-lg">
              <span className="text-amber-400 text-sm tracking-widest uppercase">
                Crafted to be Worn
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl text-white mt-4 mb-6">
                Designed for Every Moment
              </h2>
              <p className="text-neutral-300 leading-relaxed mb-8">
                From intimate celebrations to grand occasions, our pieces are crafted to
                become an extension of your personal style. Experience how Lumière diamonds
                capture and reflect the light of your most precious moments.
              </p>
              <Button
                asChild
                className="bg-white text-neutral-900 hover:bg-neutral-100 h-12 px-8"
              >
                <Link to="/collection/all">
                  Explore the Collection
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialCarousel />

      {/* Our Story Preview */}
      <section className="py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <img
                src={STORY.image}
                alt="Our atelier"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-amber-50 -z-10 hidden lg:block" />
            </div>
            <div>
              <span className="text-amber-600 text-sm tracking-widest uppercase">
                Our Heritage
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl text-neutral-900 mt-4 mb-6">
                {STORY.title}
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-6">
                {STORY.intro}
              </p>
              <p className="text-neutral-600 leading-relaxed mb-8">
                {STORY.sections[0].content}
              </p>
              <Button asChild variant="outline" className="h-12 px-8">
                <Link to="/story">
                  Discover Our Story <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Assistance CTA - Redesigned */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-neutral-900 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-white to-transparent rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-white to-transparent rounded-full translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="relative grid lg:grid-cols-2 gap-12 p-8 lg:p-16">
              {/* Left: Content */}
              <div className="flex flex-col justify-center">
                <span className="text-amber-400 text-sm tracking-widest uppercase mb-4">
                  Personal Service
                </span>
                <h2 className="font-serif text-3xl lg:text-4xl text-white mb-6">
                  Your Journey Starts Here
                </h2>
                <p className="text-neutral-300 leading-relaxed mb-8">
                  Whether you're seeking the perfect engagement ring or a meaningful gift, 
                  our diamond specialists are here to guide you every step of the way.
                </p>

                {/* Contact Options */}
                <div className="space-y-4">
                  <button
                    onClick={() => setConsultationOpen(true)}
                    className="w-full flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-left group"
                  >
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                      <Calendar className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">Book a Consultation</p>
                      <p className="text-neutral-400 text-sm">In-store or virtual appointment</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </button>

                  <a
                    href={`https://wa.me/${BRAND.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-left group"
                  >
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                      <MessageCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">Chat on WhatsApp</p>
                      <p className="text-neutral-400 text-sm">Instant assistance available</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </a>

                  <a
                    href={`tel:${BRAND.phone}`}
                    className="w-full flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-left group"
                  >
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                      <Phone className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">Call Us Directly</p>
                      <p className="text-neutral-400 text-sm">{BRAND.phone}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </a>
                </div>
              </div>

              {/* Right: Image */}
              <div className="relative hidden lg:block">
                <img
                  src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80"
                  alt="Diamond consultation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-6">
                  <p className="font-serif text-lg text-neutral-900 mb-2">
                    "The personalized service was exceptional"
                  </p>
                  <p className="text-sm text-neutral-500">— Sarah A., Dubai</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        open={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Consultation Modal */}
      <ConsultationModal
        open={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </div>
  );
}
