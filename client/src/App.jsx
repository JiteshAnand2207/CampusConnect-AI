import { Route, Routes } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import FloatingAIAssistant from "./components/ai/FloatingAIAssistant";

import Home from "./pages/Home";
import Events from "./pages/Events";
import Problems from "./pages/Problems";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/dashboard/Dashboard";
import AIAssistant from "./pages/dashboard/AIAssistant";
import Notifications from "./pages/dashboard/Notifications";

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
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/ai"
          element={
            <ProtectedRoute>
              <AIAssistant />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
      </Routes>

      <FloatingAIAssistant />
    </>
  );
};

export default App;