import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="min-h-[calc(100vh-73px)] bg-slate-50">
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-indigo-600">
            College digital ecosystem
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 md:text-5xl">
            Events, campus problems, and AI help in one platform.
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            CampusConnect AI helps students discover events, register with QR
            tickets, report campus issues, share solutions, and ask questions
            from college documents using AI.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/register"
              className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white"
            >
              Get started
            </Link>

            <Link
              to="/login"
              className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4">
            <div className="rounded-2xl bg-indigo-50 p-5">
              <h3 className="font-bold text-indigo-700">Event Management</h3>
              <p className="mt-2 text-sm text-slate-600">
                Create, approve, discover, and register for college events.
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-5">
              <h3 className="font-bold text-emerald-700">
                Problems & Solutions
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Students can raise public or private campus problems.
              </p>
            </div>

            <div className="rounded-2xl bg-violet-50 p-5">
              <h3 className="font-bold text-violet-700">AI Assistant</h3>
              <p className="mt-2 text-sm text-slate-600">
                Ask questions from event PDFs, rules, and campus resources.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;