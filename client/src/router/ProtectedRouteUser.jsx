import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

export const ProtectedRouteUser = () => {
  // Get user authentication status
  const { isUserAuth } = useSelector((state) => state.user);

  // Config navigate
  const navigate = useNavigate();

  // Redirect
  if (!isUserAuth) {
    navigate("/login");
    return;
  }

  return isUserAuth && <Outlet />;
};
