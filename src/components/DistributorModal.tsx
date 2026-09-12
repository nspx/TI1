import React, { useState } from 'react';
import { DistributorAccount } from '../types';
import { DEMO_DISTRIBUTORS } from '../data/distributors';
import { 
  X, 
  Lock, 
  UserCheck, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Globe2, 
  FileText,
  BadgeCheck
} from 'lucide-react';

interface DistributorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (distributor: DistributorAccount) => void;
}

export const DistributorModal: React.FC<DistributorModalProps> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [emailInput, setEmailInput] = useState('');
  const [accessKeyInput, setAccessKeyInput] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // New registration state
  const [regCompany, setRegCompany] = useState('');
  const [regCountry, setRegCountry] = useState('United Arab Emirates');
  const [regVat, setRegVat] = useState('');
  const [regVolume, setRegVolume] = useState('20ft FCL Container / Month');

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const found = DEMO_DISTRIBUTORS.find(
      (d) => d.email.toLowerCase() === emailInput.trim().toLowerCase()
    );
    if (found) {
      onLogin(found);
      onClose();
    } else {
      // Fallback custom distributor
      const customDist: DistributorAccount = {
        id: `dist-${Date.now().toString().slice(-4)}`,
        companyName: emailInput.split('@')[0].toUpperCase() + ' TRADING CORP',
        representativeName: 'Authorized Representative',
        email: emailInput,
        country: 'International',
        region: 'Middle East',
        primaryPort: 'Major International Port',
        partnerTier: 'Gold Global Distributor',
        discountRate: 0.40,
        creditLimitUSD: 100000,
        activeShipmentsCount: 1,
        token: `auth-${Date.now()}`,
      };
      onLogin(customDist);
      onClose();
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regCompany) return;
    setRegisterSuccess(true);
    setTimeout(() => {
      // Auto-log into new profile
      const newDist: DistributorAccount = {
        id: `dist-${Date.now().toString().slice(-4)}`,
        companyName: regCompany,
        representativeName: 'Commercial Director',
        email: 'trade@' + regCompany.toLowerCase().replace(/\s+/g, '') + '.com',
        country: regCountry,
        region: 'Middle East',
        primaryPort: 'Primary Sea Terminal',
        partnerTier: 'Gold Global Distributor',
        discountRate: 0.40,
        creditLimitUSD: 100000,
        activeShipmentsCount: 1,
        token: `auth-new-${Date.now()}`,
      };
      onLogin(newDist);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        id="distributor-login-modal-container"
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold font-serif">
                Global Distributor Portal Access
              </h3>
              <p className="text-[11px] text-slate-400">
                Confidential B2B wholesale pricing, container BL tracking & bulk ordering
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-5 pt-3">
          <button
            onClick={() => setActiveTab('login')}
            className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 ${
              activeTab === 'login'
                ? 'border-amber-600 text-amber-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Distributor Sign In
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 ${
              activeTab === 'register'
                ? 'border-amber-600 text-amber-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Apply for Global Distribution
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          {activeTab === 'login' ? (
            <div className="space-y-6">
              
              {/* Quick 1-Click Demo Accounts for testing */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    Quick Demo Regional Accounts:
                  </span>
                  <span className="text-[11px] text-slate-400 font-sans">
                    Instant access without password
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DEMO_DISTRIBUTORS.map((dist) => (
                    <button
                      key={dist.id}
                      id={`demo-dist-${dist.id}`}
                      onClick={() => {
                        onLogin(dist);
                        onClose();
                      }}
                      className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-amber-50/60 hover:border-amber-300 text-left transition-all group cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {dist.region}
                        </span>
                        <span className="text-[10px] font-bold font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                          -{(dist.discountRate * 100).toFixed(0)}% Off
                        </span>
                      </div>
                      <p className="font-bold text-xs text-slate-900 group-hover:text-amber-800 truncate">
                        {dist.companyName}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {dist.primaryPort.split(',')[0]}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Traditional Sign-In form */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-700 block">
                  Or Log In with Registered Trade Credentials:
                </span>

                <form onSubmit={handleManualLogin} className="space-y-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Distributor Corporate Email
                    </label>
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="e.g. trade@alzahrakitchen.ae"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Access Token / Password
                    </label>
                    <input
                      type="password"
                      value={accessKeyInput}
                      onChange={(e) => setAccessKeyInput(e.target.value)}
                      placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <button
                    id="submit-distributor-login-btn"
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Enter B2B Trade Portal</span>
                  </button>
                </form>
              </div>

            </div>
          ) : (
            /* Register Application */
            <div className="space-y-4">
              {registerSuccess ? (
                <div className="text-center py-6 space-y-2">
                  <BadgeCheck className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-bold text-slate-900">Application Approved</h4>
                  <p className="text-xs text-slate-500">
                    Your company account has been provisioned. Launching distributor dashboard...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Company / Wholesale Entity *
                    </label>
                    <input
                      type="text"
                      required
                      value={regCompany}
                      onChange={(e) => setRegCompany(e.target.value)}
                      placeholder="e.g. Nordic Culinary Supplies AB"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Country of Operation
                      </label>
                      <select
                        value={regCountry}
                        onChange={(e) => setRegCountry(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                      >
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Germany">Germany</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="India">Domestic (India)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Tax / VAT Registration ID
                      </label>
                      <input
                        type="text"
                        value={regVat}
                        onChange={(e) => setRegVat(e.target.value)}
                        placeholder="e.g. CHE-102.394.881"
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Anticipated Annual Cookware Volume
                    </label>
                    <select
                      value={regVolume}
                      onChange={(e) => setRegVolume(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-semibold"
                    >
                      <option value="20ft FCL Container / Month">1 x 20' FCL Container / Month</option>
                      <option value="40ft HQ Container / Bi-Monthly">1 x 40' HQ Container / Bi-Monthly</option>
                      <option value="Quarterly Consolidated Shipments">Quarterly Consolidated Shipments (LCL)</option>
                      <option value="Multi-Container Contract">Multi-Container Annual Distribution Contract</option>
                    </select>
                  </div>

                  <p className="text-[11px] text-slate-500">
                    By submitting, your company profile will be created with Gold Partner wholesale tier status and immediate pricing unlock.
                  </p>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Register & Unlock Distributor Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
