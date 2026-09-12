import React from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Flame, 
  ArrowRight, 
  Sparkles, 
  Star, 
  Truck, 
  CheckCircle2,
  Utensils,
  Droplets
} from 'lucide-react';

interface HeroSectionProps {
  onExploreCatalog: () => void;
  onOpenPanFinder: () => void;
  onScrollToCareGuide: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCatalog,
  onOpenPanFinder,
  onScrollToCareGuide,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#050B20] via-[#071133] to-[#050B20] text-white pt-10 pb-16 lg:py-20 border-b border-slate-800">
      {/* Background ambient lighting with exact royal blue glow */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#001FB5]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#001FB5]/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust Badges */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-[#001FB5]/40 text-xs text-slate-300 shadow-sm">
              <span className="flex items-center gap-1 text-[#608CFF] font-bold">
                <Star className="w-3.5 h-3.5 fill-[#608CFF] text-[#608CFF]" /> 4.9 ★ (12,000+ Happy Kitchens)
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400 font-medium">100% Free of Teflon & PFAS</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">10-Year Guarantee</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] font-serif">
              Pure Stainless Steel Cookware.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-sky-200 to-[#7D9EFF]">
                Zero Chemicals. Built for a Lifetime.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Ditch peeling non-stick coatings for heirloom-grade <strong className="text-white font-semibold">Tri-Ply stainless steel</strong>. Engineered to the highest global culinary standards, Taarini Impex delivers uniform rim-to-rim heat, caramelizes aromatics without burning, and makes everyday cooking effortless.
            </p>

            {/* Core Consumer Value Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-[#001FB5]/60 transition-colors backdrop-blur-xs">
                <div className="flex items-center gap-2 text-[#608CFF] text-xs font-bold uppercase tracking-wider mb-1">
                  <Layers className="w-4 h-4" /> 3-Layer Tri-Ply
                </div>
                <p className="text-xs text-slate-300">Edge-to-edge heat conduction eliminates scorching & hotspots</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-[#001FB5]/60 transition-colors backdrop-blur-xs">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-4 h-4" /> 100% Toxin-Free
                </div>
                <p className="text-xs text-slate-300">Zero synthetic PTFE, PFOA, lead, or artificial chemical sprays</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-[#001FB5]/60 transition-colors backdrop-blur-xs col-span-2 sm:col-span-1">
                <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <Flame className="w-4 h-4" /> All Cooktops
                </div>
                <p className="text-xs text-slate-300">Native magnetic base for induction, gas, and oven safe to 260°C</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                id="hero-explore-catalog-btn"
                onClick={onExploreCatalog}
                className="px-6 py-3.5 rounded-xl bg-[#001FB5] hover:bg-[#001799] text-white font-bold text-sm shadow-lg shadow-[#001FB5]/30 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Shop Best-Seller Cookware</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-pan-finder-btn"
                onClick={onOpenPanFinder}
                className="px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-[#001FB5] text-white font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#608CFF]" />
                <span>Pan Finder Quiz (30 Sec)</span>
              </button>

              <button
                id="hero-care-guide-btn"
                onClick={onScrollToCareGuide}
                className="px-4 py-3.5 rounded-xl text-slate-300 hover:text-white font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Droplets className="w-4 h-4 text-cyan-400" />
                <span>Water Droplet Trick</span>
              </button>
            </div>

            {/* Guarantee Ticker */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Free Delivery on Orders $45+</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#608CFF]" />
                <span>10-Year Replacement Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Dishwasher & Metal Spatula Safe</span>
              </div>
            </div>

          </div>

          {/* Right Visual: Cookware Cross-Section Spotlight */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 to-[#071133] border border-[#001FB5]/30 p-6 shadow-2xl backdrop-blur-md">
              
              {/* Top Badge */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span className="text-xs font-mono text-[#608CFF] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Tri-Ply Cladding Architecture
                </span>
                <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/40">
                  Food Grade AISI 304
                </span>
              </div>

              {/* Cookware Image Preview */}
              <div className="relative rounded-2xl overflow-hidden aspect-16/10 mb-4 bg-slate-950 border border-slate-800">
                <img
                  src="/images/triply-kadai.jpg"
                  alt="Taarini Platinum Tri-Ply Kadhai"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050B20] via-transparent to-transparent"></div>
                
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="font-serif font-bold">Taarini Platinum Tri-Ply Kadhai</span>
                  <span className="font-mono text-[#7D9EFF] font-bold">★ 4.9 (184 Reviews)</span>
                </div>
              </div>

              {/* Layer details */}
              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#001FB5] ring-2 ring-[#001FB5]/40"></span>
                    <span className="font-bold text-white">Layer 1: Inner AISI 304</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">100% Non-Reactive & Toxin Free</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 ring-2 ring-cyan-400/30"></span>
                    <span className="font-bold text-white">Layer 2: Pure Aluminum Core</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">4x Faster Heat Conduction</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-emerald-400/30"></span>
                    <span className="font-bold text-white">Layer 3: Magnetic AISI 430 Base</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">Instant Induction Coupling</span>
                </div>
              </div>

              {/* 30-Day Trial banner */}
              <div className="mt-4 p-3 rounded-xl bg-[#001FB5]/10 border border-[#001FB5]/30 flex items-center gap-3 text-xs text-blue-200">
                <Utensils className="w-5 h-5 text-[#608CFF] shrink-0" />
                <span>
                  <strong>Taste the Difference:</strong> Golden fond, crispy dosas, and faster boiling lentils without synthetic chemical aftertaste.
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
