// ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children, roles }) {
  const { user } = useAuth();

  if (!user) {
    // If not logged in → redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    // User is logged in but does not have the required role
    return <Navigate to="/unauthorized" replace />;
  }


  return children;
}
