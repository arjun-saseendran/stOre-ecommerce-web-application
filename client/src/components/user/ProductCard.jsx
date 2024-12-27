import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { StarRatings } from "../shared/StarRatings";

export const ProductCard = ({ product }) => {
  // Get theme
  const { theme } = useSelector((state) => state.theme);

  // Add to cart
  const addToCart = async (productId) => {
    try {
      // Api call
      const response = await axiosInstance({
        method: "POST",
        url: "/cart/add-product",
        data: { productId },
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
      <Card.Img
        className="crd-image object-fit-contain"
        variant="top"
        src={product.image}
      />
      <Card.Body>
        <Link
          className="text-decoration-none text-black"
          to={`/product-details/${product._id}`}
        >
          <Card.Title className="crd-title title-hover">
            {product.title}
          </Card.Title>
        </Link>
        <Card.Text className="crd-description">{product.description}</Card.Text>
        <Card.Text className=" crd-price fw-bold text-center fw-bolder h5">
          ₹{product.price}
        </Card.Text>
        <div className="d-flex justify-content-center">
          <StarRatings />
        </div>

        <Button
          className="w-100 text-white"
          variant={theme ? "warning" : "dark"}
          onClick={() => addToCart(product._id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 me-1"
            height="25px"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};
