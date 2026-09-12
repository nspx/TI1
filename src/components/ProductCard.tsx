import React, { useState } from 'react';
import { 
  Product, 
  CurrencyCode, 
  ProductVariant 
} from '../types';
import { formatPrice } from '../data/currencies';
import { 
  Sparkles, 
  Layers, 
  Eye, 
  Plus, 
  ShieldCheck, 
  Flame,
  Star,
  Check,
  Heart,
  Utensils
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  currentCurrency: CurrencyCode;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
  onQuickView: (product: Product, selectedVariant: ProductVariant) => void;
  onAddToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currentCurrency,
  isWishlisted = false,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const selectedVariant = product.variants[selectedVariantIndex] || product.variants[0];

  const retailPrice = selectedVariant.retailPriceUSD;
  const originalMrp = selectedVariant.originalMrpUSD || Math.round(retailPrice * 1.25);
  const discountPercent = Math.round(((originalMrp - retailPrice) / originalMrp) * 100);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedVariant, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group flex flex-col rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-xl hover:border-[#001FB5]/60 transition-all duration-300 overflow-hidden"
    >
      {/* Product Image Stage */}
      <div 
        className="relative aspect-4/3 overflow-hidden bg-slate-100 cursor-pointer" 
        onClick={() => onQuickView(product, selectedVariant)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none z-10">
          <div className="flex flex-col gap-1.5 items-start">
            {product.isBestSeller && (
              <span className="px-2.5 py-1 rounded-md bg-[#001FB5] text-white font-bold text-[10px] tracking-wide uppercase shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Best Seller
              </span>
            )}
            {discountPercent > 0 && (
              <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white font-bold text-[10px] tracking-wide uppercase shadow-xs">
                Save {discountPercent}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          {onToggleWishlist && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(product.id);
              }}
              className="pointer-events-auto w-8 h-8 rounded-full bg-white/95 hover:bg-white text-slate-700 shadow-sm flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-500'}`} />
            </button>
          )}
        </div>

        {/* Floating Quick View Overlay */}
        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product, selectedVariant);
            }}
            className="px-4 py-2 rounded-xl bg-white/95 hover:bg-white text-slate-900 text-xs font-bold shadow-lg flex items-center gap-1.5 transition-all transform translate-y-2 group-hover:translate-y-0 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#001FB5]" />
            <span>Quick View & Details</span>
          </button>
        </div>

        {/* Bottom Trust Badge */}
        <div className="absolute bottom-2 left-2 bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-[#7D9EFF]" />
          {product.warrantyYears}-Year Warranty
        </div>
      </div>

      {/* Product Details Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating & Series */}
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-[#001FB5] font-bold uppercase tracking-wider text-[10px] bg-[#EEF2FF] px-2 py-0.5 rounded border border-[#C7D7FE]">
              {product.series}
            </span>
            <div className="flex items-center gap-1 text-slate-700 font-semibold text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onQuickView(product, selectedVariant)}
            className="text-base font-bold text-slate-900 line-clamp-1 group-hover:text-[#001FB5] transition-colors cursor-pointer font-serif"
            title={product.name}
          >
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {product.tagline}
          </p>

          {/* Ideal for dishes tags */}
          {product.idealForDishes && product.idealForDishes.length > 0 && (
            <div className="flex items-center gap-1 text-[11px] text-slate-600 mt-2 bg-slate-50 px-2 py-1 rounded-md border border-slate-100 truncate">
              <Utensils className="w-3 h-3 text-[#001FB5] shrink-0" />
              <span className="truncate font-medium">
                Best for: {product.idealForDishes.slice(0, 2).join(', ')}
              </span>
            </div>
          )}

          {/* Compatibility Pills */}
          <div className="flex flex-wrap gap-1 mt-2.5">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
              <Layers className="w-3 h-3 text-slate-500" /> SS 304 Food-Grade
            </span>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
              <Flame className="w-3 h-3 text-slate-500" /> Induction Ready
            </span>
          </div>
        </div>

        {/* Size Selection */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1.5">
            <span>Size / Capacity:</span>
            <span className="text-slate-400 font-normal truncate max-w-[150px]">
              {selectedVariant.diameterCm > 0 ? `${selectedVariant.diameterCm} cm` : ''} ({selectedVariant.capacityLitres}L)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {product.variants.map((v, idx) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariantIndex(idx)}
                className={`px-2 py-1.5 rounded-lg text-xs font-semibold text-center border transition-all truncate cursor-pointer ${
                  selectedVariantIndex === idx
                    ? 'border-[#001FB5] bg-[#EEF2FF] text-[#001FB5] shadow-2xs font-bold'
                    : 'border-slate-200 bg-slate-50/70 text-slate-600 hover:bg-slate-100'
                }`}
                title={v.sizeLabel}
              >
                {v.sizeLabel.split('(')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Block */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-slate-900 font-mono">
                  {formatPrice(retailPrice, currentCurrency)}
                </span>
                <span className="text-xs line-through text-slate-400 font-mono">
                  {formatPrice(originalMrp, currentCurrency)}
                </span>
              </div>
              <span className="text-[10px] font-medium text-emerald-600">
                In Stock • Free Delivery Eligible
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-medium">
                100% Toxin Free
              </span>
              <span className="text-[11px] font-bold text-[#001FB5]">
                0% Chemical Coating
              </span>
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="pt-1">
          <button
            id={`btn-cart-${product.id}`}
            onClick={handleAdd}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
              addedAnimation 
                ? 'bg-emerald-600 text-white' 
                : 'bg-[#001FB5] hover:bg-[#001799] text-white shadow-[#001FB5]/20 hover:shadow-md'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Bag!</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 text-white" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
