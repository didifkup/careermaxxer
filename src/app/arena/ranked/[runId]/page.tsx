import { RunView } from "./RunView";

interface PageProps {
  params: Promise<{ runId: string }>;
}

export default async function ArenaRankedPage({ params }: PageProps) {
  const { runId } = await params;
  return <RunView runId={runId} />;
}
