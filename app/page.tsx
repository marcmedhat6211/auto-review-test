"use client";

import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Features", "Pricing", "About", "Blog", "Contact"];

const FEATURES = [
  {
    icon: "⚡",
    title: "Blazing Fast",
    description:
      "Built on edge infrastructure so your data loads in milliseconds, no matter where your users are in the world.",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: "🔒",
    title: "Secure by Default",
    description:
      "End-to-end encryption, role-based access control, and SOC2 compliance baked in from day one.",
    color: "from-green-400 to-emerald-600",
  },
  {
    icon: "📊",
    title: "Real-time Analytics",
    description:
      "Watch your metrics update live. No more refreshing dashboards — the data comes to you.",
    color: "from-blue-400 to-indigo-600",
  },
  {
    icon: "🤖",
    title: "AI-Powered Insights",
    description:
      "Our embedded AI surfaces anomalies, forecasts trends, and writes plain-English summaries so you never miss a signal.",
    color: "from-purple-400 to-pink-600",
  },
  {
    icon: "🔗",
    title: "100+ Integrations",
    description:
      "Connect to Slack, Notion, Salesforce, Stripe, and dozens more in a single click.",
    color: "from-rose-400 to-red-600",
  },
  {
    icon: "🌍",
    title: "Global CDN",
    description:
      "Your assets and API responses are cached at 300+ edge nodes worldwide for zero-latency delivery.",
    color: "from-cyan-400 to-teal-600",
  },
];

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Perfect for side projects and early exploration.",
    features: [
      "Up to 3 projects",
      "10,000 API requests/mo",
      "Community support",
      "Basic analytics",
      "1 team member",
    ],
    cta: "Get started free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "per month",
    description: "For growing teams that need more power and collaboration.",
    features: [
      "Unlimited projects",
      "1M API requests/mo",
      "Priority email support",
      "Advanced analytics",
      "Up to 15 team members",
      "Custom domains",
      "SSO / SAML",
    ],
    cta: "Start free trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "Tailored contracts, SLAs, and dedicated infrastructure.",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "99.99% uptime SLA",
      "Dedicated support engineer",
      "On-premise option",
      "Custom data retention",
      "Audit logs",
    ],
    cta: "Talk to sales",
    highlight: false,
  },
];

const TESTIMONIALS = [
  {
    quote:
      "We cut our data pipeline build time by 70% in the first month. The real-time sync alone was worth the switch.",
    author: "Priya Mehta",
    role: "Head of Engineering, Zephyr Labs",
    avatar: "PM",
  },
  {
    quote:
      "I've evaluated a dozen tools in this space and nothing comes close to the developer experience here.",
    author: "Carlos Ruiz",
    role: "Staff Engineer, Orbital Systems",
    avatar: "CR",
  },
  {
    quote:
      "Our non-technical stakeholders finally understand our metrics. The AI summaries are a game-changer.",
    author: "Aisha Nkosi",
    role: "VP Product, Lumina Health",
    avatar: "AN",
  },
];

const STATS = [
  { value: "12,000+", label: "Teams worldwide" },
  { value: "4.2B", label: "API calls per month" },
  { value: "99.98%", label: "Historical uptime" },
  { value: "<80ms", label: "Median latency" },
];

// Utility: join class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-gray-950/90 backdrop-blur-md border-b border-gray-800 shadow-lg"
          : "bg-transparent",
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/60 transition-shadow">
            S
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            StreamLine
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button className="text-gray-400 hover:text-white text-sm font-medium transition-colors px-3 py-1.5">
            Sign in
          </button>
          <button className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-md shadow-violet-500/20">
            Get started
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-950 border-t border-gray-800 px-6 py-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="block text-gray-400 hover:text-white text-sm font-medium py-1 transition-colors"
            >
              {link}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <button className="w-full text-gray-400 text-sm font-medium py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors">
              Sign in
            </button>
            <button className="w-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold py-2 rounded-lg transition-colors">
              Get started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function HeroSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950 pt-16">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <span className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Now with AI-powered anomaly detection
        </span>

        <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
          Ship faster.{" "}
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Break nothing.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          StreamLine is the data platform that lets engineering and product
          teams collaborate on real-time metrics — without writing a single SQL
          query.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-5 py-3 rounded-xl font-semibold">
            ✅ You're on the list! We'll be in touch.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="flex-1 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
            />
            <button
              type="submit"
              className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors shadow-lg shadow-violet-500/25 whitespace-nowrap"
            >
              Start for free →
            </button>
          </form>
        )}

        <p className="text-gray-600 text-xs mt-4">
          No credit card required · Free tier available · GDPR compliant
        </p>

        {/* Social proof strip */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {["Notion", "Linear", "Vercel", "Stripe", "Figma"].map((name) => (
            <span
              key={name}
              className="text-gray-600 font-semibold text-sm hover:text-gray-400 transition-colors"
            >
              {name}
            </span>
          ))}
        </div>
        <p className="text-gray-700 text-xs mt-3">
          Trusted by teams at these companies and thousands more
        </p>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section className="bg-gray-900 border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl font-black text-white">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="bg-gray-950 py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Everything you need.{" "}
            <span className="text-gray-500">Nothing you don't.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            We obsessed over every detail so you can focus on building products
            your users love.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group relative bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
            >
              <div
                className={cn(
                  "w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center text-xl mb-4 shadow-lg",
                  feature.color,
                )}
              >
                {feature.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="bg-gray-900 py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Simple, honest pricing
          </h2>
          <p className="text-gray-400 text-lg mb-6">
            Scale up when you're ready. Downgrade anytime.
          </p>
          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-gray-800 p-1 rounded-full">
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-semibold transition-all",
                !annual
                  ? "bg-white text-gray-900"
                  : "text-gray-400 hover:text-white",
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2",
                annual
                  ? "bg-white text-gray-900"
                  : "text-gray-400 hover:text-white",
              )}
            >
              Annual
              <span className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                –20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative rounded-2xl border p-8 flex flex-col transition-all duration-300",
                plan.highlight
                  ? "bg-violet-600 border-violet-500 shadow-2xl shadow-violet-500/30 scale-105"
                  : "bg-gray-950 border-gray-800 hover:border-gray-600",
              )}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  Most popular
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={cn(
                    "font-black text-xl mb-1",
                    plan.highlight ? "text-white" : "text-white",
                  )}
                >
                  {plan.name}
                </h3>
                <p
                  className={cn(
                    "text-sm",
                    plan.highlight ? "text-violet-200" : "text-gray-500",
                  )}
                >
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <span
                  className={cn(
                    "text-5xl font-black",
                    plan.highlight ? "text-white" : "text-white",
                  )}
                >
                  {plan.price === "Custom"
                    ? "Custom"
                    : annual && plan.price !== "$0"
                      ? `$${Math.round(parseInt(plan.price.slice(1)) * 0.8)}`
                      : plan.price}
                </span>
                <span
                  className={cn(
                    "text-sm ml-1",
                    plan.highlight ? "text-violet-200" : "text-gray-500",
                  )}
                >
                  /{plan.period}
                </span>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm">
                    <span
                      className={cn(
                        "mt-0.5 flex-shrink-0",
                        plan.highlight ? "text-violet-200" : "text-violet-400",
                      )}
                    >
                      ✓
                    </span>
                    <span
                      className={
                        plan.highlight ? "text-violet-100" : "text-gray-400"
                      }
                    >
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={cn(
                  "w-full py-3 rounded-xl font-semibold text-sm transition-all",
                  plan.highlight
                    ? "bg-white text-violet-700 hover:bg-gray-100 shadow-lg"
                    : "bg-gray-800 text-white hover:bg-gray-700 border border-gray-700",
                )}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="bg-gray-950 py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Loved by engineers
          </h2>
          <p className="text-gray-400 text-lg">Don't take our word for it.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.author}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-all"
            >
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">
                    {t.author}
                  </div>
                  <div className="text-gray-500 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="bg-gray-900 py-28 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-violet-500/30 blur-3xl rounded-full" />
          <h2 className="relative text-4xl md:text-6xl font-black text-white leading-tight">
            Ready to move faster?
          </h2>
        </div>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Join over 12,000 teams already using StreamLine to ship with
          confidence. Free to start, no card required.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-8 py-4 rounded-xl transition-colors shadow-xl shadow-violet-500/25 text-base">
            Start for free →
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors border border-gray-700 text-base">
            Book a demo
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const FOOTER_LINKS = {
    Product: ["Features", "Pricing", "Changelog", "Roadmap"],
    Company: ["About", "Blog", "Careers", "Press"],
    Legal: ["Privacy", "Terms", "Security", "Cookies"],
    Support: ["Docs", "Status", "Community", "Contact"],
  };

  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-black text-xs">
                S
              </div>
              <span className="text-white font-bold">StreamLine</span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              The modern data platform for fast-moving teams.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">
            © 2025 StreamLine, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Twitter", "GitHub", "LinkedIn"].map((platform) => (
              <a
                key={platform}
                href="#"
                className="text-gray-600 hover:text-gray-300 text-xs transition-colors"
              >
                {platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="bg-gray-950 min-h-screen font-sans antialiased">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
