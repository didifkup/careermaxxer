/** Icon type for NeuralChip */
export type ChipIcon = "dot" | "stack" | "wave" | "bolt";

/** Node for flow and split diagrams */
export type NodeDef = {
  id: string;
  title: string;
  subtitle?: string;
  tone?: "neutral" | "accent" | "good" | "warn";
  icon?: ChipIcon;
  badge?: string;
};

/** Edge between nodes (dashed for loop-back) */
export type EdgeDef = {
  from: string;
  to: string;
  label?: string;
  variant?: "solid" | "dashed";
};

/** Token for equation bar */
export type TokenDef = {
  text: string;
  tone?: "neutral" | "accent" | "good" | "warn";
};

export type JourneyDiagram =
  | {
      kind: "flowCanvas";
      nodes: NodeDef[];
      edges?: EdgeDef[];
      highlights?: string[];
      layout?: "stack" | "wide";
    }
  | {
      kind: "equationBar";
      tokens: TokenDef[];
      operators: string[];
    }
  | {
      kind: "splitSignal";
      left: NodeDef;
      branches: NodeDef[];
      bottom?: NodeDef;
      highlights?: string[];
    };
