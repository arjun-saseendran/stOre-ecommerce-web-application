import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, redirect, useNavigate } from "react-router-dom";

export const ProtectedRouteAdmin = () => {
  // Config navigate
  const navigate = useNavigate();

  // Get seller authentication status
  const { isAdminAuth } = useSelector((state) => state.admin);

  // Handle admin authentication
  useEffect(() => {
    if (!isAdminAuth) {
      navigate("/admin/login");
    }
  }, [isAdminAuth, navigate]);

  // Handle redirect
  if (!isAdminAuth) {
    return <div>Redirecting to admin login...</div>;
  }

  return <Outlet />;
};
