import * as React from "react";

interface AbbrevIconProps extends React.SVGProps<SVGSVGElement> {
  label: string;
  color: string;
}

function AbbrevIcon({ label, color, ...props }: AbbrevIconProps) {
  const glowId = React.useId().replace(/:/g, "-");
  const fontSize = label.length <= 2 ? 36 : label.length <= 3 ? 34 : 30;
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="1.2"
            floodColor={color}
            floodOpacity="0.35"
          />
        </filter>
      </defs>
      <text
        x="50%"
        y="54%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={color}
        fontWeight="900"
        fontSize={fontSize}
        style={{ letterSpacing: "-0.8px" }}
        filter={`url(#${glowId})`}
      >
        {label}
      </text>
    </svg>
  );
}

export const IconGoldman: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <AbbrevIcon label="GS" color="#7399C6" {...props} />
);

export const IconJPM: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <AbbrevIcon label="JPM" color="#117ACA" {...props} />
);

export const IconMorganStanley: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <AbbrevIcon label="MS" color="#187ABA" {...props} />
);

export const IconBofA: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <AbbrevIcon label="BofA" color="#E31837" {...props} />
);

export const IconCiti: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <AbbrevIcon label="CITI" color="#003B70" {...props} />
);

export const IconBarclays: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <AbbrevIcon label="BAR" color="#00AEEF" {...props} />
);

export const IconUBS: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <AbbrevIcon label="UBS" color="#E60000" {...props} />
);

export const IconDeutsche: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <AbbrevIcon label="DB" color="#0018A8" {...props} />
);

export const IconEvercore: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <AbbrevIcon label="EVR" color="#264D82" {...props} />
);

export const IconLazard: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <AbbrevIcon label="LAZ" color="#23283C" {...props} />
);

export const IconMoelis: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <AbbrevIcon label="MC" color="#32373C" {...props} />
);

export const IconJefferies: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <AbbrevIcon label="JEF" color="#0067C6" {...props} />
);

export const IconRBC: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <AbbrevIcon label="RBC" color="#005DAA" {...props} />
);

export const IconWells: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <AbbrevIcon label="WFC" color="#CD1409" {...props} />
);

export const IconHoulihan: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <AbbrevIcon label="HL" color="#3874B1" {...props} />
);

export const IconPJT: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <AbbrevIcon label="PJT" color="#111111" {...props} />
);
