import { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, SlidersHorizontal, Grid3X3, Grid2X2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductCard, FilterSidebar, QuickViewModal } from "@/components";
import { Skeleton } from "@/components/ui/skeleton";
import { CATEGORIES, FILTER_OPTIONS } from "@/constants";
import { getProductsByCategory, filterProducts, sortProducts, type Product } from "@/data";
import { cn } from "@/lib/utils";

interface Filters {
  price?: string;
  carat?: string;
  shape?: string;
  metal?: string;
}

export function CollectionPage() {
  const { category = "all" } = useParams();
  const [filters, setFilters] = useState<Filters>({});
  const [sortBy, setSortBy] = useState("featured");
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const categoryInfo = CATEGORIES.find((c) => c.id === category);
  const categoryName = categoryInfo?.name || "All Jewelry";

  // Get and filter products
  const products = useMemo(() => {
    const baseProducts = getProductsByCategory(category);
    const filtered = filterProducts(baseProducts, filters);
    return sortProducts(filtered, sortBy);
  }, [category, filters, sortBy]);

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [category, filters]);

  const handleFilterChange = (key: keyof Filters, value: string | undefined) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setFilters({});
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="min-h-screen pt-32 lg:pt-40 pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
          <Link to="/" className="hover:text-neutral-900">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-neutral-900">{categoryName}</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="font-serif text-3xl lg:text-4xl text-neutral-900 mb-4">
            {categoryName}
          </h1>
          {categoryInfo && (
            <p className="text-neutral-600 max-w-2xl">
              {categoryInfo.description}
            </p>
          )}
        </div>

        <div className="flex gap-8 lg:gap-12">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearAll={clearAllFilters}
            />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <Button
                  variant="outline"
                  className="lg:hidden"
                  onClick={() => setIsFilterOpen(true)}
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="ml-2 w-5 h-5 bg-neutral-900 text-white text-xs rounded-full flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>

                <p className="text-sm text-neutral-500">
                  {products.length} {products.length === 1 ? "product" : "products"}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-44 hidden sm:flex">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {FILTER_OPTIONS.sort.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Grid Toggle - Desktop */}
                <div className="hidden lg:flex items-center border border-neutral-200 rounded">
                  <button
                    onClick={() => setGridCols(2)}
                    className={cn(
                      "p-2 transition-colors",
                      gridCols === 2
                        ? "bg-neutral-100"
                        : "hover:bg-neutral-50"
                    )}
                    aria-label="2 columns"
                  >
                    <Grid2X2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setGridCols(3)}
                    className={cn(
                      "p-2 transition-colors",
                      gridCols === 3
                        ? "bg-neutral-100"
                        : "hover:bg-neutral-50"
                    )}
                    aria-label="3 columns"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setGridCols(4)}
                    className={cn(
                      "p-2 transition-colors",
                      gridCols === 4
                        ? "bg-neutral-100"
                        : "hover:bg-neutral-50"
                    )}
                    aria-label="4 columns"
                  >
                    <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 bg-current rounded-sm" />
                      ))}
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {Object.entries(filters).map(([key, value]) => {
                  if (!value) return null;
                  const options = FILTER_OPTIONS[key as keyof typeof FILTER_OPTIONS];
                  const label = Array.isArray(options)
                    ? options.find((o) => o.value === value)?.label
                    : value;
                  return (
                    <button
                      key={key}
                      onClick={() => handleFilterChange(key as keyof Filters, undefined)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-neutral-100 text-sm hover:bg-neutral-200 transition-colors"
                    >
                      {label}
                      <span className="ml-1">×</span>
                    </button>
                  );
                })}
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-neutral-500 hover:text-neutral-900 underline"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Product Grid */}
            {isLoading ? (
              <div
                className={cn(
                  "grid gap-x-4 gap-y-8 lg:gap-x-6 lg:gap-y-12",
                  gridCols === 2 && "grid-cols-2",
                  gridCols === 3 && "grid-cols-2 lg:grid-cols-3",
                  gridCols === 4 && "grid-cols-2 lg:grid-cols-4"
                )}
              >
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-square w-full" />
                    <Skeleton className="h-4 w-3/4 mx-auto" />
                    <Skeleton className="h-4 w-1/2 mx-auto" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-neutral-500 text-lg mb-4">
                  No products match your selected filters.
                </p>
                <Button variant="outline" onClick={clearAllFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div
                className={cn(
                  "grid gap-x-4 gap-y-8 lg:gap-x-6 lg:gap-y-12",
                  gridCols === 2 && "grid-cols-2",
                  gridCols === 3 && "grid-cols-2 lg:grid-cols-3",
                  gridCols === 4 && "grid-cols-2 lg:grid-cols-4"
                )}
              >
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <FilterSidebar
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearAll={clearAllFilters}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        isMobile
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        open={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
