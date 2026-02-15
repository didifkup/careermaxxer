import { cn } from "@/lib/utils";

interface SchoolBadgeProps {
  name: string | null;
  logoUrl?: string | null;
  className?: string;
  size?: "sm" | "md";
}

export function SchoolBadge({
  name,
  logoUrl,
  className,
  size = "md",
}: SchoolBadgeProps) {
  const displayName = name?.trim() || "Unknown School";
  const sizeClass = size === "sm" ? "h-[18px] w-[18px] text-xs" : "h-5 w-5 text-sm";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-semibold text-slate-800",
        className
      )}
    >
      {logoUrl ? (
        <img
          src={logoUrl}
          alt=""
          className={cn("rounded-full object-cover", size === "sm" ? "h-[18px] w-[18px]" : "h-5 w-5")}
        />
      ) : (
        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700",
            size === "sm" ? "h-[18px] w-[18px] text-[10px]" : "h-5 w-5 text-xs"
          )}
          aria-hidden
        >
          {displayName.charAt(0).toUpperCase()}
        </span>
      )}
      <span className={size === "sm" ? "text-xs" : ""}>{displayName}</span>
    </span>
  );
}
