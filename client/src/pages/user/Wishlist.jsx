import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { StarRatings } from "../../components/shared/StarRatings";
import { AverageRatings } from "../../components/shared/AverageRatings";
("react-bootstrap");

export const Wishlist = ({average, productId, getAverageRating}) => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  return (
    <Container>
      <h1 className="text-white h1 text-center fw-bold my-5">Wishlist</h1>

      <Row
        className="d-flex justify-content-between align-items-center p-3 rounded-3 "
        style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}
      >
        <Col xs={12} md={2}>
          <Card.Img
            className=" img-fluid rounded-3 flex-start"
            src="https://rukminim2.flixcart.com/image/850/1000/xif0q/mobile/j/z/3/-original-imagtc5fqyz8tu4c.jpeg?q=90&crop=false"
          />
        </Col>
        <Col xs={12} md={10}>
          <Card.Title className="fw-normal mt-2">
            Apple iPhone 15 (Green, 128 GB)
          </Card.Title>

          <Card.Text className="fw-normal mt-2">
            The iPhone 15 features a sleek design, powerful A17 chip, enhanced
            cameras, USB-C, and dynamic island display.
          </Card.Text>
          <Card.Text className="fw-normal">₹58999</Card.Text>
          <Card.Text>
            <StarRatings />
          </Card.Text>
          <Card.Text>
            <AverageRatings />
          </Card.Text>
          <Card.Text className="fw-normal">
            <Button variant="dark">Add to cart</Button>
          </Card.Text>
        </Col>
      </Row>
    </Container>
  );
};
