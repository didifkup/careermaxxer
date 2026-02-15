import Link from "next/link";
import { cn } from "@/lib/utils";

const legalPageBg = {
  backgroundImage: `radial-gradient(ellipse at top, rgba(37,99,235,0.14), transparent 60%), linear-gradient(rgba(37,99,235,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.035) 1px, transparent 1px)`,
  backgroundSize: "100% 100%, 44px 44px, 44px 44px",
};

export function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("min-h-screen px-4 py-12 md:py-16")}
      style={legalPageBg}
    >
      <div className="mx-auto max-w-[900px]">
        <nav className="mb-6 text-sm text-slate-500">
          <Link
            href="/"
            className="text-blue-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 rounded"
          >
            Home
          </Link>
        </nav>
        <div
          className={cn(
            "rounded-3xl border border-blue-100/70 bg-white/75 p-8 shadow-[0_20px_60px_rgba(37,99,235,0.10)] backdrop-blur-xl md:p-10"
          )}
        >
          <h1 className="font-display text-3xl font-semibold text-slate-800 md:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Last Updated: {lastUpdated}
          </p>
          <div className="legal-prose mt-8 space-y-6 text-slate-700">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
