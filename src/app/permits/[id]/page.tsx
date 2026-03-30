"use client";

import { use } from "react";
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
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${c.classes}`}>
      {c.label}
    </span>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-3 border-b border-card-border last:border-0">
      <dt className="text-sm text-muted mb-0.5">{label}</dt>
      <dd className="text-sm font-medium">{value}</dd>
    </div>
  );
}

export default function PermitDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const permit = demoPermits.find((p) => p.id === id);

  if (!permit) {
    return (
      <>
        <Navbar isLoggedIn />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Permit Not Found</h1>
            <Link href="/dashboard" className="text-orange hover:text-orange-light">
              Back to Dashboard
            </Link>
          </div>
        </main>
      </>
    );
  }

  const status = getPermitStatus(permit.expiration_date);
  const daysLeft = Math.ceil(
    (new Date(permit.expiration_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <>
      <Navbar isLoggedIn />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors mb-6"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>

        <div className="bg-card-bg border border-card-border rounded-xl p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">{permit.permit_number}</h1>
              <p className="text-muted mt-1">{permit.permit_type}</p>
            </div>
            <StatusBadge status={status} />
          </div>

          <div className={`rounded-lg p-4 mb-6 ${
            status === "expired"
              ? "bg-danger/10 border border-danger/20"
              : status === "expiring_soon"
              ? "bg-warning/10 border border-warning/20"
              : "bg-success/10 border border-success/20"
          }`}>
            <div className="text-sm font-medium">
              {daysLeft < 0 ? (
                <span className="text-danger">Expired {Math.abs(daysLeft)} days ago. Renew immediately to avoid fines.</span>
              ) : daysLeft <= 30 ? (
                <span className="text-warning">Expires in {daysLeft} days. Start renewal process now.</span>
              ) : (
                <span className="text-success">Active — {daysLeft} days until expiration.</span>
              )}
            </div>
          </div>

          <dl>
            <DetailRow label="Jurisdiction" value={permit.jurisdiction} />
            <DetailRow label="Project Address" value={permit.project_address} />
            <DetailRow label="Issue Date" value={permit.issue_date} />
            <DetailRow label="Expiration Date" value={permit.expiration_date} />
            <DetailRow label="Notes" value={permit.notes || "No notes"} />
          </dl>
        </div>
      </main>
    </>
  );
}
