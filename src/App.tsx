import React, { useState, useEffect } from 'react';
import { AuditPayload, UserProfile, PlanType } from './types/audit';
import { storage } from './lib/storage';
import { requestAudit } from './lib/auditApi';
import { Header } from './components/Header';
import { HeroScanner } from './components/HeroScanner';
import { ReportDashboard } from './components/ReportDashboard';
import { PdfReportModal } from './components/PdfReportModal';
import { WhiteLabelModal } from './components/WhiteLabelModal';
import { PricingModal } from './components/PricingModal';
import { AuditHistoryModal } from './components/AuditHistoryModal';
import { AdSenseBanner } from './components/AdSenseBanner';

// Blueprint Pages
import { BlogPage } from './pages/BlogPage';
import { PricingPage } from './pages/PricingPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage, LegalDocType } from './pages/LegalPage';

import { 
  ShieldCheck, 
  CheckCircle2, 
  Terminal, 
  Crown, 
  Zap, 
  BarChart, 
  Sparkles,
  ArrowRight,
  Globe2,
  Code2,
  Lock,
  Layers,
  Activity,
  Cpu,
  Smartphone,
  FileCheck,
  Search
} from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<UserProfile>(() => storage.getUserProfile());
  const [currentAudit, setCurrentAudit] = useState<AuditPayload | null>(null);
  const [historyList, setHistoryList] = useState<AuditPayload[]>(() => storage.getAudits());
  const [isLoading, setIsLoading] = useState(false);

  // Page Routing State ('home' | 'blog' | 'pricing' | 'contact' | 'privacy' | 'terms' | 'disclaimer')
  const [currentPage, setCurrentPage] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (['home', 'blog', 'pricing', 'contact', 'privacy', 'terms', 'disclaimer'].includes(hash)) {
      return hash;
    }
    return 'home';
  });

  // Modals state
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isWhiteLabelModalOpen, setIsWhiteLabelModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'blog', 'pricing', 'contact', 'privacy', 'terms', 'disclaimer'].includes(hash)) {
        setCurrentPage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // On initial mount, check for URL parameter (e.g. from embeddable widget) or load most recent audit
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const queryUrl = params.get('url');
      if (queryUrl) {
        navigateTo('home');
        handleStartAudit(decodeURIComponent(queryUrl));
        return;
      }
    } catch (e) {}

    const past = storage.getAudits();
    if (past.length > 0 && !currentAudit) {
      setCurrentAudit(past[0]);
    }
  }, []);

  const handleStartAudit = async (targetUrl: string, competitorUrl?: string) => {
    setIsLoading(true);

    try {
      const result = await requestAudit(targetUrl, competitorUrl);
      
      // Deduct credit if applicable
      storage.decrementCredit();
      const updatedUser = storage.getUserProfile();
      setUser(updatedUser);

      // Save audit to archive
      const updatedHistory = storage.saveAudit(result);
      setHistoryList(updatedHistory);
      setCurrentAudit(result);

      // Ensure we are on home page and scroll smoothly to results
      setCurrentPage('home');
      window.scrollTo({ top: 380, behavior: 'smooth' });
    } catch (err) {
      console.error('Audit execution error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgrade = (
    plan: PlanType,
    gateway: 'razorpay' | 'stripe',
    amount: number,
    currency: 'INR' | 'USD'
  ) => {
    const updated = storage.upgradePlan(plan);
    storage.recordPayment({
      userId: user.id,
      transactionId: `tx_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      paymentGateway: gateway,
      amount,
      currency,
      status: 'success',
      planPurchased: plan
    });
    setUser(updated);
  };

  const handleSaveWhiteLabel = (profile: Partial<UserProfile>) => {
    const updated = storage.saveUserProfile(profile);
    setUser(updated);
  };

  const handleDeleteAudit = (id: string) => {
    const updated = storage.deleteAudit(id);
    setHistoryList(updated);
    if (currentAudit?.id === id) {
      setCurrentAudit(updated.length > 0 ? updated[0] : null);
    }
  };

  const isPro = user.planType === 'pro_monthly';
  const isWhiteLabeled = isPro || user.planType === 'pay_per_audit';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Navigation Header */}
      <Header
        user={user}
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenPricing={() => setIsPricingModalOpen(true)}
        onOpenWhiteLabel={() => setIsWhiteLabelModalOpen(true)}
        onOpenHistory={() => setIsHistoryModalOpen(true)}
        historyCount={historyList.length}
      />

      {/* Google AdSense Compliant Banner Slot (Top) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <AdSenseBanner isPro={isPro} slot="top" />
      </div>

      <main className="flex-1">
        
        {/* ================= ROUTE 1: BLOG & USE CASES PAGE ================= */}
        {currentPage === 'blog' && (
          <BlogPage onNavigateToHome={() => navigateTo('home')} />
        )}

        {/* ================= ROUTE 2: PRICING PAGE ================= */}
        {currentPage === 'pricing' && (
          <PricingPage 
            onNavigateToHome={() => navigateTo('home')} 
            onOpenWhiteLabel={() => setIsWhiteLabelModalOpen(true)}
          />
        )}

        {/* ================= ROUTE 3: CONTACT US PAGE ================= */}
        {currentPage === 'contact' && (
          <ContactPage onNavigateToHome={() => navigateTo('home')} />
        )}

        {/* ================= ROUTE 4: LEGAL PAGES (Privacy, Terms, Disclaimer) ================= */}
        {['privacy', 'terms', 'disclaimer'].includes(currentPage) && (
          <LegalPage 
            initialDoc={currentPage as LegalDocType} 
            onNavigateToHome={() => navigateTo('home')} 
          />
        )}

        {/* ================= ROUTE 0: HOME PAGE (MAIN AUDIT TOOL) ================= */}
        {currentPage === 'home' && (
          <div>
            {/* Hero Section & Live Diagnostic Scanner */}
            <HeroScanner
              onStartAudit={handleStartAudit}
              isLoading={isLoading}
              creditsRemaining={user.auditCredits}
              planType={user.planType}
              onOpenPricing={() => setIsPricingModalOpen(true)}
            />

            {/* Audit Report Dashboard (Rendered when audit result is ready) */}
            {currentAudit ? (
              <ReportDashboard
                audit={currentAudit}
                historyList={historyList}
                onOpenPdfReport={() => setIsPdfModalOpen(true)}
                onOpenWhiteLabel={() => setIsWhiteLabelModalOpen(true)}
                onRescan={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                isWhiteLabelEnabled={isWhiteLabeled}
              />
            ) : (
              /* ================= HOME PAGE 0 SHOWCASE & 10 AUDIT FEATURES ================= */
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                {/* 10 Audit Features Section (Page 0 Blueprint) */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-1">
                    Complete 10-Vector Suite
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    Built for Web Developers & SEO Experts Alike
                  </h2>
                  <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                    Stop losing rankings and leads. Get automated, deep 10-category website audits with actionable code fixes powered by Google AI Studio.
                  </p>
                </div>

                {/* 10 Features Split Columns: 5 Developer + 5 SEO */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                  
                  {/* Developer Audits Column (5 Audits) */}
                  <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                        <Terminal className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-extrabold text-slate-900">
                          5 Core Developer Audits
                        </h3>
                        <p className="text-xs text-slate-500">
                          Built for engineers, DevOps & frontend architects
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900">1. Core Web Vitals & Speed:</strong> Real-time LCP, INP, CLS & TTFB breakdown with payload size inspection.
                        </div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900">2. Security & Headers:</strong> SSL validation, CSP, HSTS, X-Frame-Options, and vulnerable JS libraries.
                        </div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900">3. Accessibility (WCAG 2.2):</strong> ARIA compliance, color contrast checks, and screen-reader keyboard navigation.
                        </div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900">4. Mobile Responsiveness:</strong> Viewport layout, tap target sizes (&ge;48px), and horizontal layout overflow.
                        </div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900">5. Code Hygiene & JS Execution:</strong> DOM depth (&gt;1,400 nodes), script blocking time, and Brotli compression.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SEO Audits Column (5 Audits) */}
                  <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <BarChart className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-extrabold text-slate-900">
                          5 Core SEO Audits
                        </h3>
                        <p className="text-xs text-slate-500">
                          Formulated for SEO consultants & organic growth teams
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900">6. Technical SEO & Indexing:</strong> Robots.txt syntax, XML sitemap validation, canonical tags, and 301/302 redirect hygiene.
                        </div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900">7. On-Page Optimization:</strong> Title/meta character counts, semantic H1-H6 hierarchy, and keyword targeting.
                        </div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900">8. Content Quality & Thin Content:</strong> Duplicate content signals, readability index, and topical coverage gaps.
                        </div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900">9. Structured Data (JSON-LD):</strong> Schema.org validator, rich snippet opportunities, and publisher markup.
                        </div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900">10. Competitor Benchmarking:</strong> Side-by-side core metric comparison and speed differential against rivals.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Embeddable Lead Widget Showcase Banner */}
                <div className="bg-linear-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 mb-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="max-w-xl">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-blue-300 block mb-2">
                      Agency Growth Engine
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black leading-tight">
                      Embed Free Website Audits on Your Agency Site
                    </h3>
                    <p className="text-xs sm:text-sm text-blue-100 mt-3 leading-relaxed">
                      Capture high-paying client leads automatically. When prospective clients run an audit on your website using our embed snippet, their lead details are saved directly into your dashboard.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => setIsWhiteLabelModalOpen(true)}
                      className="px-6 py-3.5 rounded-xl bg-white text-blue-950 font-extrabold text-xs sm:text-sm shadow-md hover:bg-blue-50 transition-colors cursor-pointer text-center"
                    >
                      Get Embed Widget Code &rarr;
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateTo('blog')}
                      className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer text-center"
                    >
                      Read Agency Case Study
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

      </main>

      {/* Google AdSense Compliant Banner Slot (Footer) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <AdSenseBanner isPro={isPro} slot="footer" />
      </div>

      {/* ================= COMPREHENSIVE SAAS FOOTER (All Pages & Compliance) ================= */}
      <footer className="border-t border-slate-200 bg-white pt-12 pb-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            
            {/* Col 1: Brand Info */}
            <div className="col-span-2">
              <div 
                onClick={() => navigateTo('home')}
                className="flex items-center gap-2 cursor-pointer mb-3"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
                  AS
                </div>
                <span className="font-extrabold text-base text-slate-900">
                  AuditSolution
                </span>
              </div>
              <p className="text-xs text-slate-600 max-w-sm leading-relaxed mb-4">
                Enterprise-grade website audit SaaS platform featuring 14+ technical, web dev, SEO, performance, UX, accessibility, and security audits with custom White-Label reports.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Powered by Google AI Studio Gemini API</span>
              </div>
            </div>

            {/* Col 2: Product & Tools */}
            <div>
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
                Product & Tools
              </h4>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <button type="button" onClick={() => navigateTo('home')} className="hover:text-blue-600 cursor-pointer">
                    Audit Tool Engine
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => setIsWhiteLabelModalOpen(true)} className="hover:text-blue-600 cursor-pointer">
                    White-Label PDF Reports
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => setIsWhiteLabelModalOpen(true)} className="hover:text-blue-600 cursor-pointer">
                    Embeddable Lead Widget
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => setIsHistoryModalOpen(true)} className="hover:text-blue-600 cursor-pointer">
                    Audit Archive History
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Resources & Use Cases */}
            <div>
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
                Resources
              </h4>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <button type="button" onClick={() => navigateTo('blog')} className="hover:text-blue-600 cursor-pointer">
                    Performance & SEO Blog
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigateTo('blog')} className="hover:text-blue-600 cursor-pointer">
                    Web Dev Agencies Guide
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigateTo('blog')} className="hover:text-blue-600 cursor-pointer">
                    Core Web Vitals Handbook
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigateTo('pricing')} className="hover:text-blue-600 cursor-pointer">
                    Free Starter Quota (15/day)
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Legal & Trust Center */}
            <div>
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">
                Legal & Trust
              </h4>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <button type="button" onClick={() => navigateTo('privacy')} className="hover:text-blue-600 cursor-pointer">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigateTo('terms')} className="hover:text-blue-600 cursor-pointer">
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigateTo('disclaimer')} className="hover:text-blue-600 cursor-pointer">
                    Diagnostic Disclaimer
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigateTo('contact')} className="hover:text-blue-600 cursor-pointer">
                    Contact Engineering
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright & Compliance Bar */}
          <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
            <div>
              &copy; {new Date().getFullYear()} <strong>AuditSolution</strong>. All Rights Reserved. Built for Indian & Global Markets.
            </div>
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => navigateTo('privacy')} className="hover:text-slate-800 cursor-pointer">
                Privacy
              </button>
              <span>·</span>
              <button type="button" onClick={() => navigateTo('terms')} className="hover:text-slate-800 cursor-pointer">
                Terms
              </button>
              <span>·</span>
              <button type="button" onClick={() => navigateTo('disclaimer')} className="hover:text-slate-800 cursor-pointer">
                Disclaimer
              </button>
              <span>·</span>
              <button type="button" onClick={() => navigateTo('contact')} className="hover:text-slate-800 cursor-pointer">
                Support
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Modals */}
      {currentAudit && (
        <PdfReportModal
          audit={currentAudit}
          user={user}
          isOpen={isPdfModalOpen}
          onClose={() => setIsPdfModalOpen(false)}
          onOpenWhiteLabel={() => {
            setIsPdfModalOpen(false);
            setIsWhiteLabelModalOpen(true);
          }}
          onOpenPricing={() => {
            setIsPdfModalOpen(false);
            setIsPricingModalOpen(true);
          }}
        />
      )}

      <WhiteLabelModal
        user={user}
        isOpen={isWhiteLabelModalOpen}
        onClose={() => setIsWhiteLabelModalOpen(false)}
        onSave={handleSaveWhiteLabel}
        onOpenPricing={() => {
          setIsWhiteLabelModalOpen(false);
          setIsPricingModalOpen(true);
        }}
      />

      <PricingModal
        user={user}
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        onUpgrade={handleUpgrade}
      />

      <AuditHistoryModal
        audits={historyList}
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        onSelectAudit={(audit) => {
          setCurrentAudit(audit);
          navigateTo('home');
          window.scrollTo({ top: 380, behavior: 'smooth' });
        }}
        onDeleteAudit={handleDeleteAudit}
      />
    </div>
  );
}
