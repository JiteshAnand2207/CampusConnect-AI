const DashboardProblems = () => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
        Problems
      </p>

      <h1 className="mt-2 text-3xl font-bold text-slate-950">
        Campus problems
      </h1>

      <p className="mt-3 text-slate-600">
        Here users will track public problems, private problems, status updates,
        and assigned issues.
      </p>
    </div>
  );
};

export default DashboardProblems;