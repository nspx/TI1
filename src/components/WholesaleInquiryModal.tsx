import React, { useState } from 'react';
import { 
  WholesaleInquiry, 
  CurrencyCode, 
  CartItem, 
  DistributorAccount 
} from '../types';
import { formatPrice } from '../data/currencies';
import { 
  X, 
  CheckCircle2, 
  FileText, 
  Send, 
  Ship, 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Tag, 
  Sparkles,
  Download,
  Trash2
} from 'lucide-react';

interface WholesaleInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCurrency: CurrencyCode;
  initialItems?: CartItem[];
  activeDistributor?: DistributorAccount | null;
  onInquirySubmitted: (inquiry: WholesaleInquiry) => void;
}

export const WholesaleInquiryModal: React.FC<WholesaleInquiryModalProps> = ({
  isOpen,
  onClose,
  currentCurrency,
  initialItems = [],
  activeDistributor,
  onInquirySubmitted,
}) => {
  if (!isOpen) return null;

  const [companyName, setCompanyName] = useState(activeDistributor?.companyName || '');
  const [contactPerson, setContactPerson] = useState(activeDistributor?.representativeName || '');
  const [email, setEmail] = useState(activeDistributor?.email || '');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState(activeDistributor?.country || 'United Arab Emirates');
  const [destinationPort, setDestinationPort] = useState(activeDistributor?.primaryPort || 'Jebel Ali Port (AEJEA)');
  const [incoterm, setIncoterm] = useState<'FOB' | 'CIF' | 'CFR' | 'EXW' | 'DDP'>('FOB');
  const [targetVolume, setTargetVolume] = useState<'Sample / Trial LCL' | '20ft FCL Container' | '40ft HQ FCL Container' | 'Multi-Container Monthly Contract'>('20ft FCL Container');
  const [customBrandingOEM, setCustomBrandingOEM] = useState(false);
  const [brandNameText, setBrandNameText] = useState('');
  const [packagingPreference, setPackagingPreference] = useState<'Export Master Carton' | 'Color Luxury Gift Box + Master Carton' | 'Shrink Wrapped Retail Pallet'>('Color Luxury Gift Box + Master Carton');
  const [notes, setNotes] = useState('');
  
  // Manage list of items to quote
  const [quoteItems, setQuoteItems] = useState(
    initialItems.length > 0
      ? initialItems.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          variantLabel: item.variantLabel,
          quantity: item.quantity >= 50 ? item.quantity : 100, // Default to wholesale tier qty
          estimatedUnitPriceUSD: item.unitPriceUSD * 0.6, // estimated wholesale base
        }))
      : [
          {
            productId: 'tp-kadhai-deluxe',
            productName: 'Taarini Platinum Tri-Ply Deep Kadhai with Lid',
            variantLabel: '24 cm / 2.8 Litres',
            quantity: 200,
            estimatedUnitPriceUSD: 19.20,
          },
          {
            productId: 'pc-royal-innerlid',
            productName: 'Taarini Royal Inner-Lid Stainless Steel Pressure Cooker',
            variantLabel: '5.0 Litres (Most Popular Family Size)',
            quantity: 150,
            estimatedUnitPriceUSD: 24.20,
          },
        ]
  );

  const [submittedInquiry, setSubmittedInquiry] = useState<WholesaleInquiry | null>(null);

  const estimatedTotalUSD = quoteItems.reduce(
    (acc, item) => acc + item.quantity * item.estimatedUnitPriceUSD,
    0
  );

  const handleUpdateItemQty = (index: number, newQty: number) => {
    setQuoteItems((prev) => {
      const copy = [...prev];
      copy[index].quantity = Math.max(10, newQty);
      return copy;
    });
  };

  const handleRemoveItem = (index: number) => {
    setQuoteItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !email.trim()) return;

    const newInquiry: WholesaleInquiry = {
      id: `RFQ-TI-${Date.now().toString().slice(-6)}`,
      companyName,
      contactPerson,
      email,
      phone,
      country,
      destinationPort,
      incoterm,
      targetVolume,
      customBrandingOEM,
      brandNameText: customBrandingOEM ? brandNameText : undefined,
      packagingPreference,
      notes,
      items: quoteItems,
      status: 'Received',
      createdAt: new Date().toISOString().split('T')[0],
      estimatedTotalUSD,
    };

    setSubmittedInquiry(newInquiry);
    onInquirySubmitted(newInquiry);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        id="wholesale-rfq-modal-container"
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Ship className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold font-serif">
                Wholesale Export RFQ & Trade Quotation
              </h3>
              <p className="text-[11px] text-slate-400">
                Direct factory pricing â€¢ FOB JNPT / Mundra or CIF Global Ports
              </p>
            </div>
          </div>

          <button
            id="close-wholesale-rfq-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {submittedInquiry ? (
            /* Success State */
            <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider">
                  RFQ ID: {submittedInquiry.id}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 font-serif">
                  Commercial Inquiry Received
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                  Thank you, <strong>{submittedInquiry.contactPerson}</strong>. Our Export Directorate has received your request for <strong>{submittedInquiry.companyName}</strong>.
                </p>
              </div>

              {/* Inquiry Brief Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Destination Port:</span>
                  <span className="font-bold text-slate-800">{submittedInquiry.destinationPort}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Incoterm:</span>
                  <span className="font-mono font-bold text-slate-800">{submittedInquiry.incoterm}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Volume:</span>
                  <span className="font-semibold text-slate-800">{submittedInquiry.targetVolume}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Items Requested:</span>
                  <span className="font-bold text-slate-800">
                    {submittedInquiry.items.reduce((a, b) => a + b.quantity, 0)} Units
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-700">Estimated FOB Value:</span>
                  <span className="font-mono font-black text-amber-700 text-sm">
                    {formatPrice(submittedInquiry.estimatedTotalUSD, currentCurrency)}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                A formal Proforma Quotation and commercial packing list will be sent to <strong>{submittedInquiry.email}</strong> within 12 business hours.
              </p>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all"
                >
                  Return to Catalog
                </button>
              </div>
            </div>
          ) : (
            /* Inquiry Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Company & Buyer Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-amber-600" />
                  1. Company & Importer Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Company / Trading Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Al-Zahra Commercial Kitchens LLC"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Contact Person / Title *
                    </label>
                    <input
                      required
                      type="text"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="e.g. Tariq Al-Mansoor (Procurement Director)"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Corporate Email *
                    </label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="trade@company.com"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Phone / WhatsApp (with Country Code)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+971 50 123 4567"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping & Trade Terms */}
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-amber-600" />
                  2. Destination Port & Trade Terms
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Destination Country
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Germany">Germany</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Qatar">Qatar</option>
                      <option value="Kuwait">Kuwait</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Singapore">Singapore</option>
                      <option value="India">Domestic (India)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Discharge Port / Terminal
                    </label>
                    <input
                      type="text"
                      value={destinationPort}
                      onChange={(e) => setDestinationPort(e.target.value)}
                      placeholder="e.g. Jebel Ali / Hamburg / Long Beach"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Preferred Incoterm
                    </label>
                    <select
                      value={incoterm}
                      onChange={(e) => setIncoterm(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono font-bold"
                    >
                      <option value="FOB">FOB (Nhava Sheva / Mundra Port)</option>
                      <option value="CIF">CIF (Cost, Insurance & Freight to Port)</option>
                      <option value="CFR">CFR (Cost & Freight)</option>
                      <option value="EXW">EXW (Factory Vasai/Gujarat)</option>
                      <option value="DDP">DDP (Delivered Duty Paid)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Estimated Volume Requirement
                    </label>
                    <select
                      value={targetVolume}
                      onChange={(e) => setTargetVolume(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-semibold"
                    >
                      <option value="20ft FCL Container">20' FCL Container (~1,200 - 1,800 Cartons)</option>
                      <option value="40ft HQ FCL Container">40' High Cube Container (~2,800 - 3,500 Cartons)</option>
                      <option value="Sample / Trial LCL">Sample / Trial Order (LCL Consolidated)</option>
                      <option value="Multi-Container Monthly Contract">Multi-Container Monthly Supply Contract</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Packaging Preference
                    </label>
                    <select
                      value={packagingPreference}
                      onChange={(e) => setPackagingPreference(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="Color Luxury Gift Box + Master Carton">Color Luxury Gift Box + 5-Ply Master Carton</option>
                      <option value="Export Master Carton">Export Master Carton (Direct Retail Ready)</option>
                      <option value="Shrink Wrapped Retail Pallet">Shrink-Wrapped Wooden Heat-Treated Pallet</option>
                    </select>
                  </div>
                </div>

                {/* OEM Private Branding Toggle */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customBrandingOEM}
                      onChange={(e) => setCustomBrandingOEM(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span className="text-xs font-bold text-slate-800">
                      Include Custom OEM Laser Engraving & Private Label Packaging
                    </span>
                  </label>

                  {customBrandingOEM && (
                    <div className="pt-2 pl-6">
                      <input
                        type="text"
                        value={brandNameText}
                        onChange={(e) => setBrandNameText(e.target.value)}
                        placeholder="Enter brand name / trademark for cookware bottom and handle..."
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Items Selected for Quotation */}
              <div className="space-y-2 pt-3 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-600" />
                    3. Selected Items for Quotation ({quoteItems.length})
                  </h4>
                  <span className="text-xs font-mono font-bold text-amber-700">
                    Est. Total: {formatPrice(estimatedTotalUSD, currentCurrency)}
                  </span>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 max-h-48 overflow-y-auto">
                  {quoteItems.map((item, idx) => (
                    <div key={idx} className="p-2.5 bg-white flex items-center justify-between gap-3 text-xs">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-800 truncate">{item.productName}</p>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {item.variantLabel} â€¢ Est: {formatPrice(item.estimatedUnitPriceUSD, currentCurrency)} / pc
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="10"
                          step="10"
                          value={item.quantity}
                          onChange={(e) => handleUpdateItemQty(idx, parseInt(e.target.value) || 10)}
                          className="w-20 px-2 py-1 border border-slate-200 rounded-lg text-center font-mono font-bold text-xs"
                          title="Quantity in pieces"
                        />
                        <span className="text-slate-500 text-[11px]">pcs</span>

                        <button
                          type="button"
                          onClick={() => handleRemoveItem(idx)}
                          className="text-slate-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {quoteItems.length === 0 && (
                    <div className="p-4 text-center text-xs text-slate-400">
                      No items selected. Add products from the catalog or container estimator.
                    </div>
                  )}
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Technical Specifications / Certification Requirements / Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Specify any test certificates (e.g. LFGB / FDA), custom handle finishes, carton drop test criteria, or special labeling..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-500">
                  Direct Inquiries: India <a href="tel:+919599784303" className="text-slate-700 hover:text-blue-600 font-medium">+91 95997 84303</a> • Japan <a href="tel:+817076032819" className="text-slate-700 hover:text-blue-600 font-medium">+81-70-7603-2819</a>
                </span>

                <button
                  id="submit-wholesale-rfq-btn"
                  type="submit"
                  disabled={quoteItems.length === 0}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                  <span>Submit Wholesale RFQ</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
