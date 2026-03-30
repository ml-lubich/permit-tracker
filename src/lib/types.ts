export interface Permit {
  id: string;
  user_id: string;
  permit_number: string;
  permit_type: string;
  jurisdiction: string;
  project_address: string;
  issue_date: string;
  expiration_date: string;
  notes: string;
  status: "active" | "expiring_soon" | "expired";
  created_at: string;
  updated_at: string;
}

export type PermitInsert = Omit<Permit, "id" | "user_id" | "status" | "created_at" | "updated_at">;

export interface Notification {
  id: string;
  permit_id: string;
  type: "expiring_soon" | "expired" | "renewal_reminder";
  message: string;
  read: boolean;
  created_at: string;
  permit?: Permit;
}

export const PERMIT_TYPES = [
  "Building Permit",
  "Electrical Permit",
  "Plumbing Permit",
  "Mechanical Permit",
  "Demolition Permit",
  "Grading Permit",
  "Roofing Permit",
  "Fire Alarm Permit",
  "Sign Permit",
  "Fence Permit",
  "Other",
] as const;
