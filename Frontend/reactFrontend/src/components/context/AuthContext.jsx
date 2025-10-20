import React, { useState, useEffect, useCallback, useContext } from "react";
import PropTypes from "prop-types";
import getAuth from "../utility/Auth"; // helper to decode token / fetch user info
import API from "../Services/api.js"; // axios instance

// ----------------------- Create Context ------------------------
const AuthContext = React.createContext();

// ----------------------- Custom Hook ---------------------------
export const useAuth = () => useContext(AuthContext);

// ---------------------- AuthProvider ---------------------------
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true); // <-- new

  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // ------------------- Logout Helper ---------------------------
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setIsLogged(false);
    setUser(null);
    setIsAdmin(false);
    setToken(null);
  };

  // ------------------- Refresh Access Token --------------------
  const refreshAccessToken = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token");

      const res = await API.post(
        "/refresh-token",
        {},
        { withCredentials: true } // server should send httpOnly cookie OR accept refreshToken
      );

      const newAccessToken = res.data.accessToken;
      localStorage.setItem("token", newAccessToken);
      setToken(newAccessToken);

      // Update user info from token
      const userData = getAuth(newAccessToken);
      setUser(userData);
      setIsLogged(true);
      setIsAdmin(Number(userData.user_role) === 4);

      return newAccessToken;
    } catch (err) {
      console.error("Failed to refresh access token:", err);
      logout();
      return null;
    }
  }, []);

  // ------------------- Fetch Auth Data -------------------------
const fetchAuthData = useCallback(async () => {
  try {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      logout();
      setLoading(false);
      return;
    }

    const userData = getAuth(storedToken);
    if (!userData) {
      console.warn("Invalid or expired token detected. Attempting refresh...");
      await refreshAccessToken();
      setLoading(false);
      return;
    }

    setUser(userData);
    setToken(storedToken);
    setIsLogged(true);
    setIsAdmin(Number(userData.user_role) === 4);
  } catch (err) {
    console.error("Failed to fetch authentication data:", err);
    logout();
  } finally {
    setLoading(false);
  }
}, [refreshAccessToken]);




  // ------------------- Initialize on Mount ---------------------
  useEffect(() => {
    fetchAuthData();
  }, [fetchAuthData]);

  // ------------------- Login Helper ---------------------------
  const login = (userData) => {
    if (!userData) return;

    localStorage.setItem("token", userData.accessToken);
    localStorage.setItem("refreshToken", userData.refreshToken);

    setIsLogged(true);
    setUser(userData);
    setToken(userData.accessToken);
    setIsAdmin(Number(userData.user_role) === 4);
  };

  // ------------------- Auto-refresh token ----------------------
  useEffect(() => {
    if (!token) return;

    const interval = setInterval(() => {
      refreshAccessToken();
    }, 14 * 60 * 1000); // refresh 1 minute before 15 min expiry

    return () => clearInterval(interval);
  }, [token, refreshAccessToken]);

  // ------------------- Context Value ---------------------------
  const value = {
    isLogged,
    isAdmin,
    user,
    token,
    loading,
    login,
    logout,
    fetchAuthData,
    refreshAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// -------------------- Prop Types -------------------------------
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
