import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFetch } from "../../hooks/useFetch";
import BuyNow from "./BuyNow";
import { axiosInstance } from "../../config/axiosInstance";
import { useEffect, useState } from "react";

export const ProductDetails = () => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Config params
  const { productId } = useParams();

  // Store data
  const [reviewData, setReviewData] = useState([]);
  const [deleteReview, setDeleteReview] = useState(false);

  // Api call
  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: `/review/get-review/${productId}`,
        });
        setReviewData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [deleteReview]);

  // Api call
  const [productData] = useFetch(`/product/product-details/${productId}`);

  // Delete review
  const handleDelete = async (reviewId) => {
    try {
      const response = await axiosInstance({
        method: "DELETE",
        url: "/review/delete-review",
        data: { reviewId },
      });
      setDeleteReview(!deleteReview);
    } catch (error) {
      console.log(error);
    }
  };

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
              src={productData?.image}
            />
            <Card.Body>
              <Card.Title>{productData?.title}</Card.Title>

              <Card.Text>{productData?.description}</Card.Text>
              <Card.Text className=" crd-price fw-bold text-center fw-bolder h5">
                ₹{productData?.price}
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
              <ul className=" p-2">
                {reviewData?.map((review) => (
                  <li
                    className="list-unstyled d-flex justify-content-between border mb-2 p-2 gap-4"
                    key={review._id}
                  >
                    <h6 className="fw-bold">{review?.userId?.name}</h6>
                    <p>{review?.comment}</p>
                    <Button
                      onClick={() => handleDelete(review._id)}
                      className="btn-sm text-white"
                      variant={theme ? "warning" : "dark"}
                    >
                      Delete
                    </Button>
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
