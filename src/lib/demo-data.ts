import { Permit, Notification } from "./types";

const today = new Date();
const daysFromNow = (days: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
};
const daysAgo = (days: number) => daysFromNow(-days);

export function getPermitStatus(expirationDate: string): Permit["status"] {
  const exp = new Date(expirationDate);
  const now = new Date();
  const diffDays = Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return "expired";
  if (diffDays <= 30) return "expiring_soon";
  return "active";
}

export const demoPermits: Permit[] = [
  {
    id: "1",
    user_id: "demo",
    permit_number: "BP-2025-001234",
    permit_type: "Building Permit",
    jurisdiction: "City of Austin, TX",
    project_address: "1234 Oak Street, Austin, TX 78701",
    issue_date: daysAgo(180),
    expiration_date: daysFromNow(185),
    notes: "New commercial building - Phase 1. Inspector: J. Rodriguez",
    status: "active",
    created_at: daysAgo(180),
    updated_at: daysAgo(180),
  },
  {
    id: "2",
    user_id: "demo",
    permit_number: "EP-2025-005678",
    permit_type: "Electrical Permit",
    jurisdiction: "City of Austin, TX",
    project_address: "1234 Oak Street, Austin, TX 78701",
    issue_date: daysAgo(90),
    expiration_date: daysFromNow(14),
    notes: "Electrical rough-in for Phase 1. Linked to BP-2025-001234",
    status: "expiring_soon",
    created_at: daysAgo(90),
    updated_at: daysAgo(90),
  },
  {
    id: "3",
    user_id: "demo",
    permit_number: "PP-2025-003456",
    permit_type: "Plumbing Permit",
    jurisdiction: "Travis County, TX",
    project_address: "5678 Elm Ave, Pflugerville, TX 78660",
    issue_date: daysAgo(200),
    expiration_date: daysAgo(5),
    notes: "Residential plumbing for new home build. EXPIRED - needs renewal ASAP",
    status: "expired",
    created_at: daysAgo(200),
    updated_at: daysAgo(200),
  },
  {
    id: "4",
    user_id: "demo",
    permit_number: "MP-2025-007890",
    permit_type: "Mechanical Permit",
    jurisdiction: "City of Round Rock, TX",
    project_address: "910 Cedar Blvd, Round Rock, TX 78664",
    issue_date: daysAgo(60),
    expiration_date: daysFromNow(120),
    notes: "HVAC installation for office renovation",
    status: "active",
    created_at: daysAgo(60),
    updated_at: daysAgo(60),
  },
  {
    id: "5",
    user_id: "demo",
    permit_number: "RP-2025-002345",
    permit_type: "Roofing Permit",
    jurisdiction: "City of Austin, TX",
    project_address: "3344 Pine Road, Austin, TX 78745",
    issue_date: daysAgo(150),
    expiration_date: daysFromNow(25),
    notes: "Complete roof replacement - residential. Materials on-site.",
    status: "expiring_soon",
    created_at: daysAgo(150),
    updated_at: daysAgo(150),
  },
  {
    id: "6",
    user_id: "demo",
    permit_number: "DP-2025-008765",
    permit_type: "Demolition Permit",
    jurisdiction: "City of Georgetown, TX",
    project_address: "777 Walnut Dr, Georgetown, TX 78626",
    issue_date: daysAgo(300),
    expiration_date: daysAgo(20),
    notes: "Partial demolition of existing structure. EXPIRED.",
    status: "expired",
    created_at: daysAgo(300),
    updated_at: daysAgo(300),
  },
  {
    id: "7",
    user_id: "demo",
    permit_number: "GP-2025-004321",
    permit_type: "Grading Permit",
    jurisdiction: "Travis County, TX",
    project_address: "Lot 15, Sunrise Estates, Austin, TX 78732",
    issue_date: daysAgo(45),
    expiration_date: daysFromNow(320),
    notes: "Site grading for new subdivision lot",
    status: "active",
    created_at: daysAgo(45),
    updated_at: daysAgo(45),
  },
  {
    id: "8",
    user_id: "demo",
    permit_number: "FP-2025-009012",
    permit_type: "Fire Alarm Permit",
    jurisdiction: "City of Austin, TX",
    project_address: "1234 Oak Street, Austin, TX 78701",
    issue_date: daysAgo(30),
    expiration_date: daysFromNow(7),
    notes: "Fire alarm system install for commercial building Phase 1",
    status: "expiring_soon",
    created_at: daysAgo(30),
    updated_at: daysAgo(30),
  },
];

// Recompute statuses based on actual dates
demoPermits.forEach((p) => {
  p.status = getPermitStatus(p.expiration_date);
});

export const demoNotifications: Notification[] = [
  {
    id: "n1",
    permit_id: "8",
    type: "expiring_soon",
    message: "Fire Alarm Permit FP-2025-009012 expires in 7 days! Schedule inspection now.",
    read: false,
    created_at: new Date().toISOString(),
    permit: demoPermits.find((p) => p.id === "8"),
  },
  {
    id: "n2",
    permit_id: "2",
    type: "expiring_soon",
    message: "Electrical Permit EP-2025-005678 expires in 14 days. Contact jurisdiction for renewal.",
    read: false,
    created_at: daysAgo(1),
    permit: demoPermits.find((p) => p.id === "2"),
  },
  {
    id: "n3",
    permit_id: "5",
    type: "expiring_soon",
    message: "Roofing Permit RP-2025-002345 expires in 25 days. Plan for renewal if work continues.",
    read: false,
    created_at: daysAgo(2),
    permit: demoPermits.find((p) => p.id === "5"),
  },
  {
    id: "n4",
    permit_id: "3",
    type: "expired",
    message: "URGENT: Plumbing Permit PP-2025-003456 has EXPIRED. Cease related work and renew immediately.",
    read: false,
    created_at: daysAgo(5),
    permit: demoPermits.find((p) => p.id === "3"),
  },
  {
    id: "n5",
    permit_id: "6",
    type: "expired",
    message: "URGENT: Demolition Permit DP-2025-008765 has EXPIRED. Contact Georgetown permits office.",
    read: true,
    created_at: daysAgo(20),
    permit: demoPermits.find((p) => p.id === "6"),
  },
  {
    id: "n6",
    permit_id: "1",
    type: "renewal_reminder",
    message: "Reminder: Start renewal process for Building Permit BP-2025-001234 (6 months ahead).",
    read: true,
    created_at: daysAgo(10),
    permit: demoPermits.find((p) => p.id === "1"),
  },
];
