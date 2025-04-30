import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRouteSeller = () => {
  const navigate = useNavigate();
  // Get seller authentication status
  const seller = useSelector((store) => store.seller);

  useEffect(() => {
    if (!seller) {
      navigate("/seller/login");
      return;
    }
  }, [seller, navigate]);

  // Redirect
  if (!seller) {
    return null;
  }
  return <Outlet />;
};
