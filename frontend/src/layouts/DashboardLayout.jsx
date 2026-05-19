import { LayoutDashboard } from "lucide-react";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* SIDEBAR */}

      <div className="w-72 bg-slate-900 text-white p-8">
        <h1 className="text-3xl font-bold mb-10">Applantics</h1>

        <div className="space-y-4">
          <div className="flex gap-3 items-center bg-slate-800 p-4 rounded-xl">
            <LayoutDashboard />

            <span>Dashboard</span>
          </div>
        </div>
      </div>

      {/* CONTENT */}

      <div className="flex-1">{children}</div>
    </div>
  );
}

export default DashboardLayout;
