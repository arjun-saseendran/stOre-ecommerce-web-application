import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import { clearSellerData, saveSellerData } from "../redux/features/sellerSlice";
import { useEffect } from "react";
import { SellerHeader } from "../components/seller/SellerHeader";
import { Footer } from "../components/shared/Footer";
import { Header } from "../components/shared/Header";

export const SellerLayout = () => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Change body theme
  useEffect(() => {
    document.body.style.background = theme ? "#F2E5BF" : "#31363f";
  }, [theme]);

  // Get current user status
  const seller = useSelector((store) => store.seller);

  

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
        withCredentials: true
      });

      // set seller data
      dispatch(saveSellerData(response?.data?.data));
    } catch (error) {
      console.log(error);

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
      {seller && seller._id ? <SellerHeader /> : <Header />}

      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
