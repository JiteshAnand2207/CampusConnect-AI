import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyProblems } from "../../api/problemApi";
import ProblemCard from "../../components/problem/ProblemCard";

const DashboardProblems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyProblems = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyProblems();
      setProblems(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch your problems");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProblems();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Problems
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            My reported problems
          </h1>

          <p className="mt-3 text-slate-600">
            Track your public and private campus problems.
          </p>
        </div>

        <Link
          to="/dashboard/problems/create"
          className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white"
        >
          Report Problem
        </Link>
      </div>

      {loading && (
        <p className="mt-6 text-center font-semibold text-slate-600">
          Loading your problems...
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
            No problems reported yet
          </h2>
          <p className="mt-2 text-slate-600">
            Report your first campus problem.
          </p>
        </div>
      )}

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {problems.map((problem) => (
          <ProblemCard
            key={problem._id}
            problem={problem}
            showVisibility={true}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardProblems;