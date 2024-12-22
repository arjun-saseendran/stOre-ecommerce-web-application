import { useEffect } from "react";
import { Header } from "../components/user/Header";
import { Footer } from "../components/user/Footer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserHeader } from "../components/user/UserHeader";
import { useSelector, useDispatch } from "react-redux";
import { axiosInstance } from "../config/axiosInstance";
import { clearUserData, saveUserData } from "../redux/features/userSlice";


// Set user layout
export const UserLayout = () => {
  // Config navigate
  const navigate = useNavigate();

  // Config location path
  const location = useLocation();

  // Config dispatch
  const dispatch = useDispatch();

  // Get global user set state
  const { isUserAuth } = useSelector((state) => state.user);

  // Get theme
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    document.body.style.background = theme ? "#F2E5BF" : "#31363f";
  }, [theme]);

  useEffect(() => {
    checkUser();
  }, [location.pathname]);

  // Check user
  const checkUser = async () => {
    try {
      // Api call
      const response = await axiosInstance({
        method: "GET",
        url: "/user/check-user",
      });

      // set user
      dispatch(saveUserData(response?.data?.data));
    } catch (error) {
      // clear user data when error
      dispatch(clearUserData());
    }
  };

  return (
    <>
      <header>{isUserAuth ? <UserHeader /> : <Header />}</header>

      <main>
       
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};
