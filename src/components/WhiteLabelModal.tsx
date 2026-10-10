import React, { useState, useEffect } from 'react';
import { UserProfile, AgencyLead } from '../types/audit';
import { storage } from '../lib/storage';
import { 
  X, 
  Palette, 
  Upload, 
  Check, 
  Sparkles, 
  Building, 
  Image as ImageIcon,
  Code2,
  Copy,
  Users,
  ExternalLink,
  Trash2,
  Send,
  Loader2,
  CheckCircle2
} from 'lucide-react';

interface WhiteLabelModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Partial<UserProfile>) => void;
  onOpenPricing: () => void;
}

const COLOR_PRESETS = [
  { name: 'Royal Blue', hex: '#2563EB' },
  { name: 'Slate Dark', hex: '#0F172A' },
  { name: 'Emerald Green', hex: '#059669' },
  { name: 'Purple Indigo', hex: '#6366F1' },
  { name: 'Crimson Red', hex: '#DC2626' },
  { name: 'Teal Cyan', hex: '#0D9488' }
];

export const WhiteLabelModal: React.FC<WhiteLabelModalProps> = ({
  user,
  isOpen,
  onClose,
  onSave,
  onOpenPricing
}) => {
  const [activeTab, setActiveTab] = useState<'branding' | 'widget' | 'leads'>('branding');

  // Branding states
  const [agencyName, setAgencyName] = useState(user.agencyName || 'Apex Digital Agency');
  const [agencyLogoUrl, setAgencyLogoUrl] = useState(user.agencyLogoUrl || '');
  const [brandColor, setBrandColor] = useState(user.brandColor || '#2563EB');
  const [auditorName, setAuditorName] = useState(user.auditorName || 'Lead Technical Consultant');
  const [customFooterText, setCustomFooterText] = useState(user.customFooterText || 'Confidential Client Audit · Prepared for Growth');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Widget & Leads states (Section 1 Roadmap)
  const agencyApiKey = user.agencyApiKey || 'as_live_agency_key_982';
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [leads, setLeads] = useState<AgencyLead[]>(() => storage.getLeads());

  // Interactive widget tester inside modal
  const [testEmail, setTestEmail] = useState('');
  const [testUrl, setTestUrl] = useState('');
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testStatus, setTestStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' });

  useEffect(() => {
    if (isOpen) {
      setLeads(storage.getLeads());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setAgencyLogoUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      agencyName,
      agencyLogoUrl,
      brandColor,
      auditorName,
      customFooterText
    });
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1000);
  };

  const widgetSnippet = `<!-- AuditSolution Lead Gen Widget (SEO-Optimizer Style) -->
<div id="audit-lead-widget"></div>
<script src="${window.location.origin}/widget.js" data-api-key="${agencyApiKey}"></script>`;

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(widgetSnippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(agencyApiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  // Test live widget submission to /api/v1/widget/audit
  const handleTestWidgetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testEmail || !testUrl) return;

    setIsTestRunning(true);
    setTestStatus({ type: 'idle', message: 'Running test audit via /api/v1/widget/audit...' });

    try {
      const res = await fetch('/api/v1/widget/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': agencyApiKey
        },
        body: JSON.stringify({
          email: testEmail.trim(),
          target_url: testUrl.trim()
        })
      });

      const data = await res.json();
      if (res.ok) {
        setTestStatus({
          type: 'success',
          message: `Success! Lead captured for ${testEmail}. Audit generated.`
        });
        // Save to local storage leads
        const saved = storage.saveLead({
          agencyApiKey,
          email: testEmail.trim(),
          targetUrl: testUrl.trim(),
          status: 'new',
          reportUrl: data.report_url || `/?url=${encodeURIComponent(testUrl.trim())}`
        });
        setLeads(storage.getLeads());
        setTestEmail('');
        setTestUrl('');
      } else {
        setTestStatus({
          type: 'error',
          message: data.detail || data.message || 'Failed to submit test audit'
        });
      }
    } catch (err: any) {
      setTestStatus({
        type: 'error',
        message: err?.message || 'Network error occurred'
      });
    } finally {
      setIsTestRunning(false);
    }
  };

  const handleDeleteLead = (id: string) => {
    const updated = storage.deleteLead(id);
    setLeads(updated);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Building className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base">Agency White-Label & Widget Suite</h3>
              <p className="text-xs text-slate-400">
                Custom reporting identity, embeddable lead gen widget & client capture
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-5 pt-3 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('branding')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'branding'
                ? 'border-blue-600 text-blue-600 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Agency Branding</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('widget')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'widget'
                ? 'border-blue-600 text-blue-600 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Embeddable Lead Widget</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'leads'
                ? 'border-blue-600 text-blue-600 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Captured Leads ({leads.length})</span>
          </button>
        </div>

        {/* ================= TAB 1: AGENCY BRANDING ================= */}
        {activeTab === 'branding' && (
          <form onSubmit={handleSaveBranding} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
            {/* Agency Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Agency / Company Name
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                  placeholder="e.g. Apex Digital Growth Ltd"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-900 font-medium"
                />
              </div>
            </div>

            {/* Logo Upload or URL */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Agency Logo
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <ImageIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={agencyLogoUrl.startsWith('data:') ? 'Custom uploaded image (stored locally)' : agencyLogoUrl}
                    onChange={(e) => setAgencyLogoUrl(e.target.value)}
                    placeholder="https://youragency.com/logo.png"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-900 font-medium truncate"
                  />
                </div>

                <label className="cursor-pointer inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 transition-colors shrink-0">
                  <Upload className="w-3.5 h-3.5 text-slate-600" />
                  <span>Upload File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Brand Color Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Primary Brand Accent Color
              </label>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {COLOR_PRESETS.map((preset) => (
                  <button
                    key={preset.hex}
                    type="button"
                    onClick={() => setBrandColor(preset.hex)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border transition-all cursor-pointer ${
                      brandColor === preset.hex 
                        ? 'border-slate-900 bg-slate-50 ring-2 ring-slate-900/10' 
                        : 'border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: preset.hex }}
                    />
                    <span>{preset.name}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="w-8 h-8 rounded border border-slate-300 cursor-pointer p-0.5"
                />
                <input
                  type="text"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="w-28 px-2.5 py-1.5 text-xs font-mono font-bold border border-slate-300 rounded-md uppercase"
                />
              </div>
            </div>

            {/* Auditor Name & Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Lead Auditor Name & Title
              </label>
              <input
                type="text"
                value={auditorName}
                onChange={(e) => setAuditorName(e.target.value)}
                placeholder="e.g. Altaf Shaikh · Senior SEO Engineer"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-900 font-medium"
              />
            </div>

            {/* Custom Footer Disclaimer */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Report Footer Note / Disclaimer
              </label>
              <input
                type="text"
                value={customFooterText}
                onChange={(e) => setCustomFooterText(e.target.value)}
                placeholder="e.g. Confidential Property of Client · Prepared by Apex Agency"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-900 font-medium"
              />
            </div>

            {/* Real-Time Preview Card */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Report Header Live Preview
              </span>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                <div className="flex items-center gap-2.5">
                  {agencyLogoUrl ? (
                    <img src={agencyLogoUrl} alt="Logo" className="h-8 max-w-[100px] object-contain" />
                  ) : (
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                      style={{ backgroundColor: brandColor }}
                    >
                      {agencyName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{agencyName}</h4>
                    <p className="text-[10px] text-slate-500">{auditorName}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: brandColor }}>
                  Audit Report
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>Save White-Label Settings</span>
                )}
              </button>
            </div>
          </form>
        )}

        {/* ================= TAB 2: EMBEDDABLE LEAD GEN WIDGET (Section 1 Roadmap) ================= */}
        {activeTab === 'widget' && (
          <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-1 border border-blue-200">
                <Code2 className="w-3.5 h-3.5" />
                <span>SEO-Optimizer Style Widget Snippet</span>
              </div>
              <h4 className="text-base font-black text-slate-900">
                Embed Free Audit Tool on Your Agency Website
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Paste this HTML snippet on your agency website, landing page, or blog. Visitors enter their email and website to get an instant audit, automatically capturing the lead into your dashboard!
              </p>
            </div>

            {/* Agency API Key */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-slate-700">Your Agency API Key:</span>
                <button
                  type="button"
                  onClick={handleCopyKey}
                  className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey ? 'Copied' : 'Copy Key'}</span>
                </button>
              </div>
              <code className="text-xs font-mono font-bold text-slate-800 bg-white px-2 py-1 rounded border border-slate-200 block truncate">
                {agencyApiKey}
              </code>
            </div>

            {/* Embed Snippet Code Block */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                <span>Embed Code (HTML / Static Webpage):</span>
                <button
                  type="button"
                  onClick={handleCopySnippet}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 text-white text-[11px] font-bold hover:bg-black transition-colors cursor-pointer"
                >
                  {copiedSnippet ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSnippet ? 'Copied Snippet!' : 'Copy Snippet'}</span>
                </button>
              </div>
              <pre className="p-3 bg-slate-900 text-emerald-300 font-mono text-xs rounded-xl overflow-x-auto leading-relaxed border border-slate-800">
                <code>{widgetSnippet}</code>
              </pre>
            </div>

            {/* Test Widget Live In-App Form */}
            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40">
              <h5 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2">
                Live Interactive Widget Tester (Test Endpoint)
              </h5>
              <form onSubmit={handleTestWidgetSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="Test visitor email (e.g. client@brand.com)"
                    required
                    className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-900 outline-none"
                  />
                  <input
                    type="url"
                    value={testUrl}
                    onChange={(e) => setTestUrl(e.target.value)}
                    placeholder="https://clientwebsite.com"
                    required
                    className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-900 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isTestRunning}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {isTestRunning ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Processing /api/v1/widget/audit...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Simulate Widget Lead Submission</span>
                    </>
                  )}
                </button>
              </form>

              {testStatus.message && (
                <div className={`mt-2 text-xs p-2 rounded-md font-semibold ${
                  testStatus.type === 'success' 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                    : testStatus.type === 'error'
                    ? 'bg-rose-100 text-rose-800 border border-rose-200'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {testStatus.message}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 3: CAPTURED LEADS (Section 1 Roadmap) ================= */}
        {activeTab === 'leads' && (
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-base font-black text-slate-900">
                  Captured Agency Leads
                </h4>
                <p className="text-xs text-slate-500">
                  Visitors who submitted an audit on your embedded widget
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                {leads.length} Total Leads
              </span>
            </div>

            {leads.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="font-bold text-slate-700 text-sm">No Leads Captured Yet</p>
                <p className="text-xs text-slate-500 mt-1">
                  Embed your widget snippet or run the tester in the Widget tab!
                </p>
              </div>
            ) : (
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="p-3">Visitor Email</th>
                      <th className="p-3">Audited Website</th>
                      <th className="p-3">Captured</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/60">
                        <td className="p-3 font-bold text-slate-900">
                          {lead.email}
                        </td>
                        <td className="p-3 text-blue-600 font-medium truncate max-w-[180px]">
                          {lead.targetUrl}
                        </td>
                        <td className="p-3 text-slate-500">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-3 text-right">
                          <div className="inline-flex items-center gap-2">
                            {lead.reportUrl && (
                              <a
                                href={lead.reportUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1 text-slate-600 hover:text-blue-600 rounded"
                                title="Open Generated Audit"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                            <button
                              type="button"
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
