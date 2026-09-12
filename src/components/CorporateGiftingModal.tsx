import React, { useState } from 'react';
import { Gift, X, CheckCircle2, Send } from 'lucide-react';

interface CorporateGiftingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CorporateGiftingModal: React.FC<CorporateGiftingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [company, setCompany] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState('25-50 sets');
  const [occasion, setOccasion] = useState('Festival / Diwali Hampers');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] text-[#001FB5] text-xs font-bold uppercase tracking-wider mb-2 border border-[#C7D7FE]">
            <Gift className="w-3.5 h-3.5 text-[#001FB5]" /> Premium Gifting
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-serif">
            Bulk & Corporate Gifting Inquiries
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Custom-boxed cookware sets with optional company logo laser engraving for corporate milestones, festivals, and wedding registries.
          </p>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Inquiry Received!</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Our executive gifting concierge will contact you within 4 business hours with customized gift box catalogs and volume pricing.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Organization *</label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Acme Corp"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#001FB5]/20 focus:border-[#001FB5]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Person *</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Rajesh Varma"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#001FB5]/20 focus:border-[#001FB5]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rajesh@acmepartners.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#001FB5]/20 focus:border-[#001FB5]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 00000"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#001FB5]/20 focus:border-[#001FB5]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Estimated Quantity</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-[#001FB5]/20 focus:border-[#001FB5]"
                >
                  <option value="15-30 sets">15 - 30 sets</option>
                  <option value="30-75 sets">30 - 75 sets</option>
                  <option value="75-200 sets">75 - 200 sets</option>
                  <option value="200+ sets">200+ sets</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Occasion / Gifting Reason</label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-[#001FB5]/20 focus:border-[#001FB5]"
                >
                  <option value="Festival / Diwali Hampers">Festival / Diwali Hampers</option>
                  <option value="Employee Appreciation">Employee Appreciation & Rewards</option>
                  <option value="Wedding Registry / Return Gift">Wedding Registry / Return Gift</option>
                  <option value="Client / Executive Gifting">Client / Executive Gifting</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Special Requirements (e.g. Custom Logo Laser Marking)</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention preferred cookware models, budget range per set, or delivery city..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#001FB5]/20 focus:border-[#001FB5]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#001FB5] hover:bg-[#001799] text-white text-xs font-bold transition-all shadow-md shadow-[#001FB5]/25 flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-[#7D9EFF]" />
                <span>Submit Gifting Request</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
