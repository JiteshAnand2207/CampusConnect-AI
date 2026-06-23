import { Link } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
        Admin panel
      </p>

      <h1 className="mt-2 text-3xl font-bold text-slate-950">
        Platform control center
      </h1>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <PanelCard title="Manage Users" text="View and manage user roles." />
        <Link to="/dashboard/admin/events">
          <PanelCard
            title="Approve Events"
            text="Approve or reject submitted events."
          />
        </Link>
        <PanelCard title="Problem Reports" text="Monitor campus problems." />
        <PanelCard title="Analytics" text="View platform-level insights." />
      </div>
    </div>
  );
};

const PanelCard = ({ title, text }) => {
  return (
    <div className="rounded-2xl bg-slate-50 p-5 transition hover:bg-indigo-50">
      <h3 className="font-bold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{text}</p>
    </div>
  );
};

export default AdminPanel;
