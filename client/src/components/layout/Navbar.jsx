import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { getUnreadNotificationCount } from "../../api/notificationApi";
const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const [unreadCount, setUnreadCount] = useState(0);

useEffect(() => {
  const fetchUnreadCount = async () => {
    if (!isAuthenticated) {
      setUnreadCount(0);
      return;
    }

    try {
      const response = await getUnreadNotificationCount();
      setUnreadCount(response.data.count || 0);
    } catch (error) {
      setUnreadCount(0);
    }
  };

  fetchUnreadCount();

  const intervalId = setInterval(fetchUnreadCount, 30000);

  return () => clearInterval(intervalId);
}, [isAuthenticated, location.pathname]);

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          CampusConnect AI
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/events" className="text-sm font-medium text-slate-700">
            Events
          </Link>

          <Link to="/problems" className="text-sm font-medium text-slate-700">
            Problems
          </Link>
          <Link
  to="/dashboard/ai"
  className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600"
>
  AI Assistant
</Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-slate-700"
              >
                Dashboard
              </Link>
              <Link
  to="/dashboard/notifications"
  className="relative text-sm font-medium text-slate-700"
>
  Notifications
  {unreadCount > 0 && (
    <span className="ml-2 rounded-full bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
      {unreadCount}
    </span>
  )}
</Link>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                {user?.role}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-slate-700">
                Login
              </Link>
{isAuthenticated && (
  <Link
    to="/dashboard/ai"
    className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600"
  >
    AI Assistant
  </Link>
)}
              <Link
                to="/register"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;