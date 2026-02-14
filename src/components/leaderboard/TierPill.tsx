import { cn } from "@/lib/utils";

const TIER_STYLES: Record<string, string> = {
  Intern: "bg-slate-100 text-slate-700 border-slate-200",
  "Summer Analyst": "bg-blue-50 text-blue-800 border-blue-200",
  Analyst: "bg-blue-100 text-blue-800 border-blue-300",
  "Senior Analyst": "bg-blue-100 text-blue-900 border-blue-300",
  Associate: "bg-violet-100 text-violet-800 border-violet-300",
  VP: "bg-orange-100 text-orange-800 border-orange-300",
  Director: "bg-red-100 text-red-800 border-red-300",
  "Managing Director": "bg-amber-100 text-amber-900 border-amber-300",
  "Elite MD": "bg-amber-200 text-amber-900 border-amber-400",
};

export function TierPill({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  const style = TIER_STYLES[title] ?? "bg-slate-100 text-slate-600 border-slate-200";
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        style,
        className
      )}
    >
      {title}
    </span>
  );
}
