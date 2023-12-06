import dayjs from "dayjs";
import { Link, Outlet } from "react-router-dom";
export function Layout() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto p-2 md:px-4 lg:px-6 max-w-6xl">
        <nav className="mb-2 p-2">
          <Link to="/dashboard">Dashboard</Link>
        </nav>
        <Outlet />
        <footer className="min-h-[100px] flex items-center justify-center">
          analytics {dayjs(Date.now()).format("YYYY-MM-DD")}
        </footer>
      </div>
    </div>
  );
}
