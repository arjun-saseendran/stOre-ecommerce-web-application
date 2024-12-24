import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRouteAdmin = () => {
  // Get seller authetication status
  const { isAdminAuth } = useSelector((state) => state.seller);

  // Config navigate
  const navigate = useNavigate();

  if (!isAdminAuth) {
    navigate("/admin/login");
    return;
  }

  return isAdminAuth && <Outlet />
};
