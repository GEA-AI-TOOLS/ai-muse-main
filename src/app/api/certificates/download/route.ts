import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { validateSessionToken } from "@/lib/cookies";
import { renderToBuffer } from "@react-pdf/renderer";
import { CertificatePDF } from "@/components/certificate-pdf";
import { Document } from "@react-pdf/renderer";
import { createElement } from "react";

export async function GET(req: NextRequest) {
  const authToken = req.cookies.get("auth")?.value;
  if (!authToken) {
    return new NextResponse("Unauthorised", { status: 401 });
  }

  const participantId = await validateSessionToken(authToken);
  if (!participantId) {
    return new NextResponse("Unauthorised", { status: 401 });
  }

  const { searchParams } = req.nextUrl;
  const certId = searchParams.get("id");

  if (!certId) {
    return new NextResponse("Missing cert id", { status: 400 });
  }

  // Fetch cert — must belong to this participant
  const { data: cert } = await supabase
    .from("certificates")
    .select("id, type, issued_at, verification_code, cohort_id, participant_id")
    .eq("id", certId)
    .eq("participant_id", participantId)
    .maybeSingle();

  if (!cert) {
    return new NextResponse("Certificate not found", { status: 404 });
  }

  // Fetch participant name
  const { data: participant } = await supabase
    .from("participants")
    .select("name")
    .eq("id", cert.participant_id)
    .single();

  // Format cohort date
  const parts = cert.cohort_id.replace("cohort_", "").split("_");
  const cohortDate = parts.length === 3
    ? new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]))
        .toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : cert.cohort_id;

  const issuedDate = new Date(cert.issued_at).toLocaleDateString("en-US", {
    day: "numeric", month: "long", year: "numeric",
  });

    const certElement = CertificatePDF({
        kind: cert.type as "completion" | "mastery",
        recipientName: participant?.name ?? "Participant",
        cohortDate,
        issuedDate,
        verificationCode: cert.verification_code,
    });

    const buffer = await renderToBuffer(certElement);

  const filename = "certificate-" + cert.type + "-" + cert.verification_code + ".pdf";

  return new NextResponse(buffer as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="' + filename + '"',
    },
  });
}