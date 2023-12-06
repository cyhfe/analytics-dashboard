import dayjs from "dayjs";
import { Link, Outlet } from "react-router-dom";
export function Layout() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <nav className="mb-2 py-2">
          <Link to="/dashboard" className="font-bold text-xl">
            Dashboard
          </Link>
        </nav>
        <Outlet />
        <footer className="min-h-[100px] flex items-center justify-center text-slate-400">
          analytics {dayjs(Date.now()).format("YYYY-MM-DD")}
        </footer>
      </div>
    </div>
  );
}
