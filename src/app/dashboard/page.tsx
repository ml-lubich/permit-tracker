"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { demoPermits, getPermitStatus } from "@/lib/demo-data";
import { Permit } from "@/lib/types";

function StatusBadge({ status }: { status: Permit["status"] }) {
  const config = {
    active: { label: "Active", classes: "bg-success/10 text-success border-success/20" },
    expiring_soon: { label: "Expiring Soon", classes: "bg-warning/10 text-warning border-warning/20" },
    expired: { label: "Expired", classes: "bg-danger/10 text-danger border-danger/20" },
  };
  const c = config[status];
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

function PermitRow({ permit }: { permit: Permit }) {
  const daysLeft = Math.ceil(
    (new Date(permit.expiration_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <tr className="border-b border-card-border hover:bg-white/[0.02] transition-colors">
      <td className="px-4 py-3">
        <div className="font-medium text-sm">{permit.permit_number}</div>
        <div className="text-xs text-muted">{permit.permit_type}</div>
      </td>
      <td className="px-4 py-3 text-sm">{permit.jurisdiction}</td>
      <td className="px-4 py-3 text-sm text-muted max-w-xs truncate">{permit.project_address}</td>
      <td className="px-4 py-3 text-sm">{permit.expiration_date}</td>
      <td className="px-4 py-3 text-sm">
        {daysLeft < 0 ? (
          <span className="text-danger font-medium">{Math.abs(daysLeft)}d overdue</span>
        ) : (
          <span className={daysLeft <= 30 ? "text-warning font-medium" : "text-muted"}>
            {daysLeft}d left
          </span>
        )}
      </td>
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
  );
}

export default function DashboardPage() {
  const [filter, setFilter] = useState<"all" | Permit["status"]>("all");
  const [search, setSearch] = useState("");

  const permits = useMemo(() => {
    return demoPermits
      .map((p) => ({ ...p, status: getPermitStatus(p.expiration_date) }))
      .filter((p) => filter === "all" || p.status === filter)
      .filter(
        (p) =>
          !search ||
          p.permit_number.toLowerCase().includes(search.toLowerCase()) ||
          p.project_address.toLowerCase().includes(search.toLowerCase()) ||
          p.jurisdiction.toLowerCase().includes(search.toLowerCase()) ||
          p.permit_type.toLowerCase().includes(search.toLowerCase())
      );
  }, [filter, search]);

  const counts = useMemo(() => {
    const all = demoPermits.map((p) => ({ ...p, status: getPermitStatus(p.expiration_date) }));
    return {
      total: all.length,
      active: all.filter((p) => p.status === "active").length,
      expiring: all.filter((p) => p.status === "expiring_soon").length,
      expired: all.filter((p) => p.status === "expired").length,
    };
  }, []);

  return (
    <>
      <Navbar isLoggedIn />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Permit Dashboard</h1>
            <p className="text-muted text-sm mt-1">
              Manage and track all your building permits
            </p>
          </div>
          <Link
            href="/permits/new"
            className="bg-orange hover:bg-orange-dark text-black font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Permit
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Permits" count={counts.total} color="text-foreground" />
          <StatCard label="Active" count={counts.active} color="text-success" />
          <StatCard label="Expiring Soon" count={counts.expiring} color="text-warning" />
          <StatCard label="Expired" count={counts.expired} color="text-danger" />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex gap-1 bg-card-bg border border-card-border rounded-lg p-1">
            {(["all", "active", "expiring_soon", "expired"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  filter === f
                    ? "bg-orange text-black"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {f === "all" ? "All" : f === "expiring_soon" ? "Expiring" : f.charAt(0).toUpperCase() + f.slice(1)}
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

        {/* Table */}
        <div className="bg-card-bg border border-card-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-card-border bg-white/[0.02]">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Permit</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Jurisdiction</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Address</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Expires</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Time Left</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody>
                {permits.map((permit) => (
                  <PermitRow key={permit.id} permit={permit} />
                ))}
              </tbody>
            </table>
          </div>
          {permits.length === 0 && (
            <div className="text-center py-12 text-muted">
              No permits found matching your criteria.
            </div>
          )}
        </div>
      </main>
    </>
  );
}
