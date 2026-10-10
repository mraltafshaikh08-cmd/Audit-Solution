import React, { useState } from 'react';
import { 
  Search, 
  Tag, 
  Clock, 
  ArrowRight, 
  TrendingUp, 
  Mail, 
  CheckCircle2, 
  BookOpen, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Code2, 
  Building2, 
  ShoppingBag,
  Share2
} from 'lucide-react';
import { AdSenseBanner } from '../components/AdSenseBanner';

interface BlogPageProps {
  onNavigateToHome: () => void;
}

interface BlogPost {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  author: string;
  tags: string[];
  content: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    category: 'Technical SEO',
    title: 'How to Fix High LCP and CLS Issues in Next.js & React Apps',
    excerpt: 'A complete engineering guide to optimizing Core Web Vitals, preloading critical above-the-fold hero images, and eliminating layout shifts with CSS aspect-ratio math.',
    readTime: '6 min read',
    date: 'Oct 08, 2026',
    author: 'Senior Web Performance Engineer',
    tags: ['#React', '#Performance', '#Nextjs', '#CWV'],
    content: `
      Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) are decisive metrics in Google's Page Experience ranking algorithm.
      In modern single-page applications, delayed hydration and dynamically injected elements frequently hurt perceived loading speed.

      Key Fixes:
      1. Preload Hero Assets: Use <link rel="preload" as="image" href="..." fetchpriority="high"> so modern browsers fetch critical visuals during initial HTML parse.
      2. Enforce Reserved Space: Never insert responsive images or banner ads without explicit width, height, or aspect-ratio declarations to eradicate CLS.
      3. Code-Split Heavy Third-Party Scripts: Defer tracking snippets and non-critical analytics using requestIdleCallback or async/defer tags.
    `
  },
  {
    id: 'post-2',
    category: 'Agency Growth',
    title: 'How Agencies Use White-Label Audit Reports to Close $5,000 Clients',
    excerpt: 'Learn how embedding an audit lead widget on your agency website turns cold visitors into qualified web development and retainer clients in minutes.',
    readTime: '5 min read',
    date: 'Oct 06, 2026',
    author: 'Agency Strategy Consultant',
    tags: ['#SEO', '#AgencyGrowth', '#LeadGen', '#WhiteLabel'],
    content: `
      High-value web design and SEO agency clients rarely convert from generic contact forms. They need immediate diagnostic proof that their current website is leaking revenue.

      The 3-Step Agency Playbook:
      1. Embed the Lead Widget: Place the AuditSolution embed snippet onto your agency home page and blog sidebars.
      2. Automated Audit Delivery: When prospective clients enter their email and domain, the automated engine sends them a branded diagnostic summary.
      3. Action-Driven Pitch: Use the generated Developer Fix snippets as the foundational scope of work for your proposal meeting.
    `
  },
  {
    id: 'post-3',
    category: 'Code Quality',
    title: 'Fixing Missing Security Headers: CSP, HSTS, and X-Frame-Options Explained',
    excerpt: 'Step-by-step code snippets for NGINX, Apache, and Vercel/Cloudflare to secure your web applications against clickjacking and insecure transport.',
    readTime: '8 min read',
    date: 'Oct 04, 2026',
    author: 'Cybersecurity Architect',
    tags: ['#Security', '#DevOps', '#Headers', '#Nginx'],
    content: `
      Over 60% of top-ranking websites still fail standard security header audits. Missing HTTP Strict Transport Security (HSTS) and Content-Security-Policy (CSP) headers expose domains to man-in-the-middle attacks and cross-site scripting vulnerabilities.

      Recommended Server Configurations:
      - Strict-Transport-Security: Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
      - X-Frame-Options: Header always set X-Frame-Options "SAMEORIGIN"
      - X-Content-Type-Options: Header always set X-Content-Type-Options "nosniff"
    `
  },
  {
    id: 'post-4',
    category: 'WordPress',
    title: 'Eliminating Heavy DOM Nodes & Plugin Bloat in WordPress Sites',
    excerpt: 'Diagnose and remediate 1,500+ DOM node warnings and main-thread blocking time in WooCommerce and Elementor installations.',
    readTime: '7 min read',
    date: 'Sep 29, 2026',
    author: 'WordPress Core Developer',
    tags: ['#WordPress', '#WooCommerce', '#DOM', '#Speed'],
    content: `
      Excessive DOM depth delays mobile rendering and causes frame rate stutter. When page builders nest divs 15 levels deep, mobile browser CPU usage spikes dramatically. Learn how asset clean-up plugins and lightweight theme architectures restore sub-2s mobile loading.
    `
  },
  {
    id: 'post-5',
    category: 'Technical SEO',
    title: 'Mastering Schema.org JSON-LD: Rich Snippets That Double Click-Through Rates',
    excerpt: 'Avoid common Google Search Console schema errors with validated Organization, FAQPage, Product, and LocalBusiness markup templates.',
    readTime: '5 min read',
    date: 'Sep 25, 2026',
    author: 'Organic Search Specialist',
    tags: ['#SEO', '#Schema', '#JSONLD', '#GoogleSearch'],
    content: `
      Search engines reward semantic clarity. Adding valid JSON-LD schemas allows Google to generate rich interactive SERP cards with ratings, FAQs, and price attributes that substantially boost organic click-through rates.
    `
  },
  {
    id: 'post-6',
    category: 'E-commerce',
    title: 'Core Web Vitals for E-commerce: Preventing Cart Abandonment at Scale',
    excerpt: 'A 100ms improvement in page load speed can boost conversion rates by 8%. How Shopify and WooCommerce stores optimize product pages.',
    readTime: '6 min read',
    date: 'Sep 20, 2026',
    author: 'E-Commerce Growth Engineer',
    tags: ['#Ecommerce', '#CRO', '#Shopify', '#Performance'],
    content: `
      E-commerce shoppers abandon slow checkout funnels rapidly. Discover how optimizing above-the-fold product galleries and lazy-loading recommendation carousels protects revenue during peak traffic surges.
    `
  }
];

const CATEGORIES = ['All Topics', 'Technical SEO', 'Code Quality', 'Agency Growth', 'WordPress', 'E-commerce'];
const TOPIC_TAGS = ['#SEO', '#Performance', '#React', '#WordPress', '#Nextjs', '#Security', '#CWV'];

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigateToHome }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Topics');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'All Topics' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
      setTimeout(() => {
        setNewsletterSubmitted(false);
        setNewsletterEmail('');
      }, 3500);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= HERO SECTION (Page 1 Blueprint) ================= */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Developer Guides, SEO Strategies & Case Studies</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Master Web Performance & SEO Optimization
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Actionable guides, developer tutorials, and SEO strategies to help you build faster websites, eliminate crawl bottlenecks, and rank higher.
          </p>

          {/* Search Bar with Tags (Ref: 1000028883.jpg) */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative flex items-center bg-white rounded-xl border border-slate-300 shadow-xs p-2 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100 transition-all">
              <Search className="w-5 h-5 text-slate-400 ml-2 mr-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tutorials, fixes, Core Web Vitals..."
                className="w-full text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-slate-400 hover:text-slate-600 px-2 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Topic Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs">
              <span className="text-slate-400 font-medium">Trending Tags:</span>
              {TOPIC_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearchQuery(tag)}
                  className="px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-200">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ================= MAIN CONTENT + SIDEBAR LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Blog Post Cards (8 Columns) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setActivePost(post)}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between cursor-pointer group"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                      <span className="px-2.5 py-0.5 rounded-md font-bold text-[11px] uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {post.tags.map(t => (
                        <span key={t} className="text-[11px] font-medium text-slate-500">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">{post.date}</span>
                    <span className="inline-flex items-center gap-1 font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                      Read Guide <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
                <Search className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                <h4 className="font-bold text-slate-800">No matching articles found</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Try adjusting your search query or selecting "All Topics".
                </p>
              </div>
            )}

            {/* ================= USE CASES SECTION (Page 1 Blueprint) ================= */}
            <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-1">
                Domain Solutions
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Built for High-Growth Digital Teams
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <Building2 className="w-6 h-6 text-blue-600 mb-2" />
                  <h4 className="font-bold text-sm text-slate-900">For Web Dev Agencies</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Automate client site handoffs and deliver custom-branded White-Label PDF reports that command premium retainer fees.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <Zap className="w-6 h-6 text-emerald-600 mb-2" />
                  <h4 className="font-bold text-sm text-slate-900">For SEO Consultants</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Instantly pinpoint technical indexing bottlenecks, robots.txt issues, and structured schema errors in 10 seconds.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <ShoppingBag className="w-6 h-6 text-purple-600 mb-2" />
                  <h4 className="font-bold text-sm text-slate-900">For E-commerce Stores</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Diagnose product page speed bottlenecks on WooCommerce and Shopify to decrease cart abandonment and improve conversion.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-600">
                  Ready to test your live website with the 14-point audit engine?
                </div>
                <button
                  type="button"
                  onClick={onNavigateToHome}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Run Free Website Audit Now &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* ================= SIDEBAR LAYOUT (Page 1 Blueprint) ================= */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Widget 1: Trending Posts */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <h4 className="font-black text-sm text-slate-900 uppercase tracking-wider">
                  Trending Tutorials
                </h4>
              </div>

              <div className="space-y-4">
                {BLOG_POSTS.slice(0, 3).map((post, idx) => (
                  <div 
                    key={post.id}
                    onClick={() => setActivePost(post)}
                    className="flex items-start gap-3 cursor-pointer group"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <h5 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h5>
                      <span className="text-[11px] text-slate-400 mt-0.5 block">
                        {post.readTime} · {post.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget 2: Free Tool CTA Banner */}
            <div className="bg-linear-to-br from-blue-900 to-indigo-900 text-white p-6 rounded-2xl shadow-md">
              <Sparkles className="w-6 h-6 text-blue-300 mb-2" />
              <h4 className="text-base font-black">
                Audit Your Domain in 10 Seconds
              </h4>
              <p className="text-xs text-blue-100 mt-1.5 leading-relaxed">
                Run a full Core Web Vitals, technical SEO, and accessibility audit completely free. 15 scans included daily.
              </p>
              <button
                type="button"
                onClick={onNavigateToHome}
                className="mt-4 w-full py-2.5 px-4 bg-white hover:bg-blue-50 text-blue-900 font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer text-center"
              >
                Launch Audit Tool &rarr;
              </button>
            </div>

            {/* Widget 3: Newsletter Signup */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-emerald-600" />
                <h4 className="font-black text-sm text-slate-900">
                  Engineering Newsletter
                </h4>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Bi-weekly digests on Google Core Updates, CWV optimizations, and agency growth playbooks.
              </p>

              {newsletterSubmitted ? (
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Subscribed! Check your inbox for our latest performance checklist.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your work email"
                    required
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-500 outline-none text-slate-900"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 px-3 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Subscribe Free
                  </button>
                  <span className="text-[10px] text-slate-400 block text-center mt-1">
                    Zero spam. Unsubscribe anytime in 1-click.
                  </span>
                </form>
              )}
            </div>

            {/* Widget 4: Google AdSense Sidebar Slot */}
            <div className="pt-2">
              <AdSenseBanner isPro={false} slot="sidebar" />
            </div>

          </div>

        </div>

      </div>

      {/* ================= MODAL POST READER ================= */}
      {activePost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden border border-slate-200 max-h-[85vh] flex flex-col">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                {activePost.category}
              </span>
              <button
                type="button"
                onClick={() => setActivePost(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {activePost.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-500 pb-3 border-b border-slate-100">
                <span>By {activePost.author}</span>
                <span>·</span>
                <span>{activePost.date}</span>
                <span>·</span>
                <span>{activePost.readTime}</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {activePost.excerpt}
              </p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-sans">
                {activePost.content}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setActivePost(null);
                    onNavigateToHome();
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                >
                  Test Your Site With This Audit &rarr;
                </button>
                <button
                  type="button"
                  onClick={() => setActivePost(null)}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
