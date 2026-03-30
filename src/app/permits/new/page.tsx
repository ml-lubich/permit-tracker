"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { PERMIT_TYPES } from "@/lib/types";

export default function NewPermitPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Demo mode — just redirect back to dashboard
    setTimeout(() => {
      router.push("/dashboard");
    }, 500);
  };

  return (
    <>
      <Navbar isLoggedIn />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Add New Permit</h1>
          <p className="text-muted text-sm mt-1">
            Enter the permit details to start tracking deadlines
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card-bg border border-card-border rounded-xl p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="permit_number" className="block text-sm font-medium mb-1.5">
                Permit Number *
              </label>
              <input
                id="permit_number"
                name="permit_number"
                type="text"
                required
                placeholder="e.g. BP-2025-001234"
                className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange transition-colors"
              />
            </div>

            <div>
              <label htmlFor="permit_type" className="block text-sm font-medium mb-1.5">
                Permit Type *
              </label>
              <select
                id="permit_type"
                name="permit_type"
                required
                className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange transition-colors"
              >
                <option value="">Select type...</option>
                {PERMIT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="jurisdiction" className="block text-sm font-medium mb-1.5">
              Jurisdiction *
            </label>
            <input
              id="jurisdiction"
              name="jurisdiction"
              type="text"
              required
              placeholder="e.g. City of Austin, TX"
              className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange transition-colors"
            />
          </div>

          <div>
            <label htmlFor="project_address" className="block text-sm font-medium mb-1.5">
              Project Address *
            </label>
            <input
              id="project_address"
              name="project_address"
              type="text"
              required
              placeholder="e.g. 1234 Oak Street, Austin, TX 78701"
              className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="issue_date" className="block text-sm font-medium mb-1.5">
                Issue Date *
              </label>
              <input
                id="issue_date"
                name="issue_date"
                type="date"
                required
                className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange transition-colors"
              />
            </div>

            <div>
              <label htmlFor="expiration_date" className="block text-sm font-medium mb-1.5">
                Expiration Date *
              </label>
              <input
                id="expiration_date"
                name="expiration_date"
                type="date"
                required
                className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium mb-1.5">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              placeholder="Any additional details about this permit..."
              className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange transition-colors resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-orange hover:bg-orange-dark text-black font-semibold px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : "Add Permit"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="border border-card-border hover:border-orange/30 text-muted hover:text-foreground px-6 py-2.5 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
