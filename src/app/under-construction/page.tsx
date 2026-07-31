import Link from "next/link";

export default function UnderConstructionPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <section className="mx-auto max-w-xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-500">
          Coming Soon
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Enrollment is not open yet
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          We are finishing the enrollment experience. Please check back soon.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex rounded-md bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Return to home
          </Link>
        </div>
      </section>
    </main>
  );
}