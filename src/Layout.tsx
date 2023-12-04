import { Link, Outlet } from "react-router-dom";
export function Layout() {
  return (
    <div>
      <Link to="/dashboard">Dashboard</Link>
      <Outlet />
    </div>
  );
}
