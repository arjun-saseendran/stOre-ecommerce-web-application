import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRouteAdmin = () => {
  const navigate = useNavigate();

  // Get admin authentication status
  const admin = useSelector((store) => store.admin);

  useEffect(() => {
    if (!admin) {
      navigate("/admin/login");
      return;
    }
  }, [navigate, admin]);

  if (!admin) {
    return null;
  }

  return <Outlet />;
};
