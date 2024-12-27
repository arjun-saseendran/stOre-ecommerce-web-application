import toast from "react-hot-toast";
import Button from "react-bootstrap/esm/Button";
import { useFetch } from "../../hooks/useFetch";
import { useSelector, useDispatch } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { CartCard } from "../../components/user/CartCard";
import { useEffect, useState } from "react";
import { setCart, addQuantity, removeQuantity } from "../../redux/features/cartSlice";

export const Cart = () => {
  

  // Config dispatch
  const dispatch = useDispatch();

  // Get cart data
  const { cartData } = useSelector((state) => state.cart);

  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Set total price
  const totalPrice = cartData?.totalPrice;

  // Add quantity
  const addQuantity = async (productId) => {
    try {
      // Api call
      const response = await axiosInstance({
        method: "POST",
        url: "/cart/add-product",
        data: { productId },
      });
      dispatch(addQuantity(response.data.data));
      console.log(response.data.data);

      toast.success("Product added to cart");
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Error while adding the product"
      );
    }
  };

  // Remove quantity
  const removeQuantity = async (productId) => {
    try {
      const response = await axiosInstance({
        method: "DELETE",
        url: "/cart/remove-product",
        data: { productId },
      });
      dispatch(removeQuantity(response.data.data));
      console.log(response.data.data);

      toast.success("Product removed from cart");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Error while removing the product"
      );
    }
  };

  return (
    <div className="h-100">
      <h1 className="text-white text-center mt-5">Cart</h1>
      {cartData?.products?.map((product) => (
        <CartCard product={product} key={product._id} addQuantity={addQuantity} removeQuantity={removeQuantity} />
      ))}
      <div
        className="d-flex justify-content-between align-items-center p-2 mx-4 mt-2 rounded-3"
        style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}
      >
        <div className=" mt-2 rounded-3 p-2 fw-bold h5">Total</div>
        <div className=" mt-2 rounded-3 p-2 fw-bold h5">₹{totalPrice}</div>

        <div className="me-2">
          <Button className={theme ? "btn-warning text-white" : "btn-dark"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 mb-1 me-1"
              height="20px"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            Order
          </Button>
        </div>
      </div>
    </div>
  );
};
