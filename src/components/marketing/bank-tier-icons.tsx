import * as React from "react";

// ---------------------------------------------------------------------------
// Tier style constants — explicit hex/rgba only (no CSS currentColor).
// Designed to render consistently in both light and dark modes.
// To add theme-based colors later: swap Tier1..Tier4 for a helper, e.g.
//   const getTier = (theme: "light" | "dark", level: 1|2|3|4) => TIER_THEMES[theme][level];
// and pass the result into BankTierIcon as the tier prop.
// ---------------------------------------------------------------------------
export const Tier1 = {
  bg: "#0B1220",
  text: "#E5E7EB",
  stroke: "rgba(255,255,255,0.20)",
} as const;

export const Tier2 = {
  bg: "#120E1B",
  text: "#F5F3FF",
  stroke: "rgba(255,255,255,0.25)",
} as const;

export const Tier3 = {
  bg: "#0F1A17",
  text: "#ECFDF5",
  stroke: "rgba(255,255,255,0.20)",
} as const;

export const Tier4 = {
  bg: "#1A1410",
  text: "#FAFAF9",
  stroke: "rgba(255,255,255,0.15)",
} as const;

export type TierStyle = typeof Tier1 | typeof Tier2 | typeof Tier3 | typeof Tier4;

interface BankTierIconProps {
  label: string;
  tier: TierStyle;
}

function BankTierIcon({ label, tier }: BankTierIconProps) {
  const gradientId = React.useId().replace(/:/g, "-");
  const filterId = React.useId().replace(/:/g, "-");
  const glowFilterId = React.useId().replace(/:/g, "-");
  const fontSize = label.length <= 2 ? 16 : label.length <= 3 ? 12 : 10;
  const isTier1 = tier === Tier1;
  return (
    <>
      <defs>
        <linearGradient
          id={gradientId}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="white" stopOpacity="0.15" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="black" floodOpacity="0.1" />
        </filter>
        {isTier1 && (
          <filter id={glowFilterId} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#c8d0e0" floodOpacity="0.18" />
          </filter>
        )}
      </defs>
      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        rx="18"
        fill={tier.bg}
        filter={isTier1 ? `url(#${filterId}) url(#${glowFilterId})` : `url(#${filterId})`}
      />
      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        rx="18"
        fill={`url(#${gradientId})`}
      />
      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        rx="18"
        fill="none"
        stroke={tier.stroke}
        strokeWidth="1.5"
      />
      <rect
        x="4"
        y="4"
        width="56"
        height="56"
        rx="16"
        fill="none"
        stroke="white"
        strokeOpacity="0.06"
        strokeWidth="1"
      />
      <text
        x="32"
        y="38"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={tier.text}
        fontWeight="bold"
        fontSize={fontSize}
      >
        {label}
      </text>
    </>
  );
}

// All icons: React.FC<React.SVGProps<SVGSVGElement>>, forward className etc., no width/height
export const IconGoldman: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <BankTierIcon label="GS" tier={Tier1} />
  </svg>
);

export const IconJPM: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <BankTierIcon label="JPM" tier={Tier1} />
  </svg>
);

export const IconMorganStanley: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <BankTierIcon label="MS" tier={Tier1} />
  </svg>
);

export const IconBofA: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <BankTierIcon label="BofA" tier={Tier1} />
  </svg>
);

export const IconEvercore: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <BankTierIcon label="EVR" tier={Tier2} />
  </svg>
);

export const IconLazard: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <BankTierIcon label="LAZ" tier={Tier2} />
  </svg>
);

export const IconMoelis: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <BankTierIcon label="MC" tier={Tier2} />
  </svg>
);

export const IconPJT: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <BankTierIcon label="PJT" tier={Tier2} />
  </svg>
);

export const IconCiti: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <BankTierIcon label="CITI" tier={Tier3} />
  </svg>
);

export const IconBarclays: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <BankTierIcon label="BAR" tier={Tier3} />
  </svg>
);

export const IconUBS: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <BankTierIcon label="UBS" tier={Tier3} />
  </svg>
);

export const IconDeutsche: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <BankTierIcon label="DB" tier={Tier3} />
  </svg>
);

export const IconRBC: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <BankTierIcon label="RBC" tier={Tier4} />
  </svg>
);

export const IconWells: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <BankTierIcon label="WFC" tier={Tier4} />
  </svg>
);

export const IconHoulihan: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <BankTierIcon label="HL" tier={Tier4} />
  </svg>
);

export const IconJefferies: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <BankTierIcon label="JEF" tier={Tier4} />
  </svg>
);
