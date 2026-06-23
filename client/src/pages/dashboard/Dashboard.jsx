import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  const role = user?.role || "student";
  const name = user?.name || user?.fullName || "Campus User";
  const email = user?.email || "user@campusconnect.ai";

  const quickActions = [
    {
      title: "Explore Events",
      description: "Find upcoming college events and register instantly.",
      href: "/events",
      icon: "🎫",
    },
    {
      title: "Report Problem",
      description: "Raise campus issues and track their status.",
      href: "/problems",
      icon: "🛠️",
    },
    {
      title: "AI Assistant",
      description: "Ask questions about the platform and campus workflows.",
      href: "/dashboard/ai",
      icon: "🤖",
    },
    {
      title: "Notifications",
      description: "Check latest updates, approvals, and alerts.",
      href: "/notifications",
      icon: "🔔",
    },
  ];

  const roleActions = {
    student: [
      "Register for events",
      "Track your tickets",
      "Report campus problems",
      "Use AI assistant",
    ],
    organizer: [
      "Create and manage events",
      "Track registrations",
      "Verify tickets",
      "Notify participants",
    ],
    admin: [
      "Approve events",
      "Manage campus issues",
      "Monitor users",
      "Control platform workflow",
    ],
    moderator: [
      "Review problem reports",
      "Update issue status",
      "Support campus moderation",
      "Coordinate resolutions",
    ],
  };

  return (
    <main className="cc-dashboard-page">
      <section className="cc-dashboard-hero">
        <div>
          <span className="cc-dashboard-kicker">Dashboard</span>
          <h1>Welcome back, {name}</h1>
          <p>
            Manage your CampusConnect AI activity from one smooth control room.
            Events, problems, notifications, and AI tools are ready here.
          </p>

          <div className="cc-dashboard-user-row">
            <span className="cc-dashboard-role">{role}</span>
            <span className="cc-dashboard-email">{email}</span>
          </div>
        </div>

        <div className="cc-dashboard-orbit-card">
          <div className="cc-dashboard-orbit">
            <span>AI</span>
          </div>
          <h3>Campus system online</h3>
          <p>
            Your account is connected and the dashboard is ready for quick
            actions.
          </p>
        </div>
      </section>

      <section className="cc-dashboard-stats">
        <article>
          <span>Role</span>
          <strong>{role}</strong>
          <p>Current access level</p>
        </article>

        <article>
          <span>Events</span>
          <strong>Live</strong>
          <p>Browse and manage activities</p>
        </article>

        <article>
          <span>Problems</span>
          <strong>Track</strong>
          <p>Report and resolve issues</p>
        </article>

        <article>
          <span>AI</span>
          <strong>Ready</strong>
          <p>Ask campus-related questions</p>
        </article>
      </section>

      <section className="cc-dashboard-grid">
        <div className="cc-dashboard-panel cc-dashboard-main-panel">
          <div className="cc-panel-heading">
            <span>Quick Actions</span>
            <h2>Where do you want to go?</h2>
          </div>

          <div className="cc-action-grid">
            {quickActions.map((action) => (
              <a href={action.href} className="cc-action-card" key={action.title}>
                <div className="cc-action-icon">{action.icon}</div>
                <div>
                  <h3>{action.title}</h3>
                  <p>{action.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <aside className="cc-dashboard-panel cc-dashboard-side-panel">
          <div className="cc-panel-heading">
            <span>Your Role Flow</span>
            <h2>{role} tools</h2>
          </div>

          <ul className="cc-role-list">
            {(roleActions[role] || roleActions.student).map((item) => (
              <li key={item}>
                <span>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="cc-dashboard-bottom">
        <article className="cc-dashboard-panel">
          <span className="cc-dashboard-kicker">Project Status</span>
          <h2>CampusConnect AI is running successfully.</h2>
          <p>
            The frontend, backend, authentication, database, notifications,
            problem reporting, event modules, and AI assistant are connected in
            one deployed full-stack system.
          </p>
        </article>

        <article className="cc-dashboard-panel">
          <span className="cc-dashboard-kicker">Next Suggested Step</span>
          <h2>Keep improving the interface.</h2>
          <p>
            Continue polishing event detail pages, problem cards, ticket UI, and
            admin panels so the complete website feels consistent.
          </p>
        </article>
      </section>
    </main>
  );
};

export default Dashboard;
