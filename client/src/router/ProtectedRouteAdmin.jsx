import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import { saveAdminData, clearAdminData } from "../redux/features/adminSlice";

export const ProtectedRouteAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const admin = useSelector((state) => state.admin);

  const checkAdmin = async () => {
    
   if(admin) return;
    try {
      const response = await axiosInstance.get("/admin/check-admin", {
        withCredentials: true,
      });
      dispatch(saveAdminData(response.data.data));
    } catch (error) {
      console.log(error);
      dispatch(clearAdminData());
      navigate("/admin/login");
    }
  };

  useEffect(() => {
    checkAdmin();
  }, [location.pathname]);

  return <Outlet />;
};
