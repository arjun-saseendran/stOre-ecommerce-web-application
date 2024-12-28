import toast from "react-hot-toast";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { useEffect, useState } from "react";
import { OrderIcon } from "../../components/shared/OrderIcon";

export const Cart = () => {
  // Config dispatch
  const dispatch = useDispatch();

  // Get cart data
  const { cartData } = useSelector((state) => state.cart);

  // Store data
  const [cart, setCart] = useState([]);
  

  // Update data
  const [updateCart, setUpdateCart] = useState(false);

  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Add quantity
  const addQuantity = async (productId) => {
    try {
      // Api call
      const response = await axiosInstance({
        method: "POST",
        url: "/cart/add-product",
        data: { productId },
      });
      setUpdateCart(!updateCart);

      toast.success("Product added to cart");
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
      const response = await axiosInstance({
        method: "DELETE",
        url: "/cart/remove-product",
        data: { productId },
      });
      setUpdateCart(!updateCart);
      toast.success("Product removed from cart");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Error while removing the product"
      );
    }
  };

  useEffect(() => {
    setCart(cartData);
  }, [removeQuantity, addQuantity, cartData]);

  return (
    <Container>
      <h1 className="text-white h1 text-center fw-bold my-5">Cart</h1>

      {cart?.products?.map((product) => (
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
        <Col className="fw-normal">₹{cart.totalPrice || 0}</Col>
        <Col>
          <Button
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
