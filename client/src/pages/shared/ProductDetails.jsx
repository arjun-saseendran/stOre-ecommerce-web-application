import {Container, Card, Button, Row, Col} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "../../hooks/useFetch";
import BuyNow from "./BuyNow";

export const ProductDetails = () => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Config dispatch
  const dispatch = useDispatch();

  // Config params
  const { productId } = useParams();

  // Set product
  const [product, setProduct] = useState({});

  // Api call
  const [productData] = useFetch(
    `/product/product-details/${productId}`
  );
  
  // Api call
  const [reviews] = useFetch(
    `/review/get-review/${productId}`
  );

  useEffect(() => {
    if (productData) {
      // Set product details
      setProduct(productData);
    }
  }, [productData]);

  console.log(reviews);
  

  return (
    <Container className="h-100">
      <h1
        className={
          theme
            ? "h1 text-center fw-bold text-black mt-5"
            : "h1 text-center fw-bold text-white mt-5"
        }
      >
        Product Details
      </h1>
      <Row>
        <Col xs={12} md={6}>
          <Card
            className="crd-box d-flex justify-content-center align-items-center mt-5 mx-auto pr-card"
            style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}
          >
            <Card.Img
              className="object-fit-contain pr-card-img p-2"
              variant="top"
              src={product.image}
            />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>

              <Card.Text>{product.description}</Card.Text>
              <Card.Text className=" crd-price fw-bold text-center fw-bolder h5">
                ₹{product.price}
              </Card.Text>
              <Button
                className={
                  theme ? "w-100 mt-1 text-white" : "w-100 mt-1 text-white"
                }
                variant={theme ? "warning" : "dark"}
              >
                <BuyNow />
                Buy Now
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            className="mt-5"
            style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}
          >
            <Card.Body>
              <Card.Title className="text-center fw-bold p-2">
                Reviews
              </Card.Title>
              <ul className="border p-2">
                {reviews?.map((review) => (
                  <li className="list-unstyled">
                    <h6 className="fw-bold">{review?.userId?.name}</h6>
                    <p>
                      {review?.comment}
                    </p>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
