export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <img
          src="/android-chrome-192x192.png"
          alt="AI Muse"
          className="h-10 w-10 rounded object-contain mx-auto mb-6"
        />
        <h1 className="text-xl font-medium mb-2">This page doesn't exist</h1>
        <p className="text-sm text-muted-foreground mb-6">
          The link may be broken or the page may have been removed.
        </p>
        <a href="/progress" className="text-sm text-[#E24B4A] hover:underline">
          Go to your dashboard →
        </a>
      </div>
    </div>
  );
}