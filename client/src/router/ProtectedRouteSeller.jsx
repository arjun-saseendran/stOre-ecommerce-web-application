import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRouteSeller = () => {
  // Get seller authetication status
  const { isSellerAuth } = useSelector((state) => state.seller);

  // Config navigate
  const navigate = useNavigate();

  if (!isSellerAuth) {
    navigate("/seller/login");
    return;
  }

  return isSellerAuth && <Outlet /> 
};
