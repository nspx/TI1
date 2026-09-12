import React, { useState } from 'react';
import { 
  Globe2, 
  ShieldCheck, 
  Layers, 
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Heart,
  Flame,
  UtensilsCrossed,
  HelpCircle,
  Gift,
  PhoneCall,
  MapPin,
  Building2
} from 'lucide-react';
import { CurrencyCode } from '../types';
import { CURRENCIES } from '../data/currencies';
import { Logo } from './Logo';

interface NavbarProps {
  currentCurrency: CurrencyCode;
  onCurrencyChange: (curr: CurrencyCode) => void;
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenCartDrawer: () => void;
  cartItemCount: number;
  wishlistCount?: number;
  onOpenGiftingModal: () => void;
  onOpenPanFinder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCurrency,
  onCurrencyChange,
  activeSection,
  onNavigate,
  onOpenCartDrawer,
  cartItemCount,
  wishlistCount = 0,
  onOpenGiftingModal,
  onOpenPanFinder,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'catalog', label: 'All Cookware', icon: Layers },
    { id: 'pan-finder', label: 'Pan Finder Quiz', icon: Flame, action: onOpenPanFinder },
    { id: 'technology', label: 'Why Tri-Ply?', icon: ShieldCheck },
    { id: 'care-guide', label: 'Water Drop Guide', icon: HelpCircle },
    { id: 'recipes', label: 'Tested Recipes', icon: UtensilsCrossed },
    { id: 'about-us', label: 'About Us', icon: Building2 },
    { id: 'reviews', label: 'Reviews', icon: Sparkles },
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.action) {
      link.action();
    } else {
      onNavigate(link.id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      {/* Top Utility Announcement Bar */}
      <div className="bg-[#050B20] text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1 text-[#4F7CFF] font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" /> 100% Toxin-Free Cooking
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="text-slate-300 text-[11px] sm:text-xs">
              Free Express Doorstep Delivery on Orders $45+ • 10-Year Replacement Guarantee
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="hidden lg:inline-flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3 h-3 text-[#4F7CFF]" /> India: Noida • Japan: Tokyo
            </span>
            <span className="hidden lg:inline text-slate-700">|</span>
            <div className="hidden sm:inline-flex items-center gap-3">
              <a 
                href="tel:+919599784303" 
                className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
                title="Call India Office"
              >
                <PhoneCall className="w-3 h-3 text-[#4F7CFF]" /> IN: +91 95997 84303
              </a>
              <span className="text-slate-700">|</span>
              <a 
                href="tel:+817076032819" 
                className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
                title="Call Japan Office"
              >
                <PhoneCall className="w-3 h-3 text-[#4F7CFF]" /> JP: +81-70-7603-2819
              </a>
            </div>
            <span className="hidden sm:inline text-slate-700">|</span>
            <button
              onClick={onOpenGiftingModal}
              className="text-[#93B4FF] hover:text-white transition-colors flex items-center gap-1 font-semibold cursor-pointer"
            >
              <Gift className="w-3 h-3 text-[#4F7CFF]" /> Bulk & Wedding Gifting
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo as per Business Card */}
          <div 
            id="brand-logo"
            onClick={() => onNavigate('catalog')}
            className="cursor-pointer select-none"
          >
            <Logo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'text-[#001FB5] bg-[#EEF2FF] font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-[#001FB5] hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#001FB5]' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Currency Selector */}
            <div className="relative">
              <button
                id="currency-selector-btn"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 hover:border-[#001FB5]/40 bg-white text-xs font-bold text-slate-800 transition-colors shadow-2xs cursor-pointer"
                title="Change Currency"
              >
                <Globe2 className="w-3.5 h-3.5 text-[#001FB5]" />
                <span>{CURRENCIES[currentCurrency].symbol} {currentCurrency}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {currencyDropdownOpen && (
                <div 
                  className="absolute right-0 mt-1.5 w-48 rounded-2xl bg-white shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onClick={() => setCurrencyDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Select Currency
                  </div>
                  {Object.values(CURRENCIES).map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => onCurrencyChange(curr.code)}
                      className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-[#EEF2FF] transition-colors cursor-pointer ${
                        currentCurrency === curr.code ? 'font-bold text-[#001FB5] bg-[#EEF2FF]/70' : 'text-slate-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="font-mono w-4">{curr.symbol}</span>
                        <span>{curr.label}</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{curr.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist Indicator Button */}
            {wishlistCount > 0 && (
              <button
                onClick={() => onNavigate('catalog')}
                className="p-2 rounded-xl text-slate-600 hover:text-rose-500 hover:bg-rose-50 transition-colors relative cursor-pointer"
                title={`${wishlistCount} items in wishlist`}
              >
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              </button>
            )}

            {/* Shopping Cart Drawer Button */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCartDrawer}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#001FB5] hover:bg-[#001799] text-white text-xs font-bold shadow-md shadow-[#001FB5]/20 transition-all cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-white" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-white text-[#001FB5] text-[10px] font-black flex items-center justify-center shadow-xs">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Bag</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#EEF2FF] text-[#001FB5] font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#001FB5]' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenGiftingModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-xl border border-[#C7D7FE] bg-[#EEF2FF] text-[#001FB5] text-xs font-bold flex items-center justify-center gap-2"
            >
              <Gift className="w-4 h-4 text-[#001FB5]" />
              <span>Corporate & Wedding Gifting</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
