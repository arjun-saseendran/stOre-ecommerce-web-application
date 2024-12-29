import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

export const ProtectedRouteUser = () => {
  // Get user authentication status
  const { isUserAuth } = useSelector((state) => state.user);

  // Config navigate
  const navigate = useNavigate();

  // Redirect
  useEffect(() => {
    if (!isUserAuth) {
      navigate("/login");
    }
  }, [isUserAuth, navigate]);

  if (!isUserAuth) {
    return null;
  }

  return <Outlet />;
};
