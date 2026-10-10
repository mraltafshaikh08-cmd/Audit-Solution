import React from 'react';
import { UserProfile } from '../types/audit';
import { 
  Activity, 
  Crown, 
  FileText, 
  Palette, 
  History, 
  Sparkles,
  Zap,
  BookOpen,
  DollarSign,
  Mail,
  Gauge
} from 'lucide-react';

interface HeaderProps {
  user: UserProfile;
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenPricing: () => void;
  onOpenWhiteLabel: () => void;
  onOpenHistory: () => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  currentPage,
  onNavigate,
  onOpenPricing,
  onOpenWhiteLabel,
  onOpenHistory,
  historyCount
}) => {
  const isPro = user.planType === 'pro_monthly';
  const isPayPerAudit = user.planType === 'pay_per_audit';

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand */}
        <div 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition-colors">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-slate-900 tracking-tight leading-none">
                AuditSolution
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                SaaS v2.4
              </span>
            </div>
            <p className="text-xs text-slate-500 font-normal">
              All-in-One SEO & Developer Audit Engine
            </p>
          </div>
        </div>

        {/* Center Navigation Links (Blueprint Pages) */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-bold text-slate-600">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              currentPage === 'home'
                ? 'bg-blue-50 text-blue-700'
                : 'hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Audit Tool
          </button>

          <button
            type="button"
            onClick={() => onNavigate('blog')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              currentPage === 'blog'
                ? 'bg-blue-50 text-blue-700'
                : 'hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Use Cases & Blog
          </button>

          <button
            type="button"
            onClick={() => onNavigate('pricing')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              currentPage === 'pricing'
                ? 'bg-blue-50 text-blue-700'
                : 'hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Pricing
          </button>

          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              currentPage === 'contact'
                ? 'bg-blue-50 text-blue-700'
                : 'hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Action Controls & Navigation */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* History link */}
          <button
            type="button"
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200 cursor-pointer"
            title="View Previous Audits"
          >
            <History className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="ml-1 text-[11px] font-bold text-slate-500">
                ({historyCount})
              </span>
            )}
          </button>

          {/* White-Label Settings */}
          <button
            type="button"
            onClick={onOpenWhiteLabel}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200 shadow-2xs cursor-pointer"
            title="Configure Agency Branding and Embeddable Widget"
          >
            <Palette className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden md:inline">White-Label & Widget</span>
            <span className="md:hidden">Widget</span>
          </button>

          {/* User Credits & Tier */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
            {isPro ? (
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <Crown className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                <span>Pro Unlimited</span>
              </div>
            ) : isPayPerAudit ? (
              <div className="flex items-center gap-1.5 text-blue-700 font-medium">
                <Zap className="w-3.5 h-3.5 text-blue-600" />
                <span>Credits: <strong className="font-bold">{user.auditCredits}</strong></span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-slate-600">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>Free Tier: <strong className="text-slate-900 font-bold">{user.auditCredits}</strong> daily audits left</span>
              </div>
            )}
          </div>

          {/* Plan Info CTA */}
          <button
            type="button"
            onClick={() => onNavigate('pricing')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all shadow-xs bg-slate-900 text-white hover:bg-black cursor-pointer"
          >
            <Crown className="w-3.5 h-3.5 text-amber-300" />
            <span>Plans & Limits</span>
          </button>
        </div>
      </div>
    </header>
  );
};
