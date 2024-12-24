import { useEffect, useState } from "react";
import { Table, Container, Button, Row } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";

export const Products = ({ action = "View" }) => {
  // Get theme
  const { theme } = useSelector((state) => state.theme);

  // Set action view
  const actions = {
    action: "View",
    product_api: "product/products",
    action_api: "product/product-details",
  };

  // Set action delete
  if (action === "Delete") {
    (actions.action = "Delete")((product.action_api = "/product/delete-product"));
  }

  // Store products
  const [products, setProducts] = useState([]);

  // Api call
  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: actions.product_api
        });
        // Set products to state
        setProducts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
 

  return (
    <Container>
      <h1 className="text-center text-white mt-5">Product {actions.action} List</h1>
      <Row
        className="mt-5 p-3 rounded-3"
        style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}
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
            {products.map((product) => (
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
                  >
                    {actions.action}
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
