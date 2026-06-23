import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const DashboardSidebar = () => {
  const { user } = useAuth();

  const role = user?.role || "student";

  const menuItems = [
    {
      label: "Overview",
      href: "/dashboard",
      icon: "⌁",
      roles: ["student", "organizer", "admin", "moderator"],
    },
    {
      label: "AI Assistant",
      href: "/dashboard/ai",
      icon: "🤖",
      roles: ["student", "organizer", "admin", "moderator"],
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: "🔔",
      roles: ["student", "organizer", "admin", "moderator"],
    },
    {
      label: "Events",
      href: "/events",
      icon: "🎫",
      roles: ["student", "organizer", "admin", "moderator"],
    },
    {
      label: "Create Event",
      href: "/dashboard/events/create",
      icon: "✨",
      roles: ["organizer", "admin"],
    },
    {
      label: "Approve Events",
      href: "/dashboard/events/approve",
      icon: "✅",
      roles: ["admin"],
    },
    {
      label: "Verify Ticket",
      href: "/dashboard/verify-ticket",
      icon: "📷",
      roles: ["organizer", "admin"],
    },
    {
      label: "Organizer Panel",
      href: "/dashboard/organizer",
      icon: "🧭",
      roles: ["organizer", "admin"],
    },
    {
      label: "Problems",
      href: "/problems",
      icon: "🛠️",
      roles: ["student", "organizer", "admin", "moderator"],
    },
    {
      label: "Report Problem",
      href: "/problems/create",
      icon: "📌",
      roles: ["student", "organizer", "admin", "moderator"],
    },
    {
      label: "Manage Problems",
      href: "/dashboard/problems/manage",
      icon: "🧩",
      roles: ["admin", "moderator"],
    },
    {
      label: "Solutions",
      href: "/dashboard/solutions",
      icon: "💡",
      roles: ["admin", "moderator"],
    },
    {
      label: "Moderation Panel",
      href: "/dashboard/moderator",
      icon: "🛡️",
      roles: ["moderator", "admin"],
    },
    {
      label: "Admin Panel",
      href: "/dashboard/admin",
      icon: "⚙️",
      roles: ["admin"],
    },
  ];

  const visibleItems = menuItems.filter((item) => item.roles.includes(role));
  const currentPath = window.location.pathname;

  return (
    <aside className="cc-dashboard-menu">
      <div className="cc-dashboard-menu-head">
        <span>Control Room</span>
        <h2>{role} menu</h2>
      </div>

      <div className="cc-dashboard-menu-grid">
        {visibleItems.map((item) => (
          <Link to={item.href}
            key={item.label}
            className={
              currentPath === item.href
                ? "cc-dashboard-menu-item active"
                : "cc-dashboard-menu-item"
            }
          >
            <span className="cc-dashboard-menu-icon">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default DashboardSidebar;
