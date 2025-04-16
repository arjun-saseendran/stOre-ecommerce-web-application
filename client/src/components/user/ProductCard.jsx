import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { StarRatings } from "../shared/StarRatings";
import { CartIcon } from "../shared/CartIcon";
import { useState } from "react";
import { AverageRatings } from "../shared/AverageRatings";
import { WishlistIcon } from "../shared/WishlistIcon";
import toast from "react-hot-toast";

export const ProductCard = ({ product }) => {
  // Get theme
  const { theme } = useSelector((state) => state.theme);

  // Config navigate
  const navigate = useNavigate();

  // Get user status
  const  isUserAuth  = useSelector((store) => store.user);

  // Store average rating
  const [average, setAverage] = useState(0);

  // Get current wishlist data
  const { wishlistData } = useSelector((state) => state.wishlist);

  // Add to cart
  const addToCart = async (productId) => {
    if (isUserAuth) {
      try {
        // Api call
        const response = await axiosInstance({
          method: "POST",
          url: "/cart/add-product",
          data: { productId },
        });
        toast.success("Product added to cart");
        console.log(response);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  };

  // Handle wishlist
  const wishlistHandler = async (productId) => {
    // Api call

    const found = wishlistData?.products?.find(
      (product) => product?.productId?._id === productId
    );

    if (isUserAuth) {
      if (found) {
        try {
          productId = found.productId._id;

          const response = await axiosInstance({
            method: "DELETE",
            url: "/wishlist/remove-product",
            data: { productId },
          });
          toast.success("Product removed from wishlist!");
        } catch (error) {
          console.log(error);
        }

        console.log(response);
      } else {
        try {
          const response = await axiosInstance({
            method: "POST",
            url: "/wishlist/add-product",
            data: { productId },
          });
          toast.success("Product added to wishlist!");
        } catch (error) {
          toast("Please login!");
          console.log(error);
        }
      }
    } else {
      navigate("/login");
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
        className="m-2 hover"
        onClick={() => {
          wishlistHandler(product?._id);
        }}
        style={{ cursor: "pointer" }}
      >
        <WishlistIcon productId={product?._id} />
        {product.stock !== 0 ? (
          <span className="ms-2">Available: {product.stock}</span>
        ) : (
          <span className="ms-2">Out of stock!</span>
        )}
      </span>

      <Card.Img
        className="crd-image object-fit-contain"
        variant="top"
        src={product?.image}
      />

      <Card.Body>
        <Link
          className="text-decoration-none text-black"
          to={`/product-details/${product?._id}`}
        >
          <Card.Title className="crd-title title-hover">
            {product.title}
          </Card.Title>
        </Link>
        <Card.Text className="crd-description">
          {product?.description}
        </Card.Text>
        <Card.Text className=" crd-price fw-bold text-center fw-bolder h5">
          ₹{product?.price}
        </Card.Text>

        <div className="d-flex justify-content-center">
          <Link
            to={
              isUserAuth && product ? `/user/add-review/${product._id}` : "/login"
            }
          >
            <StarRatings
              productId={product?._id}
              getAverageRating={getAverageRating}
            />
          </Link>
          <AverageRatings average={average} />
        </div>

        <Button
          className="w-100 text-white"
          variant={theme ? "warning" : "dark"}
          onClick={() => addToCart(product?._id)}
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
