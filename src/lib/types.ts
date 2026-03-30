export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  company_name: string | null;
  phone: string | null;
}

export interface Permit {
  id: string;
  user_id: string;
  permit_number: string;
  project_name: string;
  project_address: string;
  permit_type: string;
  status: string;
  submitted_date: string | null;
  approved_date: string | null;
  expiry_date: string | null;
  inspector: string | null;
  notes: string | null;
  fee_amount: number | null;
  created_at: string;
  updated_at: string;
}

export interface Inspection {
  id: string;
  permit_id: string;
  inspection_type: string;
  scheduled_date: string | null;
  result: string | null;
  inspector_notes: string | null;
  created_at: string;
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

export const PERMIT_STATUSES = [
  "pending",
  "submitted",
  "in_review",
  "approved",
  "denied",
  "expired",
] as const;

export const INSPECTION_TYPES = [
  "Foundation",
  "Framing",
  "Electrical Rough-in",
  "Plumbing Rough-in",
  "Mechanical",
  "Insulation",
  "Drywall",
  "Final",
  "Other",
] as const;
