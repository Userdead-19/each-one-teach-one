import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { ChatContent } from "@/components/communications/chat-content";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />
      <main className="flex-1">
        <ChatContent chatId={id} />
      </main>
    </div>
  );
}
