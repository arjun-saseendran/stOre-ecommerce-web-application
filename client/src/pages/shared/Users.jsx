import { useEffect, useState } from "react";
import { Table, Container, Button, Row } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";

export const Users = ({ role = "user" }) => {
  // Get theme
  const { theme } = useSelector((state) => state.theme);

  // Set user role
  const user = {
    role: "user",
    users_api: "/user/users",
    users_details: "/user/user-details",
  };

  // Handle seller role
  if (role === "seller") {
    (user.role = "seller"),
      (user.users_api = "/seller/sellers"),
      (user.users_details = "/seller/seller-details");
  }

  // Store users
  const [users, setUsers] = useState([]);

  // Api call
  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: user.users_api,
        });
        // Set users to state
        setUsers(response.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Container>
      <h1 className="text-center text-white mt-5">List {role}</h1>
      <Row
        className="mt-5 p-3 rounded-3"
        style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}
      >
        <Table className="rounded-3">
          <thead className="rounded-3">
            <tr>
              <th style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                Name
              </th>

              <th style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                Email
              </th>
              <th style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                  {user.name}
                </td>

                <td style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                  {user?.email}
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
