import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = () => {
  return (
    <main className="min-h-[calc(100vh-73px)] bg-slate-50">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
        <DashboardSidebar />

        <section className="min-w-0 flex-1">
          <Outlet />
        </section>
      </div>
    </main>
  );
};

export default DashboardLayout;