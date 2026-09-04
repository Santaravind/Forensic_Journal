import React from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authService } from "../../services/authService";

export default function PrivateRoute({ children, allowedRoles }) {
  const isAuth = authService.isAuthenticated();
  const user = authService.getCurrentUser();

  if (!isAuth || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const rawRole = (user.role || "USER").toUpperCase();
    const normalizedRole =
      rawRole === "AUTHOR" || rawRole === "READER" ? "USER" : rawRole;

    const normalizedAllowed = allowedRoles.map((r) => {
      const u = r.toUpperCase();
      return u === "AUTHOR" || u === "READER" ? "USER" : u;
    });

    if (!normalizedAllowed.includes(normalizedRole)) {
      toast.error("Access restricted to authorized roles only.");
      return <Navigate to="/" replace />;
    }
  }

  return children;
}