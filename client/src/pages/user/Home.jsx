import { ProductList } from "./ProductList";
import { Carrousel } from "../../components/user/Carrousel";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { saveUserData, clearUserData } from "../../redux/features/userSlice";

export const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const checkUser = async () => {
    if (user) return;
    try {
      const response = await axiosInstance.get("/user/check-user", {
        withCredentials: true,
      });
      dispatch(saveUserData(response?.data?.data));
    } catch (error) {
      dispatch(clearUserData());
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div>
      <Carrousel />
      <ProductList />
    </div>
  );
};
