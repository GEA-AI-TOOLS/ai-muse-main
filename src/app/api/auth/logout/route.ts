import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const authToken = req.cookies.get("auth")?.value;

  if (authToken) {
    await supabase
      .from("sessions")
      .delete()
      .eq("session_token", authToken);
  }

  const res = NextResponse.json({ ok: true });

  res.cookies.set("auth", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  res.cookies.set("session_data", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  return res;
}