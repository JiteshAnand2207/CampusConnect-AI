import { useEffect, useState } from "react";
import api from "../../api/axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await api.get("/notifications");

      setNotifications(
        response?.data?.data ||
          response?.data?.notifications ||
          []
      );
    } catch (error) {
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <main className="cc-notifications-page">
      <section className="cc-notifications-hero">
        <span>Notifications</span>
        <h1>Your campus updates</h1>
        <p>
          Event approvals, registration alerts, problem status updates, and
          platform messages will appear here.
        </p>
      </section>

      {loading ? (
        <div className="cc-notification-empty">
          <div className="cc-empty-icon">⏳</div>
          <h2>Loading notifications...</h2>
          <p>Checking your latest CampusConnect AI updates.</p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="cc-notification-empty">
          <div className="cc-empty-icon">🔔</div>
          <h2>No notifications yet</h2>
          <p>
            You are all caught up. When events, tickets, problems, or admin
            updates happen, they will appear here.
          </p>
          <a href="/dashboard">Back to Dashboard</a>
        </div>
      ) : (
        <div className="cc-notification-list">
          {notifications.map((notification) => (
            <article
              className="cc-notification-item"
              key={notification._id || notification.id}
            >
              <div>
                <span>{notification.type || "Update"}</span>
                <h3>{notification.title || "Notification"}</h3>
                <p>{notification.message || "You have a new update."}</p>
              </div>

              <small>
                {notification.createdAt
                  ? new Date(notification.createdAt).toLocaleString()
                  : "Just now"}
              </small>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default Notifications;