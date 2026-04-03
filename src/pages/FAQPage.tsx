import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FAQS, BRAND } from "@/constants";
import { MessageCircle, Mail, Phone } from "lucide-react";

export function FAQPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 lg:pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-3xl lg:text-4xl text-neutral-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Find answers to common questions about our lab-grown diamonds,
            shipping, and services. Can't find what you're looking for? Contact
            our concierge team.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {FAQS.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-neutral-200 px-6"
            >
              <AccordionTrigger className="text-left font-medium text-neutral-900 hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-600 pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Contact Section */}
        <div className="mt-20 bg-neutral-50 p-8 lg:p-12 text-center">
          <h2 className="font-serif text-2xl text-neutral-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-neutral-600 mb-8 max-w-lg mx-auto">
            Our diamond specialists are here to help. Reach out through any of
            the following channels.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <a
              href={`https://wa.me/${BRAND.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-white hover:shadow-sm transition-shadow"
            >
              <MessageCircle className="w-8 h-8 text-green-600 mb-3" />
              <span className="font-medium text-neutral-900">WhatsApp</span>
              <span className="text-sm text-neutral-500">Chat with us</span>
            </a>

            <a
              href={`mailto:${BRAND.email}`}
              className="flex flex-col items-center p-6 bg-white hover:shadow-sm transition-shadow"
            >
              <Mail className="w-8 h-8 text-neutral-600 mb-3" />
              <span className="font-medium text-neutral-900">Email</span>
              <span className="text-sm text-neutral-500">Send us a message</span>
            </a>

            <a
              href={`tel:${BRAND.phone}`}
              className="flex flex-col items-center p-6 bg-white hover:shadow-sm transition-shadow"
            >
              <Phone className="w-8 h-8 text-neutral-600 mb-3" />
              <span className="font-medium text-neutral-900">Call</span>
              <span className="text-sm text-neutral-500">Speak directly</span>
            </a>
          </div>
        </div>

        {/* Related Links */}
        <div className="mt-16 text-center">
          <h3 className="font-serif text-xl text-neutral-900 mb-6">
            Helpful Resources
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/story">Our Story</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/stores">Find a Store</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/testimonials">Testimonials</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
