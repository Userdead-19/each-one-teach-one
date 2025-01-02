import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { ChatbotContent } from "@/components/chatbot/content";

export default function ChatbotPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />
      <main className="flex-1">
        <ChatbotContent />
      </main>
    </div>
  );
}
