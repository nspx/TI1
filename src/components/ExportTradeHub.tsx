import React, { useState } from 'react';
import { 
  Ship, 
  Anchor, 
  Globe2, 
  FileCheck2, 
  Tag, 
  Container, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Boxes,
  HelpCircle,
  Truck
} from 'lucide-react';
import { COOKWARE_PRODUCTS } from '../data/products';
import { Product, ProductVariant } from '../types';

interface ExportTradeHubProps {
  onOpenRFQModal: () => void;
  onAddEstimatorToRFQ: (items: { product: Product; variant: ProductVariant; quantity: number }[]) => void;
}

export const ExportTradeHub: React.FC<ExportTradeHubProps> = ({
  onOpenRFQModal,
  onAddEstimatorToRFQ,
}) => {
  // Interactive Container Estimator state
  const [selectedContainerType, setSelectedContainerType] = useState<'20ft' | '40ft_hq'>('40ft_hq');
  const [cartonQuantities, setCartonQuantities] = useState<Record<string, number>>({
    'tp-kadhai-deluxe_tp-kadhai-24': 80,
    'pc-royal-innerlid_pc-inner-5l': 100,
    'tp-frypan-skillet_tp-fry-24': 90,
    'sas-saucepan-glasslid_sas-sauce-16': 70,
  });

  // Container specifications
  const containerSpecs = {
    '20ft': {
      label: "20' Standard Dry Container",
      maxCbm: 28.0,
      maxWeightKg: 21500,
      idealFor: 'Regional distributors, trial FCL orders, and dense heavy shipments',
    },
    '40ft_hq': {
      label: "40' High Cube Container",
      maxCbm: 68.0,
      maxWeightKg: 26500,
      idealFor: 'High-volume international shipments, retail chain seasonal stock',
    },
  };

  // Calculate totals
  const currentEstimates = React.useMemo(() => {
    let totalCbm = 0;
    let totalWeight = 0;
    let totalPieces = 0;
    let totalCartons = 0;
    const itemsList: { product: Product; variant: ProductVariant; quantity: number }[] = [];

    Object.entries(cartonQuantities).forEach(([key, val]) => {
      const cartons = Number(val) || 0;
      if (cartons <= 0) return;
      const [productId, variantId] = key.split('_');
      const product = COOKWARE_PRODUCTS.find((p) => p.id === productId);
      if (!product) return;
      const variant = product.variants.find((v) => v.id === variantId) || product.variants[0];
      if (!variant) return;

      const pieces = cartons * variant.masterCartonUnits;
      const cbm = cartons * variant.cartonCbm;
      const weight = cartons * variant.cartonWeightKg;

      totalCbm += cbm;
      totalWeight += weight;
      totalPieces += pieces;
      totalCartons += cartons;

      itemsList.push({
        product,
        variant,
        quantity: pieces,
      });
    });

    return {
      totalCbm: +totalCbm.toFixed(2),
      totalWeight: +totalWeight.toFixed(1),
      totalPieces,
      totalCartons,
      itemsList,
    };
  }, [cartonQuantities]);

  const activeSpec = containerSpecs[selectedContainerType];
  const cbmUtilization = Math.min(100, +((currentEstimates.totalCbm / activeSpec.maxCbm) * 100).toFixed(1));
  const weightUtilization = Math.min(100, +((currentEstimates.totalWeight / activeSpec.maxWeightKg) * 100).toFixed(1));

  const handleUpdateCartons = (key: string, delta: number) => {
    setCartonQuantities((prev) => {
      const current = prev[key] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [key]: next };
    });
  };

  const handleTransferToRFQ = () => {
    if (currentEstimates.itemsList.length > 0) {
      onAddEstimatorToRFQ(currentEstimates.itemsList);
    }
  };

  return (
    <section id="export-hub" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Export Infrastructure Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold tracking-wider uppercase">
            <Anchor className="w-3.5 h-3.5 text-amber-600" /> Global Trade Network
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-tight">
            Comprehensive Cookware Export & OEM Solutions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Global cookware export enterprise with offices in <strong>Noida, India</strong> (Sector - 137) and <strong>Tokyo, Japan</strong> (Edogawa Ku). We deliver certified, containerized stainless steel cookware directly to worldwide ports under flexible Incoterms.
          </p>
        </div>

        {/* Global Trade Key Metrics & Logistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Anchor className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-serif">Dual Gateway Ports</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Direct container loading from <strong>Nhava Sheva (JNPT)</strong> and <strong>Mundra Port</strong>, offering optimal sea transit times to Europe, the Americas, GCC, and Southeast Asia.
            </p>
            <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-200">
              JNPT: 45km from plant â€¢ Mundra: Western hub
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-serif">Supported Incoterms</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We execute transparent international contracts under <strong>FOB (Port of Origin), CIF (Port of Discharge), CFR, EXW, and DDP</strong> (where applicable for regional hub distributions).
            </p>
            <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-200">
              LC at Sight, TT (30/70), Bank Guarantees
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Tag className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-serif">OEM & Private Labeling</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Full private labeling services including high-precision laser brand etching, customized multi-color gift box packaging, barcode stickers, and personalized user manuals in multiple languages.
            </p>
            <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-200">
              Complimentary on Container FCL contracts
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-serif">Export Compliances</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Accompanied by certified <strong>Mill Test Certificates (MTC 3.1)</strong>, Certificate of Origin (COO), Phytosanitary fumigation for wooden pallets, and third-party inspection (SGS, TÃœV, Intertek).
            </p>
            <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-200">
              ISO 9001:2015 â€¢ CE PED â€¢ FDA Safe
            </div>
          </div>

        </div>

        {/* Interactive Container Load Estimator Section */}
        <div id="estimator" className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                <Container className="w-4 h-4" /> Global Logistics Tool
              </div>
              <h3 className="text-2xl font-bold font-serif">
                Interactive Container Load & CBM Estimator
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                Configure your product mix to check how many cartons fit into a standard 20' or 40' High Cube sea container. Instantly calculate CBM volume, gross weight, and container capacity utilization.
              </p>
            </div>

            {/* Container Selector Tabs */}
            <div className="flex p-1 rounded-xl bg-slate-800 border border-slate-700">
              <button
                id="estimator-tab-20ft"
                onClick={() => setSelectedContainerType('20ft')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedContainerType === '20ft'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                20' Standard Dry (28 CBM)
              </button>
              <button
                id="estimator-tab-40fthq"
                onClick={() => setSelectedContainerType('40ft_hq')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedContainerType === '40ft_hq'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                40' High Cube (68 CBM)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Product Mix Carton Adjuster */}
            <div className="lg:col-span-7 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Adjust Cookware Master Carton Allocations:
              </h4>

              <div className="space-y-2 max-h-[360px] overflow-y-auto pr-2">
                {COOKWARE_PRODUCTS.slice(0, 6).map((product) => {
                  const variant = product.variants[1] || product.variants[0];
                  const key = `${product.id}_${variant.id}`;
                  const cartons = cartonQuantities[key] || 0;

                  return (
                    <div 
                      key={key}
                      className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt=""
                          className="w-10 h-10 rounded-lg object-cover bg-slate-800 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-bold text-white line-clamp-1">{product.name}</p>
                          <p className="text-[11px] text-slate-400 font-mono">
                            {variant.sizeLabel} â€¢ {variant.masterCartonUnits} pcs/ctn â€¢ {variant.cartonCbm} CBM
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleUpdateCartons(key, -10)}
                          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold flex items-center justify-center text-xs"
                        >
                          -10
                        </button>
                        <span className="w-12 text-center font-mono font-bold text-amber-400 text-xs">
                          {cartons} ctn
                        </span>
                        <button
                          onClick={() => handleUpdateCartons(key, 10)}
                          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold flex items-center justify-center text-xs"
                        >
                          +10
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Real-Time Utilization Gauge & Container Visualizer */}
            <div className="lg:col-span-5 bg-slate-950/80 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-300">
                    Selected: <strong className="text-amber-400">{activeSpec.label}</strong>
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Max: {activeSpec.maxCbm} CBM / {activeSpec.maxWeightKg.toLocaleString()} kg
                  </span>
                </div>

                {/* CBM Progress Bar */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-medium">Volume Utilization (CBM):</span>
                    <span className="font-mono font-bold text-amber-400">
                      {currentEstimates.totalCbm} / {activeSpec.maxCbm} mÂ³ ({cbmUtilization}%)
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                    <div
                      className={`h-full transition-all duration-500 ${
                        cbmUtilization > 100
                          ? 'bg-red-500'
                          : cbmUtilization > 85
                          ? 'bg-emerald-400'
                          : 'bg-amber-400'
                      }`}
                      style={{ width: `${Math.min(100, cbmUtilization)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Weight Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-medium">Payload Weight (kg):</span>
                    <span className="font-mono font-bold text-sky-400">
                      {currentEstimates.totalWeight.toLocaleString()} / {activeSpec.maxWeightKg.toLocaleString()} kg ({weightUtilization}%)
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                    <div
                      className="h-full bg-sky-400 transition-all duration-500"
                      style={{ width: `${Math.min(100, weightUtilization)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Summary Box */}
                <div className="mt-6 grid grid-cols-2 gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Total Units (Pieces):</span>
                    <span className="text-base font-bold font-mono text-white">
                      {currentEstimates.totalPieces.toLocaleString()} pcs
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Total Cartons:</span>
                    <span className="text-base font-bold font-mono text-white">
                      {currentEstimates.totalCartons} ctn
                    </span>
                  </div>
                </div>
              </div>

              {/* Action: Transfer to RFQ */}
              <div className="space-y-2">
                <button
                  id="estimator-transfer-rfq-btn"
                  onClick={handleTransferToRFQ}
                  disabled={currentEstimates.totalPieces === 0}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <span>Transfer Mix to Wholesale RFQ ({currentEstimates.totalPieces} pcs)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-slate-500 text-center">
                  Calculations based on standard export master carton dimensions with shrink palletization.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
