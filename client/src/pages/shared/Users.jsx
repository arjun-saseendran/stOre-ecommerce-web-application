import { useEffect, useState } from "react";
import { Table, Container, Button, Row } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Users = ({
  role = "user",
  action = "Activate",
  status = "activate",
}) => {
  // Get theme
  const { theme } = useSelector((state) => state.theme);

  // Config navigate
  const navigate = useNavigate();

  // Get search value
  const { searchResult } = useSelector(status.search);

  // Set user role
  const user = {
    role: "user",
    users: "/user/users",
    userDelete: "user/delete-user",
    activateUser: "/user/activate-user",
    deactivateUser: "/user/deactivate-profile",
    userDetails: "/user/user-details",
  };

  // Handle status
  if (role === "user" && status === "active") {
    user.users = "/user/active-users";
  } else if (role === "user" && status === "inactive") {
    user.users = "/user/inactive-users";
  } else if (role === "seller" && status === "active") {
    user.users = "/seller/active-sellers";
  } else if (role === "seller" && status === "inactive") {
    user.users = "/seller/inactive-sellers";
  }

  // Handle action
  if (action === "Delete" && role === "user") {
    user.userDelete = "/user/delete-user";
  } else if (action === "Activate" && role === "user") {
    user.activateUser = "/user/activate-user";
  } else if (action === "Deactivate" && role === "user") {
    user.deactivateUser = "/user/deactivate-profile";
  } else if (action === "Delete" && role === "seller") {
    user.userDelete = "/seller/delete-seller";
  } else if (action === "Activate" && role === "seller") {
    user.activateUser = "/seller/activate-seller";
  } else if (action === "Deactivate" && role === "seller") {
    user.deactivateUser = "/seller/deactivate-profile";
  }

  // Store users data
  const [users, setUsers] = useState([]);
  const [userDelete, setUserDelete] = useState({});
  const [activeUser, setActiveUser] = useState({});
  const [inactiveUser, setInactiveUser] = useState({});

  // Api call
  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: user.users,
        });
        // Set users to state
        setUsers(response.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userDelete, inactiveUser, activeUser, user.users]);

  console.log(users);

  const actionHandler = async (userId, action) => {
    try {
      if (action === "Delete") {
        const response = await axiosInstance({
          method: "DELETE",
          url: user.userDelete,
          data: { userId },
        });
        setUserDelete(response.data.data);
      } else if (action === "View" && role === "user") {
        navigate(`/admin/user-details/${userId}`);
        return;
      } else if (action === "Deactivate") {
        const response = await axiosInstance({
          method: "PUT",
          url: user.deactivateUser,
          data: { userId },
        });

        setInactiveUser(response.data.data);
      } else if (action === "Activate") {
        const response = await axiosInstance({
          method: "PUT",
          url: user.activateUser,
          data: { userId },
        });

        setActiveUser(response.data.data);
      } else {
        console.log("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const viewProfile = (userId) => {
    if (role === "seller") {
      navigate(`/admin/seller-details/${userId}`);
      return;
    } else if (role === "user") {
      navigate(`/admin/user-details/${userId}`);
      return;
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
    <Container style={{ minHeight: "500px" }}>
      <h1 className="text-center text-white mt-5">
        List {status} {role}
      </h1>
      <Row
        className="mt-5 p-2 rounded-3"
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
                <td
                  style={{
                    backgroundColor: theme ? "#FFF6E3" : "#d9d9d9",
                    cursor: "pointer",
                  }}
                  onClick={() => viewProfile(user._id)}
                >
                  {user.name}
                </td>

                <td
                  style={{
                    backgroundColor: theme ? "#FFF6E3" : "#d9d9d9",
                    cursor: "pointer",
                  }}
                  onClick={() => viewProfile(user._id)}
                >
                  {user?.email}
                </td>
                <td style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                  <Button
                    onClick={() => actionHandler(user._id, action)}
                    variant={theme ? "warning" : "dark"}
                    className=" text-white btn-sm"
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


