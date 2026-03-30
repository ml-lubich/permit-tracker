"use client";

import Link from "next/link";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { signIn } from "@/lib/actions";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    const result = await signIn(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

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
              <h1 className="text-2xl font-bold">Welcome back</h1>
              <p className="text-muted mt-1">Log in to your PermitPro account</p>
            </div>

            <form action={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-danger/10 border border-danger/20 text-danger text-sm rounded-lg p-3">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
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
                  name="password"
                  type="password"
                  required
                  className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange transition-colors"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange hover:bg-orange-dark text-black font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-orange hover:text-orange-light transition-colors">
                  Start free trial
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
