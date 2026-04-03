import { useState } from "react";
import { Video, MapPin, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface ConsultationModalProps {
  open: boolean;
  onClose: () => void;
}

type ConsultationType = "virtual" | "instore" | "callback";

export function ConsultationModal({ open, onClose }: ConsultationModalProps) {
  const [selectedType, setSelectedType] = useState<ConsultationType>("virtual");
  const [submitted, setSubmitted] = useState(false);

  const consultationTypes = [
    {
      id: "virtual" as const,
      icon: Video,
      title: "Virtual Consultation",
      description: "Connect with a specialist via video call from anywhere",
    },
    {
      id: "instore" as const,
      icon: MapPin,
      title: "Boutique Visit",
      description: "Experience our collection in person at our Dubai showroom",
    },
    {
      id: "callback" as const,
      icon: Phone,
      title: "Request Callback",
      description: "Have one of our experts call you at your convenience",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md text-center">
          <div className="py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✓</span>
            </div>
            <DialogTitle className="font-serif text-2xl mb-2">Request Received</DialogTitle>
            <DialogDescription className="text-neutral-600">
              Thank you for your interest. One of our diamond specialists will contact you within 24 hours to confirm your appointment.
            </DialogDescription>
            <Button
              className="mt-6 bg-neutral-900 hover:bg-neutral-800"
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
            >
              Continue Shopping
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Book a Consultation</DialogTitle>
          <DialogDescription className="text-neutral-600">
            Experience personalized guidance from our diamond experts
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Consultation Type */}
          <div className="grid grid-cols-1 gap-3">
            {consultationTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setSelectedType(type.id)}
                className={cn(
                  "flex items-start gap-4 p-4 border text-left transition-all",
                  selectedType === type.id
                    ? "border-neutral-900 bg-neutral-50"
                    : "border-neutral-200 hover:border-neutral-300"
                )}
              >
                <type.icon className="w-5 h-5 mt-0.5 text-neutral-700" />
                <div>
                  <p className="font-medium text-neutral-900">{type.title}</p>
                  <p className="text-sm text-neutral-500">{type.description}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Your first name"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Your last name"
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+971 50 123 4567"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="interest">I'm interested in</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engagement">Engagement Rings</SelectItem>
                  <SelectItem value="wedding">Wedding Bands</SelectItem>
                  <SelectItem value="earrings">Earrings</SelectItem>
                  <SelectItem value="necklaces">Necklaces</SelectItem>
                  <SelectItem value="bracelets">Bracelets</SelectItem>
                  <SelectItem value="custom">Custom Design</SelectItem>
                  <SelectItem value="other">General Inquiry</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedType !== "callback" && (
              <div>
                <Label htmlFor="date">Preferred Date & Time</Label>
                <Input
                  id="date"
                  type="datetime-local"
                  className="mt-1"
                />
              </div>
            )}
          </div>

          <Button type="submit" className="w-full h-12 bg-neutral-900 hover:bg-neutral-800">
            Request Consultation
          </Button>

          <p className="text-xs text-neutral-500 text-center">
            By submitting, you agree to be contacted by our team. View our{" "}
            <a href="/privacy" className="underline">
              Privacy Policy
            </a>
            .
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
