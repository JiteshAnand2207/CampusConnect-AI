import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const baseLinks = [
  {
    label: "Overview",
    path: "/dashboard",
    roles: ["student", "organizer", "moderator", "admin"],
  },
  {
  label: "AI Assistant",
  path: "/dashboard/ai",
  roles: ["student", "organizer", "moderator", "admin"],
},
  {
    label: "Notifications",
    path: "/dashboard/notifications",
    roles: ["student", "organizer", "moderator", "admin"],
  },
  {
    label: "Events",
    path: "/dashboard/events",
    roles: ["student", "organizer", "moderator", "admin"],
  },
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
    label: "Tickets",
    path: "/dashboard/tickets",
    roles: ["student"],
  },
  {
    label: "Verify Ticket",
    path: "/dashboard/verify-ticket",
    roles: ["organizer", "admin"],
  },
  {
    label: "Organizer Panel",
    path: "/dashboard/organizer",
    roles: ["organizer", "admin"],
  },
  {
    label: "Problems",
    path: "/dashboard/problems",
    roles: ["student", "organizer", "moderator", "admin"],
  },
  {
    label: "Report Problem",
    path: "/dashboard/problems/create",
    roles: ["student", "organizer", "moderator", "admin"],
  },
  {
    label: "Manage Problems",
    path: "/dashboard/admin/problems",
    roles: ["admin", "moderator"],
  },
  {
    label: "Solutions",
    path: "/dashboard/solutions",
    roles: ["student", "organizer", "moderator", "admin"],
  },
  {
    label: "Moderation Panel",
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
    <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
          Dashboard
        </p>

        <h2 className="mt-1 text-lg font-bold text-slate-950">
          {user?.role || "User"} menu
        </h2>
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
                  : "text-slate-700 hover:bg-slate-100"
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