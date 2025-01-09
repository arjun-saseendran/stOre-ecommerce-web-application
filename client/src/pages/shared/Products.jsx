import { useEffect, useState } from "react";
import { Table, Container, Button, Row } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

export const Products = ({ action = "Update", role = "admin" }) => {
  // Get theme
  const { theme } = useSelector((state) => state.theme);

  // Config navigate
  const navigate = useNavigate();

  // Get search value
  const { searchResult } = useSelector((state) => state.search);

  // Handle routes
  const product = {
    products: "/product/products",
    productDelete: "/product/delete-product",
    searchProducts: "product/search-seller-products",
  };

  // Handle role
  if (role === "seller") {
    product.products = "product/seller-products";
    product.searchProducts = "product/search-seller-products";
  } else if (role === "admin") {
    product.products = "product/products";
    product.searchProducts = "/product/search";
  }

  // Store products
  const [products, setProducts] = useState([]);
  const [deleteProduct, setDeleteProduct] = useState({});

  // Api call
  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: product.products,
        });
        // Set products to state
        if (role === "seller") {
          setProducts(response.data.data.products);
        } else {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [product.products, searchResult, deleteProduct]);

  // Handle actions
  const handleAction = async (productId) => {
    try {
      if (action === "Delete") {
        const response = await axiosInstance({
          method: "DELETE",
          url: product.productDelete,
          data: { productId },
        });
        setDeleteProduct(response.data.data);
      }

      if (action === "Update" && role === "admin") {
        navigate(`/admin/update-product/${productId}`);
      } else if (action === "Update" && role === "seller") {
        navigate(`/seller/update-product/${productId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Api call
  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const response = await axiosInstance({
          method: "POST",
          url: product.searchProducts,
          data: { searchResult },
        });
        setProducts(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (searchResult) {
      fetchSearchData();
    } else {
      setProducts(products);
    }
  }, [searchResult, products, deleteProduct]);

  return (
    <Container style={{ minHeight: "400px" }}>
      <h1
        className={
          theme ? "text-center text-black mt-5" : "text-center text-white mt-5"
        }
      >
        Product {action} List
      </h1>
      <Row
        className="mt-5 p-3 rounded-3"
        style={{
          backgroundColor: theme ? "#FFF6E3" : "#d9d9d9",
        }}
      >
        <Table className="rounded-3">
          <thead className="rounded-3">
            <tr>
              <th style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                Title
              </th>

              <th style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                Stock
              </th>
              <th style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id}>
                <td style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                  <Link
                    className="text-decoration-none text-black"
                    to={
                      role === "admin"
                        ? `/admin/product-details/${product._id}`
                        : `/seller/product-details/${product._id}`
                    }
                  >
                    {" "}
                    {product.title}
                  </Link>
                </td>

                <td style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                  {product?.stock}
                </td>
                <td style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                  <Button
                    variant={theme ? "warning" : "dark"}
                    className=" text-white btn-sm"
                    onClick={() => handleAction(product._id)}
                  >
                    {action}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};
