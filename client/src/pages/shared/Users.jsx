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
  const { searchResult } = useSelector((state) => state.search);

  // Set user role
  const user = {
    users: "/user/users",
    userDelete: "user/delete-user",
    activateUser: "/user/activate-user",
    deactivateUser: "/user/deactivate-profile",
    userDetails: "/user/user-details",
    searchUsers: "user/search-active-users",
  };

  // Handle seller role
  if (role === "seller") {
    user.users =
      status === "active"
        ? "/seller/active-sellers"
        : "/seller/inactive-sellers";
    user.userDelete = "/seller/delete-seller";
    user.activateUser = "/seller/activate-seller";
    (user.deactivateUser = "seller/deactivate/profile"),
      (user.searchUsers =
        status === "active"
          ? "/seller/search-active-sellers"
          : "seller/search-inactive-sellers");
  } else if (status === "inactive") {
    user.users = "/user/inactive-users";
    user.searchUsers = "/user/search-inactive-users";
  } else if (status === "active") {
    user.users = "/user/active-users";
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
  const [userStatus, setUserStatus] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);

  // Api call
  useEffect(() => {
    const fetchUserData = async () => {
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
    };
    fetchUserData();
  }, [user.users, userStatus, deleteUser, searchResult]);

  const actionHandler = async (userId, action) => {
    try {
      if (action === "Delete") {
        const response = await axiosInstance({
          method: "DELETE",
          url: user.userDelete,
          data: { userId },
        });
        setUsers((prevUsers) => prevUsers.filter((u) => u._id !== userId));
        // Update userdata
        setDeleteUser(true);
      } else if (action === "View" && role === "user") {
        navigate(`/admin/user-details/${userId}`);
      } else if (action === "Deactivate") {
        const response = await axiosInstance({
          method: "PUT",
          url: user.deactivateUser,
          data: { userId },
        });

        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u._id === userId
              ? { ...u, status: "inactive", ...response.data.data }
              : u
          )
        );
        // Update user data
        setUserStatus(false);
      } else if (action === "Activate") {
        const response = await axiosInstance({
          method: "PUT",
          url: user.activateUser,
          data: { userId },
        });
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u._id === userId
              ? { ...u, status: "active", ...response.data.data }
              : u
          )
        );
        // Update user data
        setUserStatus(true);
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
          url: user.searchUsers,
          data: { searchResult },
        });
        setUsers(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (searchResult) {
      fetchSearchData();
    } else {
      setUsers(users);
    }
  }, [searchResult, user.searchUsers]);

  return (
    <Container style={{ minHeight: "500px" }}>
      <h1
        className={
          theme ? "text-center text-black mt-5" : "text-center text-white mt-5"
        }
      >
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
