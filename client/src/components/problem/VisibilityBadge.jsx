const visibilityStyles = {
  public: "bg-indigo-50 text-indigo-700",
  private: "bg-red-50 text-red-700",
};

const VisibilityBadge = ({ visibility }) => {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
        visibilityStyles[visibility] || "bg-slate-100 text-slate-600"
      }`}
    >
      {visibility}
    </span>
  );
};

export default VisibilityBadge;
