import { useAuth } from "../../context/AuthContext";

const DashboardEvents = () => {
  const { user } = useAuth();

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
        Events
      </p>

      <h1 className="mt-2 text-3xl font-bold text-slate-950">
        Event workspace
      </h1>

      <p className="mt-3 text-slate-600">
        {user?.role === "organizer"
          ? "Here organizers will create and manage their events."
          : "Here users will see event registrations and event activity."}
      </p>
    </div>
  );
};

export default DashboardEvents;