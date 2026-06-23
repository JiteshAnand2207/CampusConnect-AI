import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getMyNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../../api/notificationApi";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyNotifications();
      setNotifications(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleRead = async (notificationId) => {
    await markNotificationAsRead(notificationId);
    fetchNotifications();
  };

  const handleMarkAll = async () => {
    await markAllNotificationsAsRead();
    fetchNotifications();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Notifications
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Your updates
          </h1>

          <p className="mt-3 text-slate-600">
            Track event approvals, registrations, ticket verification, and
            problem-solution updates.
          </p>

          {!loading && notifications.length > 0 && (
            <p className="mt-3 text-sm font-semibold text-slate-500">
              {unreadCount} unread out of {notifications.length} total
            </p>
          )}
        </div>

        {!loading && notifications.length > 0 && unreadCount > 0 && (
          <button
            onClick={handleMarkAll}
            className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white"
          >
            Mark all as read
          </button>
        )}
      </div>

      {loading && (
        <p className="mt-6 text-center font-semibold text-slate-600">
          Loading notifications...
        </p>
      )}

      {error && (
        <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && notifications.length === 0 && (
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">
            No notifications yet
          </h2>

          <p className="mt-2 text-slate-600">
            Important updates will appear here after event approvals,
            registrations, ticket verification, or problem activity.
          </p>
        </div>
      )}

      <div className="mt-6 space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification._id}
            className={`rounded-3xl border p-6 shadow-sm ${
              notification.isRead
                ? "border-slate-200 bg-white"
                : "border-indigo-200 bg-indigo-50"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">
                  {notification.type}
                </p>

                <h2 className="mt-2 text-xl font-bold text-slate-950">
                  {notification.title}
                </h2>

                <p className="mt-2 leading-6 text-slate-600">
                  {notification.message}
                </p>

                {notification.sender && (
                  <p className="mt-2 text-sm text-slate-500">
                    From: {notification.sender.name}
                  </p>
                )}
              </div>

              {!notification.isRead && (
                <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold uppercase text-white">
                  New
                </span>
              )}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {notification.link && (
                <Link
                  to={notification.link}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                >
                  Open
                </Link>
              )}

              {!notification.isRead && (
                <button
                  onClick={() => handleRead(notification._id)}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
                >
                  Mark as read
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;