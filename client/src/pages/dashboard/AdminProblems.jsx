import { useEffect, useState } from "react";
import {
  getAllProblemsForAdmin,
  updateProblemStatus,
} from "../../api/problemApi";
import ProblemCard from "../../components/problem/ProblemCard";

const AdminProblems = () => {
  const [problems, setProblems] = useState([]);
  const [filters, setFilters] = useState({
    visibility: "",
    status: "",
    category: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProblems = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllProblemsForAdmin({
        visibility: filters.visibility || undefined,
        status: filters.status || undefined,
        category: filters.category || undefined,
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
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchProblems();
  };

  const handleStatusChange = async (problemId, status) => {
    await updateProblemStatus(problemId, { status });
    fetchProblems();
  };

  return (
    <div>
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Moderation
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          Problem management
        </h1>

        <p className="mt-3 text-slate-600">
          Admins and moderators can view public/private problems and update
          their status.
        </p>

        <form
          onSubmit={handleFilter}
          className="mt-6 grid gap-4 md:grid-cols-[180px_180px_200px_auto]"
        >
          <select
            value={filters.visibility}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, visibility: e.target.value }))
            }
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
          >
            <option value="">All visibility</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
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

          <select
            value={filters.category}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, category: e.target.value }))
            }
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
          >
            <option value="">All categories</option>
            <option value="hostel">Hostel</option>
            <option value="mess">Mess</option>
            <option value="academic">Academic</option>
            <option value="transport">Transport</option>
            <option value="technical">Technical</option>
            <option value="lost_found">Lost found</option>
            <option value="event">Event</option>
            <option value="campus">Campus</option>
            <option value="other">Other</option>
          </select>

          <button className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white">
            Filter
          </button>
        </form>
      </div>

      {loading && (
        <p className="mt-6 text-center font-semibold text-slate-600">
          Loading problems...
        </p>
      )}

      {error && (
        <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-600">
          {error}
        </div>
      )}

      {!loading && problems.length === 0 && (
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">
            No problems found
          </h2>
        </div>
      )}

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {problems.map((problem) => (
          <div key={problem._id}>
            <ProblemCard problem={problem} showVisibility={true} />

            <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <label className="text-sm font-semibold text-slate-700">
                Update status
              </label>

              <select
                value={problem.status}
                onChange={(e) =>
                  handleStatusChange(problem._id, e.target.value)
                }
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
              >
                <option value="open">Open</option>
                <option value="in_progress">In progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProblems;