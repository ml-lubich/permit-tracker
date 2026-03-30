import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { Permit, Inspection } from "@/lib/types";
import { PermitDetailClient } from "./permit-detail-client";

export default async function PermitDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: permit } = await supabase
    .from("permits")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!permit) notFound();

  const { data: inspections } = await supabase
    .from("inspections")
    .select("*")
    .eq("permit_id", id)
    .order("scheduled_date", { ascending: true });

  return (
    <PermitDetailClient
      permit={permit as Permit}
      inspections={(inspections as Inspection[]) || []}
    />
  );
}
