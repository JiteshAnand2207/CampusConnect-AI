import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navLinkClass = ({ isActive }) =>
    isActive ? "cc-nav-link active" : "cc-nav-link";

  return (
    <header className="cc-navbar-shell">
      <nav className="cc-navbar">
        <Link to="/" className="cc-brand">
          <span className="cc-brand-mark">✦</span>
          <span>CampusConnect AI</span>
        </Link>

        <div className="cc-nav-links">
          <NavLink to="/events" className={navLinkClass}>
            Events
          </NavLink>

          <NavLink to="/problems" className={navLinkClass}>
            Problems
          </NavLink>

          <NavLink to="/dashboard/ai" className={navLinkClass}>
            AI Assistant
          </NavLink>

          {user && (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>

              <NavLink to="/notifications" className={navLinkClass}>
                Notifications
              </NavLink>
            </>
          )}
        </div>

        <div className="cc-nav-actions">
          {user ? (
            <>
              <span className="cc-user-pill">{user.role || "student"}</span>
              <button type="button" className="cc-logout-btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="cc-login-link">
                Login
              </Link>
              <Link to="/register" className="cc-nav-cta">
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;