import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { ResourceSharingContent } from "@/components/resource-sharing/content";

export default function ResourceSharingPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />
      <main className="flex-1">
        <ResourceSharingContent />
      </main>
    </div>
  );
}
