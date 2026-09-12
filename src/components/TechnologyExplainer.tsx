import React, { useState } from 'react';
import { 
  Layers, 
  ShieldAlert, 
  Microscope, 
  Check, 
  X, 
  Flame, 
  Zap, 
  Sparkles, 
  ShieldCheck,
  Cpu,
  BadgePercent
} from 'lucide-react';

export const TechnologyExplainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'triply' | 'pressure' | 'qa'>('triply');

  return (
    <section id="technology" className="py-16 bg-[#050B20] text-slate-100 border-b border-slate-800 relative overflow-hidden">
      {/* Background ambient lighting with exact royal blue glow */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#001FB5]/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#001FB5]/20 border border-[#001FB5]/40 text-[#7D9EFF] text-xs font-bold tracking-wider uppercase">
            <Cpu className="w-3.5 h-3.5" /> Metallurgical Engineering
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif text-white">
            The Science Behind Taarini Cookware
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Setting benchmark standards in metallurgical culinary craftsmanship, our cookware integrates aerospace-grade metal bonding with rigorous culinary safety standards for zero hotspots and lifelong durability.
          </p>

          {/* Tab Selector */}
          <div className="flex justify-center pt-4">
            <div className="inline-flex p-1 rounded-xl bg-slate-900/90 border border-slate-800">
              <button
                id="tech-tab-triply"
                onClick={() => setActiveTab('triply')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'triply'
                    ? 'bg-[#001FB5] text-white shadow-md shadow-[#001FB5]/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Tri-Ply Cladding</span>
              </button>

              <button
                id="tech-tab-pressure"
                onClick={() => setActiveTab('pressure')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'pressure'
                    ? 'bg-[#001FB5] text-white shadow-md shadow-[#001FB5]/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Pressure Safety Systems</span>
              </button>

              <button
                id="tech-tab-qa"
                onClick={() => setActiveTab('qa')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'qa'
                    ? 'bg-[#001FB5] text-white shadow-md shadow-[#001FB5]/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Microscope className="w-4 h-4" />
                <span>Quality & Testing Lab</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Tri-Ply Cladding Architecture */}
        {activeTab === 'triply' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            
            {/* Visual Layers Graphic */}
            <div className="lg:col-span-6 bg-slate-950/80 rounded-2xl p-6 border border-slate-800 relative">
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-2 h-full bg-[#001FB5]"></div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono text-[#7D9EFF] font-bold uppercase tracking-wider">
                      Layer 1 (Cooking Surface)
                    </span>
                    <span className="text-xs font-semibold text-slate-300">Food-Contact Safe</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">AISI 304 (18/8 Chrome-Nickel) Stainless Steel</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Surgically clean, non-reactive cooking surface. Does not interact with acidic curries, lemon juices, or spices. Zero synthetic PTFE or PFOA chemical coatings that wear out.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-2 h-full bg-cyan-400"></div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                      Layer 2 (Encapsulated Core)
                    </span>
                    <span className="text-xs font-semibold text-slate-300">Thermal Engine</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">High-Purity 1050 Aluminum Alloy</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    100% pure aluminum core sandwiched from edge to edge and up the vessel sidewalls. Conducts heat 4x faster than steel alone, eliminating localized scorch zones and reducing cooking fuel usage by 30%.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-2 h-full bg-emerald-400"></div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                      Layer 3 (Magnetic Base)
                    </span>
                    <span className="text-xs font-semibold text-slate-300">Induction Coupling</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">Magnetic AISI 430 Ferritic Stainless Steel</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Heavy-gauge magnetic steel outer layer engineered for rapid magnetic coupling on all induction hobs, as well as gas, halogen, ceramic, and high-temp commercial salamanders.
                  </p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-[#001FB5]/10 rounded-xl border border-[#001FB5]/30 flex items-center justify-between text-xs">
                <span className="text-blue-200 font-medium">Standard Clad Thickness: 2.6 mm to 3.0 mm</span>
                <span className="text-slate-400 font-mono">ASTM A240 / IS 14756</span>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-xl font-bold font-serif text-white">
                Why Home Chefs Choose Taarini Tri-Ply Over Peeling Non-Stick
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Traditional single-ply steel causes hotspots where gravies burn, while synthetic non-stick coatings degrade and chip into meals within a year. Tri-Ply delivers lifetime durability with pure, healthy culinary performance:
              </p>

              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950/60 text-xs">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400">
                      <th className="p-3 font-semibold">Cookware Attribute</th>
                      <th className="p-3 font-semibold text-[#7D9EFF]">Taarini Tri-Ply</th>
                      <th className="p-3 font-semibold">Single-Ply Steel</th>
                      <th className="p-3 font-semibold">Coated Non-Stick</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-300">
                    <tr>
                      <td className="p-3 font-medium">Even Heat Distribution</td>
                      <td className="p-3 text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-4 h-4" /> Uniform Rim-to-Rim
                      </td>
                      <td className="p-3 text-red-400">Poor (Hotspots)</td>
                      <td className="p-3 text-slate-400">Moderate</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Health & Chemical Safety</td>
                      <td className="p-3 text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-4 h-4" /> 100% Inert (Zero Leaching)
                      </td>
                      <td className="p-3 text-emerald-400">Inert</td>
                      <td className="p-3 text-red-400">Flaking PTFE/PFOA risk</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Induction Compatibility</td>
                      <td className="p-3 text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-4 h-4" /> Native 430 Base
                      </td>
                      <td className="p-3 text-slate-400">Variable</td>
                      <td className="p-3 text-slate-400">Requires glued disc</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Lifespan & Warranty</td>
                      <td className="p-3 text-[#7D9EFF] font-bold">10+ Years / Lifetime</td>
                      <td className="p-3 text-slate-400">3-5 Years</td>
                      <td className="p-3 text-red-400">1-2 Years</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Metal Utensil Friendly</td>
                      <td className="p-3 text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-4 h-4" /> Completely Safe
                      </td>
                      <td className="p-3 text-emerald-400">Safe</td>
                      <td className="p-3 text-red-400 flex items-center gap-1">
                        <X className="w-4 h-4" /> Scratches easily
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300">
                <Zap className="w-5 h-5 text-[#608CFF] shrink-0" />
                <span>
                  <strong>Fuel & Time Economy:</strong> Laboratory tests show Taarini tri-ply cookware reaches cooking temperature 22% faster than standard cookware, saving gas and electricity on daily cooking.
                </span>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Pressure Cooker Safety Engineering */}
        {activeTab === 'pressure' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            
            <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#001FB5]/20 border border-[#001FB5]/40 text-[#7D9EFF] flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="text-lg font-bold text-white">Internal Lock Pressure Safety Lid</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                The lid fits inside the body of the cooker rather than over it. As steam pressure builds internally, the physical pressure pushes the lid tighter against the rim lip. The cooker physically cannot be forced open while pressure exists inside.
              </p>
              <ul className="text-xs text-slate-400 space-y-2 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Tamper-proof pressure interlock
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Snug food-grade nitrile rubber gasket
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="text-lg font-bold text-white">Metallic Safety Plug & GRS</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                In the rare scenario where the main vent tube becomes blocked with food grains, the Gasket Release System (GRS) automatically flexes the gasket to release excess steam downwards safely away from the user.
              </p>
              <ul className="text-xs text-slate-400 space-y-2 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Fusible alloy melts above 140°C threshold
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Controlled downward deflection
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="text-lg font-bold text-white">5.5mm SAS Sandwich Thermal Base</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Stainless Steel - Aluminum - Stainless Steel impact bonded with 2,000-ton hydraulic force. Creates a seamless, air-pocket free bond that distributes intense heat evenly, preventing scorching of dal, biryani, or stew.
              </p>
              <ul className="text-xs text-slate-400 space-y-2 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Never bulges or separates under extreme heat
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Compliant with IS 2347 & CE PED 2014/68/EU
                </li>
              </ul>
            </div>

          </div>
        )}

        {/* Tab 3: Quality Testing & Certification */}
        {activeTab === 'qa' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-300">
            
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="text-[#7D9EFF] text-xs font-mono font-bold uppercase tracking-wider">
                Test Protocol 01
              </div>
              <h4 className="text-base font-bold text-white">Spectro Chemical Analysis</h4>
              <p className="text-xs text-slate-400">
                Every coil of stainless steel is checked via optical emission spectrometry to verify 18% Chromium and 8% Nickel composition with zero harmful heavy metals (Lead, Cadmium, Arsenic).
              </p>
              <span className="inline-block text-[11px] font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                Mill Test Cert (MTC 3.1)
              </span>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="text-sky-400 text-xs font-mono font-bold uppercase tracking-wider">
                Test Protocol 02
              </div>
              <h4 className="text-base font-bold text-white">Hydrostatic Burst Testing</h4>
              <p className="text-xs text-slate-400">
                Pressure cooker bodies are subjected to 100% pneumatic leak tests and sample burst pressures exceeding 4.5 bars (300% of standard working pressure) to verify margin of safety.
              </p>
              <span className="inline-block text-[11px] font-medium text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/40">
                100% Batch Inspected
              </span>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                Test Protocol 03
              </div>
              <h4 className="text-base font-bold text-white">Handle Fatigue & Drop Test</h4>
              <p className="text-xs text-slate-400">
                Solid cast handles and phenolic grips undergo 15,000 load cycles at 20kg weight and 1.5-meter drop tests onto hard surfaces to guarantee zero handle detachment or structural fracturing.
              </p>
              <span className="inline-block text-[11px] font-medium text-[#7D9EFF] bg-[#001FB5]/20 px-2 py-0.5 rounded border border-[#001FB5]/40">
                BS EN 12983-1 Standard
              </span>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="text-rose-400 text-xs font-mono font-bold uppercase tracking-wider">
                Test Protocol 04
              </div>
              <h4 className="text-base font-bold text-white">Salt Spray & Acid Immersion</h4>
              <p className="text-xs text-slate-400">
                Cookware samples endure 96 hours in continuous 5% neutral salt spray chambers and boiling citric acid to guarantee complete rust and corrosion resistance even with acidic tomatoes, tamarind, and citrus.
              </p>
              <span className="inline-block text-[11px] font-medium text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/40">
                100% Acid & Stain Resistant
              </span>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
