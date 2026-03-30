"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Demo mode
    setTimeout(() => {
      router.push("/dashboard");
    }, 500);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-16">
        <div className="w-full max-w-md px-4">
          <div className="bg-card-bg border border-card-border rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-orange rounded-xl flex items-center justify-center font-bold text-black text-lg mx-auto mb-4">
                PP
              </div>
              <h1 className="text-2xl font-bold">Start your free trial</h1>
              <p className="text-muted mt-1">14 days free. No credit card required.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-danger/10 border border-danger/20 text-danger text-sm rounded-lg p-3">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange transition-colors"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-1.5">
                  Company Name
                </label>
                <input
                  id="company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange transition-colors"
                  placeholder="Smith Construction LLC"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange transition-colors"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1.5">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange transition-colors"
                  placeholder="Min. 8 characters"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange hover:bg-orange-dark text-black font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted">
                Already have an account?{" "}
                <Link href="/login" className="text-orange hover:text-orange-light transition-colors">
                  Log in
                </Link>
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-card-border">
              <p className="text-xs text-muted text-center">
                Demo mode: Enter any details to explore the app
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
