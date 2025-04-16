import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRouteUser = () => {
  const user = useSelector((store) => store.user);

  if (!user || !user._id) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
