"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { PERMIT_TYPES, PERMIT_STATUSES } from "@/lib/types";
import { createPermit } from "@/lib/actions";

export default function NewPermitPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    const result = await createPermit(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar isLoggedIn />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Add New Permit</h1>
          <p className="text-muted text-sm mt-1">
            Enter the permit details to start tracking
          </p>
        </div>

        <form action={handleSubmit} className="bg-card-bg border border-card-border rounded-xl p-6 space-y-6">
          {error && (
            <div className="bg-danger/10 border border-danger/20 text-danger text-sm rounded-lg p-3">
              {error}
            </div>
          )}

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
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="project_name" className="block text-sm font-medium mb-1.5">
                Project Name *
              </label>
              <input
                id="project_name"
                name="project_name"
                type="text"
                required
                placeholder="e.g. Oak Street Renovation"
                className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange transition-colors"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium mb-1.5">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange transition-colors"
              >
                {PERMIT_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s === "in_review" ? "In Review" : s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label htmlFor="submitted_date" className="block text-sm font-medium mb-1.5">
                Submitted Date
              </label>
              <input
                id="submitted_date"
                name="submitted_date"
                type="date"
                className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange transition-colors"
              />
            </div>

            <div>
              <label htmlFor="approved_date" className="block text-sm font-medium mb-1.5">
                Approved Date
              </label>
              <input
                id="approved_date"
                name="approved_date"
                type="date"
                className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange transition-colors"
              />
            </div>

            <div>
              <label htmlFor="expiry_date" className="block text-sm font-medium mb-1.5">
                Expiry Date
              </label>
              <input
                id="expiry_date"
                name="expiry_date"
                type="date"
                className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="inspector" className="block text-sm font-medium mb-1.5">
                Inspector
              </label>
              <input
                id="inspector"
                name="inspector"
                type="text"
                placeholder="Inspector name"
                className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange transition-colors"
              />
            </div>

            <div>
              <label htmlFor="fee_amount" className="block text-sm font-medium mb-1.5">
                Fee Amount ($)
              </label>
              <input
                id="fee_amount"
                name="fee_amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
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
              rows={3}
              placeholder="Any additional details..."
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
