import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRole }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/signin" />;
  }

  
  if (user.role !== 'admin' && user.role !== allowedRole) {
    alert("⛔ Access Denied! You do not have permission to access this page.");
    return <Navigate to="/" />;
  }

  return children;
}