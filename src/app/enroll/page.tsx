export const dynamic = 'force-dynamic';

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