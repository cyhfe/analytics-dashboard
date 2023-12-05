import { Link, Outlet } from "react-router-dom";
export function Layout() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto p-2 md:px-4 lg:px-6 max-w-7xl">
        <nav className="mb-2 p-2">
          <Link to="/dashboard">Dashboard</Link>
        </nav>
        <Outlet />
      </div>
    </div>
  );
}
