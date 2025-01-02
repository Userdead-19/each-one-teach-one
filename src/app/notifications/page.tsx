import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { NotificationsContent } from "@/components/notifications/content";

export default function NotificationsPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />
      <main className="flex-1">
        <NotificationsContent />
      </main>
    </div>
  );
}
