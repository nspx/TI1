import React, { useState } from 'react';
import { CartItem, CurrencyCode, OrderDetails } from '../types';
import { formatPrice } from '../data/currencies';
import { 
  ShoppingBag, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Tag, 
  CreditCard, 
  QrCode, 
  Banknote, 
  CheckCircle2, 
  ArrowLeft
} from 'lucide-react';

interface CartAndCheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currentCurrency: CurrencyCode;
  onUpdateQuantity: (productId: string, variantId: string, quantity: number) => void;
  onRemoveItem: (productId: string, variantId: string) => void;
  onClearCart: () => void;
}

export const CartAndCheckoutDrawer: React.FC<CartAndCheckoutDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currentCurrency,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [viewState, setViewState] = useState<'cart' | 'checkout' | 'confirmation'>('cart');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Checkout Form State
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  if (!isOpen) return null;

  // Pricing calculations
  const subtotalUSD = items.reduce((sum, item) => sum + item.unitPriceUSD * item.quantity, 0);
  const freeShippingThresholdUSD = 45;
  const isFreeShipping = subtotalUSD >= freeShippingThresholdUSD || subtotalUSD === 0;
  const shippingUSD = isFreeShipping ? 0 : 5.0;
  const discountUSD = (subtotalUSD * discountPercent) / 100;
  const totalUSD = Math.max(0, subtotalUSD - discountUSD + shippingUSD);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThresholdUSD - subtotalUSD);
  const shippingProgress = Math.min(100, Math.round((subtotalUSD / freeShippingThresholdUSD) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'FIRST10' || code === 'FIRSTCHEF10') {
      setDiscountPercent(10);
      setPromoSuccess('10% First Chef Discount applied!');
    } else if (code === 'TAARINI15') {
      setDiscountPercent(15);
      setPromoSuccess('15% Taarini Special Discount applied!');
    } else if (code === 'CHEF20') {
      setDiscountPercent(20);
      setPromoSuccess('20% Master Chef Discount applied!');
    } else {
      setPromoError('Invalid coupon code. Try FIRST10 or TAARINI15');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !address || !phone) return;

    const order: OrderDetails = {
      orderId: `TI-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName,
      email: email || 'customer@example.com',
      phone,
      address,
      city: city || 'City',
      postalCode: postalCode || '110001',
      paymentMethod: paymentMethod === 'card' ? 'Credit / Debit Card' : paymentMethod === 'upi' ? 'UPI / QR Instant Pay' : 'Cash on Delivery',
      items: [...items],
      subtotalUSD,
      discountUSD,
      shippingUSD,
      totalUSD,
      orderDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    setCompletedOrder(order);
    setViewState('confirmation');
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-250">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2.5">
              {viewState === 'checkout' && (
                <button
                  onClick={() => setViewState('cart')}
                  className="p-1 -ml-1 text-slate-500 hover:text-slate-800 rounded-lg cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <ShoppingBag className="w-5 h-5 text-[#001FB5]" />
              <div>
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  {viewState === 'cart' ? 'Your Shopping Bag' : viewState === 'checkout' ? 'Express Checkout' : 'Order Placed!'}
                </h3>
                <span className="text-[11px] text-slate-500">
                  {viewState === 'cart' ? `${items.reduce((acc, i) => acc + i.quantity, 0)} cookware items` : 'Fast & Secure Delivery'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            
            {/* VIEW 1: CART ITEMS */}
            {viewState === 'cart' && (
              <>
                {/* Free Shipping Progress */}
                <div className="p-3.5 rounded-2xl bg-[#EEF2FF] border border-[#C7D7FE] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#001FB5] flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-[#001FB5]" />
                      {isFreeShipping 
                        ? "🎉 You've unlocked FREE Express Delivery!" 
                        : `Add ${formatPrice(amountNeededForFreeShipping, currentCurrency)} more for FREE Delivery`}
                    </span>
                    <span className="font-mono text-[#001FB5] text-[11px] font-bold">
                      {shippingProgress}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#C7D7FE] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#001FB5] rounded-full transition-all duration-300"
                      style={{ width: `${shippingProgress}%` }}
                    />
                  </div>
                </div>

                {/* Items List */}
                {items.length > 0 ? (
                  <div className="space-y-3 divide-y divide-slate-100">
                    {items.map((item) => (
                      <div key={`${item.productId}-${item.variantId}`} className="pt-3 first:pt-0 flex gap-3">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                          referrerPolicy="no-referrer"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate font-serif" title={item.productName}>
                            {item.productName}
                          </h4>
                          <span className="text-[11px] text-slate-500 block truncate">
                            {item.variantLabel}
                          </span>

                          <div className="flex items-center justify-between mt-2">
                            <div className="text-xs font-bold text-[#001FB5] font-mono">
                              {formatPrice(item.unitPriceUSD, currentCurrency)}
                            </div>

                            {/* Quantity Stepper */}
                            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                              <button
                                onClick={() => onUpdateQuantity(item.productId, item.variantId, item.quantity - 1)}
                                className="p-1 hover:bg-slate-200 text-slate-600 cursor-pointer"
                                title="Decrease"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-2.5 text-xs font-bold font-mono text-slate-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.productId, item.variantId, item.quantity + 1)}
                                className="p-1 hover:bg-slate-200 text-slate-600 cursor-pointer"
                                title="Increase"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.productId, item.variantId)}
                              className="text-slate-400 hover:text-rose-500 p-1 transition-colors cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                      <ShoppingBag className="w-7 h-7" />
                    </div>
                    <h4 className="text-base font-bold text-slate-800">Your bag is empty</h4>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                      Explore our handcrafted Tri-Ply cookware and pressure cookers to elevate your everyday meals.
                    </p>
                  </div>
                )}

                {/* Coupon Code Box */}
                {items.length > 0 && (
                  <div className="pt-2">
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Coupon Code (e.g. FIRST10)"
                          className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs uppercase placeholder:normal-case font-mono focus:border-[#001FB5] focus:ring-1 focus:ring-[#001FB5]/20"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#001FB5] hover:bg-[#001799] text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-xs"
                      >
                        Apply
                      </button>
                    </form>
                    {promoSuccess && (
                      <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> {promoSuccess}
                      </p>
                    )}
                    {promoError && (
                      <p className="text-[11px] text-rose-500 font-medium mt-1">
                        {promoError}
                      </p>
                    )}
                  </div>
                )}
              </>
            )}

            {/* VIEW 2: CHECKOUT FORM */}
            {viewState === 'checkout' && (
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    1. Delivery Address
                  </h4>
                  <p className="text-xs text-slate-500">Where should we deliver your cookware?</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Priya Sharma"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#001FB5]/20 focus:border-[#001FB5]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#001FB5]/20 focus:border-[#001FB5]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="priya@example.com"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#001FB5]/20 focus:border-[#001FB5]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Street Address *</label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Flat 402, Heritage Residency, MG Road"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#001FB5]/20 focus:border-[#001FB5]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Mumbai"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#001FB5]/20 focus:border-[#001FB5]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Postal Code *</label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="400001"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#001FB5]/20 focus:border-[#001FB5]"
                    />
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    2. Payment Method
                  </h4>

                  <div className="space-y-2">
                    {[
                      { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
                      { id: 'upi', label: 'Instant UPI / QR', icon: QrCode, desc: 'Google Pay, PhonePe, Paytm' },
                      { id: 'cod', label: 'Cash on Delivery', icon: Banknote, desc: 'Pay with cash or QR at doorstep' },
                    ].map((method) => {
                      const Icon = method.icon;
                      return (
                        <label
                          key={method.id}
                          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                            paymentMethod === method.id
                              ? 'border-[#001FB5] bg-[#EEF2FF] shadow-2xs'
                              : 'border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="paymentMethod"
                              checked={paymentMethod === method.id}
                              onChange={() => setPaymentMethod(method.id as any)}
                              className="accent-[#001FB5]"
                            />
                            <div>
                              <div className={`text-xs font-bold ${paymentMethod === method.id ? 'text-[#001FB5]' : 'text-slate-900'}`}>
                                {method.label}
                              </div>
                              <div className="text-[10px] text-slate-500">{method.desc}</div>
                            </div>
                          </div>
                          <Icon className={`w-4 h-4 ${paymentMethod === method.id ? 'text-[#001FB5]' : 'text-slate-500'}`} />
                        </label>
                      );
                    })}
                  </div>
                </div>
              </form>
            )}

            {/* VIEW 3: ORDER CONFIRMATION */}
            {viewState === 'confirmation' && completedOrder && (
              <div className="py-6 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#001FB5] uppercase tracking-wider bg-[#EEF2FF] px-2.5 py-0.5 rounded-full border border-[#C7D7FE]">
                    Order Confirmed
                  </span>
                  <h4 className="text-xl font-bold text-slate-900 font-serif mt-1">
                    Thank You, {completedOrder.customerName}!
                  </h4>
                  <p className="text-xs text-slate-500">
                    Order ID: <span className="font-mono font-bold text-[#001FB5]">{completedOrder.orderId}</span>
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Date:</span>
                    <span className="font-medium text-slate-900">{completedOrder.orderDate}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Payment:</span>
                    <span className="font-medium text-slate-900">{completedOrder.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Estimated Delivery:</span>
                    <span className="font-bold text-emerald-600">3 - 4 Business Days</span>
                  </div>
                  <div className="flex justify-between text-slate-600 pt-1 border-t border-slate-200">
                    <span>Delivering To:</span>
                    <span className="font-medium text-slate-900 text-right truncate max-w-[180px]">
                      {completedOrder.address}, {completedOrder.city}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#EEF2FF] border border-[#C7D7FE] text-xs text-slate-800 flex items-center gap-2 text-left">
                  <ShieldCheck className="w-5 h-5 text-[#001FB5] shrink-0" />
                  <span>
                    Your 10-Year Warranty is automatically registered with this order.
                  </span>
                </div>

                <button
                  onClick={() => {
                    setViewState('cart');
                    onClose();
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#001FB5] hover:bg-[#001799] text-white text-xs font-bold shadow-md shadow-[#001FB5]/25 cursor-pointer transition-all"
                >
                  Continue Exploring Cookware
                </button>
              </div>
            )}

          </div>

          {/* Footer & Checkout Action */}
          {viewState !== 'confirmation' && items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/70 space-y-3">
              {/* Cost Summary */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-mono font-medium">{formatPrice(subtotalUSD, currentCurrency)}</span>
                </div>

                {discountUSD > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Coupon Discount</span>
                    <span className="font-mono">-{formatPrice(discountUSD, currentCurrency)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>Express Doorstep Delivery</span>
                  <span className="font-mono font-medium">
                    {isFreeShipping ? <strong className="text-emerald-600">FREE</strong> : formatPrice(shippingUSD, currentCurrency)}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="font-mono text-base font-black text-[#001FB5]">
                    {formatPrice(totalUSD, currentCurrency)}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              {viewState === 'cart' ? (
                <button
                  id="btn-proceed-checkout"
                  onClick={() => setViewState('checkout')}
                  className="w-full py-3 px-4 rounded-xl bg-[#001FB5] hover:bg-[#001799] text-white text-xs font-bold shadow-md shadow-[#001FB5]/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  form="checkout-form"
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Place Order ({formatPrice(totalUSD, currentCurrency)})</span>
                </button>
              )}

              <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400 font-medium pt-1">
                <span>🔒 256-Bit SSL Encryption</span>
                <span>•</span>
                <span>🛡️ 30-Day Hassle-Free Returns</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
