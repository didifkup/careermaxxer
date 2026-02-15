"use client";

import { cn } from "@/lib/utils";

const labsPageBg = {
  backgroundImage: `radial-gradient(ellipse at top, rgba(37,99,235,0.14), transparent 60%), linear-gradient(rgba(37,99,235,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.035) 1px, transparent 1px)`,
  backgroundSize: "100% 100%, 44px 44px, 44px 44px",
};

export function PageContainer({
  children,
  className,
  maxWidth = "900px",
}: {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "900px" | "2xl" | "4xl" | "5xl";
}) {
  const maxWClass =
    maxWidth === "900px"
      ? "max-w-[900px]"
      : maxWidth === "2xl"
        ? "max-w-2xl"
        : maxWidth === "4xl"
          ? "max-w-4xl"
          : "max-w-5xl";

  return (
    <div
      className={cn("min-h-screen px-4 py-12 md:py-16")}
      style={labsPageBg}
    >
      <div className={cn("mx-auto", maxWClass, className)}>{children}</div>
    </div>
  );
}
