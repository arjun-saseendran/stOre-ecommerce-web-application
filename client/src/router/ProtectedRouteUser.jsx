import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

export const ProtectedRouteUser = () => {
  // Get user authatication status
  const { isUserAuth } = useSelector((state) => state.user);

  // Config navigate
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserAuth) {
      navigate("/login");
      return;
    }
  }, [isUserAuth, navigate]);

  return isUserAuth ? <Outlet /> : null;
};
