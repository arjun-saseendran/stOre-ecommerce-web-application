import { useEffect, useState } from "react";
import { Table, Container, Button, Row } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Products = ({ action = "View", role = "admin" }) => {
  // Get theme
  const { theme } = useSelector((state) => state.theme);

  // Config navigate
  const navigate = useNavigate();

  
  // Handle routes
  const product = {
    products: "/product/products",
    productDetails: "/product/product-details/",
    productDelete: "/product/delete-product",
  };

  // Handle role
  if (role === "seller") {
    product.products = "product/seller-products";
  } else if (role === "admin") {
    product.products = "product/products";
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
  }, [product.products, deleteProduct]);

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
      
      if (action === "View" && role === "admin") {
        navigate(`/admin/product-details/${productId}`);
      }else if(action === "View" && role === "seller"){
        navigate(`/seller/product-details/${productId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <h1 className="text-center text-white mt-5">Product {action} List</h1>
      <Row
        className="mt-5 p-3 rounded-3"
        style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9", minHeight: '400px' }}
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
                  {product.title}
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
