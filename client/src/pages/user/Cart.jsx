import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { OrderIcon } from "../../components/shared/OrderIcon";
import { UnHappy } from "../../components/shared/UnHappy";

export const Cart = () => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Get cart data
  const { cartData } = useSelector((state) => state.cart);

  // Add quantity
  const addQuantity = async (productId) => {
    try {
      // Api call
      await axiosInstance({
        method: "POST",
        url: "/cart/add-cartQuantity",
        data: { productId },
      });

      toast.success("Quantity increased");
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Error while adding the product"
      );
    }
  };

  // Remove quantity
  const removeQuantity = async (productId) => {
    try {
      await axiosInstance({
        method: "DELETE",
        url: "/cart/remove-product",
        data: { productId },
      });

      toast.success("Quantity decreased");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Error while removing the product"
      );
    }
  };

  // Make payment
  const makePayment = async () => {
    try {
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
      );

      const session = await axiosInstance({
        url: "/payment/create-checkout-session",
        method: "POST",
        data: { products: cartData?.products },
      });
      const result = stripe.redirectToCheckout({
        sessionId: session.data.sessionId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!cartData?.products?.length) {
    return (<Link className="text-decoration-none" to={"/"}>
      <UnHappy message={"Your cart is empty!"} theme={theme} />;
    </Link>)
  }

  return (
    <Container style={{ minHeight: "500px" }}>
      <h1 className="text-white h1 text-center fw-bold my-5">Cart</h1>

      {cartData?.products?.map((product) => (
        <Row
          className="d-flex justify-content-between align-items-center gap-3 my-2 p-3 rounded-3 mx-1"
          key={product.productId._id}
          style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}
        >
          <Col xs={12} md={2}>
            <Card.Img
              className="img-fluid object-fit-contain rounded-3"
              src={product.productId.image}
              style={{ minHeight: "210px" }}
            />
          </Col>
          <Col xs={12} md={3}>
            <Card.Title className="fw-normal">
              {product.productId.title}
            </Card.Title>
          </Col>
          <Col xs={12} md={2}>
            <Card.Text className="fw-normal">
              <Button
                onClick={() => removeQuantity(product.productId._id)}
                className="btn-sm rounded-5 me-1 text-white fw-bolder"
                variant={theme ? "warning" : "dark"}
              >
                -
              </Button>

              {product.quantity}

              <Button
                className="btn-sm rounded-5 fw-bolder ms-1 text-white"
                variant={theme ? "warning" : "dark"}
                onClick={() => addQuantity(product.productId._id)}
              >
                +
              </Button>
            </Card.Text>
          </Col>
          <Col xs={12} md={2}>
            <Card.Text className="fw-normal">
              ₹{product.price * product.quantity}
            </Card.Text>
          </Col>
        </Row>
      ))}

      <Row
        style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}
        className="d-flex justify-content-between align-items-center p-5 rounded-3 mx-1 mt-2 gap-3"
      >
        <Col className="fw-normal">Total</Col>
        <Col className="fw-normal">₹{cartData.totalPrice || 0}</Col>
        <Col>
          <Button
            onClick={makePayment}
            className="w-100 text-white "
            variant={theme ? "warning" : "dark"}
          >
            <span className="me-1">
              <OrderIcon height={"25px"} />
            </span>
            Place order
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
