import { useEffect, useState } from "react";
import { Table, Container, Button, Row } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";

export const InactiveUsers = ({ role = "user" }) => {
  // Get theme
  const { theme } = useSelector((state) => state.theme);

  // Set user role
  const user = {
    role: "user",
    inactive_users_api: "/user/users-inactive",
    activate_user_api: "/user/activate-user",
  };

  // Handle seller role
  if (role === "seller") {
    (user.inactive_users_api = "/seller/sellers-inactive"),
      (user.activate_user_api = "/seller/activate-seller");
  }

  // Store users
  const [users, setUsers] = useState([]);

  // Store status
  const [userActive, setUserActive] = useState(false);

  // Api call
  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: user.inactive_users_api
        });
        // Set users to state
        setUsers(response.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userActive]);

  // Handle Activate

  const activeUser = async (userId) => {
    try {
      const response = await axiosInstance({
        method: "PUT",
        url: user.activate_user_api,
        data: { userId },
      });
      console.log(response);
      
      setUserActive(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <h1 className="text-center text-white mt-5">Inactive {role} List</h1>
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
                Actions
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
                    onClick={() => activeUser(user._id)}
                  >
                    Activate
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
