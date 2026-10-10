import React from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';

interface AdSenseBannerProps {
  isPro: boolean;
  slot?: 'top' | 'sidebar' | 'footer';
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({ isPro, slot = 'top' }) => {
  // Pro users experience 100% ad-free interface
  if (isPro) return null;

  return (
    <div className="w-full my-4 flex flex-col items-center justify-center">
      <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">
        Advertisement · Google Publisher Partner
      </div>
      
      {/* Responsive Standard Ad Container Compliant with Google AdSense Publisher Guidelines */}
      <div className="w-full max-w-4xl min-h-[90px] bg-slate-100 border border-dashed border-slate-300 rounded-lg p-3 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-slate-600">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-bold text-slate-800 text-sm">
              Hosting & Domain Infrastructure for High CWV Scores
            </h5>
            <p className="text-slate-500 text-xs">
              Fast LiteSpeed NVMe Web Hosting with built-in Redis caching & edge CDN delivery.
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-colors cursor-pointer text-xs shadow-2xs">
            <span>Learn More</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </span>
        </div>
      </div>
    </div>
  );
};
