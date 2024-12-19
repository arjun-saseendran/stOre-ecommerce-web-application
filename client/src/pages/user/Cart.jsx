import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import { apiHandler } from "../../utils/apiHandler";

function Cart() {
  // Get api url
  const apiUrl = import.meta.env.VITE_API_URL;

  const [CartProducts, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Api call
  useEffect(() => {
    (async () => {
      const [response, error] = await apiHandler(
        `${apiUrl}/api/v1/cart/cart`,
        "GET"
      );
      if (response) {
        // Set cart products
        setCartProducts(response.products);

        // Set product total
        setTotalPrice(response.totalPrice);
      } else {
        console.log(error);
      }
    })();
  }, [totalPrice]);

  // Add quantity
  const addQuantity = async (productId) => {
    const [response, error] = await apiHandler(
      `${apiUrl}/api/v1/cart/add-product`,
      "POST",
      { productId }
    );
    if (response) {
      // Set product total
      setTotalPrice(response.totalPrice);
    } else {
      console.log(error);
    }
  };

  // Remove quantity
  const removeQuantity = async (productId) => {
    const [response, error] = await apiHandler(
      `${apiUrl}/api/v1/cart/remove-product`,
      "DELETE",
      { productId }
    );
    if (response) {
      // Set product total
      setTotalPrice(response.totalPrice);
    } else {
      console.log(error);
    }
  };

  return (
    <Container>
      <div className="h-100">
        <h1 className="text-white text-center mt-3">Cart</h1>
        <Row className="mt-3 p-4 rounded-3 d-flex justify-content-center align-items-center">
          {CartProducts.map((product) => (
            <Row
              key={product.productId_id}
              className="crd-box mt-2 rounded-3 p-2 d-flex justify-content-around align-items-center gap-2"
            >
              <Col style={{ minHeight: "220px" }} xm={12} sm={2}>
                <img className="img-fluid" src={product.productId.image} />
              </Col>
              <Col xm={12} sm={2}>
                {product.productId.title}
              </Col>
              <Col xm={12} sm={2}>
                ₹{product.productId.price}
              </Col>
              <Col xm={12} sm={2}>
                <Button
                  onClick={() => removeQuantity(product.productId._id)}
                  className="btn btn-sm btn-dark fw-bold"
                >
                  -
                </Button>
                <span className="mx-1">{product.quantity}</span>
                <Button
                  onClick={() => addQuantity(product.productId._id)}
                  className="btn btn-sm btn-dark fw-bold"
                >
                  +
                </Button>
              </Col>
              <Col xm={12} sm={2}>
                ₹{product.productId.price * product.quantity}
              </Col>
            </Row>
          ))}

          <div className="d-flex justify-content-between align-items-center p-2 crd-box rounded-3 mt-2">
            <div className=" mt-2 rounded-3 p-2 fw-bold h5">Total</div>
            <div className=" mt-2 rounded-3 p-2 fw-bold h5">₹{totalPrice}</div>

            <div className="me-2">
              <Button className="btn-dark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 mb-1 me-1"
                  height="20px"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                Order
              </Button>
            </div>
          </div>
        </Row>
      </div>
    </Container>
  );
}

export default Cart;
