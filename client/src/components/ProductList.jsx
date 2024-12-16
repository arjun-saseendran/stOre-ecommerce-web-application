import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { apiCall } from "../utils/apiHandler";
import ProductCard from "./ProductCard";

function ProductList() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      const [response, error] = await apiCall(
        `${apiUrl}/product/products`,
        "GET"
      );
      if (response) {
        setProducts(response);
      } else {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Container>
      <Row className="mt-4">
        {products.map((product) => (
          <Col
            className="crd-col"
            xs={12}
            sm={6}
            md={4}
            xl={3}
            key={product._id}
          >
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;
