import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { apiHandler } from "../utils/apiHandler";
import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProducts } from "../features/productSlice";
import { setHome } from "../features/homeSlice";

function Home() {
  // config dispatch
  const dispatch = useDispatch();

  // Set home
  useEffect(() => {
    dispatch(setHome(true));
  }, []);

  // Get category state
  const selectedCategory = useSelector((state) => state.category);

  // Check user
  const { role } = useSelector((state) => state.role);

  // Get search value
  const { search } = useSelector((state) => state.search);

  // Get apiUrl
  const apiUrl = import.meta.env.VITE_API_URL;

  // Config navigate
  const navigate = useNavigate();

  // When page render
  useEffect(() => {
    // If not token redirct to login page
    if (!role) {
      navigate("/login");
    }
  }, [role]);

  // Create products state for api products
  const [products, setProducts] = useState([]);

  const renderProducts = useSelector((state) => state.products);

  // Api call using useEffect hook
  useEffect(() => {
    (async () => {
      const [response, error] = await apiHandler(
        `${apiUrl}/api/v1/product/products`,
        "GET"
      );
      if (response) {
        // Set products to local state
        setProducts(response);
      } else {
        console.log(error);
      }
    })();
  }, [apiUrl]);

  // Set products to global state
  useEffect(() => {
    {
      dispatch(addProducts(products));
    }
  }, [products]);

  // Filter products based on selected category
  let filterProducts = selectedCategory.category
    ? products.filter(
        (product) => product.category === selectedCategory.category
      )
    : products;

  // Search filter
  if (search) {
    filterProducts = filterProducts.filter((value) =>
      value.title.toLowerCase().includes(search.toLowerCase())
    );
  }

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

export default Home;
