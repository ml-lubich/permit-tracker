import Link from "next/link";
import { Navbar } from "@/components/Navbar";

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange/5 via-transparent to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-orange/10 border border-orange/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-orange rounded-full animate-pulse" />
            <span className="text-sm text-orange font-medium">
              Built for contractors, by contractors
            </span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">
            Never Miss a Permit{" "}
            <span className="text-orange">Deadline</span> Again
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto mb-10">
            Track every building permit across all your projects. Get automated
            reminders before deadlines hit. Stop paying thousands in fines for
            expired permits.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto bg-orange hover:bg-orange-dark text-black font-bold text-lg px-8 py-4 rounded-xl transition-colors"
            >
              Start Free 14-Day Trial
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto border border-card-border hover:border-orange/50 text-foreground font-medium text-lg px-8 py-4 rounded-xl transition-colors"
            >
              View Live Demo
            </Link>
          </div>
          <p className="text-sm text-muted mt-4">
            No credit card required. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: "$4,200", label: "Average fine per expired permit" },
    { value: "73%", label: "Of contractors miss at least one deadline/year" },
    { value: "2 min", label: "To add a permit & never worry again" },
  ];

  return (
    <section className="border-y border-card-border bg-card-bg/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-orange mb-2">
                {stat.value}
              </div>
              <div className="text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      title: "Permit Dashboard",
      description:
        "See all your permits at a glance. Color-coded status shows active (green), expiring soon (yellow), and expired (red).",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Calendar View",
      description:
        "Visual calendar of all permit deadlines. Never be surprised by an approaching expiration date again.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      title: "Smart Notifications",
      description:
        "Get email and SMS alerts 30, 14, and 7 days before expiration. Plus urgent alerts for expired permits.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Multi-Jurisdiction",
      description:
        "Track permits across different cities and counties. Each jurisdiction has different rules — we help you stay compliant everywhere.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Team Management",
      description:
        "Assign permits to team members. Everyone sees their deadlines. Managers get the full picture across all projects.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Reports & Export",
      description:
        "Generate compliance reports for audits. Export permit data to CSV. Keep your records clean and audit-ready.",
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything you need to stay{" "}
            <span className="text-orange">compliant</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Built specifically for general contractors, subcontractors, and
            construction companies.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card-bg border border-card-border rounded-xl p-6 hover:border-orange/30 transition-colors"
            >
              <div className="w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center text-orange mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-orange/10 to-orange/5 border border-orange/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Stop risking fines. Start tracking permits.
          </h2>
          <p className="text-lg text-muted mb-8 max-w-xl mx-auto">
            Join hundreds of contractors who trust PermitPro to keep their
            projects compliant and on schedule.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-orange hover:bg-orange-dark text-black font-bold text-lg px-8 py-4 rounded-xl transition-colors"
          >
            Start Your Free Trial
          </Link>
          <p className="text-sm text-muted mt-4">
            Plans start at $29/mo. 14-day free trial on all plans.
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-card-border py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange rounded flex items-center justify-center font-bold text-black text-xs">
              PP
            </div>
            <span className="font-semibold">
              Permit<span className="text-orange">Pro</span>
            </span>
          </div>
          <div className="flex gap-6 text-sm text-muted">
            <Link href="/login" className="hover:text-foreground transition-colors">Log In</Link>
            <Link href="/signup" className="hover:text-foreground transition-colors">Sign Up</Link>
          </div>
          <p className="text-sm text-muted">
            &copy; 2025 PermitPro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
