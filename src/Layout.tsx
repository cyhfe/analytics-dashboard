import { Link, Outlet } from "react-router-dom";
export function Layout() {
  return (
    <div className="container mx-auto p-2">
      <Link to="/dashboard">Dashboard</Link>
      <Outlet />
    </div>
  );
}
