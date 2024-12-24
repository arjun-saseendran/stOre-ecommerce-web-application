import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import { clearAdminData, saveAdminData } from "../redux/features/adminSlice";
import { useEffect } from "react";
import { AdminHeader } from "../components/admin/AdminHeader";
import { Footer } from "../components/user/Footer";
import { Header } from "../components/seller/Header";

export const AdminLayout = () => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Change body theme
  useEffect(() => {
    document.body.style.background = theme ? "#F2E5BF" : "#31363f";
  }, [theme]);

  // Get current user status
  const { isAdminAuth } = useSelector((state) => state.admin);

  // Config dispatch
  const dispatch = useDispatch();

  // Config path location
  const location = useLocation();

  // Check admin status
  const checkAdmin = async () => {
    try {
      // Api call
      const response = await axiosInstance({
        method: "GET",
        url: "/seller/check-admin",
      });

      // set admin data
      dispatch(saveAdminData());
    } catch (error) {
      console.log(error);

      // If error clear admin data
      dispatch(clearAdminData());
    }
  };

  // Call when rendering
  useEffect(() => {
    checkAdmin();
  }, [location.pathname]);

  return (
    <>
      {isAdminAuth ? <AdminHeader /> : <Header />}

      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
