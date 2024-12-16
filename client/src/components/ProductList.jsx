import { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ProductCard from "./ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/product/products")
      .then((response) => setProducts(response.data.data));
  }, []);
  console.log(products);

  return (
    <Container>
      <Row className="mt-4">
        {products.map((product) => (
          <Col className="crd-col" xs={12} sm={6} md={4} xl={3} key={product._id} >
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;
