import { useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

export const PaymentCancel = () => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    // Handle stock and clear cart
    const updateStockAndClearCart = async () => {
      try {
        // Update stock
        const stockUpdate = await axiosInstance({
          method: "POST",
          url: "/order/update-stock",
        });
        console.log(stockUpdate);

        // Clear cart
        const clearCart = await axiosInstance({
          method: "DELETE",
          url: "/cart/clear-cart",
        });
        console.log(clearCart);
      } catch (error) {
        console.log(error);
      }
    };
    updateStockAndClearCart();
  }, []);

  return (
    <Container style={{ minHeight: "400px" }}>
      <div className="d-flex justify-content-center align-items-center mx-auto vh-100">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={theme ? "size-6 " : "size-6 text-white"}
            height={"400px"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
            />
          </svg>
        </div>
        <div>
          <h1
            className={
              theme ? "text-center mt-5" : "text-white text-center mt-5"
            }
          >
            Payment Cancelled!
          </h1>
          <Button variant={theme ? "warning" : "dark"} className="text-white">
            <Link className="text-decoration-none text-white" to={"/"}>
              Back to home
            </Link>
          </Button>
        </div>
      </div>
    </Container>
  );
};
