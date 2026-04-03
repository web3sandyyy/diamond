import { X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FILTER_OPTIONS } from "@/constants";

interface Filters {
  price?: string;
  carat?: string;
  shape?: string;
  metal?: string;
}

interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (key: keyof Filters, value: string | undefined) => void;
  onClearAll: () => void;
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

function FilterSection({
  title,
  options,
  selectedValue,
  onSelect,
}: {
  title: string;
  options: { label: string; value: string }[];
  selectedValue?: string;
  onSelect: (value: string | undefined) => void;
}) {
  return (
    <div className="py-6 border-b border-neutral-100">
      <h3 className="font-medium text-sm tracking-wide uppercase mb-4 text-neutral-900">
        {title}
      </h3>
      <div className="space-y-3">
        {options.map((option) => (
          <div key={option.value} className="flex items-center gap-3">
            <Checkbox
              id={`${title}-${option.value}`}
              checked={selectedValue === option.value}
              onCheckedChange={(checked) =>
                onSelect(checked ? option.value : undefined)
              }
            />
            <Label
              htmlFor={`${title}-${option.value}`}
              className="text-sm text-neutral-600 cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FilterSidebar({
  filters,
  onFilterChange,
  onClearAll,
  isOpen,
  onClose,
  isMobile,
}: FilterSidebarProps) {
  const hasFilters = Object.values(filters).some((v) => v !== undefined);

  const content = (
    <div className="space-y-0">
      {/* Header for Desktop */}
      {!isMobile && (
        <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
          <h2 className="font-serif text-xl text-neutral-900">Filters</h2>
          {hasFilters && (
            <button
              onClick={onClearAll}
              className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      )}

      <FilterSection
        title="Price"
        options={FILTER_OPTIONS.price}
        selectedValue={filters.price}
        onSelect={(value) => onFilterChange("price", value)}
      />

      <FilterSection
        title="Carat"
        options={FILTER_OPTIONS.carat}
        selectedValue={filters.carat}
        onSelect={(value) => onFilterChange("carat", value)}
      />

      <FilterSection
        title="Diamond Shape"
        options={FILTER_OPTIONS.shape}
        selectedValue={filters.shape}
        onSelect={(value) => onFilterChange("shape", value)}
      />

      <FilterSection
        title="Metal"
        options={FILTER_OPTIONS.metal}
        selectedValue={filters.metal}
        onSelect={(value) => onFilterChange("metal", value)}
      />
    </div>
  );

  // Mobile: Render in Sheet
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="w-full sm:w-96 p-0">
          <SheetHeader className="px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle className="font-serif text-xl">Filters</SheetTitle>
              <button onClick={onClose}>
                <X className="w-5 h-5" />
              </button>
            </div>
          </SheetHeader>
          <div className="flex flex-col h-[calc(100vh-80px)]">
            <div className="flex-1 overflow-y-auto px-6">{content}</div>
            <div className="p-6 border-t bg-white">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={onClearAll}
                  disabled={!hasFilters}
                >
                  Clear All
                </Button>
                <Button className="flex-1 bg-neutral-900 hover:bg-neutral-800" onClick={onClose}>
                  View Results
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: Regular sidebar
  return <div className="sticky top-32">{content}</div>;
}
