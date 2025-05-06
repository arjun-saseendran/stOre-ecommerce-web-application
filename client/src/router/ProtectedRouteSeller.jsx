import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import { saveSellerData, clearSellerData } from "../redux/features/sellerSlice";

export const ProtectedRouteSeller = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const seller = useSelector((state) => state.seller);

  const checkSeller = async () => {
    if (seller) return;

    try {
      const response = await axiosInstance.get("/seller/check-seller", {
        withCredentials: true,
      });
      dispatch(saveSellerData(response.data.data));
    } catch (error) {
      dispatch(clearSellerData());
      navigate("/seller/login");
    }
  };

  useEffect(() => {
    checkSeller();
  }, [location.pathname]);

  return <Outlet />;
};
