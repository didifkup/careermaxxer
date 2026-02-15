"use client";

import { cn } from "@/lib/utils";

export function GlassCard({
  children,
  className,
  as: Component = "div",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Component
      className={cn(
        "rounded-3xl border border-blue-100/70 bg-white/75 shadow-[0_20px_60px_rgba(37,99,235,0.10)] backdrop-blur-xl transition-all duration-200",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
