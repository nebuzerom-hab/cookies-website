import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // ✅ import the hook instead


const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth(); // ✅ directly get user from context

  // 1️⃣ Not logged in → send to login
  if (!user) return <Navigate to="/login" replace />;

  // 2️⃣ Logged in but role not allowed → send to unauthorized page
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3️⃣ All good → show the protected page
  return children;
};

export default PrivateRoute;
