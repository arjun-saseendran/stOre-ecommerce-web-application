import { useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const PaymentSuccess = () => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    // Handle stock and clear cart
    const updateStockAndClearCart = async () => {
      try {
        // Update stock
        const stockUpdate = await axiosInstance({
          method: "POST",
          url: "/orders/update-stock",
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
    <Container>
      <div className="d-flex justify-content-center align-items-center mx-auto vh-100">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-white"
            height="400px"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-white text-center mt-5">Payment success!</h1>
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
