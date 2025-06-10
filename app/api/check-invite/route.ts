import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ authorized: false }, { status: 400 });
  }

  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("testimonial_invites")
    .select("*")
    .eq("email", email)
    .eq("status", "pending")
    .gte("expires_at", now)
    .limit(1)
    .single();

  if (!data || error) {
    return NextResponse.json({ authorized: false }, { status: 403 });
  }

  return NextResponse.json({
    authorized: true,
    email: data.email,
    expiresAt: data.expires_at,
  });
}
