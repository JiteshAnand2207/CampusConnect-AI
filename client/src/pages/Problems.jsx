import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublicProblems } from "../api/problemApi";
import ProblemCard from "../components/problem/ProblemCard";
import { useAuth } from "../context/AuthContext";

const categories = [
  "",
  "hostel",
  "mess",
  "academic",
  "transport",
  "technical",
  "lost_found",
  "event",
  "campus",
  "other",
];

const Problems = () => {
  const { isAuthenticated } = useAuth();

  const [problems, setProblems] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
  });

  const [loading, setLoading] = useState(isAuthenticated);
  const [error, setError] = useState("");

  const fetchProblems = async () => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      setError("");

      const response = await getPublicProblems({
        search: filters.search || undefined,
        category: filters.category || undefined,
        status: filters.status || undefined,
      });

      setProblems(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch problems");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, [isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchProblems();
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-10">
        <section className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-slate-950">
            Campus Problems & Solutions
          </h1>

          <p className="mt-3 text-slate-600">
            Login to view public campus problems, post issues, and share
            solutions.
          </p>

          <Link
            to="/login"
            className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white"
          >
            Login to continue
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-10">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                Campus helpdesk
              </p>

              <h1 className="mt-2 text-3xl font-bold text-slate-950">
                Problems & Solutions
              </h1>

              <p className="mt-3 max-w-3xl text-slate-600">
                Browse public campus issues, upvote important problems, and help
                others by posting solutions.
              </p>
            </div>

            <Link
              to="/dashboard/problems/create"
              className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white"
            >
              Report Problem
            </Link>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 grid gap-4 md:grid-cols-[1fr_200px_180px_auto]"
          >
            <input
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              placeholder="Search problems..."
              className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
            />

            <select
              value={filters.category}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, category: e.target.value }))
              }
              className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
            >
              {categories.map((category) => (
                <option key={category || "all"} value={category}>
                  {category ? category.replace("_", " ") : "All categories"}
                </option>
              ))}
            </select>

            <select
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value }))
              }
              className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
            >
              <option value="">All status</option>
              <option value="open">Open</option>
              <option value="in_progress">In progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>

            <button className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white">
              Search
            </button>
          </form>
        </div>

        {loading && (
          <p className="mt-8 text-center font-semibold text-slate-600">
            Loading problems...
          </p>
        )}

        {error && (
          <div className="mt-8 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && problems.length === 0 && (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">
              No problems found
            </h2>
            <p className="mt-2 text-slate-600">
              Be the first to report a public campus problem.
            </p>
          </div>
        )}

        {!loading && problems.length > 0 && (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {problems.map((problem) => (
              <ProblemCard key={problem._id} problem={problem} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Problems;
