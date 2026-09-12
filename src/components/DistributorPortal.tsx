import React, { useState } from 'react';
import { 
  DistributorAccount, 
  CurrencyCode, 
  Product, 
  ProductVariant, 
  ShipmentTracking 
} from '../types';
import { MOCK_SHIPMENTS } from '../data/distributors';
import { COOKWARE_PRODUCTS } from '../data/products';
import { formatPrice } from '../data/currencies';
import { 
  Building2, 
  UserCheck, 
  LogOut, 
  Ship, 
  FileSpreadsheet, 
  Download, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Anchor, 
  Boxes, 
  CreditCard, 
  ShieldCheck, 
  Package, 
  Layers, 
  ArrowRight,
  TrendingUp,
  AlertCircle,
  FileCheck2
} from 'lucide-react';

interface DistributorPortalProps {
  distributor: DistributorAccount;
  currentCurrency: CurrencyCode;
  onLogout: () => void;
  onAddBulkOrderToRFQ: (items: { product: Product; variant: ProductVariant; quantity: number }[]) => void;
}

export const DistributorPortal: React.FC<DistributorPortalProps> = ({
  distributor,
  currentCurrency,
  onLogout,
  onAddBulkOrderToRFQ,
}) => {
  const [activeTab, setActiveTab] = useState<'shipments' | 'bulk-order' | 'downloads' | 'orders'>('shipments');
  
  // Matrix order quantities: record of variantId -> quantity
  const [matrixQuantities, setMatrixQuantities] = useState<Record<string, number>>({
    'tp-kadhai-24': 120,
    'pc-inner-5l': 100,
    'tp-fry-24': 180,
    'sas-sauce-16': 160,
  });

  const [orderSubmittedSuccess, setOrderSubmittedSuccess] = useState(false);
  const [downloadModalDoc, setDownloadModalDoc] = useState<string | null>(null);

  // Find relevant shipment for this distributor's port or default
  const relevantShipments = MOCK_SHIPMENTS;

  // Calculate matrix order totals
  const matrixSummary = React.useMemo(() => {
    let totalPieces = 0;
    let totalUSD = 0;
    let totalCbm = 0;
    let totalWeight = 0;
    let totalCartons = 0;
    const itemsList: { product: Product; variant: ProductVariant; quantity: number }[] = [];

    COOKWARE_PRODUCTS.forEach((product) => {
      product.variants.forEach((variant) => {
        const qty = matrixQuantities[variant.id] || 0;
        if (qty > 0) {
          const distributorPrice = variant.retailPriceUSD * (1 - distributor.discountRate);
          const cartons = Math.ceil(qty / variant.masterCartonUnits);
          
          totalPieces += qty;
          totalUSD += qty * distributorPrice;
          totalCbm += cartons * variant.cartonCbm;
          totalWeight += cartons * variant.cartonWeightKg;
          totalCartons += cartons;

          itemsList.push({
            product,
            variant,
            quantity: qty,
          });
        }
      });
    });

    return {
      totalPieces,
      totalUSD,
      totalCbm: +totalCbm.toFixed(2),
      totalWeight: +totalWeight.toFixed(1),
      totalCartons,
      itemsList,
    };
  }, [matrixQuantities, distributor.discountRate]);

  const handleMatrixQtyChange = (variantId: string, value: string) => {
    const num = Math.max(0, parseInt(value) || 0);
    setMatrixQuantities((prev) => ({
      ...prev,
      [variantId]: num,
    }));
  };

  const handleSubmitMatrixOrder = () => {
    if (matrixSummary.itemsList.length === 0) return;
    onAddBulkOrderToRFQ(matrixSummary.itemsList);
    setOrderSubmittedSuccess(true);
    setTimeout(() => setOrderSubmittedSuccess(false), 3000);
  };

  return (
    <section id="distributor-portal-view" className="py-10 bg-slate-900 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Distributor Account Profile Banner */}
        <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 font-black text-xl flex items-center justify-center shrink-0 shadow-lg">
              {distributor.companyName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold font-serif text-white">
                  {distributor.companyName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold">
                  {distributor.partnerTier}
                </span>
              </div>

              <p className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>Rep: <strong className="text-slate-200">{distributor.representativeName}</strong></span>
                <span>â€¢</span>
                <span>Port: <strong className="text-slate-200">{distributor.primaryPort}</strong></span>
                <span>â€¢</span>
                <span>Account: <span className="font-mono text-amber-400">{distributor.token}</span></span>
              </p>
            </div>
          </div>

          {/* Key Financial & Contract Indicators */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                Contract Discount
              </span>
              <span className="text-base font-black text-emerald-400 font-mono">
                -{(distributor.discountRate * 100).toFixed(0)}% Off MSRP
              </span>
            </div>

            <div className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                Trade Credit Line
              </span>
              <span className="text-base font-black text-white font-mono">
                {formatPrice(distributor.creditLimitUSD, currentCurrency)}
              </span>
            </div>

            <button
              id="distributor-logout-btn"
              onClick={onLogout}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              title="Sign Out of Distributor Account"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Portal Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
          <button
            id="dist-tab-shipments"
            onClick={() => setActiveTab('shipments')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'shipments'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Ship className="w-4 h-4" />
            <span>Active Shipments & Container BL Tracking ({relevantShipments.length})</span>
          </button>

          <button
            id="dist-tab-bulk-order"
            onClick={() => setActiveTab('bulk-order')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'bulk-order'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Matrix Quick Bulk Order Sheet</span>
          </button>

          <button
            id="dist-tab-downloads"
            onClick={() => setActiveTab('downloads')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'downloads'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Export Catalogs & Test Certificates</span>
          </button>
        </div>

        {/* TAB 1: Live Shipments & Bill of Lading Tracking */}
        {activeTab === 'shipments' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-xl font-bold font-serif text-white">
                  Ocean Container Consignments in Transit
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time Bill of Lading (BL) status for container shipments dispatched from Nhava Sheva (JNPT) & Mundra Ports.
                </p>
              </div>

              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                All Sea Vessel Trackers Live
              </span>
            </div>

            <div className="space-y-4">
              {relevantShipments.map((shipment) => (
                <div
                  key={shipment.id}
                  className="p-6 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-md space-y-5"
                >
                  {/* Top Shipment Meta */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-amber-400">
                          {shipment.blNumber}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">
                          Container: {shipment.containerNumber}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-medium mt-1">
                        Vessel: <strong className="text-white">{shipment.vesselName}</strong> â€¢ Booking: {shipment.bookingRef}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                          ETA Destination
                        </span>
                        <span className="font-mono text-xs font-bold text-emerald-400">
                          {shipment.estimatedArrival}
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-lg bg-sky-950 border border-sky-800 text-sky-400 text-xs font-bold font-mono">
                        {shipment.status}
                      </span>
                    </div>
                  </div>

                  {/* Route Visualizer */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="flex items-start gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <Anchor className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase block font-bold">
                          Port of Loading (POL)
                        </span>
                        <p className="font-bold text-slate-200">{shipment.originPort}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                          Sailed: {shipment.departureDate}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <Ship className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase block font-bold">
                          Port of Discharge (POD)
                        </span>
                        <p className="font-bold text-slate-200">{shipment.destinationPort}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                          Est. Arrival: {shipment.estimatedArrival}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Milestone Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Factory Cleared</span>
                      <span>Port Loaded (JNPT)</span>
                      <span className="text-amber-400 font-bold">In Transit (Sea Voyage)</span>
                      <span>Customs Terminal</span>
                      <span>Port Discharge</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full"
                        style={{ width: `${shipment.progressPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Manifest Contents */}
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                    <div>
                      <span className="text-slate-400">Cargo Manifest: </span>
                      <span className="font-medium text-slate-200">{shipment.contentsSummary}</span>
                    </div>
                    <div className="flex items-center gap-4 font-mono text-slate-400 text-[11px]">
                      <span>{shipment.cartonCount} Master Cartons</span>
                      <span>â€¢</span>
                      <span>{shipment.cbm} CBM</span>
                      <span>â€¢</span>
                      <span>{shipment.grossWeightKg.toLocaleString()} kg Gross</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Matrix Quick Bulk Order Sheet */}
        {activeTab === 'bulk-order' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold font-serif text-white">
                  Matrix Wholesale Quick-Ordering Sheet
                </h3>
                <p className="text-xs text-slate-400">
                  Input quantities in master carton multiples. Your negotiated rate (-{(distributor.discountRate * 100).toFixed(0)}%) is applied automatically.
                </p>
              </div>

              {orderSubmittedSuccess && (
                <div className="px-3 py-1.5 bg-emerald-950 border border-emerald-700 text-emerald-400 text-xs font-bold rounded-xl flex items-center gap-1.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Transferred to Wholesale Order Desk!</span>
                </div>
              )}
            </div>

            {/* Matrix Table */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-lg">
              <div className="overflow-x-auto max-h-[460px] overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="sticky top-0 bg-slate-900 text-slate-300 border-b border-slate-800 z-10">
                    <tr>
                      <th className="p-3.5 font-bold">Cookware Model & Specification</th>
                      <th className="p-3.5 font-bold">Size / Volume</th>
                      <th className="p-3.5 font-bold">Retail MSRP</th>
                      <th className="p-3.5 font-bold text-amber-400">Distributor Net Price</th>
                      <th className="p-3.5 font-bold">Pack (Pcs/Ctn)</th>
                      <th className="p-3.5 font-bold w-32">Order Pieces</th>
                      <th className="p-3.5 font-bold text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {COOKWARE_PRODUCTS.map((product) =>
                      product.variants.map((variant) => {
                        const qty = matrixQuantities[variant.id] || 0;
                        const distPrice = variant.retailPriceUSD * (1 - distributor.discountRate);
                        const lineSubtotal = qty * distPrice;

                        return (
                          <tr key={variant.id} className="hover:bg-slate-900/50 transition-colors">
                            <td className="p-3">
                              <p className="font-bold text-white">{product.name}</p>
                              <span className="text-[10px] text-slate-400 font-mono">
                                SKU: {variant.sku} â€¢ {product.gauge}
                              </span>
                            </td>

                            <td className="p-3 font-semibold text-slate-300">
                              {variant.sizeLabel}
                            </td>

                            <td className="p-3 font-mono text-slate-400 line-through">
                              {formatPrice(variant.retailPriceUSD, currentCurrency)}
                            </td>

                            <td className="p-3 font-mono font-bold text-emerald-400">
                              {formatPrice(distPrice, currentCurrency)}
                            </td>

                            <td className="p-3 font-mono text-slate-400">
                              {variant.masterCartonUnits} pcs ({variant.cartonCbm} mÂ³)
                            </td>

                            <td className="p-3">
                              <input
                                type="number"
                                min="0"
                                step={variant.masterCartonUnits}
                                value={qty}
                                onChange={(e) => handleMatrixQtyChange(variant.id, e.target.value)}
                                className="w-24 px-2.5 py-1 bg-slate-900 border border-slate-700 rounded-lg text-center font-mono font-bold text-amber-400 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                              />
                            </td>

                            <td className="p-3 font-mono font-bold text-white text-right">
                              {lineSubtotal > 0 ? formatPrice(lineSubtotal, currentCurrency) : 'â€”'}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Matrix Order Bottom Summary Bar */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block font-sans text-[11px]">Total Pieces:</span>
                  <span className="text-base font-bold text-white">{matrixSummary.totalPieces} pcs</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-sans text-[11px]">Master Cartons:</span>
                  <span className="text-base font-bold text-white">{matrixSummary.totalCartons} ctn</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-sans text-[11px]">Total CBM:</span>
                  <span className="text-base font-bold text-amber-400">{matrixSummary.totalCbm} mÂ³</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-sans text-[11px]">Estimated Value:</span>
                  <span className="text-base font-bold text-emerald-400">
                    {formatPrice(matrixSummary.totalUSD, currentCurrency)}
                  </span>
                </div>
              </div>

              <button
                id="submit-matrix-order-btn"
                onClick={handleSubmitMatrixOrder}
                disabled={matrixSummary.totalPieces === 0}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <span>Add Bulk Matrix to Export Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: Digital Asset Center & Certificates */}
        {activeTab === 'downloads' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-xl font-bold font-serif text-white">
                Export Documentation & Marketing Resources
              </h3>
              <p className="text-xs text-slate-400">
                Download verified technical compliance certificates, 2026 Master Catalogs, and high-resolution packaging assets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white font-serif">2026 Master Cookware Catalog</h4>
                  <p className="text-xs text-slate-400">
                    Complete 48-page export catalog featuring full product dimensions, weights, and packaging specifications.
                  </p>
                </div>
                <button
                  onClick={() => setDownloadModalDoc('2026_Taarini_Master_Export_Catalog.pdf')}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-800"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF (12.4 MB)</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white font-serif">Mill Test Certificate (MTC 3.1)</h4>
                  <p className="text-xs text-slate-400">
                    Spectrometric chemical analysis verifying AISI 304 food-grade purity (18% Cr / 8% Ni) and toxic element limits.
                  </p>
                </div>
                <button
                  onClick={() => setDownloadModalDoc('Taarini_SS304_Mill_Test_Certificate.pdf')}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-sky-400 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-800"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download MTC 3.1 (2.1 MB)</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white font-serif">CE PED & ISI IS 2347 Certification</h4>
                  <p className="text-xs text-slate-400">
                    European Pressure Equipment Directive certificate and Indian Standards Institute approval for pressure cookers.
                  </p>
                </div>
                <button
                  onClick={() => setDownloadModalDoc('CE_PED_ISI_Certification_Pack.pdf')}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-emerald-400 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-800"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Cert (1.8 MB)</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white font-serif">High-Res Image & Marketing Pack</h4>
                  <p className="text-xs text-slate-400">
                    White-background e-commerce cutout imagery (300 DPI) and lifestyle photography for retail distributor websites.
                  </p>
                </div>
                <button
                  onClick={() => setDownloadModalDoc('Taarini_Marketing_Asset_Pack_2026.zip')}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-purple-400 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-800"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download ZIP (85 MB)</span>
                </button>
              </div>

            </div>

            {/* Download Notification Banner */}
            {downloadModalDoc && (
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Ready for transmission: <strong>{downloadModalDoc}</strong> has been verified.</span>
                </div>
                <button
                  onClick={() => setDownloadModalDoc(null)}
                  className="text-slate-400 hover:text-white"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
