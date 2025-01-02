import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

export const UserOrders = () => {
  // Get theme
  const { theme } = useSelector((state) => state.theme);

  // Config navigate
  const navigate = useNavigate();

  // Store order data
  const [orders, setOrders] = useState([]);

  // Api call
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: "/order/get-user-orders",
        });

        setOrders(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderDetails();
  }, []);

  console.log(orders);

  // Handle actions
  const actionHandler = async () => {};

  return (
    <Container style={{ minHeight: "400px" }}>
      <h1
        className={
          theme
            ? "text-black h1 text-center fw-bold my-5"
            : "text-white h1 text-center fw-bold my-5"
        }
      >
        Order Details
      </h1>

      {orders?.map((order) => (
        <div key={order._id}>
          {order.products.map((product) => (
            <Row
              className="d-flex justify-content-between align-items-center gap-3 my-2 p-3 rounded-3 mx-1"
              key={product._id}
              style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}
            >
              <Col xs={12} md={2}>
                <Card.Img
                  className="img-fluid object-fit-contain rounded-3"
                  src={product?.productId?.image}
                  style={{ minHeight: "210px" }}
                />
              </Col>
              <Col xs={12} md={3}>
                <Card.Title className="fw-normal">
                  {product?.productId?.title}
                </Card.Title>
              </Col>
              <Col xs={12} md={2}>
                <Card.Text className="fw-normal">{product?.quantity}</Card.Text>
              </Col>
              <Col xs={12} md={2}>
                <Card.Text className="fw-normal">
                  ₹{product?.productId?.price * product?.quantity}
                </Card.Text>
              </Col>
              <Col xs={12} md={2}>
                <Card.Text className="fw-normal">
                  {order?.orderStatus} (
                  {new Date(order?.createdAt).toLocaleDateString()})
                </Card.Text>
              </Col>
            </Row>
          ))}

          {/* Display total price for this order */}
          <Row
            style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}
            className="d-flex justify-content-between align-items-center p-5 rounded-3 mx-1 mt-2 gap-3"
          >
            <Col className="fw-normal">Total</Col>
            <Col className="fw-normal">
              ₹{" "}
              {order.products.reduce((total, product) => {
                return total + product.productId.price * product.quantity;
              }, 0)}
            </Col>
            <Col>
              <Button
                className="w-100 text-white"
                variant={theme ? "warning" : "dark"}
                onClick={() => actionHandler(order._id)}
              >
                <span className="me-1"></span>Return
              </Button>
            </Col>
          </Row>
        </div>
      ))}
    </Container>
  );
};
