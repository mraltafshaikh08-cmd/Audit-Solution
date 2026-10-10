import React from 'react';
import { ShieldCheck, Cpu, Globe, Activity } from 'lucide-react';

interface GaugeProps {
  score: number;
  label: string;
  sublabel?: string;
  size?: number;
  variant?: 'overall' | 'developer' | 'seo';
}

export const SpeedometerGauge: React.FC<GaugeProps> = ({
  score,
  label,
  sublabel,
  size = 200,
  variant = 'overall'
}) => {
  // Clamped score 0 to 100
  const normalizedScore = Math.max(0, Math.min(100, Math.round(score)));

  // Determine standard score status
  let statusText = 'Critical';
  let badgeClasses = 'bg-rose-50 text-rose-700 border-rose-200';
  let scoreColor = '#EF4444'; // Red (0-49)

  if (normalizedScore >= 90) {
    statusText = 'Excellent';
    badgeClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    scoreColor = '#10B981'; // Green (90-100)
  } else if (normalizedScore >= 50) {
    statusText = 'Needs Work';
    badgeClasses = 'bg-amber-50 text-amber-700 border-amber-200';
    scoreColor = '#F59E0B'; // Amber (50-89)
  }

  // Variant-specific visual styling to make each gauge uniquely identifiable
  let topBarColor = 'bg-indigo-600';
  let cardBorder = 'border-slate-200 hover:border-indigo-300';
  let cardBg = 'bg-white';
  let needleHubColor = '#4F46E5'; // Indigo
  let icon = Activity;
  let categoryTag = 'Composite Health';
  let trackGradientId = 'grad-overall';

  if (variant === 'developer') {
    topBarColor = 'bg-blue-600';
    cardBorder = 'border-slate-200 hover:border-blue-300';
    needleHubColor = '#2563EB'; // Blue
    icon = Cpu;
    categoryTag = 'Engineering & CWV';
    trackGradientId = 'grad-dev';
  } else if (variant === 'seo') {
    topBarColor = 'bg-emerald-600';
    cardBorder = 'border-slate-200 hover:border-emerald-300';
    needleHubColor = '#059669'; // Emerald
    icon = Globe;
    categoryTag = 'Search & Indexation';
    trackGradientId = 'grad-seo';
  }

  const IconComponent = icon;

  // Arc math for 180-degree speedometer
  // Radius = 72, Center = (100, 96)
  const radius = 72;
  const strokeWidth = 10;
  const circumference = Math.PI * radius; // 226.19
  const strokeDashoffset = circumference - (circumference * normalizedScore) / 100;

  // Needle angle: -90deg (at 0) to +90deg (at 100)
  const needleAngle = -90 + (normalizedScore / 100) * 180;

  return (
    <div className={`relative flex flex-col justify-between p-5 rounded-2xl border shadow-xs transition-all ${cardBorder} ${cardBg} overflow-hidden group`}>
      {/* Distinct Top Accent Stripe for each gauge */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 ${topBarColor}`} />

      {/* Top Header Row with Category Tag & Icon */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <IconComponent className="w-3.5 h-3.5 text-slate-600" />
          <span className="uppercase text-[10px] font-bold tracking-wider">{categoryTag}</span>
        </div>
        <span className={`px-2 py-0.5 text-[11px] font-bold rounded-md border ${badgeClasses}`}>
          {statusText}
        </span>
      </div>

      {/* ================= SECTION 1: THE SPEEDOMETER METER (Clean, No Overlapping Numbers) ================= */}
      <div className="my-2 flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center" style={{ width: size, height: size * 0.58 }}>
          <svg
            viewBox="0 0 200 115"
            className="w-full h-full overflow-visible"
          >
            <defs>
              <linearGradient id={trackGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>

            {/* Background calibrated track arc (180 degrees) */}
            <path
              d="M 28 96 A 72 72 0 0 1 172 96"
              fill="none"
              stroke="#F1F5F9"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />

            {/* Subtle zone indicator dots */}
            <circle cx="28" cy="96" r="3" fill="#EF4444" opacity="0.4" />
            <circle cx="100" cy="24" r="3" fill="#F59E0B" opacity="0.4" />
            <circle cx="172" cy="96" r="3" fill="#10B981" opacity="0.4" />

            {/* Active Score Arc with smooth transition */}
            <path
              d="M 28 96 A 72 72 0 0 1 172 96"
              fill="none"
              stroke={scoreColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />

            {/* Speedometer Calibration Ticks & Numbers (0, 50, 100) */}
            <text x="24" y="112" textAnchor="middle" fill="#94A3B8" fontSize="10" fontWeight="600">0</text>
            <text x="100" y="14" textAnchor="middle" fill="#94A3B8" fontSize="10" fontWeight="600">50</text>
            <text x="176" y="112" textAnchor="middle" fill="#94A3B8" fontSize="10" fontWeight="600">100</text>

            {/* Analog Needle: Clean tapered pointer rotating around pivot (100, 96) */}
            <g
              transform={`translate(100, 96) rotate(${needleAngle})`}
              className="transition-transform duration-1000 ease-out"
            >
              {/* Needle shaft */}
              <polygon
                points="-3.5,0 0,-62 3.5,0"
                fill="#0F172A"
              />
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="-60"
                stroke={scoreColor}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Outer hub cap */}
              <circle cx="0" cy="0" r="9" fill="#0F172A" />
              {/* Inner accent ring */}
              <circle cx="0" cy="0" r="5" fill={needleHubColor} />
              {/* Center pin */}
              <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
            </g>
          </svg>
        </div>
      </div>

      {/* ================= SECTION 2: SEPARATED NUMBER DISPLAY (Clean & Distinct) ================= */}
      <div className="pt-3 mt-1 border-t border-slate-100 flex flex-col items-center text-center">
        {/* Large Separated Score Number */}
        <div className="flex items-baseline justify-center gap-1">
          <span 
            className="text-4xl font-black tracking-tight transition-colors"
            style={{ color: scoreColor }}
          >
            {normalizedScore}
          </span>
          <span className="text-sm font-bold text-slate-400">/ 100</span>
        </div>

        {/* Title and Sublabel */}
        <div className="mt-1">
          <h4 className="text-sm font-extrabold text-slate-900 tracking-tight">
            {label}
          </h4>
          {sublabel && (
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {sublabel}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
