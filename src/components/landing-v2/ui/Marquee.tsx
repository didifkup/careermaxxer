"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Marquee({
  children,
  className,
  speed = 40,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  if (reduced) {
    return (
      <div
        className={cn("flex overflow-x-auto gap-4 py-2 scrollbar-hide", className)}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn("overflow-hidden", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={scrollerRef}
        className="flex w-max gap-4 py-2"
        style={{
          animation: paused ? "none" : `marquee-landing ${speed}s linear infinite`,
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
