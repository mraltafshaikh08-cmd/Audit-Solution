import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  Gauge, 
  Layers, 
  Sparkles, 
  Plus, 
  X,
  CheckCircle2,
  Loader2,
  Globe2
} from 'lucide-react';

interface HeroScannerProps {
  onStartAudit: (targetUrl: string, competitorUrl?: string) => Promise<void>;
  isLoading: boolean;
  creditsRemaining: number;
  planType: string;
  onOpenPricing: () => void;
}

const SCAN_STEPS = [
  'Verifying domain DNS & establishing secure SSL handshake...',
  'Inspecting HTTP Security Headers (HSTS, CSP, X-Frame-Options)...',
  'Crawling Robots.txt, XML Sitemaps, and Canonical chains...',
  'Auditing On-Page structure: Headings (H1-H6), Meta length & Keywords...',
  'Measuring Core Web Vitals: LCP, INP, CLS, TTFB, and payload size...',
  'Evaluating WCAG 2.2 Level AA accessibility & screen-reader ARIA tags...',
  'Checking Mobile viewports, tap targets, and layout responsiveness...',
  'Engaging Google AI Studio Engine to formulate copy-ready code fixes...'
];

const SAMPLE_SITES = [
  { label: 'Shopify Store', url: 'https://shop.gymshark.com' },
  { label: 'SaaS Platform', url: 'https://stripe.com' },
  { label: 'Content Portal', url: 'https://techcrunch.com' },
  { label: 'Example Test', url: 'https://example.com' }
];

export const HeroScanner: React.FC<HeroScannerProps> = ({
  onStartAudit,
  isLoading,
  creditsRemaining,
  planType,
  onOpenPricing
}) => {
  const [targetUrl, setTargetUrl] = useState('');
  const [competitorUrl, setCompetitorUrl] = useState('');
  const [showCompetitorInput, setShowCompetitorInput] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(10);
  const [inputError, setInputError] = useState('');

  // Cycle through live scanning animation steps when loading
  useEffect(() => {
    if (!isLoading) {
      setCurrentStepIndex(0);
      setProgressPercent(10);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        const next = (prev + 1) % SCAN_STEPS.length;
        setProgressPercent(Math.min(95, 15 + next * 12));
        return next;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInputError('');

    const trimmed = targetUrl.trim();
    if (!trimmed) {
      setInputError('Please enter a valid website URL to audit.');
      return;
    }

    if (creditsRemaining <= 0 && planType !== 'pro_monthly') {
      setInputError('You have exhausted your free audit credits. Upgrade to continue.');
      onOpenPricing();
      return;
    }

    onStartAudit(trimmed, competitorUrl.trim() || undefined);
  };

  const handleSelectSample = (sampleUrl: string) => {
    setTargetUrl(sampleUrl);
    setInputError('');
  };

  return (
    <div className="relative overflow-hidden bg-radial-[at_top] from-slate-50 via-white to-slate-100/60 py-12 md:py-20 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Anti-slop clean headline */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Complete 14-Point Technical SEO & Developer Diagnostic Suite</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
          Audit Any Website in{' '}
          <span className="text-blue-600 underline decoration-blue-200 decoration-wavy underline-offset-8">
            10 Seconds
          </span>
        </h1>

        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Deep Core Web Vitals, technical crawlability, WCAG 2.2 accessibility, and security analysis. 
          Generate custom-branded <strong className="text-slate-900">White-Label PDF reports</strong> with actionable code fixes.
        </p>

        {/* Audit Search Bar Form */}
        <form onSubmit={handleSubmit} className="mt-8 max-w-2xl mx-auto text-left">
          <div className="bg-white p-2 rounded-2xl border border-slate-300 shadow-md focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100 transition-all">
            <div className="flex flex-col sm:flex-row items-stretch gap-2">
              <div className="relative flex-1 flex items-center pl-3">
                <Globe2 className="w-5 h-5 text-slate-400 shrink-0 mr-2" />
                <input
                  type="text"
                  value={targetUrl}
                  onChange={(e) => {
                    setTargetUrl(e.target.value);
                    if (inputError) setInputError('');
                  }}
                  disabled={isLoading}
                  placeholder="Enter website URL (e.g. example.com or https://...)"
                  className="w-full text-slate-900 placeholder:text-slate-400 font-medium text-sm sm:text-base outline-none bg-transparent"
                />
                {targetUrl && !isLoading && (
                  <button
                    type="button"
                    onClick={() => setTargetUrl('')}
                    className="p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-xs disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Auditing...</span>
                  </>
                ) : (
                  <>
                    <span>Run Free Audit</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Competitor benchmark optional toggle */}
            <div className="mt-2 pt-2 border-t border-slate-100 px-2 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => setShowCompetitorInput(!showCompetitorInput)}
                className="inline-flex items-center gap-1.5 text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                <Plus className={`w-3.5 h-3.5 transition-transform ${showCompetitorInput ? 'rotate-45' : ''}`} />
                <span>{showCompetitorInput ? 'Remove Competitor Comparison' : 'Add Competitor URL (Side-by-side gap audit)'}</span>
              </button>

              <span className="text-slate-400 hidden sm:inline">
                Instant results · No sign-up required
              </span>
            </div>

            {/* Expandable competitor URL input */}
            {showCompetitorInput && (
              <div className="p-2 mt-1 bg-slate-50 rounded-lg flex items-center gap-2 border border-slate-200">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider shrink-0">
                  Competitor:
                </span>
                <input
                  type="text"
                  value={competitorUrl}
                  onChange={(e) => setCompetitorUrl(e.target.value)}
                  disabled={isLoading}
                  placeholder="https://competitor.com (optional)"
                  className="w-full text-xs text-slate-800 placeholder:text-slate-400 bg-transparent outline-none"
                />
              </div>
            )}
          </div>

          {inputError && (
            <p className="mt-2 text-xs font-semibold text-rose-600 text-center">
              {inputError}
            </p>
          )}

          {/* Quick-try presets */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span className="font-medium text-slate-400">Quick tests:</span>
            {SAMPLE_SITES.map((site) => (
              <button
                key={site.label}
                type="button"
                onClick={() => handleSelectSample(site.url)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
              >
                {site.label}
              </button>
            ))}
          </div>
        </form>

        {/* Live Scanning Progress Box */}
        {isLoading && (
          <div className="mt-8 max-w-xl mx-auto p-5 bg-white rounded-xl border border-blue-200 shadow-md text-left transition-all">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
              <span className="flex items-center gap-2 text-blue-700">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                Live Deep Analysis in Progress...
              </span>
              <span className="font-mono text-slate-500">{progressPercent}%</span>
            </div>

            {/* Progress Track */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Current Step Text */}
            <div className="mt-3 flex items-start gap-2.5 text-xs text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <p className="font-mono font-medium text-slate-800">
                {SCAN_STEPS[currentStepIndex]}
              </p>
            </div>
          </div>
        )}

        {/* Key Feature Trust Indicators */}
        {!isLoading && (
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-left border-t border-slate-200/80 pt-8">
            <div className="p-3 bg-white rounded-lg border border-slate-200/70">
              <Gauge className="w-5 h-5 text-blue-600 mb-1.5" />
              <h4 className="text-xs font-bold text-slate-800">Core Web Vitals</h4>
              <p className="text-[11px] text-slate-500">LCP, INP, CLS, TTFB metrics</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-200/70">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mb-1.5" />
              <h4 className="text-xs font-bold text-slate-800">Security & Headers</h4>
              <p className="text-[11px] text-slate-500">SSL, HSTS, CSP & X-Frame</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-200/70">
              <Layers className="w-5 h-5 text-amber-600 mb-1.5" />
              <h4 className="text-xs font-bold text-slate-800">10 Core Audits</h4>
              <p className="text-[11px] text-slate-500">5 Dev + 5 SEO deep audits</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-200/70">
              <Sparkles className="w-5 h-5 text-purple-600 mb-1.5" />
              <h4 className="text-xs font-bold text-slate-800">White-Label & Widget</h4>
              <p className="text-[11px] text-slate-500">Agency reports & embeddable widget</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
