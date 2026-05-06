export default function EnrollSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FCEBEB]">
            <span className="text-2xl">✓</span>
          </div>
        </div>
        <h1 className="mb-2 text-xl font-medium">You're enrolled</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Check your email for your welcome message. Your course starts on the next Monday cohort.
        </p>
        <a
          href="/login"
          className="inline-block rounded-md bg-[#E24B4A] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#c73f3e]"
        >
          Log in to your course
        </a>
      </div>
    </div>
  );
}