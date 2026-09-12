import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles, 
  ArrowUp,
  Truck,
  Droplets,
  CheckCircle2,
  Gift
} from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (section: string) => void;
  onOpenGiftingModal: () => void;
  onOpenPanFinder: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenGiftingModal,
  onOpenPanFinder,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => setNewsletterSubscribed(false), 3000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#050B20] text-slate-300 border-t border-slate-800 text-xs">
      
      {/* Top Consumer Assurance Strip */}
      <div className="border-b border-slate-800/80 py-6 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center sm:text-left">
            
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-xl bg-[#001FB5]/20 text-[#7D9EFF] border border-[#001FB5]/40 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white text-xs">10-Year Replacement Guarantee</p>
                <p className="text-[11px] text-slate-400">Heirloom-grade clad bond</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white text-xs">Free Express Delivery</p>
                <p className="text-[11px] text-slate-400">On all orders over $45 / ₹1,999</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center shrink-0">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white text-xs">100% Non-Toxic Steel</p>
                <p className="text-[11px] text-slate-400">Zero Teflon, PFAS, or lead</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-xl bg-[#001FB5]/20 text-[#7D9EFF] border border-[#001FB5]/40 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white text-xs">30-Day Cooking Trial</p>
                <p className="text-[11px] text-slate-400">Hassle-free doorstep returns</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Story with Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <Logo variant="light" size="md" />
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Crafted for home cooks who care about health, durability, and authentic flavors. 
              Our tri-ply clad cookware eliminates hotspots, cleans with ease, and lasts for generations.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-xs font-bold text-white block mb-1">
                Get 10% Off Your First Order
              </span>
              <p className="text-[11px] text-slate-400 mb-2">
                Join 25,000+ home chefs. Use coupon code <strong className="text-[#7D9EFF]">FIRST10</strong> at checkout.
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-xs">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-[#001FB5]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-[#001FB5] hover:bg-[#001799] text-white font-bold text-xs cursor-pointer transition-colors shadow-sm shadow-[#001FB5]/30"
                >
                  Join
                </button>
              </form>
              {newsletterSubscribed && (
                <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Welcome! Check your inbox for secret chef tips.
                </p>
              )}
            </div>
          </div>

          {/* Product Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Shop Cookware
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-[#7D9EFF] transition-colors cursor-pointer">
                  Platinum Tri-Ply Kadhais
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-[#7D9EFF] transition-colors cursor-pointer">
                  Inner-Lid Pressure Cookers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-[#7D9EFF] transition-colors cursor-pointer">
                  Clip-On Multi-Cookers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-[#7D9EFF] transition-colors cursor-pointer">
                  Tri-Ply Skillets & Frypans
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-[#7D9EFF] transition-colors cursor-pointer">
                  Artisan Dosa & Crepe Tawas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-[#7D9EFF] transition-colors cursor-pointer">
                  5-Piece Gift Cookware Set
                </button>
              </li>
            </ul>
          </div>

          {/* Culinary Guides */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Cook & Learn
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={onOpenPanFinder} className="hover:text-[#7D9EFF] transition-colors flex items-center gap-1 text-left cursor-pointer">
                  <span>Cookware Finder Quiz</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('care-guide')} className="hover:text-[#7D9EFF] transition-colors cursor-pointer">
                  Water Droplet Test (Non-Stick)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('technology')} className="hover:text-[#7D9EFF] transition-colors cursor-pointer">
                  Tri-Ply Engineering
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about-us')} className="hover:text-[#7D9EFF] transition-colors cursor-pointer text-white font-medium">
                  About Us (Noida & Tokyo)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('recipes')} className="hover:text-[#7D9EFF] transition-colors cursor-pointer">
                  Tested Home Recipes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reviews')} className="hover:text-[#7D9EFF] transition-colors cursor-pointer">
                  Verified Customer Reviews
                </button>
              </li>
              <li>
                <button onClick={onOpenGiftingModal} className="hover:text-[#7D9EFF] transition-colors flex items-center gap-1 cursor-pointer">
                  <Gift className="w-3.5 h-3.5 text-[#7D9EFF]" />
                  <span>Corporate & Wedding Gifting</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Global Offices */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Global Offices & Contact
            </h4>
            <ul className="space-y-3.5 text-slate-400 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#7D9EFF] shrink-0 mt-0.5" />
                <div className="leading-snug space-y-1">
                  <span className="text-white font-semibold block text-[11px] uppercase tracking-wider">India Office</span>
                  <span className="text-slate-300 block text-[11px]">N-1605, Logix Blossom County, Sector - 137, Noida, India</span>
                  <div className="space-y-0.5 text-[11px] pt-0.5">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Phone className="w-3 h-3 text-[#7D9EFF] shrink-0" />
                      <a href="tel:+919599784303" className="hover:text-white transition-colors">
                        +91 95997 84303
                      </a>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Mail className="w-3 h-3 text-[#7D9EFF] shrink-0" />
                      <a href="mailto:nitin13313@gmail.com" className="hover:text-white transition-colors">
                        nitin13313@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#7D9EFF] shrink-0 mt-0.5" />
                <div className="leading-snug space-y-1">
                  <span className="text-white font-semibold block text-[11px] uppercase tracking-wider">Japan Office</span>
                  <span className="text-slate-300 block text-[11px]">Kitakasai 5-4-6, Edogawa Ku, Tokyo, Japan</span>
                  <div className="space-y-0.5 text-[11px] pt-0.5">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Phone className="w-3 h-3 text-[#7D9EFF] shrink-0" />
                      <a href="tel:+817076032819" className="hover:text-white transition-colors">
                        +81-70-7603-2819
                      </a>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Mail className="w-3 h-3 text-[#7D9EFF] shrink-0" />
                      <a href="mailto:nagendra@hotmail.co.in" className="hover:text-white transition-colors">
                        nagendra@hotmail.co.in
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li className="pt-1 text-[11px] text-slate-500">
                Support: Mon - Sat 9:00 AM - 7:00 PM
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Payment Strip */}
        <div className="border-t border-slate-800/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} Taarini Impex. All rights reserved. Premium Stainless Steel Cookware.
          </p>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="text-[11px]">Safe & Secure Payments: Visa • Mastercard • UPI • RuPay • Apple Pay</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-[#001FB5] text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
