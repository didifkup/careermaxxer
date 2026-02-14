import { StorytellerClient } from "@/components/storyteller/StorytellerClient";

export const dynamic = "force-dynamic";

const storytellerPageBg = {
  backgroundImage: `radial-gradient(ellipse at top, rgba(37,99,235,0.14), transparent 60%), linear-gradient(rgba(37,99,235,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.035) 1px, transparent 1px)`,
  backgroundSize: "100% 100%, 44px 44px, 44px 44px",
};

export default function StorytellerPage() {
  return (
    <div
      className="min-h-screen"
      style={storytellerPageBg}
    >
      <StorytellerClient />
    </div>
  );
}
