import React, { useState } from 'react';
import { 
  Mail, 
  Clock, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Headphones,
  Check
} from 'lucide-react';

interface ContactPageProps {
  onNavigateToHome: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigateToHome }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Agency White-Labeling');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFullName('');
      setEmail('');
      setMessage('');
    }, 1200);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <Headphones className="w-3.5 h-3.5" />
            <span>Dedicated Engineering & Agency Support</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Get in Touch with Our Engineering Team
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Have a feature request, need custom API access, or want help configuring your agency lead generation widget? Drop us a line.
          </p>
        </div>

        {/* ================= SPLIT SCREEN LAYOUT (Page 3 Blueprint) ================= */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Dark Contrast Left Sidebar (Ref: 1000028888.jpg) */}
          <div className="lg:col-span-5 bg-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 text-xs font-bold mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AuditSolution Global HQ</span>
              </div>

              <h2 className="text-2xl font-black tracking-tight leading-snug">
                Let's Build Faster, Higher-Ranking Websites Together.
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Whether you are optimizing a boutique store or managing thousands of client audits across an enterprise agency, our team is here to support you.
              </p>

              {/* Direct Contact Details Block */}
              <div className="mt-8 space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 text-blue-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Direct Email Support
                    </span>
                    <a href="mailto:support@auditsolution.com" className="font-semibold text-white hover:text-blue-300 transition-colors">
                      support@auditsolution.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 text-emerald-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Guaranteed Response Time
                    </span>
                    <span className="font-semibold text-white">
                      Within 12–24 Hours (Monday to Saturday)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 text-amber-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Headquarters & Support Hub
                    </span>
                    <span className="font-semibold text-white">
                      Maharashtra, India (Global Remote Support)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* "What Happens Next?" 3-Step Vertical Process Line */}
            <div className="mt-10 pt-8 border-t border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-4">
                What Happens Next?
              </span>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong className="text-white block">We receive your inquiry</strong>
                    <span className="text-slate-400 text-[11px]">Automatically routed to our engineering desk.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong className="text-white block">AI & Engineering review</strong>
                    <span className="text-slate-400 text-[11px]">We review your domain or technical requirement.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <strong className="text-white block">Bespoke response & walkthrough</strong>
                    <span className="text-slate-400 text-[11px]">Direct reply with solution within 24 hours.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Clean Form Container on Right (7 Columns) */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
            {submitted ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  Message Sent Successfully!
                </h3>
                <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Our engineering team has received your message and will respond to your email within 12–24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-black transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    Send Us a Message
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out the form below and we will get back to you promptly.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      required
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-900 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Work Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      required
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-900 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Subject / Topic
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-900 font-medium bg-white"
                  >
                    <option value="General Query">General Query</option>
                    <option value="Technical Support">Technical Support & Diagnostic Issue</option>
                    <option value="Agency White-Labeling">Agency White-Labeling & Lead Widget</option>
                    <option value="Custom API Integration">Custom API & Enterprise Integration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe how we can help you or detail your website audit inquiries..."
                    required
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-slate-900 font-medium leading-relaxed"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>256-bit SSL encrypted. We respect your confidentiality.</span>
                </div>
              </form>
            )}

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Looking to run a free audit right now?</span>
              <button
                type="button"
                onClick={onNavigateToHome}
                className="font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Open Audit Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
