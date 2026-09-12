import React, { useState } from 'react';
import { 
  Building2, 
  Store, 
  Globe2, 
  HeartHandshake, 
  ShieldCheck, 
  Utensils, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  ChefHat, 
  Send, 
  CheckCircle2, 
  X,
  Award,
  Layers
} from 'lucide-react';

interface AboutUsSectionProps {
  onExploreCatalog?: () => void;
  onOpenGiftingModal?: () => void;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({
  onExploreCatalog,
  onOpenGiftingModal,
}) => {
  // Recipe submission modal state
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [recipeSubmitted, setRecipeSubmitted] = useState(false);
  const [recipeForm, setRecipeForm] = useState({
    chefName: '',
    email: '',
    recipeTitle: '',
    cookwareUsed: 'Taarini Platinum Tri-Ply Kadhai',
    dishType: 'Curry / Main Course',
    prepTime: '30 mins',
    secretTip: '',
    ingredientsOrSteps: '',
  });

  const handleRecipeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRecipeSubmitted(true);
    setTimeout(() => {
      // Keep state clean
      setRecipeForm({
        chefName: '',
        email: '',
        recipeTitle: '',
        cookwareUsed: 'Taarini Platinum Tri-Ply Kadhai',
        dishType: 'Curry / Main Course',
        prepTime: '30 mins',
        secretTip: '',
        ingredientsOrSteps: '',
      });
    }, 400);
  };

  return (
    <section id="about-us" className="py-20 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#001FB5]/20 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#001FB5]/10 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#001FB5]/30 border border-[#001FB5]/50 text-blue-200 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-[#7D9EFF]" />
            <span>Established 2020 • Noida, India</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-serif text-white mb-5 leading-tight">
            Crafted for Those Who Revere <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-[#7D9EFF]">
              Exceptional Cuisine
            </span>
          </h2>
          
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Founded in 2020 in Noida, Taarini Impex was built on a foundational philosophy: anyone who cherishes great cooking deserves access to the finest, safest, and most durable culinary tools available.
          </p>
        </div>

        {/* Narrative & Strategic Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Pillar 1: Roots & Inception */}
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-800/80 border border-slate-700/80 hover:border-[#001FB5]/60 transition-all duration-200 flex flex-col justify-between shadow-lg group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#001FB5]/30 border border-[#001FB5]/40 text-[#7D9EFF] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#7D9EFF] font-bold">
                  Origin & Headquarters
                </span>
                <h3 className="text-lg font-bold text-white font-serif">
                  Founded in Noida (2020)
                </h3>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Established in Noida, Uttar Pradesh, Taarini Impex began with an uncompromising mission to elevate everyday home and commercial cooking. What started as an obsession with metallurgical precision has expanded into a global network spanning India and our liaison office in Tokyo, Japan.
              </p>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
              <span>HQ: Sector 137, Noida</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 5+ Years Legacy
              </span>
            </div>
          </div>

          {/* Pillar 2: Omnichannel Distribution */}
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-800/80 border border-slate-700/80 hover:border-[#001FB5]/60 transition-all duration-200 flex flex-col justify-between shadow-lg group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#001FB5]/30 border border-[#001FB5]/40 text-[#7D9EFF] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                <Store className="w-6 h-6" />
              </div>
              
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#7D9EFF] font-bold">
                  Multi-Channel Reach
                </span>
                <h3 className="text-lg font-bold text-white font-serif">
                  Online & Offline Distribution
                </h3>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We operate a balanced omnichannel supply network. We serve direct retail consumers through our modern digital storefront while managing widespread offline distribution across physical cookware outlets, institutional wholesale, and international containerized exports.
              </p>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
              <span>B2C E-Commerce & Retail</span>
              <span className="text-blue-300 font-semibold flex items-center gap-1">
                <Globe2 className="w-3.5 h-3.5 text-[#7D9EFF]" /> Worldwide
              </span>
            </div>
          </div>

          {/* Pillar 3: Culinary Democratization */}
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-800/80 border border-slate-700/80 hover:border-[#001FB5]/60 transition-all duration-200 flex flex-col justify-between shadow-lg group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#001FB5]/30 border border-[#001FB5]/40 text-[#7D9EFF] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                <Utensils className="w-6 h-6" />
              </div>
              
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#7D9EFF] font-bold">
                  Core Conviction
                </span>
                <h3 className="text-lg font-bold text-white font-serif">
                  Best Cookware for Good Cuisine
                </h3>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We believe that culinary excellence is not reserved for five-star restaurants. Anyone passionate about good food deserves access to professional-grade tri-ply metal, heavy-gauge heat retention, and non-reactive cookware that brings out the truest flavors of every recipe.
              </p>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
              <span>100% Toxic-Free</span>
              <span className="text-amber-300 font-semibold flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> Chef Grade
              </span>
            </div>
          </div>

          {/* Pillar 4: Meticulous Sourcing & Quality */}
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-800/80 border border-slate-700/80 hover:border-[#001FB5]/60 transition-all duration-200 flex flex-col justify-between shadow-lg group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#001FB5]/30 border border-[#001FB5]/40 text-[#7D9EFF] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#7D9EFF] font-bold">
                  Metallurgical Integrity
                </span>
                <h3 className="text-lg font-bold text-white font-serif">
                  Careful Sourcing & Trust
                </h3>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We source our materials meticulously—from certified surgical-grade AISI 304 stainless steel to aerospace-bonded conductive aluminum cores. Strict quality protocols govern every batch, ensuring zero hotspots, zero warping, and generational durability that earns customer trust.
              </p>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
              <span>Rigorous Lab Audits</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <HeartHandshake className="w-3.5 h-3.5" /> 100% Guaranteed
              </span>
            </div>
          </div>

        </div>

        {/* Corporate Trust Banner & Story Quote */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#001FB5]/30 via-slate-800 to-slate-900 border border-[#001FB5]/40 mb-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#7D9EFF] uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Our Uncompromising Promise
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-white leading-snug">
                "No wonder customers trust us with their most cherished kitchen traditions."
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                When you cook with Taarini Impex, you are not merely using a pot or a pan. You are cooking with an instrument that distributes heat evenly across every millimeter, caramelizes aromatics without burning, preserves essential nutrients, and never leaches chemical non-stick coatings into your family's food.
              </p>
              
              {/* Trust Metric Chips */}
              <div className="pt-2 flex flex-wrap gap-3 text-xs">
                <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-200 font-medium">
                  🏢 <strong>Founded:</strong> 2020 (Noida, India)
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-200 font-medium">
                  🌐 <strong>Reach:</strong> Online D2C + Offline Distributor Network
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-200 font-medium">
                  🛡️ <strong>Quality:</strong> Food-Grade AISI 304 + Pure Tri-Ply
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={() => setIsRecipeModalOpen(true)}
                className="w-full py-3.5 px-5 rounded-2xl bg-[#001FB5] hover:bg-[#001799] text-white font-bold text-xs sm:text-sm transition-all duration-150 shadow-lg shadow-[#001FB5]/40 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ChefHat className="w-4 h-4 text-blue-200" />
                <span>Share Your Best Recipe</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="mailto:nitin13313@gmail.com?cc=nagendra@hotmail.co.in&subject=Inquiry%20from%20Taarini%20Impex%20Website"
                className="w-full py-3.5 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-bold text-xs sm:text-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <Mail className="w-4 h-4 text-[#7D9EFF]" />
                <span>Get In Touch With Us</span>
              </a>
            </div>

          </div>
        </div>

        {/* Contact & Community Engagement Hub */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Card A: Don't Hesitate to Get in Touch */}
          <div className="p-7 sm:p-8 rounded-3xl bg-slate-800/60 border border-slate-700/80 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#001FB5]/20 border border-[#001FB5]/40 text-[#7D9EFF] flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-full">
                  Direct Inquiries Welcomed
                </span>
              </div>

              <div>
                <h4 className="text-xl font-bold font-serif text-white mb-2">
                  Don't Hesitate to Get in Touch
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Whether you are an individual culinary enthusiast with questions about seasoning, a retail store seeking wholesale offline distribution, or a corporate client planning custom gifts, our leadership team is always accessible.
                </p>
              </div>

              <div className="space-y-3.5 pt-2 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#7D9EFF] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <strong className="text-white block">India Headquarters (Noida):</strong>
                    <span className="text-slate-300 block">N-1605, Logix Blossom County, Sector - 137, Noida, Uttar Pradesh, India</span>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] pt-0.5">
                      <span className="flex items-center gap-1.5 text-slate-200">
                        <Phone className="w-3 h-3 text-[#7D9EFF]" />
                        <a href="tel:+919599784303" className="hover:text-white transition-colors">+91 95997 84303</a>
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-200">
                        <Mail className="w-3 h-3 text-[#7D9EFF]" />
                        <a href="mailto:nitin13313@gmail.com" className="text-blue-300 hover:underline">nitin13313@gmail.com</a>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-1 border-t border-slate-700/50">
                  <MapPin className="w-4 h-4 text-[#7D9EFF] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <strong className="text-white block">Japan Liaison Office (Tokyo):</strong>
                    <span className="text-slate-300 block">Kitakasai 5-4-6, Edogawa Ku, Tokyo, Japan</span>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] pt-0.5">
                      <span className="flex items-center gap-1.5 text-slate-200">
                        <Phone className="w-3 h-3 text-[#7D9EFF]" />
                        <a href="tel:+817076032819" className="hover:text-white transition-colors">+81-70-7603-2819</a>
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-200">
                        <Mail className="w-3 h-3 text-[#7D9EFF]" />
                        <a href="mailto:nagendra@hotmail.co.in" className="text-blue-300 hover:underline">nagendra@hotmail.co.in</a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-700/60 flex flex-wrap items-center gap-3">
              <a
                href="mailto:nitin13313@gmail.com?cc=nagendra@hotmail.co.in&subject=Distribution%20%26%20General%20Inquiry"
                className="px-4 py-2 rounded-xl bg-[#001FB5] hover:bg-[#001799] text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" /> Send Direct Message
              </a>
              {onOpenGiftingModal && (
                <button
                  onClick={onOpenGiftingModal}
                  className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Corporate Gifting Desk
                </button>
              )}
            </div>
          </div>

          {/* Card B: Share Your Best Recipes With Us */}
          <div className="p-7 sm:p-8 rounded-3xl bg-slate-800/60 border border-slate-700/80 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#001FB5]/20 border border-[#001FB5]/40 text-[#7D9EFF] flex items-center justify-center">
                  <ChefHat className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-blue-300 bg-blue-950/60 border border-blue-800/60 px-2.5 py-1 rounded-full">
                  Culinary Community
                </span>
              </div>

              <div>
                <h4 className="text-xl font-bold font-serif text-white mb-2">
                  Share Your Best Recipes With Us
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Food is a shared language. Have you mastered a rich dal makhani in our tri-ply kadhai, a succulent biryani in our handi cooker, or crispy paper-thin dosas on our tawa? We would love to feature your culinary secrets in our recipe journal!
                </p>
              </div>

              {/* Recipe Sharing Perks */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-2.5">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> What happens when you submit:
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 pl-5 list-disc marker:text-[#7D9EFF]">
                  <li>Featured with your name in our official <strong>Tested Recipes</strong> directory.</li>
                  <li>Receive exclusive early access to prototype cookware and test batches.</li>
                  <li>Earn a celebratory <strong>₹500 / $10 culinary store credit</strong> toward your next order.</li>
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-700/60">
              <button
                onClick={() => setIsRecipeModalOpen(true)}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#001FB5] to-[#1E3A8A] hover:from-[#001799] hover:to-[#1E3A8A] text-white font-bold text-xs sm:text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-md shadow-[#001FB5]/30 cursor-pointer"
              >
                <ChefHat className="w-4 h-4" />
                <span>Submit Your Signature Recipe</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Share Your Recipe Modal */}
      {isRecipeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden text-white">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#001FB5] text-white flex items-center justify-center">
                  <ChefHat className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Share Your Recipe with Taarini</h3>
                  <p className="text-[11px] text-slate-400">Join our community of passionate home & professional chefs</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsRecipeModalOpen(false);
                  setRecipeSubmitted(false);
                }}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            {recipeSubmitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold font-serif text-white">
                  Recipe Received with Gratitude!
                </h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Thank you for contributing to the Taarini culinary archive. Our kitchen team will review your recipe and dispatch your complimentary store credit voucher within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setIsRecipeModalOpen(false);
                    setRecipeSubmitted(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#001FB5] hover:bg-[#001799] text-white font-bold text-xs cursor-pointer transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleRecipeSubmit} className="p-6 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Ananya Sharma"
                      value={recipeForm.chefName}
                      onChange={(e) => setRecipeForm({ ...recipeForm, chefName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-hidden focus:border-[#001FB5]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="chef@example.com"
                      value={recipeForm.email}
                      onChange={(e) => setRecipeForm({ ...recipeForm, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-hidden focus:border-[#001FB5]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Recipe Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Slow-Simmered Rogan Josh"
                      value={recipeForm.recipeTitle}
                      onChange={(e) => setRecipeForm({ ...recipeForm, recipeTitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-hidden focus:border-[#001FB5]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Cookware Used</label>
                    <select
                      value={recipeForm.cookwareUsed}
                      onChange={(e) => setRecipeForm({ ...recipeForm, cookwareUsed: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-hidden focus:border-[#001FB5]"
                    >
                      <option value="Taarini Platinum Tri-Ply Kadhai">Taarini Platinum Tri-Ply Kadhai</option>
                      <option value="Taarini Royal Inner-Lid Cooker">Taarini Royal Inner-Lid Cooker</option>
                      <option value="Taarini Tri-Ply Skillet Frypan">Taarini Tri-Ply Skillet Frypan</option>
                      <option value="Taarini Handi Multi-Cooker">Taarini Handi Multi-Cooker</option>
                      <option value="Taarini Heavy-Gauge Dosa Tawa">Taarini Heavy-Gauge Dosa Tawa</option>
                      <option value="Taarini Multi-Tier Steamer">Taarini Multi-Tier Steamer</option>
                      <option value="Other Stainless Steel Pot">Other Stainless Steel Pot</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Your Secret Tip / Temperature Technique
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Use medium flame and let the onion paste brown naturally without stirring excessively"
                    value={recipeForm.secretTip}
                    onChange={(e) => setRecipeForm({ ...recipeForm, secretTip: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-hidden focus:border-[#001FB5]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Key Ingredients & Cooking Instructions
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="List the key ingredients and brief steps you follow..."
                    value={recipeForm.ingredientsOrSteps}
                    onChange={(e) => setRecipeForm({ ...recipeForm, ingredientsOrSteps: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-hidden focus:border-[#001FB5] resize-none"
                  ></textarea>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                  <span className="text-[10px] text-slate-400">
                    🔒 We respect your privacy & copyright.
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsRecipeModalOpen(false)}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#001FB5] hover:bg-[#001799] text-white font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Recipe</span>
                    </button>
                  </div>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
