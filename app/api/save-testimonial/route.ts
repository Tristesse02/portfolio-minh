import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { email, name, role, company, message } = await req.json();

  if (!email || !name || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { error } = await supabase.from("testimonials").upsert({
    email: email,
    name: name,
    role: role,
    company: company,
    message: message,
  });

  if (error) {
    console.error("Insert error:", error.message);
    return NextResponse.json(
      { error: "Failed to save testimonial" },
      { status: 500 }
    );
  }

  // ✅ Optional: mark invite as used
  //   await supabase
  //     .from("testimonial_invites")
  //     .update({ status: "used" })
  //     .eq("email", email);

  return NextResponse.json({ success: true });
}
