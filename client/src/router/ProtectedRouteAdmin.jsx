import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRouteAdmin = () => {
  // Get admin authentication status
  const admin = useSelector((store) => store.admin);

  // Redirect
  if (!admin || !admin._id) {
    return <Navigate to="/admin/login" />;
  }

  return <Outlet />;
};
