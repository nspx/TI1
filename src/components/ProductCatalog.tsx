import React, { useState, useMemo } from 'react';
import { 
  Product, 
  CookwareCategory, 
  CurrencyCode, 
  ProductVariant 
} from '../types';
import { COOKWARE_PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  Flame,
  CheckCircle2,
  X
} from 'lucide-react';

interface ProductCatalogProps {
  currentCurrency: CurrencyCode;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product, variant: ProductVariant) => void;
  onAddToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  onOpenPanFinder?: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  currentCurrency,
  wishlist,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onOpenPanFinder,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CookwareCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'price-low' | 'price-high'>('featured');
  const [onlyBestSellers, setOnlyBestSellers] = useState<boolean>(false);

  const categories: { id: CookwareCategory; label: string }[] = [
    { id: 'all', label: 'All Cookware' },
    { id: 'kadhais-woks', label: 'Kadhais & Woks' },
    { id: 'pressure-cookers', label: 'Pressure Cookers' },
    { id: 'frypans', label: 'Frypans & Skillets' },
    { id: 'saucepans', label: 'Saucepans & Milk Pots' },
    { id: 'casseroles-stockpots', label: 'Casseroles & Stockpots' },
    { id: 'tawas-griddles', label: 'Dosa & Crepe Tawas' },
    { id: 'steamers-cookers', label: 'Steamers & Idli Pots' },
    { id: 'cookware-sets', label: 'Starter & Gift Sets' },
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = COOKWARE_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'tri-ply') {
          if (!product.series.includes('Tri-Ply') && product.category !== 'tri-ply') return false;
        } else if (product.category !== selectedCategory) {
          return false;
        }
      }

      // Best sellers filter
      if (onlyBestSellers && !product.isBestSeller) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesMaterial = product.material.toLowerCase().includes(query);
        const matchesDishes = product.idealForDishes?.some(d => d.toLowerCase().includes(query));
        const matchesSku = product.variants.some((v) => v.sku.toLowerCase().includes(query));
        return matchesName || matchesDesc || matchesMaterial || matchesDishes || matchesSku;
      }

      return true;
    });

    // Sorting
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => (a.variants[0]?.retailPriceUSD || 0) - (b.variants[0]?.retailPriceUSD || 0));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => (b.variants[0]?.retailPriceUSD || 0) - (a.variants[0]?.retailPriceUSD || 0));
    } else {
      // featured: best sellers first, then rating
      result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy, onlyBestSellers]);

  return (
    <section id="catalog" className="py-14 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#001FB5] uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3.5 h-3.5" /> 100% Non-Toxic Stainless Steel
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-serif tracking-tight">
              Explore The Cookware Collection
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-2xl leading-relaxed">
              Engineered for effortless daily cooking with tri-ply 3-layer cladding and heavy impact bases. 
              Zero synthetic non-stick coatings, completely induction compatible, and backed by our 10-year replacement warranty.
            </p>
          </div>

          {/* Quick interactive Pan Finder banner */}
          {onOpenPanFinder && (
            <button
              onClick={onOpenPanFinder}
              className="px-4 py-2.5 rounded-xl bg-[#001FB5] hover:bg-[#001799] text-white text-xs font-bold shadow-md shadow-[#001FB5]/20 flex items-center gap-2 transition-all cursor-pointer shrink-0"
            >
              <Flame className="w-4 h-4 text-[#7D9EFF]" />
              <span>Not Sure? Take The Pan Finder Quiz</span>
            </button>
          )}
        </div>

        {/* Category Pills Slider */}
        <div className="mt-6 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`cat-btn-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#001FB5] text-white shadow-md shadow-[#001FB5]/20'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-[#EEF2FF] hover:border-[#C7D7FE] hover:text-[#001FB5]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Sort Controls Toolbar */}
        <div className="mb-8 p-3 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="product-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cookware (e.g., Kadhai, Dosa Tawa, Pressure Cooker)..."
              className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 focus:border-[#001FB5] focus:ring-2 focus:ring-[#001FB5]/20 text-xs text-slate-900 placeholder:text-slate-400 bg-slate-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filters & Sorter */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Best Sellers toggle */}
            <button
              onClick={() => setOnlyBestSellers(!onlyBestSellers)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                onlyBestSellers
                  ? 'bg-[#EEF2FF] border-[#001FB5] text-[#001FB5] font-bold'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#001FB5]" />
              <span>Best Sellers</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <select
                id="catalog-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="py-1.5 px-2.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:border-[#001FB5] cursor-pointer"
              >
                <option value="featured">Featured & Popular</option>
                <option value="rating">Highest Rated ★</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <div className="text-xs text-slate-400 font-medium pl-1 hidden lg:block">
              Showing {filteredProducts.length} items
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currentCurrency={currentCurrency}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <div className="w-12 h-12 rounded-full bg-[#EEF2FF] text-[#001FB5] flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No cookware found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              We couldn't find any products matching "{searchQuery}". Try selecting "All Cookware" or clearing your search term.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setOnlyBestSellers(false);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#001FB5] text-white text-xs font-bold hover:bg-[#001799] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Consumer Guarantee Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-[#EEF2FF] via-white to-[#EEF2FF] border border-[#C7D7FE] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-bold text-slate-950 font-serif">
              The Taarini 30-Day Cooking Promise
            </h4>
            <p className="text-xs text-slate-600 max-w-xl">
              Cook your favorite dishes in our cookware for 30 days. If it doesn't give you superior heat distribution and effortless cleaning compared to standard pans, we'll arrange a free return and refund.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Free Delivery on orders $45+</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#001FB5]" />
              <span>10-Year Replacement Warranty</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>100% Food-Safe & Lead-Free</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
