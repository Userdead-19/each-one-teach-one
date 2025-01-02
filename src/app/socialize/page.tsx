import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { SocializeContent } from "@/components/socialize/content";

export default function SocializePage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />
      <main className="flex-1">
        <SocializeContent />
      </main>
    </div>
  );
}
