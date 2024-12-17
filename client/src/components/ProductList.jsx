import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { apiHandler } from "../utils/apiHandler";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie'

function ProductList() {
  // Get category state
  const selectedCategory = useSelector((state) => state.category);

  // Config navigate
  const navigate = useNavigate()

  // Config cookies
  const cookies = new Cookies();

  // Get apiUrl
  const apiUrl = import.meta.env.VITE_API_URL;

  // Create products state for api products
  const [products, setProducts] = useState([]);

  // Check login
  const token = cookies.get('token')

  // If not token redirct to login page
  if(!token) navigate('/login')

  // Api call using useEffect hook
  useEffect(() => {
    (async () => {
      const [response, error] = await apiHandler(
        `${apiUrl}/api/v1/product/products`,
        "GET"
      );
      if (response) {
        setProducts(response);
      } else {
        console.log(error);
      }
    })();
  }, [apiUrl]);

  // Filter products based on selected category
  const filterProducts = selectedCategory.category
    ? products.filter(
        (product) => product.category === selectedCategory.category
      )
    : products;

  return (
    <Container>
      <Row className="mt-4">
        {filterProducts.map((product) => (
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
