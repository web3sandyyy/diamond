import { useState } from "react";
import { Check, Globe } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { REGIONS } from "@/constants";
import { cn } from "@/lib/utils";

interface RegionSelectorModalProps {
  open: boolean;
  onClose: () => void;
  currentRegion?: string;
  onRegionChange?: (region: string) => void;
}

export function RegionSelectorModal({
  open,
  onClose,
  currentRegion = "AE",
  onRegionChange,
}: RegionSelectorModalProps) {
  const [selected, setSelected] = useState(currentRegion);

  const handleConfirm = () => {
    onRegionChange?.(selected);
    onClose();
  };

  const middleEast = REGIONS.filter((r) =>
    ["AE", "SA", "KW", "QA", "BH"].includes(r.code)
  );
  const europe = REGIONS.filter((r) =>
    ["GB", "FR", "DE", "IT", "ES"].includes(r.code)
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl flex items-center gap-2">
            <Globe className="w-6 h-6" />
            Select Your Region
          </DialogTitle>
          <DialogDescription className="text-neutral-600">
            Choose your shipping destination for accurate pricing and availability
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {/* Middle East */}
          <div>
            <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-3">
              Middle East
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {middleEast.map((region) => (
                <button
                  key={region.code}
                  onClick={() => setSelected(region.code)}
                  className={cn(
                    "flex items-center justify-between p-4 border transition-all text-left",
                    selected === region.code
                      ? "border-neutral-900 bg-neutral-50"
                      : "border-neutral-200 hover:border-neutral-300"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{region.flag}</span>
                    <div>
                      <p className="font-medium text-neutral-900">
                        {region.name}
                      </p>
                      <p className="text-sm text-neutral-500">
                        {region.currency}
                      </p>
                    </div>
                  </div>
                  {selected === region.code && (
                    <Check className="w-5 h-5 text-neutral-900" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Europe */}
          <div>
            <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-3">
              Europe
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {europe.map((region) => (
                <button
                  key={region.code}
                  onClick={() => setSelected(region.code)}
                  className={cn(
                    "flex items-center justify-between p-4 border transition-all text-left",
                    selected === region.code
                      ? "border-neutral-900 bg-neutral-50"
                      : "border-neutral-200 hover:border-neutral-300"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{region.flag}</span>
                    <div>
                      <p className="font-medium text-neutral-900">
                        {region.name}
                      </p>
                      <p className="text-sm text-neutral-500">
                        {region.currency}
                      </p>
                    </div>
                  </div>
                  {selected === region.code && (
                    <Check className="w-5 h-5 text-neutral-900" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Button
            className="w-full h-12 bg-neutral-900 hover:bg-neutral-800"
            onClick={handleConfirm}
          >
            Confirm Region
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
