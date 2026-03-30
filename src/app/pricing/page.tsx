import Link from "next/link";
import { Navbar } from "@/components/Navbar";

const plans = [
  {
    name: "Solo",
    price: "$29",
    period: "/mo",
    description: "For independent contractors managing their own permits",
    features: [
      "Up to 25 active permits",
      "Email notifications",
      "Calendar view",
      "CSV export",
      "1 user",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Company",
    price: "$79",
    period: "/mo",
    description: "For growing teams that need shared permit tracking",
    features: [
      "Up to 100 active permits",
      "Email + SMS notifications",
      "Calendar view",
      "CSV & PDF export",
      "Up to 10 users",
      "Team dashboard",
      "Permit assignment",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$149",
    period: "/mo",
    description: "For large operations with complex compliance needs",
    features: [
      "Unlimited active permits",
      "Email + SMS + Push notifications",
      "Calendar view",
      "All export formats",
      "Unlimited users",
      "Team dashboard",
      "Permit assignment",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
      "Audit trail & compliance reports",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Simple, transparent <span className="text-orange">pricing</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Start with a 14-day free trial. No credit card required. Cancel
              anytime. All plans include core permit tracking features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 flex flex-col ${
                  plan.highlighted
                    ? "bg-orange/5 border-2 border-orange relative"
                    : "bg-card-bg border border-card-border"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange text-black text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-orange flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`block text-center font-semibold py-3 rounded-xl transition-colors ${
                    plan.highlighted
                      ? "bg-orange hover:bg-orange-dark text-black"
                      : "border border-card-border hover:border-orange/50 text-foreground"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted text-sm">
              All plans include a 14-day free trial. Need a custom plan?{" "}
              <Link href="/signup" className="text-orange hover:text-orange-light transition-colors">
                Contact us
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
