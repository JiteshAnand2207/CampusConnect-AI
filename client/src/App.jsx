import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/protected/ProtectedRoute";

import Home from "./pages/Home";
import Events from "./pages/Events";
import Problems from "./pages/Problems";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/dashboard/Dashboard";
import DashboardEvents from "./pages/dashboard/DashboardEvents";
import DashboardProblems from "./pages/dashboard/DashboardProblems";
import DashboardSolutions from "./pages/dashboard/DashboardSolutions";
import DashboardTickets from "./pages/dashboard/DashboardTickets";
import OrganizerPanel from "./pages/dashboard/OrganizerPanel";
import ModerationPanel from "./pages/dashboard/ModerationPanel";
import AdminPanel from "./pages/dashboard/AdminPanel";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="events" element={<DashboardEvents />} />
          <Route path="problems" element={<DashboardProblems />} />
          <Route path="solutions" element={<DashboardSolutions />} />

          <Route
            path="tickets"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <DashboardTickets />
              </ProtectedRoute>
            }
          />

          <Route
            path="organizer"
            element={
              <ProtectedRoute allowedRoles={["organizer", "admin"]}>
                <OrganizerPanel />
              </ProtectedRoute>
            }
          />

          <Route
            path="moderation"
            element={
              <ProtectedRoute allowedRoles={["moderator", "admin"]}>
                <ModerationPanel />
              </ProtectedRoute>
            }
          />

          <Route
            path="admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;