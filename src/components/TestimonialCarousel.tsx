import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { TESTIMONIALS } from "@/constants";

export function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevious = () => {
    setActiveIndex((prev) =>
      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === TESTIMONIALS.length - 1 ? 0 : prev + 1
    );
  };

  const activeTestimonial = TESTIMONIALS[activeIndex];

  return (
    <section className="py-20 lg:py-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl lg:text-4xl text-neutral-900 mb-4">
            Cherished by Our Clients
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Discover why discerning customers across Europe and the Middle East
            choose Lumière Diamonds for their most precious moments.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="bg-white p-8 lg:p-12 shadow-sm">
            <Quote className="w-12 h-12 text-amber-500/30 mb-6" />

            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-5 h-5",
                    i < activeTestimonial.rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-neutral-200"
                  )}
                />
              ))}
            </div>

            <blockquote className="font-serif text-xl lg:text-2xl text-neutral-900 leading-relaxed mb-8">
              "{activeTestimonial.text}"
            </blockquote>

            <div className="flex items-center gap-4">
              <img
                src={activeTestimonial.image}
                alt={activeTestimonial.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-neutral-900">
                  {activeTestimonial.name}
                </p>
                <p className="text-sm text-neutral-500">
                  {activeTestimonial.location}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrevious}
              className="p-3 border border-neutral-200 hover:border-neutral-400 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    activeIndex === index
                      ? "bg-neutral-900 w-8"
                      : "bg-neutral-300 hover:bg-neutral-400"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 border border-neutral-200 hover:border-neutral-400 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
