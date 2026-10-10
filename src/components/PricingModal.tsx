import React, { useState } from 'react';
import { UserProfile, PlanType } from '../types/audit';
import { TIER_CONFIG } from '../config/tierLimits';
import { 
  X, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  Lock,
  Globe2
} from 'lucide-react';

interface PricingModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onUpgrade?: (plan: PlanType, gateway: 'razorpay' | 'stripe', amount: number, currency: 'INR' | 'USD') => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  user,
  isOpen,
  onClose
}) => {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('USD');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AuditSolution Tiers & Architecture Plans</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              System Plans & Usage Allowances
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Generous free tier with daily allowances · Next-generation paid plans coming soon
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Currency switcher */}
            <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs font-bold">
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  currency === 'USD' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                USD ($)
              </button>
              <button
                type="button"
                onClick={() => setCurrency('INR')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  currency === 'INR' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                INR (₹)
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3 Tier Grid matching Section 2 & Section 3 Roadmap */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50">
          
          {/* Plan 1: Free Starter (Active with Updated Limits from Section 2) */}
          <div className="bg-white rounded-xl p-6 border-2 border-blue-500 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Free Starter (Active)
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  Current Plan
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900">Free Tier</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900">
                  {currency === 'INR' ? '₹0' : '$0'}
                </span>
                <span className="text-xs text-slate-500">/ forever</span>
              </div>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Full access to daily website audits, SEO health, and speed tests.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>{TIER_CONFIG.FREE_TIER.MAX_DAILY_SEARCHES} Searches</strong> / day</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>{TIER_CONFIG.FREE_TIER.MAX_MONTHLY_CRAWL_PAGES} Pages</strong> / month crawl cap</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Basic Site Health Score (Overall, Dev, SEO)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>{TIER_CONFIG.FREE_TIER.FEATURES.KEYWORD_TRACKING_LIMIT} Keyword</strong> Position Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Basic Backlink Profile Overview</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>PDF Report Download (Watermarked)</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors text-center shadow-xs cursor-pointer"
              >
                Get Started Free
              </button>
            </div>
          </div>

          {/* Plan 2: Pay-Per-Audit (LOCKED per Section 3 Roadmap) */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between opacity-95">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Pay-As-You-Go
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  Locked
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900">Pay-Per-Audit</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900">
                  {currency === 'INR' ? '₹80' : '$1'}
                </span>
                <span className="text-xs text-slate-500">/ audit</span>
              </div>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Single client deliverable with custom agency branding.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>1 Audit Credit instantly added</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>No Watermark on PDF</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Custom Agency Logo & Name</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>30 Days Data Retention</span>
                </div>
              </div>
            </div>

            {/* Section 3 Locked Placeholder */}
            <div className="mt-8 text-center">
              <div className="mb-3">
                <span
                  style={{
                    background: '#fef3c7',
                    color: '#92400e',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  🔒 New Version Coming Soon
                </span>
              </div>
              <button
                disabled
                style={{
                  width: '100%',
                  padding: '10px',
                  background: '#cbd5e1',
                  color: '#475569',
                  cursor: 'not-allowed',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '600'
                }}
              >
                Unavailable
              </button>
            </div>
          </div>

          {/* Plan 3: Agency Unlimited (LOCKED per Section 3 Roadmap) */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between opacity-95">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Agency Unlimited
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  Locked
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900">Agency Unlimited</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900">
                  {currency === 'INR' ? '₹999' : '$16 - $20'}
                </span>
                <span className="text-xs text-slate-500">/ mo</span>
              </div>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Unlimited scans, complete white-label reporting & embeddable widget.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Unlimited Audits (No Limits)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>100% Zero Watermark</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Embeddable Lead Gen Audit Widget</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Unlimited Lifetime History</span>
                </div>
              </div>
            </div>

            {/* Section 3 Locked Placeholder */}
            <div className="mt-8 text-center">
              <div className="mb-3">
                <span
                  style={{
                    background: '#fef3c7',
                    color: '#92400e',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  🔒 New Version Coming Soon
                </span>
              </div>
              <button
                disabled
                style={{
                  width: '100%',
                  padding: '10px',
                  background: '#cbd5e1',
                  color: '#475569',
                  cursor: 'not-allowed',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '600'
                }}
              >
                Unavailable
              </button>
            </div>
          </div>

        </div>

        {/* Roadmap Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <Check className="w-4 h-4 text-emerald-600" />
              Free Starter Active: {TIER_CONFIG.FREE_TIER.MAX_DAILY_SEARCHES} Audits/Day Included
            </span>
          </div>
          <span className="font-medium text-slate-500">
            Paid Plan checkouts are currently in preview transition.
          </span>
        </div>
      </div>
    </div>
  );
};
