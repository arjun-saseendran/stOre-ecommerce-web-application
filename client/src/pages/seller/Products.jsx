import { useEffect, useState } from "react";
import { Table, Container, Button, Row } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";

export const Products = () => {
  // Get theme
  const { theme } = useSelector((state) => state.theme);

  // Store products
  const [products, setProducts] = useState([]);

  // Api call
  useEffect(() => {
    (async () => {
      const response = await axiosInstance({
        method: "GET",
        url: "product/products",
      });
      // Set products to state
      setProducts(response.data.data);
    })();
  }, []);

  return (
    <Container>
      <h1 className="text-center text-white mt-5">Product List</h1>
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
                Actions
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
                    {" "}
                    View
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
