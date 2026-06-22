import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  const cards = [
    {
      title: "Events",
      value: "0",
      description: "Registered events will appear here.",
    },
    {
      title: "Problems",
      value: "0",
      description: "Your reported campus issues will appear here.",
    },
    {
      title: "Solutions",
      value: "0",
      description: "Community solutions shared by you.",
    },
  ];

  return (
    <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-10">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            {user?.role} dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Welcome, {user?.name}
          </h1>

          <p className="mt-3 text-slate-600">
            This dashboard will later show your events, tickets, problems,
            solutions, notifications, and AI assistant shortcuts.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
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
      </section>
    </main>
  );
};

export default Dashboard;