import { PageContainer } from "@/components/ui/page-container";
import { MockInterviewShell } from "@/components/mock-interview/MockInterviewShell";

export const dynamic = "force-dynamic";

export default function MockInterviewPage() {
  return (
    <PageContainer maxWidth="900px">
      <MockInterviewShell />
    </PageContainer>
  );
}
