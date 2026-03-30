"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Permit, PERMIT_STATUSES } from "@/lib/types";

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; classes: string }> = {
    pending: { label: "Pending", classes: "bg-muted/10 text-muted border-muted/20" },
    submitted: { label: "Submitted", classes: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    in_review: { label: "In Review", classes: "bg-warning/10 text-warning border-warning/20" },
    approved: { label: "Approved", classes: "bg-success/10 text-success border-success/20" },
    denied: { label: "Denied", classes: "bg-danger/10 text-danger border-danger/20" },
    expired: { label: "Expired", classes: "bg-danger/10 text-danger border-danger/20" },
  };
  const c = config[status] || config.pending;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${c.classes}`}>
      {c.label}
    </span>
  );
}

function StatCard({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <div className="bg-card-bg border border-card-border rounded-xl p-5">
      <div className="text-sm text-muted mb-1">{label}</div>
      <div className={`text-3xl font-bold ${color}`}>{count}</div>
    </div>
  );
}

export function DashboardClient({ permits }: { permits: Permit[] }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return permits
      .filter((p) => filter === "all" || p.status === filter)
      .filter(
        (p) =>
          !search ||
          p.permit_number.toLowerCase().includes(search.toLowerCase()) ||
          p.project_name.toLowerCase().includes(search.toLowerCase()) ||
          p.project_address.toLowerCase().includes(search.toLowerCase()) ||
          p.permit_type.toLowerCase().includes(search.toLowerCase())
      );
  }, [permits, filter, search]);

  const counts = useMemo(() => ({
    total: permits.length,
    approved: permits.filter((p) => p.status === "approved").length,
    pending: permits.filter((p) => p.status === "pending" || p.status === "submitted" || p.status === "in_review").length,
    expired: permits.filter((p) => p.status === "expired" || p.status === "denied").length,
  }), [permits]);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Permits" count={counts.total} color="text-foreground" />
        <StatCard label="Approved" count={counts.approved} color="text-success" />
        <StatCard label="In Progress" count={counts.pending} color="text-warning" />
        <StatCard label="Expired / Denied" count={counts.expired} color="text-danger" />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex gap-1 bg-card-bg border border-card-border rounded-lg p-1 overflow-x-auto">
          {(["all", ...PERMIT_STATUSES] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                filter === f
                  ? "bg-orange text-black"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {f === "all" ? "All" : f === "in_review" ? "In Review" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search permits..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 max-w-sm bg-card-bg border border-card-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange transition-colors"
        />
      </div>

      <div className="bg-card-bg border border-card-border rounded-xl overflow-hidden">
        {/* Mobile cards */}
        <div className="sm:hidden divide-y divide-card-border">
          {filtered.map((permit) => (
            <Link key={permit.id} href={`/permits/${permit.id}`} className="block p-4 hover:bg-white/[0.02]">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-medium text-sm">{permit.permit_number}</div>
                  <div className="text-xs text-muted">{permit.permit_type}</div>
                </div>
                <StatusBadge status={permit.status} />
              </div>
              <div className="text-xs text-muted">{permit.project_name}</div>
              {permit.expiry_date && (
                <div className="text-xs text-muted mt-1">Expires: {permit.expiry_date}</div>
              )}
            </Link>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-card-border bg-white/[0.02]">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Permit</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Project</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Expiry</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((permit) => (
                <tr key={permit.id} className="border-b border-card-border hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-sm">{permit.permit_number}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">{permit.project_name}</div>
                    <div className="text-xs text-muted truncate max-w-xs">{permit.project_address}</div>
                  </td>
                  <td className="px-4 py-3 text-sm">{permit.permit_type}</td>
                  <td className="px-4 py-3 text-sm text-muted">{permit.expiry_date || "—"}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={permit.status} />
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/permits/${permit.id}`}
                      className="text-xs text-orange hover:text-orange-light transition-colors"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted">
            {permits.length === 0 ? (
              <div>
                <p className="mb-2">No permits yet.</p>
                <Link href="/permits/new" className="text-orange hover:text-orange-light">
                  Add your first permit
                </Link>
              </div>
            ) : (
              "No permits found matching your criteria."
            )}
          </div>
        )}
      </div>
    </>
  );
}
