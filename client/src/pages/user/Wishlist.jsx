import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { StarRatings } from "../../components/shared/StarRatings";
import { AverageRatings } from "../../components/shared/AverageRatings";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Wishlist = ({ average, productId, getAverageRating }) => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Get wishlist data
  const { wishlistData } = useSelector((state) => state.wishlist);

  // Store wishlist data
  const [wishlist, setWishlist] = useState([]);

  // Update
  useEffect(() => {
    setWishlist(wishlistData);
  }, [wishlistData]);

  return (
    <Container>
      <h1 className="text-white h1 text-center fw-bold my-5">Wishlist</h1>

      {wishlist?.products?.map((product) => (
        <Row
          className="d-flex justify-content-between align-items-center p-3 rounded-3 "
          style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}
        >
          <Col xs={12} md={2}>
            <Card.Img
              className=" img-fluid rounded-3 flex-start"
              src={product.productId.image}
            />
          </Col>
          <Col xs={12} md={10}>
            <Link
              className="text-decoration-none text-black"
              to={`/product-details/${product._id}`}
            >
              <Card.Title className="fw-normal mt-2">
                {product.productId.title}
              </Card.Title>
            </Link>

            <Card.Text className="fw-normal mt-2">
              The iPhone 15 features a sleek design, powerful A17 chip, enhanced
              cameras, USB-C, and dynamic island display.
            </Card.Text>
            <Card.Text className="fw-normal">
              ₹{product.productId.price}
            </Card.Text>
            <Col className="d-flex">
              <Card.Text>
                <Link to={`/user/add-review/${product._id}`}>
                  <StarRatings
                    productId={productId}
                    getAverageRating={getAverageRating}
                  />
                </Link>
              </Card.Text>
              <Card.Text>
                <AverageRatings average={average} />
              </Card.Text>
            </Col>

            <Col className="d-flex gap-2">
              <Card.Text className="fw-normal ">
                <Button
                  className="text-white"
                  variant={theme ? "warning" : "dark"}
                >
                  Add to cart
                </Button>
              </Card.Text>
              <Card.Text className="fw-normal">
                <Button
                  className="text-white"
                  variant={theme ? "warning" : "dark"}
                >
                  Remove
                </Button>
              </Card.Text>
            </Col>
          </Col>
        </Row>
      ))}
    </Container>
  );
};
