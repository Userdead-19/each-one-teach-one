import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { TaskManagementContent } from "@/components/task-management/content";

export default function TaskManagementPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />
      <main className="flex-1">
        <TaskManagementContent />
      </main>
    </div>
  );
}
