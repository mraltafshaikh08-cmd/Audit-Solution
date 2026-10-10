import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  AlertTriangle, 
  ChevronRight, 
  ArrowLeft, 
  Lock, 
  Clock, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export type LegalDocType = 'privacy' | 'terms' | 'disclaimer';

interface LegalPageProps {
  initialDoc?: LegalDocType;
  onNavigateToHome: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ 
  initialDoc = 'privacy', 
  onNavigateToHome 
}) => {
  const [currentDoc, setCurrentDoc] = useState<LegalDocType>(initialDoc);

  useEffect(() => {
    setCurrentDoc(initialDoc);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [initialDoc]);

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= HEADER BANNER WITH BREADCRUMBS (Ref: 1000028885.jpg) ================= */}
        <div className="mb-10 bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg relative overflow-hidden">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
            <button
              type="button"
              onClick={onNavigateToHome}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-blue-400 font-semibold uppercase tracking-wider">
              Legal & Trust Center
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white capitalize font-bold">
              {currentDoc === 'privacy' ? 'Privacy Policy' : currentDoc === 'terms' ? 'Terms of Service' : 'Diagnostic Disclaimer'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            {currentDoc === 'privacy' && 'Privacy Policy'}
            {currentDoc === 'terms' && 'Terms and Conditions'}
            {currentDoc === 'disclaimer' && 'Website & Diagnostic Disclaimer'}
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {currentDoc === 'privacy' && 'Learn how AuditSolution protects your diagnostic data, processes API requests, and guarantees user confidentiality.'}
            {currentDoc === 'terms' && 'Clear guidelines on fair use policies, crawling caps, white-label licensing, and platform terms.'}
            {currentDoc === 'disclaimer' && 'Official notice regarding automated audits, search engine algorithms, and code fix implementation in staging.'}
          </p>

          <div className="mt-6 flex items-center gap-4 text-xs text-slate-400 border-t border-slate-800 pt-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Google AdSense & GDPR Ready
            </span>
          </div>
        </div>

        {/* ================= TWO-COLUMN STICKY LAYOUT (Page 4 & 5 Blueprint) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sticky Left Navigation Menu (4 Columns) */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-3 py-1 mb-2">
                Legal Documents
              </span>

              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentDoc('privacy');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentDoc === 'privacy'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span>Privacy Policy</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentDoc('terms');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentDoc === 'terms'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Terms of Service</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentDoc('disclaimer');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentDoc === 'disclaimer'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Diagnostic Disclaimer</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              </div>
            </div>

            {/* Quick Back to Tool Action */}
            <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200 text-center">
              <p className="text-xs text-slate-600 mb-3">
                Need to audit a website right now?
              </p>
              <button
                type="button"
                onClick={onNavigateToHome}
                className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer"
              >
                &larr; Return to Audit Tool
              </button>
            </div>
          </div>

          {/* Main Legal Content Container (8 Columns) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs text-slate-800 leading-relaxed text-sm space-y-8">
            
            {/* ================= PAGE 4: PRIVACY POLICY ================= */}
            {currentDoc === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">
                    1. Introduction & Scope
                  </h2>
                  <p className="text-slate-600">
                    We respect your privacy. This policy explains how <strong>AuditSolution</strong> ("we", "our", or "the Platform") collects, uses, and protects your information when you use our website, public audit tools, APIs, and embeddable lead generation widgets.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">
                    2. Information We Collect
                  </h2>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600">
                    <li>
                      <strong>Target URLs & Public Website Data:</strong> Public website URLs submitted for scanning are crawled by automated diagnostic scanners and Google AI Studio APIs to measure Core Web Vitals, HTML semantic structures, and HTTP security headers.
                    </li>
                    <li>
                      <strong>User Account & Contact Information:</strong> Name, email address, and agency preferences voluntarily provided when configuring White-Label branding, requesting support, or subscribing to plans.
                    </li>
                    <li>
                      <strong>Lead Generation Widget Data:</strong> Email addresses and URLs submitted through agency-embedded widgets are securely captured and delivered exclusively to the respective verified agency account owner.
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">
                    3. AI Processing & Google Gemini API Usage
                  </h2>
                  <p className="text-slate-600">
                    Submitted website metadata and performance metrics are analyzed using the Google GenAI TypeScript SDK (gemini-3.8-flash) solely to synthesize actionable diagnostic fix codes. <strong>We do NOT sell your website audit data or captured client leads to third parties.</strong>
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">
                    4. Cookies & Google AdSense Publisher Compliance
                  </h2>
                  <p className="text-slate-600">
                    We use cookies and localStorage to persist your theme settings, audit history records, and daily search quotas. Third-party advertising partners, including Google AdSense, may use cookies to serve non-intrusive advertisements on public pages. Users may configure cookie consent or disable browser cookies at any time.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">
                    5. Data Security & Retention
                  </h2>
                  <p className="text-slate-600">
                    All network traffic is encrypted using industry-standard 256-bit SSL/TLS encryption. Audit records on the Free Tier are retained for 7 days, Pay-Per-Audit records for 30 days, and Pro accounts enjoy unlimited lifetime history.
                  </p>
                </div>
              </div>
            )}

            {/* ================= PAGE 5: TERMS & CONDITIONS ================= */}
            {currentDoc === 'terms' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">
                    1. Acceptance of Terms
                  </h2>
                  <p className="text-slate-600">
                    By accessing or using the <strong>AuditSolution</strong> website, APIs, or embeddable agency widgets, you agree to be bound by these Terms of Service. If you do not agree, please discontinue using the service immediately.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">
                    2. Acceptable Use & Crawling Fair Use Policy
                  </h2>
                  <p className="text-slate-600">
                    You agree not to use the automated audit engine to launch distributed denial-of-service (DDoS) attacks, flood target domains with automated traffic, or reverse engineer underlying backend models.
                  </p>
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 mt-3 text-xs text-blue-900">
                    <strong>Free Tier Fair Use Quota:</strong> Free Starter accounts are limited to a maximum of <strong>15 searches per day</strong> (resetting every 24 hours) and <strong>150 pages crawled per month</strong>.
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">
                    3. White-Label Licensing & Intellectual Property
                  </h2>
                  <p className="text-slate-600">
                    Subscribers to paid White-Label plans are granted a commercial, non-exclusive license to rebrand, export, and present generated audit PDF reports to their direct clients. All proprietary algorithms, widget codebases, and platform designs remain the exclusive intellectual property of AuditSolution.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">
                    4. Subscription Payments & Refund Policy
                  </h2>
                  <p className="text-slate-600">
                    Paid subscriptions are billed on a recurring monthly or annual basis. Users can cancel subscriptions at any time via the account panel. Because audit credits and instantaneous diagnostic reports are delivered immediately upon request, completed scan credits are non-refundable.
                  </p>
                </div>
              </div>
            )}

            {/* ================= PAGE 6: DISCLAIMER ================= */}
            {currentDoc === 'disclaimer' && (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-amber-900">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed">
                    <strong>Official Notice:</strong> The performance scores, Core Web Vitals measurements, and SEO diagnostics provided on this platform are automated estimates intended solely for developer guidance and optimization reference.
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">
                    1. Automated Diagnostic Tool Notice
                  </h2>
                  <p className="text-slate-600">
                    The diagnostics and scores displayed by AuditSolution are generated by automated network crawlers, Google PageSpeed APIs, and Google AI Studio language models. Real-world end-user speed varies based on geographic location, device hardware, and cellular conditions.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">
                    2. No Guarantee of Search Engine Ranking
                  </h2>
                  <p className="text-slate-600">
                    While our technical SEO suggestions strictly follow industry best practices (Google Search Essentials, WCAG 2.2), implementation of recommended code fixes does NOT guarantee specific SERP (Search Engine Results Page) position gains, algorithm immunity, or traffic increases.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">
                    3. Developer Code Fix Verification in Staging
                  </h2>
                  <p className="text-slate-600">
                    Code snippets provided in diagnostic reports (e.g., NGINX headers, `.htaccess` modifications, or JS preloads) are provided "as-is". Web developers must test and verify all code changes in a staging environment prior to deploying to live production servers.
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
