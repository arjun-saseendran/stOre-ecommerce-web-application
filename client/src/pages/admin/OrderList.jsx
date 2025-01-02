import { useEffect, useState } from "react";
import { Table, Container, Button, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useFetch } from "../../hooks/useFetch";

export const OrderList = () => {
  // Get theme
  const { theme } = useSelector((state) => state.theme);

  const [productsData, setProductsData] = useState([])

  const [orders,loading, error] = useFetch('/order/get-orders')

  console.log(orders);
  

  return (
    <Container>
      <h1 className="text-center text-white mt-5">Order List</h1>
      <Row
        className="mt-5 p-2 rounded-3"
        style={{
          backgroundColor: theme ? "#FFF6E3" : "#d9d9d9",
          minHeight: "400px",
        }}
      >
        <Table className="rounded-3">
          <thead className="rounded-3">
            <tr>
              <th style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                Product
              </th>

              <th style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                Quantity
              </th>
              
              <th style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {products?.map((product) => (
              <tr key={product._id}>
                <td style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                  {product.title}
                </td>

                <td style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                  {20}
                </td>
               
                <td style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                  <Button
                    variant={theme ? "warning" : "dark"}
                    className=" text-white btn-sm"
                    onClick={() => approveOrder(product._id)}
                  >
                    Approve
                    
                  </Button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};
