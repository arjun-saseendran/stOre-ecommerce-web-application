import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {ProductCard} from "../../components/user/Cards";
import { useFetch } from "../../hooks/useFetch";

export const ProductList = () => {
  // Api call
  const [products, loading, error] = useFetch("/product/products");
  return (
    <Container>
      <Row className="mt-4">
        {products?.map((product) => (
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
};
