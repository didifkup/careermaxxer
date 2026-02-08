import Link from "next/link";

export default function WorldNotFound() {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border-2 border-black/10 bg-surface-base p-8 text-center">
      <h1 className="font-display text-xl font-bold text-text-primary">
        World not found
      </h1>
      <p className="mt-2 text-text-secondary">
        This world doesn&apos;t exist or has been removed.
      </p>
      <Link
        href="/worlds"
        className="mt-4 inline-block rounded-xl bg-brand-primary px-4 py-2 font-semibold text-text-inverse transition hover:opacity-90"
      >
        Back to Worlds
      </Link>
    </div>
  );
}
