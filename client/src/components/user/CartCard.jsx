import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import { useSelector } from "react-redux";

export const CartCard = ({ product, addQuantity, removeQuantity }) => {
  
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className="p-2 mx-4 rounded-3 d-flex justify-content-center align-items-center">
      <Row
        className="rounded-3 p-2 d-flex justify-content-around align-items-center gap-2"
        style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}
      >
        <Col style={{ minHeight: "220px" }} xs={12} sm={2}>
          <img className="img-fluid" src={product.productId.image} />
        </Col>
        <Col xs={12} sm={2}>
          {product.productId.title}
        </Col>
        <Col xs={12} sm={2}>
          ₹{product.price}
        </Col>
        <Col xs={12} sm={2}>
          <Button
            onClick={() => {
              removeQuantity(product?.productId._id);
            }}
            className={
              theme ? "btn btn-sm btn-warning fw-bold text-white" : "btn-dark"
            }
          >
            -
          </Button>
          <span className="mx-1">{product.quantity}</span>
          <Button
            onClick={() => {
              addQuantity(product?.productId?._id);
            }}
            className={
              theme ? "btn btn-sm btn-warning fw-bold text-white" : "btn-dark"
            }
          >
            +
          </Button>
        </Col>
        <Col xs={12} sm={2}>
          ₹{product.productId.price * product.quantity}
        </Col>
      </Row>
    </div>
  );
};
