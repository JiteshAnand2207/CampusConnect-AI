import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  const startDate = new Date(event.startDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase text-indigo-600">
          {event.category}
        </span>

        <span className="text-sm font-semibold text-slate-500">
          {startDate}
        </span>
      </div>

      <h2 className="mt-5 text-xl font-bold text-slate-950">{event.title}</h2>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
        {event.description}
      </p>

      <div className="mt-5 grid gap-2 text-sm text-slate-600">
        <p>
          <span className="font-semibold text-slate-800">Venue:</span>{" "}
          {event.venue}
        </p>
        <p>
          <span className="font-semibold text-slate-800">Department:</span>{" "}
          {event.department || "All"}
        </p>
        <p>
          <span className="font-semibold text-slate-800">Capacity:</span>{" "}
          {event.registeredCount}/{event.capacity}
        </p>
      </div>

      <Link
        to={`/events/${event._id}`}
        className="mt-6 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
      >
        View details
      </Link>
    </article>
  );
};

export default EventCard;