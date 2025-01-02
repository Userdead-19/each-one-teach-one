import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { ChatContent } from "@/components/communications/chat-content";

export default function ChatPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />
      <main className="flex-1">
        <ChatContent chatId={params.id} />
      </main>
    </div>
  );
}
