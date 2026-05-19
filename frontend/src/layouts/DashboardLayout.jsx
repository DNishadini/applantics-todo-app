import { LayoutDashboard, Moon, Sun, LogOut } from "lucide-react";

function DashboardLayout({ children, dark, setDark }) {
  const handleLogout = () => {
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (
    <div
      className={
        dark
          ? "min-h-screen flex bg-slate-900"
          : "min-h-screen flex bg-slate-100"
      }
    >
      {/* SIDEBAR */}

      <div
        className={
          dark
            ? "w-72 bg-black text-white p-8"
            : "w-72 bg-slate-900 text-white p-8"
        }
      >
        <h1 className="text-3xl font-bold mb-10">Applantics</h1>

        <div className="space-y-4">
          <div className="flex gap-3 items-center bg-slate-800 p-4 rounded-xl">
            <LayoutDashboard />

            <span>Dashboard</span>
          </div>

          <button
            onClick={() => setDark(!dark)}
            className="w-full bg-slate-800 p-4 rounded-xl flex gap-3"
          >
            {dark ? <Sun /> : <Moon />}

            <span>Theme</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 p-4 rounded-xl flex gap-3"
          >
            <LogOut />

            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="flex-1">{children}</div>
    </div>
  );
}

export default DashboardLayout;
