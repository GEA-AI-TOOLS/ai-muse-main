import { redirect } from "next/navigation";
import { getParticipant, N8nError } from "@/lib/n8n";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  try {
    await getParticipant();
    redirect("/progress");
  } catch (err) {
    if (!(err instanceof N8nError)) {
      throw err;
    }
  }

  return <LoginForm />;
}

export const dynamic = "force-dynamic";