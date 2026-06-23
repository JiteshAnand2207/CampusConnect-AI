import { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../api/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  const loadCurrentUser = async () => {
    try {
      setAuthLoading(true);
      const response = await getCurrentUser();
      setUser(response.data);
      setAuthError("");
    } catch (error) {
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const register = async (formData) => {
    const response = await registerUser(formData);
    setUser(response.data.user);
    return response;
  };

  const login = async (formData) => {
    const response = await loginUser(formData);
    setUser(response.data.user);
    return response;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  const value = {
    user,
    authLoading,
    authError,
    setAuthError,
    register,
    login,
    logout,
    isAuthenticated: Boolean(user),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
