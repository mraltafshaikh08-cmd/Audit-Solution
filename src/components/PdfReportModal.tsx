import React from 'react';
import { AuditPayload, UserProfile } from '../types/audit';
import { 
  X, 
  Printer, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Info, 
  Palette,
  Sparkles
} from 'lucide-react';

interface PdfReportModalProps {
  audit: AuditPayload;
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onOpenWhiteLabel: () => void;
  onOpenPricing: () => void;
}

export const PdfReportModal: React.FC<PdfReportModalProps> = ({
  audit,
  user,
  isOpen,
  onClose,
  onOpenWhiteLabel,
  onOpenPricing
}) => {
  if (!isOpen) return null;

  const isWhiteLabeled = user.planType === 'pro_monthly' || user.planType === 'pay_per_audit';
  const brandColor = isWhiteLabeled && user.brandColor ? user.brandColor : '#2563EB';
  const agencyName = isWhiteLabeled && user.agencyName ? user.agencyName : 'AuditSolution Diagnostic Engine';
  const agencyLogo = isWhiteLabeled && user.agencyLogoUrl ? user.agencyLogoUrl : '';

  const { summary, developer_audits, seo_audits } = audit;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadStandaloneHtml = () => {
    // Generate standalone offline branded HTML report that clients can save or print to PDF
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Website Audit Report - ${summary.url}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; color: #1e293b; margin: 0; padding: 40px; background: #fff; }
    .cover { padding: 40px 0; border-bottom: 2px solid #e2e8f0; margin-bottom: 40px; }
    .header-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
    .title { font-size: 28px; font-weight: 800; color: #0f172a; margin: 0 0 8px 0; }
    .url { font-size: 16px; color: ${brandColor}; font-weight: 600; }
    .scores-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 30px 0; }
    .score-card { border: 1px solid #cbd5e1; border-radius: 8px; padding: 20px; text-align: center; }
    .score-num { font-size: 36px; font-weight: 800; color: #0f172a; }
    .section-title { font-size: 20px; font-weight: 700; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-top: 40px; margin-bottom: 20px; }
    .audit-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
    .audit-table th, .audit-table td { border: 1px solid #e2e8f0; padding: 12px; text-align: left; font-size: 13px; }
    .audit-table th { background: #f8fafc; font-weight: 700; }
    .code-box { background: #0f172a; color: #6ee7b7; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 12px; white-space: pre-wrap; margin-top: 8px; }
    .footer { margin-top: 60px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #64748b; }
    @media print { body { padding: 20px; } .no-print { display: none; } }
  </style>
</head>
<body>
  <div class="cover">
    <div class="header-bar">
      <div>
        <div style="font-size: 20px; font-weight: 800; color: ${brandColor};">${agencyName}</div>
        <div style="font-size: 12px; color: #64748b;">Auditor: ${user.auditorName || 'Senior Technical Consultant'}</div>
      </div>
      <div style="font-size: 12px; color: #64748b;">Generated: ${new Date(summary.timestamp || Date.now()).toLocaleDateString()}</div>
    </div>
    <h1 class="title">Website Audit & Technical Action Report</h1>
    <div class="url">Target URL: ${summary.url} ${summary.competitor_url ? `· Competitor: ${summary.competitor_url}` : ''}</div>
    <div class="scores-grid">
      <div class="score-card"><div class="score-num">${summary.overall_score}</div><div>Overall Site Health</div></div>
      <div class="score-card"><div class="score-num">${summary.dev_score}</div><div>Developer & CWV Score</div></div>
      <div class="score-card"><div class="score-num">${summary.seo_score}</div><div>Technical SEO Score</div></div>
    </div>
  </div>

  <h2 class="section-title">Developer Technical Audits (5 Core Areas)</h2>
  <table class="audit-table">
    <tr><th>Audit Category</th><th>Status</th><th>Diagnosis</th><th>Code Fix</th></tr>
    <tr>
      <td><b>Core Web Vitals & Performance</b></td>
      <td>${developer_audits.performance_cwv.status.toUpperCase()} (${developer_audits.performance_cwv.score}/100)</td>
      <td>${developer_audits.performance_cwv.issue}</td>
      <td><div class="code-box">${developer_audits.performance_cwv.fix_code}</div></td>
    </tr>
    <tr>
      <td><b>Security & HTTP Headers</b></td>
      <td>${developer_audits.security_headers.status.toUpperCase()} (${developer_audits.security_headers.score}/100)</td>
      <td>${developer_audits.security_headers.issue}</td>
      <td><div class="code-box">${developer_audits.security_headers.fix_code}</div></td>
    </tr>
    <tr>
      <td><b>WCAG 2.2 Accessibility</b></td>
      <td>${developer_audits.accessibility.status.toUpperCase()} (${developer_audits.accessibility.score}/100)</td>
      <td>${developer_audits.accessibility.issue}</td>
      <td><div class="code-box">${developer_audits.accessibility.fix_code}</div></td>
    </tr>
    <tr>
      <td><b>Mobile Responsiveness</b></td>
      <td>${developer_audits.mobile_responsive.status.toUpperCase()} (${developer_audits.mobile_responsive.score}/100)</td>
      <td>${developer_audits.mobile_responsive.issue}</td>
      <td><div class="code-box">${developer_audits.mobile_responsive.fix_code}</div></td>
    </tr>
    <tr>
      <td><b>Code Hygiene & JS</b></td>
      <td>${developer_audits.code_hygiene.status.toUpperCase()} (${developer_audits.code_hygiene.score}/100)</td>
      <td>${developer_audits.code_hygiene.issue}</td>
      <td><div class="code-box">${developer_audits.code_hygiene.fix_code}</div></td>
    </tr>
  </table>

  <h2 class="section-title">SEO Experts Technical Audits (5 Core Areas)</h2>
  <table class="audit-table">
    <tr><th>Audit Category</th><th>Status</th><th>Diagnosis</th><th>Recommendation / Fix</th></tr>
    <tr>
      <td><b>Technical SEO & Crawlability</b></td>
      <td>${seo_audits.technical_seo.status.toUpperCase()} (${seo_audits.technical_seo.score}/100)</td>
      <td>${seo_audits.technical_seo.issue}</td>
      <td><div class="code-box">${seo_audits.technical_seo.fix_code}</div></td>
    </tr>
    <tr>
      <td><b>On-Page Optimization</b></td>
      <td>${seo_audits.on_page_seo.status.toUpperCase()} (${seo_audits.on_page_seo.score}/100)</td>
      <td>${seo_audits.on_page_seo.issue}</td>
      <td><div class="code-box">${seo_audits.on_page_seo.fix_code}</div></td>
    </tr>
    <tr>
      <td><b>Content Quality & Topical Depth</b></td>
      <td>${seo_audits.content_quality.status.toUpperCase()} (${seo_audits.content_quality.score}/100)</td>
      <td>${seo_audits.content_quality.issue}</td>
      <td><div class="code-box">${seo_audits.content_quality.fix_code}</div></td>
    </tr>
    <tr>
      <td><b>Structured Data (JSON-LD)</b></td>
      <td>${seo_audits.structured_data.status.toUpperCase()} (${seo_audits.structured_data.score}/100)</td>
      <td>${seo_audits.structured_data.issue}</td>
      <td><div class="code-box">${seo_audits.structured_data.fix_code}</div></td>
    </tr>
    <tr>
      <td><b>Competitor Gap & Benchmarking</b></td>
      <td>${seo_audits.competitor_gap.status.toUpperCase()} (${seo_audits.competitor_gap.score}/100)</td>
      <td>${seo_audits.competitor_gap.issue}</td>
      <td><div class="code-box">${seo_audits.competitor_gap.fix_code}</div></td>
    </tr>
  </table>

  <div class="footer">
    ${isWhiteLabeled 
      ? `<div>${user.customFooterText || 'Confidential Client Audit Report · All Rights Reserved'}</div>` 
      : `<div>Report Generated by <b>AuditSolution.com</b> — Upgrade to White-Label Pro ($14/mo) to remove watermark.</div>`
    }
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Audit_Report_${summary.url.replace(/^https?:\/\//i, '').replace(/[^a-zA-Z0-9]/g, '_')}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white print:static">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden print:max-h-none print:shadow-none print:rounded-none">
        
        {/* Modal Toolbar (hidden during print) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between gap-3 shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">White-Label PDF Report Preview</span>
            {isWhiteLabeled ? (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                White-Label Active
              </span>
            ) : (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Free Tier (Watermarked)
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!isWhiteLabeled && (
              <button
                type="button"
                onClick={onOpenPricing}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Remove Watermark (₹80 or $14/mo)
              </button>
            )}

            <button
              type="button"
              onClick={onOpenWhiteLabel}
              className="p-1.5 sm:px-3 sm:py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors"
              title="Branding settings"
            >
              <Palette className="w-4 h-4 sm:hidden" />
              <span className="hidden sm:inline">Agency Branding</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadStandaloneHtml}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors"
              title="Download standalone HTML report file"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export HTML</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1 px-3.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Body Container - Formatted strictly per Document 6 PDF rules */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-10 text-slate-900 bg-white print:overflow-visible print:p-0">
          
          {/* ================= PAGE 1: COVER PAGE ================= */}
          <div className="border-b-2 border-slate-200 pb-10">
            {/* Top Bar: Agency Logo & Header */}
            <div className="flex items-start justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                {agencyLogo ? (
                  <img
                    src={agencyLogo}
                    alt={agencyName}
                    className="h-12 w-auto max-w-[180px] object-contain rounded"
                  />
                ) : (
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-xs"
                    style={{ backgroundColor: brandColor }}
                  >
                    {agencyName.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900 tracking-tight">
                    {agencyName}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Auditor: {user.auditorName || 'Lead Technical Consultant'}
                  </p>
                </div>
              </div>

              <div className="text-right text-xs text-slate-500">
                <div className="font-semibold text-slate-700">
                  {new Date(summary.timestamp || Date.now()).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
                <div className="text-[11px] text-slate-400">
                  Report ID: #{audit.id?.slice(-8) || 'AUD-7891'}
                </div>
              </div>
            </div>

            {/* Document 6 Header requirement: "Website Audit Report for [Target URL]" */}
            <div className="my-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Executive Diagnostics Deliverable
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Website Audit Report for{' '}
                <span style={{ color: brandColor }}>{summary.url}</span>
              </h1>
              {summary.competitor_url && (
                <p className="text-xs text-slate-500 mt-1">
                  Benchmarked against competitor: <strong className="text-slate-700">{summary.competitor_url}</strong>
                </p>
              )}
            </div>

            {/* Visual Score Badges (Document 6 Requirement) */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 my-8">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-center">
                <div className="text-3xl sm:text-4xl font-black text-slate-900">
                  {summary.overall_score}
                  <span className="text-xs text-slate-400 font-normal">/100</span>
                </div>
                <div className="text-xs font-bold text-slate-700 mt-1">Overall Site Health</div>
                <span className="text-[11px] font-medium text-slate-500">Combined Index</span>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-center">
                <div className="text-3xl sm:text-4xl font-black text-slate-900">
                  {summary.dev_score}
                  <span className="text-xs text-slate-400 font-normal">/100</span>
                </div>
                <div className="text-xs font-bold text-slate-700 mt-1">Developer & CWV</div>
                <span className="text-[11px] font-medium text-slate-500">Speed & Infrastructure</span>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-center">
                <div className="text-3xl sm:text-4xl font-black text-slate-900">
                  {summary.seo_score}
                  <span className="text-xs text-slate-400 font-normal">/100</span>
                </div>
                <div className="text-xs font-bold text-slate-700 mt-1">Technical SEO</div>
                <span className="text-[11px] font-medium text-slate-500">Indexability & Semantics</span>
              </div>
            </div>

            {/* Executive Summary Callout */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong className="text-slate-900 block mb-1">Executive Summary:</strong>
              This audit evaluated 10 core developer and SEO dimensions against Google Core Web Vitals, WCAG 2.2 accessibility, SSL/HTTP security headers, and structured schema integrity. 
              The target website achieved an overall health rating of <strong>{summary.overall_score}/100</strong>. Implementing the recommended code snippets below will directly address render-blocking resources, mobile layout responsiveness, and search ranking visibility.
            </div>
          </div>

          {/* ================= PAGE 2-3: DEVELOPER TECHNICAL SECTION ================= */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">
                1. Developer Technical Section (5 Core Audits)
              </h2>
              <span className="text-xs font-semibold text-slate-500">
                Engine Diagnostics & Fix Snippets
              </span>
            </div>

            {/* Table format listing 5 Developer Audits (Document 6 Requirement) */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3 border-b border-slate-200 w-1/4">Developer Audit</th>
                    <th className="p-3 border-b border-slate-200 w-24">Status</th>
                    <th className="p-3 border-b border-slate-200">Diagnostic & Severity</th>
                    <th className="p-3 border-b border-slate-200 w-1/3">Code Fix (Copy-Paste)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {/* 1. CWV */}
                  <tr className="align-top hover:bg-slate-50/50">
                    <td className="p-3 font-bold text-slate-900">
                      Core Web Vitals & Performance
                      <span className="block text-[10px] text-slate-500 font-normal mt-0.5">
                        Score: {developer_audits.performance_cwv.score}/100
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-amber-700 uppercase text-[10px]">
                        {developer_audits.performance_cwv.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700">
                      {developer_audits.performance_cwv.issue}
                    </td>
                    <td className="p-3">
                      <pre className="p-2 bg-slate-900 text-emerald-300 font-mono text-[11px] rounded overflow-x-auto whitespace-pre-wrap">
                        <code>{developer_audits.performance_cwv.fix_code}</code>
                      </pre>
                    </td>
                  </tr>

                  {/* 2. Security */}
                  <tr className="align-top hover:bg-slate-50/50">
                    <td className="p-3 font-bold text-slate-900">
                      Security & Headers
                      <span className="block text-[10px] text-slate-500 font-normal mt-0.5">
                        Score: {developer_audits.security_headers.score}/100
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-blue-700 uppercase text-[10px]">
                        {developer_audits.security_headers.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700">
                      {developer_audits.security_headers.issue}
                    </td>
                    <td className="p-3">
                      <pre className="p-2 bg-slate-900 text-emerald-300 font-mono text-[11px] rounded overflow-x-auto whitespace-pre-wrap">
                        <code>{developer_audits.security_headers.fix_code}</code>
                      </pre>
                    </td>
                  </tr>

                  {/* 3. Accessibility */}
                  <tr className="align-top hover:bg-slate-50/50">
                    <td className="p-3 font-bold text-slate-900">
                      WCAG 2.2 Accessibility
                      <span className="block text-[10px] text-slate-500 font-normal mt-0.5">
                        Score: {developer_audits.accessibility.score}/100
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-amber-700 uppercase text-[10px]">
                        {developer_audits.accessibility.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700">
                      {developer_audits.accessibility.issue}
                    </td>
                    <td className="p-3">
                      <pre className="p-2 bg-slate-900 text-emerald-300 font-mono text-[11px] rounded overflow-x-auto whitespace-pre-wrap">
                        <code>{developer_audits.accessibility.fix_code}</code>
                      </pre>
                    </td>
                  </tr>

                  {/* 4. Mobile Responsiveness */}
                  <tr className="align-top hover:bg-slate-50/50">
                    <td className="p-3 font-bold text-slate-900">
                      Mobile Responsiveness
                      <span className="block text-[10px] text-slate-500 font-normal mt-0.5">
                        Score: {developer_audits.mobile_responsive.score}/100
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-emerald-700 uppercase text-[10px]">
                        {developer_audits.mobile_responsive.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700">
                      {developer_audits.mobile_responsive.issue}
                    </td>
                    <td className="p-3">
                      <pre className="p-2 bg-slate-900 text-emerald-300 font-mono text-[11px] rounded overflow-x-auto whitespace-pre-wrap">
                        <code>{developer_audits.mobile_responsive.fix_code}</code>
                      </pre>
                    </td>
                  </tr>

                  {/* 5. Code Hygiene */}
                  <tr className="align-top hover:bg-slate-50/50">
                    <td className="p-3 font-bold text-slate-900">
                      Code Hygiene & JS
                      <span className="block text-[10px] text-slate-500 font-normal mt-0.5">
                        Score: {developer_audits.code_hygiene.score}/100
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-rose-700 uppercase text-[10px]">
                        {developer_audits.code_hygiene.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700">
                      {developer_audits.code_hygiene.issue}
                    </td>
                    <td className="p-3">
                      <pre className="p-2 bg-slate-900 text-emerald-300 font-mono text-[11px] rounded overflow-x-auto whitespace-pre-wrap">
                        <code>{developer_audits.code_hygiene.fix_code}</code>
                      </pre>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ================= PAGE 4-5: SEO EXPERTS SECTION ================= */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">
                2. SEO Experts Section (5 Core Audits)
              </h2>
              <span className="text-xs font-semibold text-slate-500">
                Organic Visibility & Schema Architecture
              </span>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3 border-b border-slate-200 w-1/4">SEO Audit</th>
                    <th className="p-3 border-b border-slate-200 w-24">Status</th>
                    <th className="p-3 border-b border-slate-200">Finding & Strategy</th>
                    <th className="p-3 border-b border-slate-200 w-1/3">Recommendation / Markup</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {/* 1. Technical SEO */}
                  <tr className="align-top hover:bg-slate-50/50">
                    <td className="p-3 font-bold text-slate-900">
                      Technical SEO & Crawlability
                      <span className="block text-[10px] text-slate-500 font-normal mt-0.5">
                        Score: {seo_audits.technical_seo.score}/100
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-emerald-700 uppercase text-[10px]">
                        {seo_audits.technical_seo.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700">
                      {seo_audits.technical_seo.issue}
                    </td>
                    <td className="p-3">
                      <pre className="p-2 bg-slate-900 text-emerald-300 font-mono text-[11px] rounded overflow-x-auto whitespace-pre-wrap">
                        <code>{seo_audits.technical_seo.fix_code}</code>
                      </pre>
                    </td>
                  </tr>

                  {/* 2. On Page */}
                  <tr className="align-top hover:bg-slate-50/50">
                    <td className="p-3 font-bold text-slate-900">
                      On-Page Optimization
                      <span className="block text-[10px] text-slate-500 font-normal mt-0.5">
                        Score: {seo_audits.on_page_seo.score}/100
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-amber-700 uppercase text-[10px]">
                        {seo_audits.on_page_seo.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700">
                      {seo_audits.on_page_seo.issue}
                    </td>
                    <td className="p-3">
                      <pre className="p-2 bg-slate-900 text-emerald-300 font-mono text-[11px] rounded overflow-x-auto whitespace-pre-wrap">
                        <code>{seo_audits.on_page_seo.fix_code}</code>
                      </pre>
                    </td>
                  </tr>

                  {/* 3. Content Quality */}
                  <tr className="align-top hover:bg-slate-50/50">
                    <td className="p-3 font-bold text-slate-900">
                      Content Quality & Depth
                      <span className="block text-[10px] text-slate-500 font-normal mt-0.5">
                        Score: {seo_audits.content_quality.score}/100
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-emerald-700 uppercase text-[10px]">
                        {seo_audits.content_quality.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700">
                      {seo_audits.content_quality.issue}
                    </td>
                    <td className="p-3">
                      <pre className="p-2 bg-slate-900 text-emerald-300 font-mono text-[11px] rounded overflow-x-auto whitespace-pre-wrap">
                        <code>{seo_audits.content_quality.fix_code}</code>
                      </pre>
                    </td>
                  </tr>

                  {/* 4. Structured Data */}
                  <tr className="align-top hover:bg-slate-50/50">
                    <td className="p-3 font-bold text-slate-900">
                      Structured Data (Schema.org)
                      <span className="block text-[10px] text-slate-500 font-normal mt-0.5">
                        Score: {seo_audits.structured_data.score}/100
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-rose-700 uppercase text-[10px]">
                        {seo_audits.structured_data.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700">
                      {seo_audits.structured_data.issue}
                    </td>
                    <td className="p-3">
                      <pre className="p-2 bg-slate-900 text-emerald-300 font-mono text-[11px] rounded overflow-x-auto whitespace-pre-wrap">
                        <code>{seo_audits.structured_data.fix_code}</code>
                      </pre>
                    </td>
                  </tr>

                  {/* 5. Competitor Gap */}
                  <tr className="align-top hover:bg-slate-50/50">
                    <td className="p-3 font-bold text-slate-900">
                      Competitor Technical Gap
                      <span className="block text-[10px] text-slate-500 font-normal mt-0.5">
                        Score: {seo_audits.competitor_gap.score}/100
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-blue-700 uppercase text-[10px]">
                        {seo_audits.competitor_gap.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700">
                      {seo_audits.competitor_gap.issue}
                    </td>
                    <td className="p-3">
                      <pre className="p-2 bg-slate-900 text-emerald-300 font-mono text-[11px] rounded overflow-x-auto whitespace-pre-wrap">
                        <code>{seo_audits.competitor_gap.fix_code}</code>
                      </pre>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ================= FOOTER RULES (Document 6) ================= */}
          <div className="pt-8 border-t border-slate-200 text-center text-xs text-slate-500">
            {isWhiteLabeled ? (
              <div>
                <p className="font-medium text-slate-700">
                  {user.customFooterText || `Confidential Audit Report · Prepared by ${agencyName}`}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Powered by Custom White-Label Engine · Zero System Watermarks
                </p>
              </div>
            ) : (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900">
                <span className="font-bold">
                  Report Generated by AuditSolution.com
                </span>
                {' · '}
                <span>Upgrade to Pro ($14/mo or ₹80 pay-per-audit) to remove this watermark and attach your agency branding.</span>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
