import React, { useState } from 'react';
import { COOKWARE_PRODUCTS } from '../data/products';
import { Product, ProductVariant, CurrencyCode } from '../types';
import { formatPrice } from '../data/currencies';
import { 
  Flame, 
  Users, 
  Utensils, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Sparkles,
  ShoppingBag,
  Eye
} from 'lucide-react';

interface CookwareFinderProps {
  currentCurrency: CurrencyCode;
  onAddToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  onQuickView: (product: Product, variant: ProductVariant) => void;
}

export const CookwareFinder: React.FC<CookwareFinderProps> = ({
  currentCurrency,
  onAddToCart,
  onQuickView,
}) => {
  const [step, setStep] = useState<number>(1);
  const [familySize, setFamilySize] = useState<'solo' | 'medium' | 'large'>('medium');
  const [cookingGoal, setCookingGoal] = useState<'curry' | 'dosa' | 'pressure' | 'frypan' | 'chai' | 'all'>('curry');
  const [stoveType, setStoveType] = useState<'induction' | 'gas' | 'electric'>('induction');
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(null);
  const [recommendedVariant, setRecommendedVariant] = useState<ProductVariant | null>(null);

  const handleComplete = () => {
    let targetId = 'tp-kadhai-deluxe';
    let targetVariantIdx = 1; // 24cm

    if (cookingGoal === 'curry') {
      targetId = 'tp-kadhai-deluxe';
      targetVariantIdx = familySize === 'solo' ? 0 : familySize === 'medium' ? 1 : 3;
    } else if (cookingGoal === 'dosa') {
      targetId = 'tp-tawa-dosa';
      targetVariantIdx = familySize === 'large' ? 1 : 0;
    } else if (cookingGoal === 'pressure') {
      targetId = familySize === 'solo' ? 'pc-royal-innerlid' : 'pc-clip-on-multicooker';
      targetVariantIdx = familySize === 'solo' ? 0 : 1;
    } else if (cookingGoal === 'frypan') {
      targetId = 'tp-frypan-skillet';
      targetVariantIdx = familySize === 'solo' ? 0 : familySize === 'medium' ? 1 : 2;
    } else if (cookingGoal === 'chai') {
      targetId = 'sas-saucepan-glasslid';
      targetVariantIdx = familySize === 'solo' ? 0 : 1;
    } else if (cookingGoal === 'all') {
      targetId = 'gift-triply-set-5pc';
      targetVariantIdx = 0;
    }

    const matchedProd = COOKWARE_PRODUCTS.find(p => p.id === targetId) || COOKWARE_PRODUCTS[0];
    const matchedVar = matchedProd.variants[targetVariantIdx] || matchedProd.variants[0];

    setRecommendedProduct(matchedProd);
    setRecommendedVariant(matchedVar);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setRecommendedProduct(null);
    setRecommendedVariant(null);
  };

  return (
    <div id="pan-finder" className="py-14 bg-slate-50/70 border-y border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Card Frame */}
        <div className="rounded-3xl bg-gradient-to-br from-[#050B20] via-[#071133] to-[#050B20] p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-[#001FB5]/30">
          
          {/* Subtle blue glow accent */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#001FB5]/25 rounded-full blur-3xl pointer-events-none"></div>

          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-8 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#001FB5]/25 text-[#7D9EFF] text-xs font-bold uppercase tracking-wider mb-2 border border-[#001FB5]/40">
              <Sparkles className="w-3.5 h-3.5" /> 30-Second Pan Advisor
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight">
              Find Your Ideal Stainless Steel Cookware
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Answer 3 quick questions about your kitchen habits, and we'll match you to the exact size, gauge, and shape engineered for your dishes.
            </p>
          </div>

          {/* Progress Indicator */}
          {step < 4 && (
            <div className="flex items-center justify-center gap-2 mb-8 relative z-10">
              {[1, 2, 3].map((s) => (
                <div 
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s === step ? 'w-12 bg-[#001FB5]' : s < step ? 'w-6 bg-emerald-500' : 'w-6 bg-slate-800'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Step 1: Family Size */}
          {step === 1 && (
            <div className="space-y-6 relative z-10">
              <div className="text-center">
                <span className="text-xs font-bold text-[#608CFF] uppercase tracking-wider">Step 1 of 3</span>
                <h4 className="text-lg sm:text-xl font-bold mt-1">How many people are you cooking for daily?</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'solo', label: '1 - 2 People', desc: 'Solo chefs, couples, or compact apartment kitchens', icon: '👤' },
                  { id: 'medium', label: '3 - 4 People', desc: 'Standard family meals with occasional lunch leftovers', icon: '👨‍👩‍👧' },
                  { id: 'large', label: '5+ People', desc: 'Large households, joint families & weekend entertaining', icon: '🍲' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setFamilySize(option.id as any)}
                    className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                      familySize === option.id
                        ? 'border-[#001FB5] bg-[#001FB5]/20 text-white shadow-md ring-2 ring-[#001FB5]/50'
                        : 'border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <div className="text-sm font-bold text-white">{option.label}</div>
                    <div className="text-xs text-slate-400 mt-1 leading-relaxed">{option.desc}</div>
                  </button>
                ))}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-[#001FB5] hover:bg-[#001799] text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-[#001FB5]/30"
                >
                  <span>Next: Cooking Style</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Cooking Style */}
          {step === 2 && (
            <div className="space-y-6 relative z-10">
              <div className="text-center">
                <span className="text-xs font-bold text-[#608CFF] uppercase tracking-wider">Step 2 of 3</span>
                <h4 className="text-lg sm:text-xl font-bold mt-1">What dish do you make most often?</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { id: 'curry', title: 'Curries, Sautéing & Frying', desc: 'Paneer, chicken, stir-fry & deep frying pakoras' },
                  { id: 'dosa', title: 'Crispy Dosas & Rotis', desc: 'Paper-thin dosas, phulkas, parathas & crepes' },
                  { id: 'pressure', title: 'Fast Dal, Rice & Stews', desc: '15-min toor dal, pulav, rajma & tender meats' },
                  { id: 'frypan', title: 'Eggs, Searing & Breakfast', desc: 'Morning sunny-side eggs, seared salmon, cutlets' },
                  { id: 'chai', title: 'Chai, Boiling Milk & Soups', desc: 'Daily ginger cardamom tea without spilling' },
                  { id: 'all', title: 'Complete Kitchen Upgrade', desc: 'Replace all toxic non-stick cookware at once' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setCookingGoal(option.id as any)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      cookingGoal === option.id
                        ? 'border-[#001FB5] bg-[#001FB5]/20 text-white shadow-md ring-2 ring-[#001FB5]/50'
                        : 'border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="text-sm font-bold text-white">{option.title}</div>
                    <div className="text-xs text-slate-400 mt-1 leading-relaxed">{option.desc}</div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-[#001FB5] hover:bg-[#001799] text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-[#001FB5]/30"
                >
                  <span>Next: Cooktop Type</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Cooktop Type */}
          {step === 3 && (
            <div className="space-y-6 relative z-10">
              <div className="text-center">
                <span className="text-xs font-bold text-[#608CFF] uppercase tracking-wider">Step 3 of 3</span>
                <h4 className="text-lg sm:text-xl font-bold mt-1">What kind of cooktop do you use?</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'induction', title: 'Induction Hob', desc: 'Magnetic cooktop with rapid heating zones' },
                  { id: 'gas', title: 'Gas Stove Burners', desc: 'Traditional open flame burners' },
                  { id: 'electric', title: 'Electric Coil / Ceramic', desc: 'Glass ceramic radiant elements' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setStoveType(option.id as any)}
                    className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                      stoveType === option.id
                        ? 'border-[#001FB5] bg-[#001FB5]/20 text-white shadow-md ring-2 ring-[#001FB5]/50'
                        : 'border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="text-sm font-bold text-white">{option.title}</div>
                    <div className="text-xs text-slate-400 mt-1 leading-relaxed">{option.desc}</div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                >
                  Back
                </button>
                <button
                  onClick={handleComplete}
                  className="px-6 py-2.5 rounded-xl bg-[#001FB5] hover:bg-[#001799] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#001FB5]/40 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#608CFF]" />
                  <span>Reveal My Perfect Cookware</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Result Card */}
          {step === 4 && recommendedProduct && recommendedVariant && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 relative z-10">
              <div className="text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 99% Kitchen Match Score
                </div>
                <h4 className="text-xl sm:text-2xl font-bold font-serif">Here is your tailored culinary match:</h4>
              </div>

              <div className="p-4 sm:p-6 rounded-2xl bg-white text-slate-900 shadow-xl flex flex-col sm:flex-row items-center gap-6">
                <img
                  src={recommendedProduct.image}
                  alt={recommendedProduct.name}
                  className="w-full sm:w-44 h-44 object-cover rounded-xl shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="text-[10px] font-bold uppercase bg-[#EEF2FF] text-[#001FB5] px-2.5 py-0.5 rounded border border-[#C7D7FE]">
                      {recommendedProduct.series}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Recommended: {recommendedVariant.sizeLabel}
                    </span>
                  </div>

                  <h5 className="text-lg font-bold text-slate-900 font-serif">
                    {recommendedProduct.name}
                  </h5>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {recommendedProduct.tagline}
                  </p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-[11px] text-slate-700">
                    <span className="bg-slate-100 px-2 py-0.5 rounded font-medium">
                      ✓ 10-Year Warranty
                    </span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded font-medium">
                      ✓ 100% Induction & Gas Compatible
                    </span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded font-medium">
                      ✓ 0% Chemical Coating
                    </span>
                  </div>

                  <div className="flex items-center justify-center sm:justify-start gap-3 pt-3">
                    <div className="text-xl font-black text-[#001FB5] font-mono">
                      {formatPrice(recommendedVariant.retailPriceUSD, currentCurrency)}
                    </div>
                    {recommendedVariant.originalMrpUSD && (
                      <div className="text-xs line-through text-slate-400 font-mono">
                        {formatPrice(recommendedVariant.originalMrpUSD, currentCurrency)}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full sm:w-auto shrink-0">
                  <button
                    onClick={() => onAddToCart(recommendedProduct, recommendedVariant, 1)}
                    className="w-full sm:w-44 py-3 px-4 rounded-xl bg-[#001FB5] hover:bg-[#001799] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-[#001FB5]/20 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() => onQuickView(recommendedProduct, recommendedVariant)}
                    className="w-full sm:w-44 py-2 px-4 rounded-xl bg-[#EEF2FF] hover:bg-[#D0DEFF] text-[#001FB5] text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-[#C7D7FE]"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#001FB5]" />
                    <span>View All Details</span>
                  </button>
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Pan Finder Quiz</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
