import React, { useState } from 'react';
import { 
  Check, 
  X, 
  HelpCircle, 
  Sparkles, 
  ChevronDown, 
  ShieldCheck, 
  Zap, 
  Building2, 
  Crown,
  FileCheck,
  Code2
} from 'lucide-react';
import { TIER_CONFIG } from '../config/tierLimits';

interface PricingPageProps {
  onNavigateToHome: () => void;
  onOpenWhiteLabel: () => void;
}

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "Can I remove your branding from the PDF reports?",
    a: "Yes! When paid White-Label plans are unlocked, you can upload your agency logo, set your primary brand colors, and remove all system watermark footers completely for professional client delivery."
  },
  {
    q: "What is included in the 15 daily free searches?",
    a: "Free users can run up to 15 full audits every 24 hours. Each audit checks Core Web Vitals, security headers, on-page SEO, WCAG 2.2 accessibility, code hygiene, and generates actionable code fixes with watermarked PDF report exports."
  },
  {
    q: "How does the Embeddable Lead Gen Widget work?",
    a: "The widget is a lightweight JavaScript snippet that you paste onto your agency site or blog. When prospective clients enter their website URL and email, the widget automatically runs an audit and captures the lead directly into your agency dashboard."
  },
  {
    q: "Are the code fix snippets production-ready?",
    a: "Yes! Every diagnostic issue identified by our Google AI Studio audit engine includes copy-ready HTML, CSS, JavaScript, NGINX, or Apache server configuration snippets that you or your developers can immediately apply."
  },
  {
    q: "Do I need a credit card to use the Free Starter plan?",
    a: "No credit card required. You can start running website audits immediately with 15 free daily searches."
  }
];

export const PricingPage: React.FC<PricingPageProps> = ({ 
  onNavigateToHome,
  onOpenWhiteLabel
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER SECTION (Page 2 Blueprint) ================= */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Pricing · Disruptive Economics</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Simple, Transparent Pricing for Creators & Agencies
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Start free today. Upgrade when you need white-label branding, agency lead widgets, and unlimited site audits.
          </p>

          {/* Monthly / Annual Billing Toggle (Ref: 1000028895.jpg) */}
          <div className="mt-8 inline-flex items-center p-1 bg-white border border-slate-200 rounded-xl shadow-2xs">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                billingCycle === 'annual'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* ================= 3-COLUMN PRICING GRID (Page 2 Blueprint) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          
          {/* Card 1: FREE STARTER */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-blue-500 shadow-md flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Starter Plan
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  Active Free
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900">FREE STARTER</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">$0</span>
                <span className="text-xs text-slate-500">/ forever</span>
              </div>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Ideal for solo webmasters, freelance designers, and testing site speed.
              </p>

              <div className="mt-6 space-y-3 text-xs text-slate-700 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>15 Daily Searches</strong> (24h Reset)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>150 Pages</strong> / Month Crawl Cap</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Basic Site Health Score (Overall, Dev, SEO)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>10 Keywords</strong> Position Tracking</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Basic Backlink Profile Overview</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Watermarked PDF Report Export</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-400">
                  <X className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>White-Label Custom Agency Logo</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-400">
                  <X className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Embeddable Lead Gen Widget</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={onNavigateToHome}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-xs transition-colors cursor-pointer text-center"
              >
                Get Started Free 🚀
              </button>
            </div>
          </div>

          {/* Card 2: PRO SINGLE AUDIT (LOCKED PER ROADMAP) */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs flex flex-col justify-between opacity-95">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Pay-As-You-Go
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  Locked
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900">PRO SINGLE AUDIT</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">₹80</span>
                <span className="text-xs text-slate-500">/ single audit (~$1)</span>
              </div>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Single deep client audit with clean watermark removal.
              </p>

              <div className="mt-6 space-y-3 text-xs text-slate-700 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-slate-400 shrink-0" />
                  <span><strong>1 Deep Full Audit</strong> Credit</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Clean White-Label PDF Report</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-slate-400 shrink-0" />
                  <span><strong>No Watermark</strong> ("Powered by" Removed)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Instant AI Actionable Code Fixes</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Custom Agency Logo & Name</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>30 Days Report Retention</span>
                </div>
              </div>
            </div>

            {/* Locked Placeholder Badge per Roadmap */}
            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <div className="mb-3">
                <span style={{ background: '#fef3c7', color: '#92400e', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', display: 'inline-block' }}>
                  🔒 New Version Coming Soon
                </span>
              </div>
              <button
                disabled
                style={{ width: '100%', padding: '12px', background: '#cbd5e1', color: '#475569', cursor: 'not-allowed', border: 'none', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold' }}
              >
                Unavailable
              </button>
            </div>
          </div>

          {/* Card 3: AGENCY UNLIMITED (LOCKED PER ROADMAP) */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs flex flex-col justify-between opacity-95">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Full Agency Suite
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  Locked
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900">AGENCY UNLIMITED</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">
                  {billingCycle === 'annual' ? '$16' : '$20'}
                </span>
                <span className="text-xs text-slate-500">/ month</span>
              </div>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Competitors charge $20+/mo. You get unlimited client reports and lead widgets.
              </p>

              <div className="mt-6 space-y-3 text-xs text-slate-700 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-slate-400 shrink-0" />
                  <span><strong>Unlimited Audits</strong> (Zero Monthly Limits)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Full Custom Agency Logo & Brand Colors</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-slate-400 shrink-0" />
                  <span><strong>Embeddable Lead Gen Widget</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>100% Zero Watermarks</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Unlimited Lifetime Audit History</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Competitor Benchmarking Matrix</span>
                </div>
              </div>
            </div>

            {/* Locked Placeholder Badge per Roadmap */}
            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <div className="mb-3">
                <span style={{ background: '#fef3c7', color: '#92400e', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', display: 'inline-block' }}>
                  🔒 New Version Coming Soon
                </span>
              </div>
              <button
                disabled
                style={{ width: '100%', padding: '12px', background: '#cbd5e1', color: '#475569', cursor: 'not-allowed', border: 'none', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold' }}
              >
                Unavailable
              </button>
            </div>
          </div>

        </div>

        {/* ================= COMPREHENSIVE FEATURE COMPARISON TABLE (Page 2 Blueprint) ================= */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-1">
              Deep Breakdown
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Compare Plan Capabilities & Limits
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px]">
                  <th className="p-4 sm:p-5 w-2/5">Feature / Capability</th>
                  <th className="p-4 sm:p-5 text-center w-1/5 text-blue-600">Free Starter</th>
                  <th className="p-4 sm:p-5 text-center w-1/5">Pro Single</th>
                  <th className="p-4 sm:p-5 text-center w-1/5">Agency Unlimited</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-4 font-bold text-slate-900">Daily Website Audits</td>
                  <td className="p-4 text-center font-bold text-blue-700 bg-blue-50/20">15 / Day</td>
                  <td className="p-4 text-center text-slate-600">1 Credit / purchase</td>
                  <td className="p-4 text-center font-bold text-emerald-700">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900">Monthly Page Crawl Allowance</td>
                  <td className="p-4 text-center text-slate-700 bg-blue-50/20">150 Pages / mo</td>
                  <td className="p-4 text-center text-slate-600">Single Page</td>
                  <td className="p-4 text-center font-bold text-emerald-700">5,000+ Pages / mo</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900">10 Core Audits (5 Dev + 5 SEO)</td>
                  <td className="p-4 text-center text-emerald-600 bg-blue-50/20"><Check className="w-4 h-4 mx-auto" /></td>
                  <td className="p-4 text-center text-emerald-600"><Check className="w-4 h-4 mx-auto" /></td>
                  <td className="p-4 text-center text-emerald-600"><Check className="w-4 h-4 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900">Extended Audits (CRO, Backlinks, GA4)</td>
                  <td className="p-4 text-center text-emerald-600 bg-blue-50/20"><Check className="w-4 h-4 mx-auto" /></td>
                  <td className="p-4 text-center text-emerald-600"><Check className="w-4 h-4 mx-auto" /></td>
                  <td className="p-4 text-center text-emerald-600"><Check className="w-4 h-4 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900">Actionable AI Code Fix Snippets</td>
                  <td className="p-4 text-center text-emerald-600 bg-blue-50/20"><Check className="w-4 h-4 mx-auto" /></td>
                  <td className="p-4 text-center text-emerald-600"><Check className="w-4 h-4 mx-auto" /></td>
                  <td className="p-4 text-center text-emerald-600"><Check className="w-4 h-4 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900">PDF Report Watermark</td>
                  <td className="p-4 text-center text-slate-500 bg-blue-50/20">Yes (Powered by)</td>
                  <td className="p-4 text-center font-bold text-emerald-700">Removed</td>
                  <td className="p-4 text-center font-bold text-emerald-700">Removed</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900">Custom Agency Logo & Branding</td>
                  <td className="p-4 text-center text-slate-400 bg-blue-50/20"><X className="w-4 h-4 mx-auto" /></td>
                  <td className="p-4 text-center text-emerald-600"><Check className="w-4 h-4 mx-auto" /></td>
                  <td className="p-4 text-center text-emerald-600"><Check className="w-4 h-4 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900">Embeddable Lead Gen Widget</td>
                  <td className="p-4 text-center text-slate-400 bg-blue-50/20"><X className="w-4 h-4 mx-auto" /></td>
                  <td className="p-4 text-center text-slate-400"><X className="w-4 h-4 mx-auto" /></td>
                  <td className="p-4 text-center text-emerald-600"><Check className="w-4 h-4 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-900">Audit History Retention</td>
                  <td className="p-4 text-center text-slate-600 bg-blue-50/20">7 Days</td>
                  <td className="p-4 text-center text-slate-600">30 Days</td>
                  <td className="p-4 text-center font-bold text-emerald-700">Lifetime History</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= FAQ ACCORDION SECTION (Page 2 Blueprint) ================= */}
        <div className="mt-20 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-1">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-bold text-sm text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
