import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { CommunicationsContent } from "@/components/communications/content";

export default function CommunicationsPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />
      <main className="flex-1">
        <CommunicationsContent />
      </main>
    </div>
  );
}
