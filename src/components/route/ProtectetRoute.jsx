import React from "react";
import { Navigate } from "react-router-dom";
import { authService } from "../../services/authService";

export default function PrivateRoute({ children, allowedRoles }) {
  const isAuth = authService.isAuthenticated();
  const user = authService.getCurrentUser();

  if (!isAuth || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = (user.role || "").toUpperCase();
    const normalizedAllowed = allowedRoles.map((r) => r.toUpperCase());

    if (!normalizedAllowed.includes(userRole)) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}