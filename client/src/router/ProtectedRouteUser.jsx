import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../config/axiosInstance";
import { clearUserData, saveUserData } from "../redux/features/userSlice";

export const ProtectedRouteUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector((state) => state.user);

  const checkUser = async () => {
    if (user) return;
    try {
      const response = await axiosInstance.get("/user/check-user", {
        withCredentials: true,
      });
      dispatch(saveUserData(response?.data?.data));
      console.log(response);
    } catch (error) {
      dispatch(clearUserData());
      navigate("/login");
    }
  };

  useEffect(() => {
    checkUser();
  }, [location.pathname]);

  return <Outlet />;
};
