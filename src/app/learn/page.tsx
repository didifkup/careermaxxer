import type { Metadata } from "next";
import { LearnLandingClient } from "./LearnLandingClient";

export const metadata: Metadata = {
  title: "Reading | CareerMaxxer",
  description:
    "Career, culture, recruiting, and news — distilled into fast, high-signal guides. Part of the CareerMaxxer AI Lab.",
  openGraph: {
    title: "Reading | CareerMaxxer",
    description:
      "Career, culture, recruiting, and news — distilled into fast, high-signal guides. Part of the CareerMaxxer AI Lab.",
  },
  alternates: { canonical: "https://careermaxxer.com/learn" },
};

export default function LearnPage() {
  return <LearnLandingClient />;
}
