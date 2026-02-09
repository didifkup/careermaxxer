import * as React from "react";

// Shared Monogram helper: rounded square bg + stroke + bold centered letters
function Monogram({ letters }: { letters: string }) {
  return (
    <>
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="8"
        fill="currentColor"
        fillOpacity="0.15"
      />
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="8"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="1.5"
      />
      <text
        x="24"
        y="28"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="currentColor"
        fontWeight="bold"
        fontSize={letters.length <= 2 ? 12 : letters.length <= 3 ? 10 : 8}
      >
        {letters}
      </text>
    </>
  );
}

// All icons match React.FC<React.SVGProps<SVGSVGElement>> for hero API compatibility
export const IconGoldman: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Monogram letters="GS" />
  </svg>
);

export const IconJPM: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Monogram letters="JPM" />
  </svg>
);

export const IconMorganStanley: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Monogram letters="MS" />
  </svg>
);

export const IconBofA: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Monogram letters="BofA" />
  </svg>
);

export const IconCiti: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Monogram letters="CITI" />
  </svg>
);

export const IconBarclays: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Monogram letters="BAR" />
  </svg>
);

export const IconUBS: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Monogram letters="UBS" />
  </svg>
);

export const IconDeutsche: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Monogram letters="DB" />
  </svg>
);

export const IconEvercore: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Monogram letters="EVR" />
  </svg>
);

export const IconLazard: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Monogram letters="LAZ" />
  </svg>
);

export const IconMoelis: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Monogram letters="MC" />
  </svg>
);

export const IconJefferies: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Monogram letters="JEF" />
  </svg>
);

export const IconRBC: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Monogram letters="RBC" />
  </svg>
);

export const IconWells: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Monogram letters="WFC" />
  </svg>
);

export const IconHoulihan: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Monogram letters="HL" />
  </svg>
);

export const IconPJT: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Monogram letters="PJT" />
  </svg>
);
