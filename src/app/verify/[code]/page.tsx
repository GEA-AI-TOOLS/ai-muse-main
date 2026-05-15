import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ code: string }>;
}

async function getCertificate(code: string) {
  const { data: cert } = await supabase
    .from("certificates")
    .select("id, type, issued_at, verification_code, cohort_id, participant_id")
    .eq("verification_code", code)
    .maybeSingle();

  if (!cert) return null;

  const { data: participant } = await supabase
    .from("participants")
    .select("name")
    .eq("id", cert.participant_id)
    .single();

  return {
    ...cert,
    participantName: participant?.name ?? "Unknown",
  };
}

function formatCohortDate(cohortId: string): string {
  const parts = cohortId.replace("cohort_", "").split("_");
  if (parts.length !== 3) return cohortId;
  const date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default async function VerifyPage({ params }: Props) {
  const { code } = await params;
  const cert = await getCertificate(code);

  if (!cert) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
          </div>
          <h1 className="text-xl font-medium mb-2">Certificate not found</h1>
          <p className="text-sm text-muted-foreground">
            The verification code <span className="font-mono text-foreground">{code}</span> does not match any certificate in our records.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Check the code and try again, or contact{" "}
            <a href="mailto:support.muse@bryancassady.com" className="underline">support</a>.
          </p>
        </div>
      </div>
    );
  }

  const isMastery = cert.type === "mastery";
  const certLabel = isMastery ? "Certificate of Mastery" : "Certificate of Completion";
  const certDescription = isMastery
    ? "Awarded for completing the capstone project and building a custom AI tool."
    : "Awarded for completing all 10 days of the course.";

  const issuedDate = new Date(cert.issued_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const cohortDate = formatCohortDate(cert.cohort_id);

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* Header */}
      <header className="border-b">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <img src="/android-chrome-192x192.png" alt="AI Muse" className="h-7 w-7 rounded object-contain" />
            <span className="text-base font-medium">Make AI Your Muse</span>
          </div>
          <span className="text-xs text-muted-foreground">Certificate verification</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">

          {/* Verified badge */}
          <div className="mb-8 flex justify-center">
            <div className={
              "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium " +
              (isMastery
                ? "bg-[#FCEBEB] text-[#A32D2D]"
                : "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-300")
            }>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Verified certificate
            </div>
          </div>

          {/* Certificate card */}
          <div className={
            "rounded-lg border-2 p-8 text-center " +
            (isMastery ? "border-[#E24B4A]" : "border-border")
          }>

            {/* Icon */}
            <div className="mb-5 flex justify-center">
              {isMastery ? (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E24B4A]">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                  </svg>
                </div>
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FCEBEB]">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E24B4A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </div>

            {/* Course name */}
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2">
              Make AI Your Muse in 10 Days
            </p>

            {/* Cert type */}
            <h1 className="text-2xl font-semibold mb-1">{certLabel}</h1>
            <p className="text-sm text-muted-foreground mb-6">{certDescription}</p>

            {/* Recipient */}
            <div className="border-t border-b py-5 mb-6">
              <p className="text-xs text-muted-foreground mb-1">Awarded to</p>
              <p className="text-xl font-medium">{cert.participantName}</p>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-4 text-left mb-6">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground mb-0.5">
                  Cohort
                </p>
                <p className="text-sm">{cohortDate}</p>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground mb-0.5">
                  Issued
                </p>
                <p className="text-sm">{issuedDate}</p>
              </div>
              <div className="col-span-2">
                <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground mb-0.5">
                  Verification code
                </p>
                <p className="font-mono text-sm">{cert.verification_code}</p>
              </div>
            </div>

            {/* Issuer */}
            <div className="border-t pt-5">
              <p className="text-xs text-muted-foreground">
                Issued by{" "}
                <span className="font-medium text-foreground">Bryan Cassady</span>
                {" · "}
                <a
                  href="https://bryancassady.com"
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-foreground"
                >
                  bryancassady.com
                </a>
              </p>
            </div>
          </div>

          {/* Verification note */}
          <p className="mt-6 text-center text-xs text-muted-foreground">
            This certificate was verified against our records on{" "}
            {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.
            The verification code <span className="font-mono">{cert.verification_code}</span> is permanently linked to this record.
          </p>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex max-w-3xl items-center justify-center px-6 py-4">
          <p className="text-xs text-muted-foreground">
            Questions?{" "}
            <a href="mailto:support.muse@bryancassady.com" className="underline hover:text-foreground">
              Contact support
            </a>
          </p>
        </div>
      </footer>

    </div>
  );
}