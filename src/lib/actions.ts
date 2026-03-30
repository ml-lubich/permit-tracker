"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ── Auth ──

export async function signUp(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("full_name") as string;
  const companyName = formData.get("company_name") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, company_name: companyName },
    },
  });

  if (error) {
    return { error: error.message };
  }

  // Update profile
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    await supabase
      .from("profiles")
      .upsert({ id: user.id, email, full_name: fullName, company_name: companyName });
  }

  redirect("/dashboard");
}

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

// ── Permits ──

export async function createPermit(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase.from("permits").insert({
    user_id: user.id,
    permit_number: formData.get("permit_number") as string,
    project_name: formData.get("project_name") as string,
    project_address: formData.get("project_address") as string,
    permit_type: formData.get("permit_type") as string,
    status: formData.get("status") as string || "pending",
    submitted_date: (formData.get("submitted_date") as string) || null,
    approved_date: (formData.get("approved_date") as string) || null,
    expiry_date: (formData.get("expiry_date") as string) || null,
    inspector: (formData.get("inspector") as string) || null,
    notes: (formData.get("notes") as string) || null,
    fee_amount: formData.get("fee_amount") ? Number(formData.get("fee_amount")) : null,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function updatePermit(id: string, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase
    .from("permits")
    .update({
      permit_number: formData.get("permit_number") as string,
      project_name: formData.get("project_name") as string,
      project_address: formData.get("project_address") as string,
      permit_type: formData.get("permit_type") as string,
      status: formData.get("status") as string,
      submitted_date: (formData.get("submitted_date") as string) || null,
      approved_date: (formData.get("approved_date") as string) || null,
      expiry_date: (formData.get("expiry_date") as string) || null,
      inspector: (formData.get("inspector") as string) || null,
      notes: (formData.get("notes") as string) || null,
      fee_amount: formData.get("fee_amount") ? Number(formData.get("fee_amount")) : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/permits/${id}`);
  revalidatePath("/dashboard");
  redirect(`/permits/${id}`);
}

export async function deletePermit(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  await supabase.from("permits").delete().eq("id", id).eq("user_id", user.id);

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

// ── Inspections ──

export async function createInspection(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const permitId = formData.get("permit_id") as string;

  const { error } = await supabase.from("inspections").insert({
    permit_id: permitId,
    inspection_type: formData.get("inspection_type") as string,
    scheduled_date: (formData.get("scheduled_date") as string) || null,
    result: (formData.get("result") as string) || null,
    inspector_notes: (formData.get("inspector_notes") as string) || null,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/permits/${permitId}`);
  redirect(`/permits/${permitId}`);
}

export async function deleteInspection(id: string, permitId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  await supabase.from("inspections").delete().eq("id", id);

  revalidatePath(`/permits/${permitId}`);
  redirect(`/permits/${permitId}`);
}
