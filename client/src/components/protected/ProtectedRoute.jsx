import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="cc-loading-page">
        <div className="cc-loading-card">
          <span>CampusConnect AI</span>
          <h1>Checking your session...</h1>
          <p>Please wait while we open your dashboard.</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;