"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

const currentYear = new Date().getFullYear();

const columns = [
  {
    header: "Platform",
    links: [
      { label: "Labs", href: "/worlds" },
      { label: "Arena", href: "/arena" },
      { label: "Storyteller", href: "/storyteller" },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    header: "Network",
    links: [
      { label: "Leaderboard", href: "/leaderboard" },
      { label: "Campus Ambassadors", href: "/ambassadors" },
      { label: "Success Stories", href: "/stories" },
      { label: "Community", href: "/community" },
    ],
  },
  {
    header: "Lab",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    header: "Docs",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Blog", href: "/blog" },
      { label: "Help Center", href: "/help" },
      { label: "Updates", href: "/updates" },
    ],
  },
  {
    header: "Policy",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Acceptable Use", href: "/acceptable-use" },
    ],
  },
] as const;

export function LandingFooter() {
  return (
    <footer
      className="mt-16 w-full"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={cn(
            "rounded-3xl border border-blue-100/70 bg-white/75 shadow-[0_20px_60px_rgba(37,99,235,0.10)] backdrop-blur-xl",
            "overflow-hidden"
          )}
        >
          <div className="border-b border-slate-100/80 px-6 py-8 sm:px-8 lg:px-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {columns.map((col) => (
                <div key={col.header}>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {col.header}
                  </h3>
                  <ul className="mt-4 space-y-2.5" role="list">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-slate-700 transition hover:text-blue-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2 rounded"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-2 px-6 py-4 sm:flex-row sm:items-center sm:gap-4 sm:px-8 lg:px-10">
            <p className="text-xs text-slate-500">
              © {currentYear} CareerMaxxer
            </p>
            <p className="text-xs text-slate-400">
              Built for IB candidates
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
