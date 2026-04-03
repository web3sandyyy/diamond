import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ProductGalleryProps {
  images: string[];
  lifestyleImages?: string[];
  video?: string;
  productName: string;
}

export function ProductGallery({
  images,
  lifestyleImages = [],
  video,
  productName,
}: ProductGalleryProps) {
  const allMedia = [...images, ...lifestyleImages];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? allMedia.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === allMedia.length - 1 ? 0 : prev + 1));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Thumbnails - Desktop */}
      <div className="hidden lg:flex flex-col gap-3 w-20">
        {allMedia.map((src, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "relative aspect-square overflow-hidden border-2 transition-all",
              activeIndex === index
                ? "border-neutral-900"
                : "border-transparent hover:border-neutral-300"
            )}
          >
            <img
              src={src}
              alt={`${productName} view ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
        {video && (
          <button
            onClick={() => setActiveIndex(-1)}
            className={cn(
              "relative aspect-square overflow-hidden border-2 transition-all bg-neutral-100",
              activeIndex === -1
                ? "border-neutral-900"
                : "border-transparent hover:border-neutral-300"
            )}
          >
            <Play className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-neutral-600" />
          </button>
        )}
      </div>

      {/* Main Image */}
      <div className="flex-1 relative">
        <div
          ref={imageRef}
          className="relative aspect-square overflow-hidden bg-neutral-50 cursor-zoom-in"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setLightboxOpen(true)}
        >
          {activeIndex >= 0 ? (
            <>
              <img
                src={allMedia[activeIndex]}
                alt={`${productName} - ${activeIndex + 1}`}
                className={cn(
                  "w-full h-full object-cover transition-transform duration-300",
                  isZoomed && "scale-150"
                )}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }
                    : undefined
                }
              />
              <div className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full pointer-events-none">
                <ZoomIn className="w-5 h-5 text-neutral-600" />
              </div>
            </>
          ) : (
            <video
              src={video}
              className="w-full h-full object-cover"
              controls
              autoPlay
              muted
              loop
            />
          )}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrevious();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Mobile Thumbnails */}
        <div className="lg:hidden flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
          {allMedia.map((src, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative w-16 h-16 flex-shrink-0 overflow-hidden border-2 transition-all",
                activeIndex === index
                  ? "border-neutral-900"
                  : "border-transparent"
              )}
            >
              <img
                src={src}
                alt={`${productName} view ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>

        {/* Dot Indicators - Mobile */}
        <div className="lg:hidden flex justify-center gap-2 mt-4">
          {allMedia.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                activeIndex === index ? "bg-neutral-900 w-6" : "bg-neutral-300"
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl p-0 bg-transparent border-none">
          <div className="relative">
            <img
              src={allMedia[activeIndex]}
              alt={`${productName} - ${activeIndex + 1}`}
              className="w-full h-auto max-h-[90vh] object-contain"
            />
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 rounded-full hover:bg-white transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 rounded-full hover:bg-white transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
