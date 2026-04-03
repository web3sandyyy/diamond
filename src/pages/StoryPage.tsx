import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { STORY, TRUST_BADGES } from "@/constants";
import { Award, Leaf, Shield, Truck, ArrowRight } from "lucide-react";

export function StoryPage() {
  const trustIcons = {
    certificate: Award,
    leaf: Leaf,
    shield: Shield,
    truck: Truck,
  };

  return (
    <div className="min-h-screen pt-24 lg:pt-32">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={STORY.image}
            alt="Our atelier"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
          <h1 className="font-serif text-4xl lg:text-5xl mb-4">{STORY.title}</h1>
          <p className="text-xl lg:text-2xl text-white/90">{STORY.subtitle}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl lg:text-2xl text-neutral-700 leading-relaxed font-serif">
            {STORY.intro}
          </p>
        </div>
      </section>

      {/* Story Sections */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24 lg:space-y-32">
            {STORY.sections.map((section, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <span className="text-amber-600 text-sm tracking-widest uppercase">
                    0{index + 1}
                  </span>
                  <h2 className="font-serif text-3xl lg:text-4xl text-neutral-900 mt-4 mb-6">
                    {section.title}
                  </h2>
                  <p className="text-neutral-600 text-lg leading-relaxed">
                    {section.content}
                  </p>
                </div>
                <div
                  className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <div className="aspect-[4/5] bg-neutral-100 overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-${
                        index === 0
                          ? "1573408301185-9146fe634ad0"
                          : index === 1
                          ? "1515562141207-7a88fb7ce338"
                          : "1611652022419-a9419f74343d"
                      }?w=800&q=80`}
                      alt={section.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className={`absolute -bottom-6 ${
                      index % 2 === 0 ? "-right-6" : "-left-6"
                    } w-48 h-48 bg-amber-50 -z-10`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl lg:text-4xl text-neutral-900 mb-4">
              Our Commitment
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Every piece we create embodies these principles — from our
              sustainable practices to our exceptional customer care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {TRUST_BADGES.map((badge, index) => {
              const Icon = trustIcons[badge.icon as keyof typeof trustIcons];
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Icon className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="font-serif text-xl text-neutral-900 mb-3">
                    {badge.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl text-white mb-6">
            Experience the Lumière Difference
          </h2>
          <p className="text-neutral-300 mb-8 max-w-2xl mx-auto">
            Discover our collection of exceptional lab-grown diamond jewelry,
            crafted with passion and purpose.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-neutral-900 hover:bg-neutral-100 h-14 px-8"
          >
            <Link to="/collection/all">
              Explore Collections
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
