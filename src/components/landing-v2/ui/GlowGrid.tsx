"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function GlowGrid({ className }: { className?: string }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(37,99,235,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />
      <div
        className={cn(
          "absolute top-1/4 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08]",
          !reduced && "animate-blob-drift"
        )}
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.35) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
