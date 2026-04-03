import { useState } from "react";
import { MapPin, Phone, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsultationModal } from "@/components";
import { BRAND } from "@/constants";

export function StoresPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  const stores = [
    {
      id: 1,
      name: "Dubai - Fashion Avenue",
      address: BRAND.address,
      phone: BRAND.phone,
      hours: "Daily: 10:00 AM - 10:00 PM",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
      flagship: true,
    },
    {
      id: 2,
      name: "Abu Dhabi - Yas Mall",
      address: "Yas Mall, Level 1, Abu Dhabi, UAE",
      phone: "+971 2 654 3210",
      hours: "Daily: 10:00 AM - 10:00 PM",
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80",
      flagship: false,
    },
    {
      id: 3,
      name: "Riyadh - Kingdom Centre",
      address: "Kingdom Centre, Level 2, Riyadh, KSA",
      phone: "+966 11 234 5678",
      hours: "Sat-Thu: 10:00 AM - 10:00 PM, Fri: 4:00 PM - 10:00 PM",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80",
      flagship: false,
    },
    {
      id: 4,
      name: "London - Bond Street",
      address: "123 Bond Street, Mayfair, London W1S, UK",
      phone: "+44 20 7123 4567",
      hours: "Mon-Sat: 10:00 AM - 7:00 PM, Sun: 12:00 PM - 6:00 PM",
      image: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800&q=80",
      flagship: true,
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-3xl lg:text-4xl text-neutral-900 mb-4">
            Visit Our Boutiques
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Experience Lumière Diamonds in person. Our specialists are ready to
            guide you through our collections and help you find your perfect
            piece.
          </p>
        </div>

        {/* Map Placeholder */}
        <div className="bg-neutral-100 h-96 mb-16 flex items-center justify-center relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80"
            alt="Map"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="relative z-10 text-center bg-white/90 backdrop-blur-sm p-8">
            <MapPin className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-600 mb-4">
              Interactive map coming soon
            </p>
            <Button
              variant="outline"
              onClick={() =>
                window.open(
                  `https://maps.google.com/?q=${encodeURIComponent(BRAND.address)}`,
                  "_blank"
                )
              }
            >
              Open in Google Maps
            </Button>
          </div>
        </div>

        {/* Store Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {stores.map((store) => (
            <div
              key={store.id}
              className="border border-neutral-200 overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover"
                />
                {store.flagship && (
                  <span className="absolute top-4 left-4 bg-amber-600 text-white text-xs px-3 py-1 uppercase tracking-wider">
                    Flagship
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl text-neutral-900 mb-4">
                  {store.name}
                </h3>
                <div className="space-y-3 text-sm text-neutral-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{store.address}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <a href={`tel:${store.phone}`} className="hover:underline">
                      {store.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{store.hours}</span>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() =>
                      window.open(
                        `https://maps.google.com/?q=${encodeURIComponent(store.address)}`,
                        "_blank"
                      )
                    }
                  >
                    Get Directions
                  </Button>
                  <Button
                    className="flex-1 bg-neutral-900 hover:bg-neutral-800"
                    onClick={() => setConsultationOpen(true)}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Visit
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Virtual Consultation */}
        <div className="mt-20 bg-neutral-50 p-8 lg:p-12 text-center">
          <h2 className="font-serif text-2xl text-neutral-900 mb-4">
            Can't Visit in Person?
          </h2>
          <p className="text-neutral-600 mb-6 max-w-lg mx-auto">
            Experience our collection from anywhere with a personalized virtual
            consultation. Our specialists will guide you through our pieces via
            video call.
          </p>
          <Button
            className="bg-neutral-900 hover:bg-neutral-800"
            onClick={() => setConsultationOpen(true)}
          >
            Book Virtual Consultation
          </Button>
        </div>
      </div>

      <ConsultationModal
        open={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </div>
  );
}
