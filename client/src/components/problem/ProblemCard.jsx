import { Link } from "react-router-dom";
import ProblemStatusBadge from "./ProblemStatusBadge";
import VisibilityBadge from "./VisibilityBadge";

const ProblemCard = ({ problem, showVisibility = false }) => {
  const createdDate = new Date(problem.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase text-slate-600">
          {problem.category?.replace("_", " ")}
        </span>

        <ProblemStatusBadge status={problem.status} />

        {showVisibility && <VisibilityBadge visibility={problem.visibility} />}
      </div>

      <h2 className="mt-5 text-xl font-bold text-slate-950">
        {problem.title}
      </h2>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
        {problem.description}
      </p>

      <div className="mt-5 grid gap-2 text-sm text-slate-600">
        <p>
          <span className="font-semibold text-slate-800">Posted by:</span>{" "}
          {problem.postedBy?.name || "Unknown"}
        </p>

        <p>
          <span className="font-semibold text-slate-800">Date:</span>{" "}
          {createdDate}
        </p>

        <p>
          <span className="font-semibold text-slate-800">Upvotes:</span>{" "}
          {problem.upvotes?.length || 0}
        </p>
      </div>

      {problem.tags?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {problem.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <Link
        to={`/problems/${problem._id}`}
        className="mt-6 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
      >
        View details
      </Link>
    </article>
  );
};

export default ProblemCard;