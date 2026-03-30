"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Permit, Inspection, PERMIT_TYPES, PERMIT_STATUSES, INSPECTION_TYPES } from "@/lib/types";
import { updatePermit, deletePermit, createInspection, deleteInspection } from "@/lib/actions";

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
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${c.classes}`}>
      {c.label}
    </span>
  );
}

function ResultBadge({ result }: { result: string | null }) {
  if (!result) return <span className="text-xs text-muted">Pending</span>;
  const config: Record<string, string> = {
    pass: "bg-success/10 text-success border-success/20",
    fail: "bg-danger/10 text-danger border-danger/20",
    partial: "bg-warning/10 text-warning border-warning/20",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${config[result] || config.partial}`}>
      {result.charAt(0).toUpperCase() + result.slice(1)}
    </span>
  );
}

export function PermitDetailClient({
  permit,
  inspections,
}: {
  permit: Permit;
  inspections: Inspection[];
}) {
  const [editing, setEditing] = useState(false);
  const [showInspectionForm, setShowInspectionForm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpdate(formData: FormData) {
    setLoading(true);
    setError("");
    const result = await updatePermit(permit.id, formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this permit?")) return;
    await deletePermit(permit.id);
  }

  async function handleAddInspection(formData: FormData) {
    setLoading(true);
    const result = await createInspection(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  async function handleDeleteInspection(inspectionId: string) {
    if (!confirm("Delete this inspection?")) return;
    await deleteInspection(inspectionId, permit.id);
  }

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

        {error && (
          <div className="bg-danger/10 border border-danger/20 text-danger text-sm rounded-lg p-3 mb-4">
            {error}
          </div>
        )}

        {/* Permit Details / Edit Form */}
        <div className="bg-card-bg border border-card-border rounded-xl p-6 mb-6">
          {editing ? (
            <form action={handleUpdate} className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold">Edit Permit</h1>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="text-sm text-muted hover:text-foreground"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Permit Number</label>
                  <input name="permit_number" defaultValue={permit.permit_number} required className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Permit Type</label>
                  <select name="permit_type" defaultValue={permit.permit_type} className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange">
                    {PERMIT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Project Name</label>
                  <input name="project_name" defaultValue={permit.project_name} required className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Status</label>
                  <select name="status" defaultValue={permit.status} className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange">
                    {PERMIT_STATUSES.map((s) => (
                      <option key={s} value={s}>{s === "in_review" ? "In Review" : s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Project Address</label>
                <input name="project_address" defaultValue={permit.project_address} required className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Submitted Date</label>
                  <input name="submitted_date" type="date" defaultValue={permit.submitted_date || ""} className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Approved Date</label>
                  <input name="approved_date" type="date" defaultValue={permit.approved_date || ""} className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Expiry Date</label>
                  <input name="expiry_date" type="date" defaultValue={permit.expiry_date || ""} className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Inspector</label>
                  <input name="inspector" defaultValue={permit.inspector || ""} className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Fee Amount ($)</label>
                  <input name="fee_amount" type="number" step="0.01" defaultValue={permit.fee_amount || ""} className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Notes</label>
                <textarea name="notes" rows={3} defaultValue={permit.notes || ""} className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange resize-none" />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-orange hover:bg-orange-dark text-black font-semibold px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          ) : (
            <>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold">{permit.permit_number}</h1>
                  <p className="text-muted mt-1">{permit.permit_type}</p>
                </div>
                <StatusBadge status={permit.status} />
              </div>

              <dl className="space-y-0">
                {[
                  { label: "Project Name", value: permit.project_name },
                  { label: "Project Address", value: permit.project_address },
                  { label: "Submitted", value: permit.submitted_date || "—" },
                  { label: "Approved", value: permit.approved_date || "—" },
                  { label: "Expires", value: permit.expiry_date || "—" },
                  { label: "Inspector", value: permit.inspector || "—" },
                  { label: "Fee", value: permit.fee_amount ? `$${Number(permit.fee_amount).toFixed(2)}` : "—" },
                  { label: "Notes", value: permit.notes || "—" },
                ].map((row) => (
                  <div key={row.label} className="py-3 border-b border-card-border last:border-0">
                    <dt className="text-sm text-muted mb-0.5">{row.label}</dt>
                    <dd className="text-sm font-medium">{row.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setEditing(true)}
                  className="bg-orange hover:bg-orange-dark text-black font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
                >
                  Edit Permit
                </button>
                <button
                  onClick={handleDelete}
                  className="border border-danger/30 text-danger hover:bg-danger/10 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>

        {/* Inspections Section */}
        <div className="bg-card-bg border border-card-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Inspections</h2>
            <button
              onClick={() => setShowInspectionForm(!showInspectionForm)}
              className="text-sm text-orange hover:text-orange-light transition-colors"
            >
              {showInspectionForm ? "Cancel" : "+ Add Inspection"}
            </button>
          </div>

          {showInspectionForm && (
            <form action={handleAddInspection} className="bg-background border border-card-border rounded-lg p-4 mb-4 space-y-4">
              <input type="hidden" name="permit_id" value={permit.id} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Type *</label>
                  <select name="inspection_type" required className="w-full bg-card-bg border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange">
                    <option value="">Select...</option>
                    {INSPECTION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Scheduled Date</label>
                  <input name="scheduled_date" type="date" className="w-full bg-card-bg border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Result</label>
                  <select name="result" className="w-full bg-card-bg border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange">
                    <option value="">Pending</option>
                    <option value="pass">Pass</option>
                    <option value="fail">Fail</option>
                    <option value="partial">Partial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Notes</label>
                  <input name="inspector_notes" type="text" placeholder="Inspector notes..." className="w-full bg-card-bg border border-card-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange" />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-orange hover:bg-orange-dark text-black font-semibold text-sm px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                Add Inspection
              </button>
            </form>
          )}

          {inspections.length === 0 ? (
            <p className="text-sm text-muted py-4">No inspections recorded yet.</p>
          ) : (
            <div className="divide-y divide-card-border">
              {inspections.map((insp) => (
                <div key={insp.id} className="py-3 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{insp.inspection_type}</span>
                      <ResultBadge result={insp.result} />
                    </div>
                    <div className="text-xs text-muted">
                      {insp.scheduled_date || "No date set"}
                      {insp.inspector_notes && ` — ${insp.inspector_notes}`}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteInspection(insp.id)}
                    className="text-xs text-muted hover:text-danger transition-colors shrink-0"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
