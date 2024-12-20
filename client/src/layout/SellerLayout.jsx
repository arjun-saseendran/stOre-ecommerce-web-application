import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import { clearSellerData, saveSellerData } from "../redux/features/sellerSlice";
import { useEffect } from "react";
import SellerHeader from "../pages/seller/SellerHeader";
import { Footer } from "../components/user/Footer";

export const SellerLayout = () => {
  // Get current user status
  const { isSellerAuth } = useSelector((state) => state.seller);

  // Config dispatch
  const dispatch = useDispatch();

  // Config path location
  const location = useLocation();

  // Check seller status
  const checkSeller = async () => {
    try {
      // Api call
      const response = await axiosInstance({
        method: "GET",
        url: "/seller/check-seller",
      });

      // set seller data
      dispatch(saveSellerData(response?.data?.data));
    } catch (error) {
      // If error clear seller data
      dispatch(clearSellerData());
    }
  };

  // Call when rendering
  useEffect(() => {
    checkSeller();
  }, [location.pathname]);

  return (
    <>
      {isSellerAuth ? <SellerHeader /> : <Headers />}
      <div>
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};
