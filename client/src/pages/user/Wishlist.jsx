import toast from "react-hot-toast";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { UnHappy } from "../../components/shared/UnHappy";

export const Wishlist = () => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Get current wishlist data
  const { wishlistData } = useSelector((state) => state.wishlist);

  // Add to cart
  const addToCart = async (productId) => {
    try {
      // Api call
      const response = await axiosInstance({
        method: "POST",
        url: "/cart/add-product-wishlist-to-cart",
        data: { productId },
      });
      toast.success("Product added to cart");
      console.log(response);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  // Remove product
  const removeProduct = async (productId) => {
    try {
      const response = await axiosInstance({
        method: "DELETE",
        url: "/wishlist/remove-product",
        data: { productId },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container style={{ minHeight: "400px" }}>
      {wishlistData?.products?.length !== 0 && (
        <h1 className="text-white h1 text-center fw-bold my-5">Wishlist</h1>
      )}
      {wishlistData?.products?.length === 0 && (
        <Link className="text-decoration-none" to={"/"}>
          <UnHappy message={"Your wishlist is empty!"} theme={theme} />
        </Link>
      )}
      {wishlistData?.products?.map((product) => (
        <Row
          className="d-flex justify-content-between align-items-center p-3 rounded-3 mx-2   my-3 "
          style={{
            backgroundColor: theme ? "#FFF6E3" : "#d9d9d9",
            minHeight: "250px",
          }}
          key={product.productId._id}
        >
          <Col xs={12} md={2}>
            <div>
              <img
                className=" img-fluid rounded-3 "
                src={product.productId.image}
                alt="product image"
              />
            </div>
          </Col>
          <Col xs={12} md={10}>
            <Link
              className="text-decoration-none text-black"
              to={`/product-details/${product._id}`}
            >
              <div className="fw-bold mt-2">{product.productId.title}</div>
            </Link>

            <div className="fw-normal mt-2">
              The iPhone 15 features a sleek design, powerful A17 chip, enhanced
              cameras, USB-C, and dynamic island display.
            </div>
            <div className="fw-normal mt-3">₹{product.productId.price}</div>

            <Col className="d-flex gap-2 mt-3">
              <div className="fw-normal ">
                <Button
                  onClick={() => addToCart(product.productId._id)}
                  className="text-white"
                  variant={theme ? "warning" : "dark"}
                >
                  Add to cart
                </Button>
              </div>
              <div className="fw-normal">
                <Button
                  onClick={() => removeProduct(product.productId._id)}
                  className="text-white"
                  variant={theme ? "warning" : "dark"}
                >
                  Remove
                </Button>
              </div>
            </Col>
          </Col>
        </Row>
      ))}
    </Container>
  );
};
