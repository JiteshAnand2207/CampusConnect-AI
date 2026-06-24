import { useEffect, useState } from "react";
import {
  approveEvent,
  getEvents,
  rejectEvent,
} from "../../api/eventApi";

const AdminPanel = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState("");

  const fetchAdminEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getEvents({
  status: "pending",
});

      const eventList =
        response?.data?.events ||
        response?.data ||
        response?.events ||
        [];

      setEvents(eventList);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch pending events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminEvents();
  }, []);

  const handleApprove = async (eventId) => {
    try {
      setActionLoading(eventId);
      setError("");

      await approveEvent(eventId);
      await fetchAdminEvents();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to approve event");
    } finally {
      setActionLoading("");
    }
  };

  const handleReject = async (eventId) => {
    const reason = window.prompt("Enter rejection reason:");

    if (!reason) return;

    try {
      setActionLoading(eventId);
      setError("");

      await rejectEvent(eventId, reason);
      await fetchAdminEvents();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reject event");
    } finally {
      setActionLoading("");
    }
  };

  return (
    <main className="cc-admin-page">
      <section className="cc-admin-hero">
        <span>Admin panel</span>
        <h1>Platform control center</h1>
        <p>
          Review submitted events, approve valid campus activities, and reject
          incomplete requests with a reason.
        </p>
      </section>

      <section className="cc-admin-summary-grid">
        <article>
          <span>Pending Events</span>
          <strong>{events.length}</strong>
          <p>Waiting for admin review</p>
        </article>

        <article>
          <span>Access</span>
          <strong>Admin</strong>
          <p>Approval and moderation control</p>
        </article>

        <article>
          <span>Demo Flow</span>
          <strong>Ready</strong>
          <p>Create, approve, register, verify</p>
        </article>
      </section>

      <section className="cc-admin-panel">
        <div className="cc-panel-heading">
          <span>Event approvals</span>
          <h2>Submitted events</h2>
        </div>

        {error && <div className="cc-form-error">{error}</div>}

        {loading ? (
          <p className="cc-admin-muted">Loading pending events...</p>
        ) : events.length === 0 ? (
          <div className="cc-admin-empty">
            <h3>No pending events</h3>
            <p>
              When organizers create events, they will appear here for approval.
            </p>
          </div>
        ) : (
          <div className="cc-admin-event-list">
            {events.map((event) => (
              <article className="cc-admin-event-card" key={event._id}>
                {event.bannerImage && (
                  <img
                    src={event.bannerImage}
                    alt={event.title}
                    className="cc-admin-event-image"
                  />
                )}

                <div className="cc-admin-event-body">
                  <span className="cc-admin-event-category">
                    {event.category || "event"}
                  </span>

                  <h3>{event.title}</h3>

                  <p>{event.description}</p>

                  <div className="cc-admin-event-meta">
                    <span>📍 {event.venue || "Venue not added"}</span>
                    <span>
                      🕒{" "}
                      {event.startDate
                        ? new Date(event.startDate).toLocaleString()
                        : "Date not added"}
                    </span>
                    <span>👥 {event.capacity || 0} seats</span>
                    <span>
                      Status:{" "}
                      {event.status ||
                        event.approvalStatus ||
                        "pending"}
                    </span>
                  </div>

                  <div className="cc-admin-actions">
                    <button
                      type="button"
                      disabled={actionLoading === event._id}
                      onClick={() => handleApprove(event._id)}
                      className="cc-admin-approve-btn"
                    >
                      {actionLoading === event._id ? "Working..." : "Approve"}
                    </button>

                    <button
                      type="button"
                      disabled={actionLoading === event._id}
                      onClick={() => handleReject(event._id)}
                      className="cc-admin-reject-btn"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default AdminPanel;