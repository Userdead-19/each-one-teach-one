import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { SettingsContent } from "@/components/settings/content";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />
      <main className="flex-1">
        <SettingsContent />
      </main>
    </div>
  );
}
