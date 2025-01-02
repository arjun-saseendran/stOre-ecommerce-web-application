import { useEffect, useState } from "react";
import { Table, Container, Button, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";

export const OrderList = () => {
  // Get theme
  const { theme } = useSelector((state) => state.theme);

  const [orders, setOrders] = useState([])

  // Api call 
  useEffect(()=>{
    const fetchOrders = async()=>{
      try {
        const response = await axiosInstance({
          method: "POST",
          url: "/order/get-orders-by-status",
          data: { status: "processing" },
        });
        console.log(response.data.data);
        setOrders(response?.data?.data)
        
      } catch (error) {
        console.log(error);
        
      }
    }

fetchOrders()
  },[])

  
  

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
                Order ID
              </th>

              <th style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                Status
              </th>

              <th style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                Total Price
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order._id}>
                <td style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                  {order?._id}
                </td>

                <td style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                  {order?.orderStatus}
                </td>

                <td style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                  {order?.totalPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};
