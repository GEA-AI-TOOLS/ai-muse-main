export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";

// TEMPORARY REDIRECT
// Remove or comment this redirect when enrollment is ready.
export default function EnrollPage() {
  redirect("/under-construction");
}

/*
=====================================================
ORIGINAL ENROLLMENT PAGE

Uncomment this code when enrollment is ready.
Also comment out or delete the temporary EnrollPage above.
=====================================================

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { EnrollForm } from "./enroll-form";

export default async function EnrollPage() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("auth");

  if (auth?.value) {
    redirect("/progress");
  }

  return <EnrollForm />;
}
*/