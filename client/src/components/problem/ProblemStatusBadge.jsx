const statusStyles = {
  open: "bg-blue-50 text-blue-700",
  in_progress: "bg-amber-50 text-amber-700",
  resolved: "bg-emerald-50 text-emerald-700",
  closed: "bg-slate-100 text-slate-700",
};

const ProblemStatusBadge = ({ status }) => {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
        statusStyles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status?.replace("_", " ")}
    </span>
  );
};

export default ProblemStatusBadge;
