import React, { useState } from 'react';
import { 
  Product, 
  ProductVariant, 
  CurrencyCode 
} from '../types';
import { formatPrice } from '../data/currencies';
import { 
  X, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Star, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Utensils, 
  Package, 
  Heart, 
  CheckCircle2 
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  initialVariant: ProductVariant | null;
  currentCurrency: CurrencyCode;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
  onClose: () => void;
  onAddToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  onBuyNow?: (product: Product, variant: ProductVariant, quantity?: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  initialVariant,
  currentCurrency,
  isWishlisted = false,
  onToggleWishlist,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  if (!product) return null;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    initialVariant || product.variants[0]
  );
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  const retailPrice = selectedVariant.retailPriceUSD;
  const originalMrp = selectedVariant.originalMrpUSD || Math.round(retailPrice * 1.25);
  const discountPercent = Math.round(((originalMrp - retailPrice) / originalMrp) * 100);

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariant, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleBuyNow = () => {
    if (onBuyNow) {
      onBuyNow(product, selectedVariant, quantity);
    } else {
      onAddToCart(product, selectedVariant, quantity);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        id="product-detail-modal-container"
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-5 py-3.5 bg-[#050B20] text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-[#7D9EFF] uppercase tracking-wider">
              {product.series}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300 font-medium truncate max-w-[200px] sm:max-w-md">
              {product.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onToggleWishlist && (
              <button
                onClick={() => onToggleWishlist(product.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                title={isWishlisted ? "In Wishlist" : "Add to Wishlist"}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            )}
            <button
              id="close-product-detail-modal-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Gallery Column */}
            <div className="md:col-span-6 space-y-3">
              <div className="aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {discountPercent > 0 && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white font-bold text-xs uppercase shadow-xs">
                      Save {discountPercent}%
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="px-2.5 py-0.5 rounded-md bg-[#001FB5] text-white font-bold text-xs uppercase shadow-xs flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Best Seller
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#7D9EFF]" />
                  {product.warrantyYears}-Year Manufacturer Warranty
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {product.gallery.length > 1 && (
                <div className="flex gap-2">
                  {product.gallery.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(imgUrl)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImage === imgUrl ? 'border-[#001FB5] shadow-sm' : 'border-slate-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}

              {/* Box Contents Checklist */}
              {product.boxContents && product.boxContents.length > 0 && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-[#001FB5]" /> What's in the Box
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {product.boxContents.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Product Purchase Column */}
            <div className="md:col-span-6 space-y-4">
              <div>
                {/* Rating & Series */}
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="font-bold text-slate-800 text-xs">{product.rating}</span>
                  </div>
                  <span className="text-xs text-slate-400">({product.reviewCount} verified reviews)</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-semibold text-emerald-600">In Stock</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif leading-snug">
                  {product.name}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price Display */}
              <div className="p-4 rounded-2xl bg-[#EEF2FF] border border-[#C7D7FE] flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-2xl font-black text-[#001FB5] font-mono">
                      {formatPrice(retailPrice, currentCurrency)}
                    </span>
                    <span className="text-sm line-through text-slate-400 font-mono">
                      {formatPrice(originalMrp, currentCurrency)}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 block mt-0.5">
                    Free Express Doorstep Delivery Included
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">
                    Material
                  </span>
                  <span className="text-xs font-bold text-[#001FB5]">
                    Food-Grade AISI 304
                  </span>
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Select Size / Capacity:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                        selectedVariant.id === variant.id
                          ? 'border-[#001FB5] bg-[#EEF2FF] shadow-2xs font-bold'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                      }`}
                    >
                      <div className={`text-xs font-bold ${selectedVariant.id === variant.id ? 'text-[#001FB5]' : 'text-slate-900'}`}>
                        {variant.sizeLabel}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 font-mono">
                        {formatPrice(variant.retailPriceUSD, currentCurrency)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & Actions */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-700">Quantity:</span>
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-slate-200 text-slate-600 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-bold font-mono text-slate-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-slate-200 text-slate-600 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={handleAddToCart}
                    className={`py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-md shadow-[#001FB5]/20 flex items-center justify-center gap-2 cursor-pointer ${
                      addedAnimation
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#001FB5] hover:bg-[#001799] text-white'
                    }`}
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-white" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#7D9EFF]" />
                    <span>Buy Now (Express)</span>
                  </button>
                </div>
              </div>

              {/* Cookware Features & Highlights */}
              <div className="pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Key Highlights
                </h4>
                <div className="grid grid-cols-1 gap-1.5 text-xs text-slate-600">
                  {product.keyHighlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#001FB5] shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ideal For Dishes */}
              {product.idealForDishes && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs text-slate-700">
                  <Utensils className="w-4 h-4 text-[#001FB5] shrink-0" />
                  <span>
                    <strong>Recommended Dishes:</strong> {product.idealForDishes.join(', ')}
                  </span>
                </div>
              )}

              {/* Heat Compatibility */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {product.heatCompatibility.map((src, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                  >
                    {src}
                  </span>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
