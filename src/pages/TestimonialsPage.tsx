import { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/constants";
import { cn } from "@/lib/utils";

export function TestimonialsPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="min-h-screen pt-32 pb-24 lg:pb-32">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h1 className="font-serif text-3xl lg:text-4xl text-neutral-900 mb-4">
          Client Stories
        </h1>
        <p className="text-neutral-600 max-w-2xl mx-auto">
          Discover why discerning customers across Europe and the Middle East
          choose Lumière Diamonds for their most precious moments.
        </p>
      </div>

      {/* Featured Testimonial */}
      <section className="bg-neutral-50 py-16 lg:py-24 mb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src={TESTIMONIALS[activeIndex].productImage}
                alt="Product"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
            <div>
              <Quote className="w-12 h-12 text-amber-500/30 mb-6" />
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-5 h-5",
                      i < TESTIMONIALS[activeIndex].rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-neutral-200"
                    )}
                  />
                ))}
              </div>
              <blockquote className="font-serif text-xl lg:text-2xl text-neutral-900 leading-relaxed mb-8">
                "{TESTIMONIALS[activeIndex].text}"
              </blockquote>
              <div className="flex items-center gap-4">
                <img
                  src={TESTIMONIALS[activeIndex].image}
                  alt={TESTIMONIALS[activeIndex].name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-neutral-900">
                    {TESTIMONIALS[activeIndex].name}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {TESTIMONIALS[activeIndex].location}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-4 mt-8">
                <button
                  onClick={() =>
                    setActiveIndex((prev) =>
                      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
                    )
                  }
                  className="p-3 border border-neutral-200 hover:border-neutral-400 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm text-neutral-500">
                  {activeIndex + 1} / {TESTIMONIALS.length}
                </span>
                <button
                  onClick={() =>
                    setActiveIndex((prev) =>
                      prev === TESTIMONIALS.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="p-3 border border-neutral-200 hover:border-neutral-400 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl text-neutral-900 mb-8 text-center">
          More Stories
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 border border-neutral-100"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < testimonial.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-neutral-200"
                    )}
                  />
                ))}
              </div>
              <p className="text-neutral-700 mb-6 line-clamp-4">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-neutral-900 text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <p className="font-serif text-4xl lg:text-5xl text-neutral-900 mb-2">
              4.9
            </p>
            <p className="text-sm text-neutral-500">Average Rating</p>
          </div>
          <div>
            <p className="font-serif text-4xl lg:text-5xl text-neutral-900 mb-2">
              2,500+
            </p>
            <p className="text-sm text-neutral-500">Happy Customers</p>
          </div>
          <div>
            <p className="font-serif text-4xl lg:text-5xl text-neutral-900 mb-2">
              98%
            </p>
            <p className="text-sm text-neutral-500">Would Recommend</p>
          </div>
          <div>
            <p className="font-serif text-4xl lg:text-5xl text-neutral-900 mb-2">
              24h
            </p>
            <p className="text-sm text-neutral-500">Avg. Response Time</p>
          </div>
        </div>
      </section>
    </div>
  );
}
