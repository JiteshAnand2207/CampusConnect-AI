import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const baseLinks = [
  {
  label: "Create Event",
  path: "/dashboard/events/create",
  roles: ["organizer", "admin"],
},
{
  label: "Approve Events",
  path: "/dashboard/admin/events",
  roles: ["admin"],
},
  {
    label: "Overview",
    path: "/dashboard",
    roles: ["student", "organizer", "moderator", "admin"],
  },
  {
    label: "Events",
    path: "/dashboard/events",
    roles: ["student", "organizer", "moderator", "admin"],
  },
  {
    label: "Problems",
    path: "/dashboard/problems",
    roles: ["student", "organizer", "moderator", "admin"],
  },
  {
    label: "Solutions",
    path: "/dashboard/solutions",
    roles: ["student", "organizer", "moderator", "admin"],
  },
  {
    label: "Tickets",
    path: "/dashboard/tickets",
    roles: ["student"],
  },
  {
    label: "Organizer Panel",
    path: "/dashboard/organizer",
    roles: ["organizer", "admin"],
  },
  {
    label: "Moderation",
    path: "/dashboard/moderation",
    roles: ["moderator", "admin"],
  },
  {
    label: "Admin Panel",
    path: "/dashboard/admin",
    roles: ["admin"],
  },
];

const DashboardSidebar = () => {
  const { user } = useAuth();

  const visibleLinks = baseLinks.filter((link) =>
    link.roles.includes(user?.role)
  );

  return (
    <aside className="hidden w-64 shrink-0 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:block">
      <div className="mb-5 rounded-2xl bg-indigo-50 p-4">
        <p className="text-sm font-semibold text-indigo-700">
          {user?.name}
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-indigo-500">
          {user?.role}
        </p>
      </div>

      <nav className="space-y-2">
        {visibleLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/dashboard"}
            className={({ isActive }) =>
              `block rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;