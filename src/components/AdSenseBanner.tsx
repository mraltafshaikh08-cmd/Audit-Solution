import React, { useEffect, useRef } from 'react';
import { Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

interface AdSenseBannerProps {
  isPro: boolean;
  slot?: 'top' | 'sidebar' | 'footer';
  adSlotId?: string;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({ 
  isPro, 
  slot = 'top',
  adSlotId
}) => {
  const adRef = useRef<HTMLDivElement>(null);

  // Pro users experience 100% ad-free interface
  if (isPro) return null;

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (err) {
      // Catch duplicate push or adblocker suppression gracefully
      console.debug('AdSense script push note:', err);
    }
  }, []);

  return (
    <div className={`w-full my-4 flex flex-col items-center justify-center ${slot === 'sidebar' ? 'my-2' : ''}`}>
      <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">
        <span>Advertisement</span>
        <span>·</span>
        <span className="text-slate-500 font-medium">Google AdSense Partner</span>
      </div>
      
      {/* Google AdSense ins Tag Slot */}
      <div 
        ref={adRef}
        className="w-full max-w-4xl min-h-[90px] bg-slate-50 border border-dashed border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center overflow-hidden transition-all"
      >
        {/* Real AdSense Slot */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', textAlign: 'center' }}
          data-ad-client="ca-pub-5797787178243568"
          data-ad-slot={adSlotId || "default"}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />

        {/* Fallback / Preview Card displayed during Google Ad Review or initial crawler verification */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-slate-600 mt-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                <h5 className="font-bold text-slate-800 text-xs sm:text-sm">
                  High-Performance Web Infrastructure & CDN
                </h5>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                  Partner
                </span>
              </div>
              <p className="text-slate-500 text-[11px] sm:text-xs">
                Ultra-fast NVMe hosting and Redis caching tuned for 95+ Core Web Vitals and sub-second TTFB.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://pagespeed.web.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors text-xs shadow-2xs"
            >
              <span>Explore</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
