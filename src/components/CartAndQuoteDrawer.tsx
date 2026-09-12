import React, { useState } from 'react';
import { 
  CartItem, 
  CurrencyCode, 
  DistributorAccount 
} from '../types';
import { formatPrice } from '../data/currencies';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Ship, 
  Box, 
  Download, 
  Printer,
  Sparkles,
  CreditCard
} from 'lucide-react';

interface CartAndQuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currentCurrency: CurrencyCode;
  activeDistributor: DistributorAccount | null;
  onUpdateQuantity: (productId: string, variantId: string, quantity: number) => void;
  onRemoveItem: (productId: string, variantId: string) => void;
  onClearCart: () => void;
  onOpenRFQModal: () => void;
}

export const CartAndQuoteDrawer: React.FC<CartAndQuoteDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currentCurrency,
  activeDistributor,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenRFQModal,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'cart' | 'proforma'>('cart');
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Totals calculations
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalSubtotalUSD = items.reduce((sum, item) => {
    const effectivePrice = activeDistributor
      ? item.unitPriceUSD * (1 - activeDistributor.discountRate)
      : item.unitPriceUSD;
    return sum + effectivePrice * item.quantity;
  }, 0);

  const totalCartons = items.reduce((sum, item) => {
    return sum + Math.ceil(item.quantity / item.masterCartonUnits);
  }, 0);

  const totalCbm = items.reduce((sum, item) => {
    const cartons = Math.ceil(item.quantity / item.masterCartonUnits);
    return sum + cartons * item.cartonCbm;
  }, 0);

  const totalWeightKg = items.reduce((sum, item) => {
    const cartons = Math.ceil(item.quantity / item.masterCartonUnits);
    return sum + cartons * item.cartonWeightKg;
  }, 0);

  const handleSimulatedCheckout = () => {
    setCheckoutComplete(true);
    setTimeout(() => {
      onClearCart();
      setCheckoutComplete(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        id="cart-quote-drawer-panel"
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-bold font-serif">
                Cart & Wholesale RFQ Basket
              </h3>
              <p className="text-[11px] text-slate-400">
                {totalQuantity} Units ({totalCartons} Cartons) Selected
              </p>
            </div>
          </div>

          <button
            id="close-cart-drawer-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Tabs: Active List vs Proforma Summary */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-5 pt-2 text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveTab('cart')}
            className={`pb-2.5 px-3 border-b-2 transition-all ${
              activeTab === 'cart'
                ? 'border-amber-600 text-amber-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Items in Basket ({items.length})
          </button>
          <button
            onClick={() => setActiveTab('proforma')}
            className={`pb-2.5 px-3 border-b-2 transition-all ${
              activeTab === 'proforma'
                ? 'border-amber-600 text-amber-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Proforma Export Estimation
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {checkoutComplete ? (
            <div className="text-center py-16 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-lg font-bold text-slate-900 font-serif">
                Sample Order Processed
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Evaluation sample consignment reference generated. Dispatching tracking air waybill to your email.
              </p>
            </div>
          ) : activeTab === 'cart' ? (
            /* Cart Items List */
            items.length === 0 ? (
              <div className="text-center py-16 text-slate-400 space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto text-slate-300" />
                <p className="text-sm font-semibold text-slate-600">Your basket is currently empty</p>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Add cookware models from the catalog or build container configurations in the Container Estimator.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
                >
                  Explore Cookware Catalog
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => {
                  const effectivePrice = activeDistributor
                    ? item.unitPriceUSD * (1 - activeDistributor.discountRate)
                    : item.unitPriceUSD;
                  const itemCartons = Math.ceil(item.quantity / item.masterCartonUnits);

                  return (
                    <div
                      key={`${item.productId}-${item.variantId}`}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex gap-3 text-xs relative group"
                    >
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-16 h-16 rounded-lg object-cover bg-white border border-slate-200 shrink-0"
                        referrerPolicy="no-referrer"
                      />

                      <div className="flex-1 min-w-0 pr-6">
                        <p className="font-bold text-slate-900 truncate font-serif">
                          {item.productName}
                        </p>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                          {item.variantLabel} â€¢ SKU: {item.sku}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => onUpdateQuantity(item.productId, item.variantId, item.quantity - 1)}
                              className="w-6 h-6 rounded bg-white border border-slate-200 font-bold flex items-center justify-center hover:bg-slate-100"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => onUpdateQuantity(item.productId, item.variantId, parseInt(e.target.value) || 1)}
                              className="w-14 text-center py-0.5 border border-slate-200 rounded font-mono font-bold text-xs bg-white"
                            />
                            <button
                              onClick={() => onUpdateQuantity(item.productId, item.variantId, item.quantity + 1)}
                              className="w-6 h-6 rounded bg-white border border-slate-200 font-bold flex items-center justify-center hover:bg-slate-100"
                            >
                              +
                            </button>
                            <span className="text-[10px] text-slate-400 ml-1">
                              ({itemCartons} ctn)
                            </span>
                          </div>

                          <div className="text-right">
                            <span className="font-mono font-bold text-slate-900">
                              {formatPrice(effectivePrice * item.quantity, currentCurrency)}
                            </span>
                            <span className="text-[10px] text-slate-400 block">
                              @{formatPrice(effectivePrice, currentCurrency)} / pc
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.productId, item.variantId)}
                        className="absolute top-2.5 right-2.5 text-slate-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            /* Proforma Export Summary Tab */
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] font-mono">
                    Estimated Export Specification
                  </span>
                  <span className="text-slate-400 text-[11px]">FOB Nhava Sheva (JNPT)</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Consignment Pieces:</span>
                    <strong className="text-base text-white font-mono">{totalQuantity} Units</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Master Cartons:</span>
                    <strong className="text-base text-white font-mono">{totalCartons} ctn</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Total Volume (CBM):</span>
                    <strong className="text-base text-amber-400 font-mono">{totalCbm.toFixed(3)} mÂ³</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Est. Gross Weight:</span>
                    <strong className="text-base text-sky-400 font-mono">{totalWeightKg.toFixed(1)} kg</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  Container Fit: {+(totalCbm / 28.0 * 100).toFixed(1)}% of 20' FCL | {+(totalCbm / 68.0 * 100).toFixed(1)}% of 40' HQ
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] space-y-1">
                <p className="font-bold">Export Proforma Terms:</p>
                <p>Prices quoted are direct factory export rates. Final CIF freight rates depend on current shipping line bunker adjustment factor (BAF) at port of dispatch.</p>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer / Checkout & RFQ Actions */}
        {items.length > 0 && !checkoutComplete && (
          <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-3 shrink-0">
            {/* Subtotal Display */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Consignment Subtotal:</span>
                <span className="font-mono font-medium">
                  {formatPrice(totalSubtotalUSD, currentCurrency)}
                </span>
              </div>

              {activeDistributor && (
                <div className="flex items-center justify-between text-xs text-emerald-700 font-semibold">
                  <span>Distributor Privilege Applied:</span>
                  <span>-{(activeDistributor.discountRate * 100).toFixed(0)}% Off MSRP</span>
                </div>
              )}

              <div className="flex items-center justify-between text-sm font-bold text-slate-900 pt-1 border-t border-slate-200">
                <span>Estimated Export Total:</span>
                <span className="text-lg font-black text-amber-700 font-mono">
                  {formatPrice(totalSubtotalUSD, currentCurrency)}
                </span>
              </div>
            </div>

            {/* Dual Actions: Sample direct vs Wholesale RFQ */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                id="cart-checkout-sample-btn"
                onClick={handleSimulatedCheckout}
                className="py-2.5 px-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Sample Order</span>
              </button>

              <button
                id="cart-proceed-rfq-btn"
                onClick={() => {
                  onClose();
                  onOpenRFQModal();
                }}
                className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Submit Wholesale RFQ</span>
              </button>
            </div>

            <p className="text-[10px] text-slate-400 text-center">
              Taarini Impex Global Export Division â€¢ IEC & RCMC Registered Exporter
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
