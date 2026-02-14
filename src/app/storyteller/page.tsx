import { StorytellerClient } from "@/components/storyteller/StorytellerClient";

export const dynamic = "force-dynamic";

export default function StorytellerPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold text-brand-primary">
          Storyteller
        </h1>
        <p className="mt-1 text-text-secondary">
          Tell me what you&apos;re into. Then tell me what finance thing is confusing you.
        </p>
      </header>
      <StorytellerClient />
    </div>
  );
}
