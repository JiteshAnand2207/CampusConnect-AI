import { useEffect, useState } from "react";
import {
  approveEvent,
  getEvents,
  rejectEvent,
} from "../../api/eventApi";
import StatusBadge from "../../components/event/StatusBadge";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getEvents({ status });
      setEvents(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [status]);

  const handleApprove = async (eventId) => {
    await approveEvent(eventId);
    fetchEvents();
  };

  const handleReject = async (eventId) => {
    const reason = window.prompt("Enter rejection reason:");

    if (!reason) return;

    await rejectEvent(eventId, reason);
    fetchEvents();
  };

  return (
    <div>
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Admin
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          Event approval panel
        </h1>

        <p className="mt-3 text-slate-600">
          Review organizer-created events and approve or reject them.
        </p>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-6 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
        >
          <option value="pending">Pending events</option>
          <option value="approved">Approved events</option>
          <option value="rejected">Rejected events</option>
        </select>
      </div>

      {loading && (
        <p className="mt-6 text-center font-semibold text-slate-600">
          Loading events...
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
            No {status} events
          </h2>
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
                <p className="mt-2 text-sm text-slate-600">
                  {event.category} · {event.venue} · {event.department}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {event.description}
                </p>
              </div>

              <StatusBadge status={event.status} />
            </div>

            {event.status === "pending" && (
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => handleApprove(event._id)}
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(event._id)}
                  className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminEvents;