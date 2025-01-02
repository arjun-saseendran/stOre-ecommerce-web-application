import { useEffect, useState } from "react";
import { Table, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";
import { Link } from "react-router-dom";

export const OrderList = ({ action = "processing", role = "admin" }) => {
  // Get theme
  const { theme } = useSelector((state) => state.theme);

  // Store orders
  const [orders, setOrders] = useState([]);

  // Handle role
  const user = {
    role: 'admin',
    orders: '/order/get-orders-by-status'
  }

  if(role === 'seller'){
    user.role = 'seller',
    user.orders = '/order/get-seller-orders-by-status'
  }

  // Api call
  useEffect(() => {
    const fetchOrders = async () => {

      try {
        const response = await axiosInstance({
          method: "POST",
          url: user.orders,
          data: { status: action },
        });
        console.log(response.data.data);
        setOrders(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, [action, role]);

  return (
    <Container style={{ minHeight: "400px" }}>
      <h1
        className={
          theme ? "text-center text-black mt-5" : "text-center text-white mt-5"
        }
      >
        Order List
      </h1>
      <Row
        className="mt-5 p-2 rounded-3"
        style={{
          backgroundColor: theme ? "#FFF6E3" : "#d9d9d9",
        }}
      >
        <Table className="rounded-3">
          <thead className="rounded-3">
            <tr>
              <th style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                Order ID
              </th>

              <th style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                Date
              </th>

              <th style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order._id}>
                <td
                  style={{
                    backgroundColor: theme ? "#FFF6E3" : "#d9d9d9",
                    cursor: "pointer",
                  }}
                >
                  <Link
                    className="text-decoration-none text-black"
                    to={`/${role}/order-details/${order?._id}`}
                  >
                    {" "}
                    {order?._id}
                  </Link>
                </td>

                <td style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                  <Link
                    className="text-decoration-none text-black"
                    to={`/${role}/order-details/${order?._id}`}
                  >
                    {new Date(order?.createdAt).toLocaleDateString()}
                  </Link>
                </td>

                <td style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                  <Link
                    className="text-decoration-none text-black"
                    to={`/${role}/order-details/${order?._id}`}
                  >
                    {order?.orderStatus}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};
