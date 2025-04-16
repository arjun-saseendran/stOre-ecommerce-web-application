import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRouteSeller = () => {
  // Get seller authentication status
  const seller = useSelector((store) => store.seller);

  // Redirect
  if (!seller || !seller._id) {
    return <Navigate to="/seller/login" />;
  }
  return <Outlet />;
};
