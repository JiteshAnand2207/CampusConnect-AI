import { useAuth } from "../../context/AuthContext";

const roleMessages = {
  student:
    "Track your registered events, QR tickets, reported problems, and shared solutions.",
  organizer:
    "Create events, manage registrations, send announcements, and track participation.",
  moderator:
    "Review public problems, manage reports, and help resolve campus issues.",
  admin:
    "Manage users, approve events, monitor problems, and control platform operations.",
};

const Dashboard = () => {
  const { user } = useAuth();

  const cards = [
    {
      title: "Events",
      value: "0",
      description:
        user?.role === "organizer"
          ? "Events created by you will appear here."
          : "Events connected to your account will appear here.",
    },
    {
      title: "Problems",
      value: "0",
      description: "Campus problems reported or assigned to you.",
    },
    {
      title: "Solutions",
      value: "0",
      description: "Community solutions contributed by you.",
    },
  ];

  return (
    <div>
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          {user?.role} dashboard
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          Welcome, {user?.name}
        </h1>

        <p className="mt-3 max-w-3xl text-slate-600">
          {roleMessages[user?.role] || roleMessages.student}
        </p>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-semibold text-slate-500">
              {card.title}
            </p>
            <p className="mt-3 text-4xl font-extrabold text-slate-950">
              {card.value}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950">
          Current role permissions
        </h2>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {user?.role === "student" && (
            <>
              <Permission text="Browse and register for events" />
              <Permission text="Raise public and private problems" />
              <Permission text="Post solutions on public problems" />
              <Permission text="Use AI assistant" />
            </>
          )}

          {user?.role === "organizer" && (
            <>
              <Permission text="Create and manage events" />
              <Permission text="View event registrations" />
              <Permission text="Send event announcements" />
              <Permission text="Access organizer panel" />
            </>
          )}

          {user?.role === "moderator" && (
            <>
              <Permission text="Review public campus problems" />
              <Permission text="Moderate solutions and comments" />
              <Permission text="Handle assigned private problems" />
              <Permission text="Mark issues as resolved" />
            </>
          )}

          {user?.role === "admin" && (
            <>
              <Permission text="Manage all users" />
              <Permission text="Approve or reject events" />
              <Permission text="View all public and private problems" />
              <Permission text="Access platform analytics" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Permission = ({ text }) => {
  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
      {text}
    </div>
  );
};

export default Dashboard;