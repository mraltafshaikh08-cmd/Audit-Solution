import { AuditPayload, UserProfile, PaymentRecord, PlanType, AgencyLead } from '../types/audit';
import { TIER_CONFIG } from '../config/tierLimits';

const USER_STORAGE_KEY = 'auditsolution_user_profile';
const AUDITS_STORAGE_KEY = 'auditsolution_audit_records';
const PAYMENTS_STORAGE_KEY = 'auditsolution_payment_records';
const LEADS_STORAGE_KEY = 'auditsolution_agency_leads';

const DEFAULT_USER: UserProfile = {
  id: 'usr_default_demo_001',
  email: 'mr.altafshaikh08@gmail.com',
  fullName: 'Altaf Shaikh',
  planType: 'free',
  auditCredits: TIER_CONFIG.FREE_TIER.MAX_DAILY_SEARCHES, // 15 Searches per day
  dailySearchesUsed: 0,
  lastSearchDate: new Date().toISOString().split('T')[0],
  monthlyPagesCrawled: 0,
  agencyName: 'Apex Digital Agency',
  agencyLogoUrl: '',
  brandColor: '#2563EB', // Blue 600
  auditorName: 'Senior Web & SEO Consultant',
  customFooterText: 'Confidential Audit Report · Prepared for Client Growth',
  agencyApiKey: 'as_live_agency_key_982',
  createdAt: new Date().toISOString()
};

export const storage = {
  getUserProfile(): UserProfile {
    try {
      const data = localStorage.getItem(USER_STORAGE_KEY) || localStorage.getItem('auditpulse_user_profile');
      if (data) {
        const user: UserProfile = { ...DEFAULT_USER, ...JSON.parse(data) };
        
        // Check if daily search counter should reset for a new day
        const today = new Date().toISOString().split('T')[0];
        if (user.lastSearchDate !== today) {
          user.lastSearchDate = today;
          user.dailySearchesUsed = 0;
          user.auditCredits = TIER_CONFIG.FREE_TIER.MAX_DAILY_SEARCHES;
          this.saveUserProfile(user);
        }
        return user;
      }
    } catch (e) {
      console.warn('Failed reading user profile from localStorage', e);
    }
    return DEFAULT_USER;
  },

  saveUserProfile(profile: Partial<UserProfile>): UserProfile {
    const current = this.getUserProfile();
    const updated = { ...current, ...profile };
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed saving user profile to localStorage', e);
    }
    return updated;
  },

  decrementCredit(): boolean {
    const user = this.getUserProfile();
    if (user.planType === 'pro_monthly') {
      return true; // unlimited
    }
    if (user.auditCredits > 0) {
      const dailyUsed = (user.dailySearchesUsed || 0) + 1;
      const crawled = (user.monthlyPagesCrawled || 0) + 1;
      this.saveUserProfile({ 
        auditCredits: user.auditCredits - 1,
        dailySearchesUsed: dailyUsed,
        monthlyPagesCrawled: crawled
      });
      return true;
    }
    return false;
  },

  addCredits(amount: number): UserProfile {
    const user = this.getUserProfile();
    return this.saveUserProfile({ auditCredits: (user.auditCredits || 0) + amount });
  },

  upgradePlan(planType: PlanType): UserProfile {
    const user = this.getUserProfile();
    return this.saveUserProfile({
      planType,
      auditCredits: planType === 'pro_monthly' ? 9999 : (user.auditCredits + (planType === 'pay_per_audit' ? 1 : 0))
    });
  },

  getAudits(): AuditPayload[] {
    try {
      const data = localStorage.getItem(AUDITS_STORAGE_KEY) || localStorage.getItem('auditpulse_audit_records');
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Failed reading audits', e);
    }
    return [];
  },

  saveAudit(audit: AuditPayload): AuditPayload[] {
    const audits = this.getAudits();
    const existingIndex = audits.findIndex(a => a.id === audit.id);
    let updated: AuditPayload[];
    if (existingIndex >= 0) {
      updated = [...audits];
      updated[existingIndex] = audit;
    } else {
      updated = [audit, ...audits].slice(0, 50); // store last 50 audits
    }
    try {
      localStorage.setItem(AUDITS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed saving audits', e);
    }
    return updated;
  },

  deleteAudit(id: string): AuditPayload[] {
    const audits = this.getAudits().filter(a => a.id !== id);
    try {
      localStorage.setItem(AUDITS_STORAGE_KEY, JSON.stringify(audits));
    } catch (e) {
      console.warn('Failed deleting audit', e);
    }
    return audits;
  },

  getPayments(): PaymentRecord[] {
    try {
      const data = localStorage.getItem(PAYMENTS_STORAGE_KEY) || localStorage.getItem('auditpulse_payment_records');
      if (data) return JSON.parse(data);
    } catch (e) {}
    return [];
  },

  recordPayment(record: Omit<PaymentRecord, 'id' | 'createdAt'>): PaymentRecord {
    const payments = this.getPayments();
    const newPayment: PaymentRecord = {
      ...record,
      id: `pay_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString()
    };
    const updated = [newPayment, ...payments];
    try {
      localStorage.setItem(PAYMENTS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}
    return newPayment;
  },

  // Embeddable Lead Generation Widget storage
  getLeads(): AgencyLead[] {
    try {
      const data = localStorage.getItem(LEADS_STORAGE_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {}
    return [
      {
        id: 'lead_demo_1',
        agencyApiKey: 'as_live_agency_key_982',
        email: 'growth@clientcompany.com',
        targetUrl: 'https://clientcompany.com',
        status: 'new',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        reportUrl: '/?url=https://clientcompany.com'
      }
    ];
  },

  saveLead(lead: Omit<AgencyLead, 'id' | 'createdAt'>): AgencyLead {
    const leads = this.getLeads();
    const newLead: AgencyLead = {
      ...lead,
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString()
    };
    const updated = [newLead, ...leads];
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}
    return newLead;
  },

  deleteLead(id: string): AgencyLead[] {
    const leads = this.getLeads().filter(l => l.id !== id);
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    } catch (e) {}
    return leads;
  }
};
