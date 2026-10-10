export type AuditStatus = 'pass' | 'warning' | 'fail' | 'info';

export interface AuditItem {
  id?: string;
  title?: string;
  category?: 'developer' | 'seo' | 'extended';
  score: number;
  status: AuditStatus;
  issue: string;
  fix_code: string;
  impact?: 'high' | 'medium' | 'low';
  details?: string[];
  metrics?: Record<string, string | number>;
}

export interface AuditSummary {
  overall_score: number;
  dev_score: number;
  seo_score: number;
  url: string;
  competitor_url?: string;
  timestamp?: string;
}

export interface DeveloperAudits {
  performance_cwv: AuditItem;
  security_headers: AuditItem;
  accessibility: AuditItem;
  mobile_responsive: AuditItem;
  code_hygiene: AuditItem;
}

export interface SeoAudits {
  technical_seo: AuditItem;
  on_page_seo: AuditItem;
  content_quality: AuditItem;
  structured_data: AuditItem;
  competitor_gap: AuditItem;
}

export interface ExtendedAudits {
  cro_funnel?: AuditItem;
  backlink_profile?: AuditItem;
  analytics_tracking?: AuditItem;
  local_seo?: AuditItem;
}

export interface AuditPayload {
  id?: string;
  summary: AuditSummary;
  developer_audits: DeveloperAudits;
  seo_audits: SeoAudits;
  extended_audits?: ExtendedAudits;
  createdAt?: string;
  is_white_labeled?: boolean;
}

export type PlanType = 'free' | 'pay_per_audit' | 'pro_monthly';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  planType: PlanType;
  auditCredits: number;
  agencyName: string;
  agencyLogoUrl: string;
  brandColor: string;
  auditorName: string;
  customFooterText: string;
  createdAt: string;
  agencyApiKey?: string;
  dailySearchesUsed?: number;
  lastSearchDate?: string;
  monthlyPagesCrawled?: number;
}

export interface AgencyLead {
  id: string;
  agencyApiKey: string;
  email: string;
  targetUrl: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'audit_sent';
  reportUrl?: string;
}

export interface PaymentRecord {
  id: string;
  userId: string;
  transactionId: string;
  paymentGateway: 'razorpay' | 'stripe';
  amount: number;
  currency: 'INR' | 'USD';
  status: 'success' | 'failed' | 'pending';
  planPurchased: PlanType;
  createdAt: string;
}
