import dayjs from "dayjs";
import { Link, Outlet } from "react-router-dom";
export function Layout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="container mx-auto max-w-6xl">
        <nav className="mb-2 py-2">
          <Link to="/dashboard" className="text-xl font-bold">
            Dashboard
          </Link>
        </nav>
        <Outlet />
        <footer className="flex min-h-[100px] items-center justify-center text-slate-400">
          analytics {dayjs(Date.now()).format("YYYY-MM-DD")}
        </footer>
      </div>
    </div>
  );
}
