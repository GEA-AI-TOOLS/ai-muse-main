export default function EnrollCancelledPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm text-center">
        <h1 className="mb-2 text-xl font-medium">Payment cancelled</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          No charge was made. You can try again whenever you're ready.
        </p>
        <a
          href="/enroll"
          className="inline-block rounded-md bg-[#E24B4A] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#c73f3e]"
        >
          Try again
        </a>
      </div>
    </div>
  );
}