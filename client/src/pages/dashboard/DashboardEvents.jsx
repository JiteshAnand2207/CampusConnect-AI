import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getMyEvents } from "../../api/eventApi";
import { useAuth } from "../../context/AuthContext";
import StatusBadge from "../../components/event/StatusBadge";

const DashboardEvents = () => {
  const { user } = useAuth();

  const canCreateEvents = user?.role === "organizer" || user?.role === "admin";

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(canCreateEvents);
  const [error, setError] = useState("");

  const fetchMyEvents = async () => {
    if (!canCreateEvents) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await getMyEvents();
      setEvents(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch your events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, [user?.role]);

  if (!canCreateEvents) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Events
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          My event activity
        </h1>

        <p className="mt-3 text-slate-600">
          Your registered events and QR tickets will appear here after the event
          registration phase.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Events
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            My created events
          </h1>

          <p className="mt-3 text-slate-600">
            Create events and track approval status.
          </p>
        </div>

        <Link
          to="/dashboard/events/create"
          className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          Create event
        </Link>
      </div>

      {loading && (
        <p className="mt-6 text-center font-semibold text-slate-600">
          Loading your events...
        </p>
      )}

      {error && (
        <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-600">
          {error}
        </div>
      )}

      {!loading && events.length === 0 && (
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">
            No events created yet
          </h2>

          <p className="mt-2 text-slate-600">
            Create your first event and send it for approval.
          </p>

          <Link
            to="/dashboard/events/create"
            className="mt-5 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Create first event
          </Link>
        </div>
      )}

      <div className="mt-6 grid gap-4">
        {events.map((event) => (
          <div
            key={event._id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  {event.title}
                </h2>

                <p className="mt-2 text-sm text-slate-600">{event.venue}</p>

                <p className="mt-2 text-sm text-slate-500">
                  {event.category} · {event.department || "All"}
                </p>
              </div>

              <StatusBadge status={event.status} />
            </div>

            {event.rejectionReason && (
              <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">
                Rejection reason: {event.rejectionReason}
              </div>
            )}

            <div className="mt-5">
              <Link
                to={`/events/${event._id}`}
                className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                View public page
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardEvents;