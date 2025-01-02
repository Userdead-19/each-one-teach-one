import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { GradeTrackerContent } from "@/components/grade-tracker/content";

export default function GradeTrackerPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />
      <main className="flex-1">
        <GradeTrackerContent />
      </main>
    </div>
  );
}
