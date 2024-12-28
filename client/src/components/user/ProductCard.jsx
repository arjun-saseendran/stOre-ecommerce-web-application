import { Badge, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { StarRatings } from "../shared/StarRatings";
import { CartIcon } from "../shared/CartIcon";
import { useState } from "react";
import { AverageRatings } from "../shared/AverageRatings";
import { WishlistIcon } from "../shared/WishlistIcon";

export const ProductCard = ({ product }) => {
  // Get theme
  const { theme } = useSelector((state) => state.theme);

  // Store average rating
  const [average, setAverage] = useState(0);

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

  // Add to wishlist
  const addToWishlist = async (productId) => {
    // Api call
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/wishlist/add-product",
        data: { productId },
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Get average rating from child
  const getAverageRating = (rating) => {
    setAverage(rating);
  };
  return (
    <Card style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
      <span
        as="button"
        className="m-2"
        onClick={() => addToWishlist(product._id)}
      >
        <WishlistIcon
          average={average}
          productId={product._id}
          getAverageRating={getAverageRating}
        />
      </span>
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
          <Link to={`/user/add-review/${product._id}`}>
            <StarRatings
              productId={product._id}
              getAverageRating={getAverageRating}
            />
          </Link>
          <AverageRatings average={average} />
        </div>

        <Button
          className="w-100 text-white"
          variant={theme ? "warning" : "dark"}
          onClick={() => addToCart(product._id)}
        >
          <span className="mx-1">
            <Link>
              <CartIcon height={25} components={"Product Card"} />
            </Link>
          </span>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};
