import React, { useState } from 'react';
import { COOKING_CARE_STEPS } from '../data/consumerData';
import { 
  Flame, 
  Droplets, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Award
} from 'lucide-react';

export const CareAndSeasoningGuide: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'flame': return Flame;
      case 'droplets': return Droplets;
      case 'sparkles': return Sparkles;
      default: return ShieldCheck;
    }
  };

  return (
    <section id="care-guide" className="py-16 bg-gradient-to-b from-white to-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] text-[#001FB5] text-xs font-bold uppercase tracking-wider mb-2 border border-[#C7D7FE]">
            <Sparkles className="w-3.5 h-3.5 text-[#001FB5]" /> Culinary Masterclass
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-serif tracking-tight">
            How to Make Stainless Steel Naturally Non-Stick
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            You never need toxic Teflon or chemical PFAS. By understanding the simple physics of the 
            <strong> Leidenfrost Effect</strong>, your eggs, fish, dosas, and meats will release effortlessly.
          </p>
        </div>

        {/* Interactive 4-Step Walkthrough */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14">
          
          {/* Step Selector Column */}
          <div className="lg:col-span-6 space-y-3">
            {COOKING_CARE_STEPS.map((stepItem) => {
              const Icon = getStepIcon(stepItem.icon);
              const isActive = activeStep === stepItem.step;
              return (
                <div
                  key={stepItem.step}
                  onClick={() => setActiveStep(stepItem.step)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white border-[#001FB5] shadow-md ring-1 ring-[#001FB5]/20'
                      : 'bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-black text-sm ${
                      isActive ? 'bg-[#001FB5] text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {stepItem.step}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-sm font-bold ${isActive ? 'text-slate-950' : 'text-slate-800'}`}>
                          {stepItem.title}
                        </h4>
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#001FB5]' : 'text-slate-400'}`} />
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {stepItem.instruction}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visual Simulation Display Box */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-[#050B20] text-white p-6 sm:p-8 shadow-xl border border-[#001FB5]/30 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
              
              {/* Top status */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-mono text-[#7D9EFF] font-bold uppercase">
                  Simulation: Step {activeStep} of 4
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  {activeStep === 1 && 'Surface Warming Up'}
                  {activeStep === 2 && 'Leidenfrost Temperature Zone: ~190°C'}
                  {activeStep === 3 && 'Oil Shimmer Barrier Formation'}
                  {activeStep === 4 && 'Zero Sticking Protein Release'}
                </span>
              </div>

              {/* Center graphic */}
              <div className="my-8 flex flex-col items-center justify-center text-center">
                {activeStep === 1 && (
                  <div className="space-y-3">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-t from-[#001FB5]/30 to-transparent border-2 border-[#001FB5]/60 flex items-center justify-center mx-auto animate-pulse">
                      <Flame className="w-12 h-12 text-[#608CFF]" />
                    </div>
                    <div className="text-sm font-bold text-white">Preheating Dry Stainless Steel</div>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto">
                      Microscopic pores in the metal expand uniformly as the aluminum core conducts heat across the vessel.
                    </p>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-3">
                    <div className="w-24 h-24 rounded-full bg-cyan-500/20 border-2 border-cyan-400/50 flex items-center justify-center mx-auto relative">
                      <Droplets className="w-10 h-10 text-cyan-300" />
                      <div className="absolute w-3 h-3 rounded-full bg-white shadow-md animate-bounce top-3 right-5"></div>
                      <div className="absolute w-2 h-2 rounded-full bg-white shadow-md animate-ping bottom-3 left-6"></div>
                    </div>
                    <div className="text-sm font-bold text-cyan-300">The Dancing Water Beads</div>
                    <p className="text-xs text-slate-300 max-w-xs mx-auto">
                      A vapor cushion insulates the water droplets, allowing them to skate like beads on glass. You are ready to cook!
                    </p>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="space-y-3">
                    <div className="w-24 h-24 rounded-full bg-[#001FB5]/25 border-2 border-[#001FB5]/60 flex items-center justify-center mx-auto">
                      <Sparkles className="w-10 h-10 text-[#7D9EFF]" />
                    </div>
                    <div className="text-sm font-bold text-[#7D9EFF]">Thermal Micro-Film</div>
                    <p className="text-xs text-slate-300 max-w-xs mx-auto">
                      The thin film of oil creates an impenetrable boundary layer that prevents proteins from adhering to the steel.
                    </p>
                  </div>
                )}

                {activeStep === 4 && (
                  <div className="space-y-3">
                    <div className="w-24 h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-400/50 flex items-center justify-center mx-auto">
                      <ShieldCheck className="w-12 h-12 text-emerald-300" />
                    </div>
                    <div className="text-sm font-bold text-emerald-300">Flawless Natural Release</div>
                    <p className="text-xs text-slate-300 max-w-xs mx-auto">
                      Food glides effortlessly without peeling synthetic chemicals. Clean with warm water in under 30 seconds.
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Pro Tip Box */}
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex items-center gap-2.5 text-xs text-slate-300">
                <AlertCircle className="w-4 h-4 text-[#608CFF] shrink-0" />
                <span>
                  <strong>Golden Rule:</strong> If food seems stuck at first, wait 30 seconds! Meat and eggs release themselves once the golden crust forms.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Cleaning & Maintenance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-[#001FB5]" /> Rainbow Tint? Easy Fix
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Stainless steel can occasionally show a harmless heat tint (a mineral oxide layer). Simply wipe with a splash of white vinegar or lemon juice, and it instantly shines like new.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-[#001FB5]" /> Any Utensil is Safe
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Unlike fragile Teflon that scratches with metal spoons, you can freely use stainless steel spatulas, whisks, and ladles with zero fear of ruining your cookware.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-[#001FB5]" /> 100% Dishwasher Proof
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              No hand-wash-only restrictions. Our surgical AISI 304 vessels are engineered to withstand alkaline detergents and intensive hot water cycles without fading.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
