import { useEffect, useState } from "react";
import { Table, Container, Button, Row } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";

export const Users = ({ role = "user", action = "View" }) => {
  // Get theme
  const { theme } = useSelector((state) => state.theme);

  // Set user role
  const user = {
    role: "user",
    users_api: "/user/users",
    user_view: "/user/user-details",
    user_delete: "user/delete-user",
    inactive_users_api: "/user/users-inactive",
    activate_user: "/user/activate-user",
    deactivate_user: "/user/deactivate-user",
  };

  // Handle seller role
  if (role === "seller") {
    (user.role = "seller"),
      (user.users_api = "/seller/sellers"),
      (user.user_view = "/seller/seller-details"),
      (user.user_delete = "seller/delete-seller");
      (user.inactive_users_api = "/seller/sellers-inactive"),
      (user.activate_user = "/seller/activate-seller");
      (user.deactivate_user = "/seller/deactivate-seller");
  }

  

  // Handle action
  if (action === "View" && role === "user") {
      user.user_view = "/user/user-details";
  }else if(action === "Delete" && role === "user"){
     user.user_delete = "user/delete-user",
  }else if(action === "Activate" && role === "user"){
    user.activate_user = "/user/activate-user",
  }else if(action === "Deactivate" && role === "user"){
    user.deactivate_user = "/user/deactivate-user",
  }else if(action === "View" && role === "seller"){
    user.user_view = "/seller/seller-details";
  }else if(action === "Delete" && role === "seller"){
     user.user_delete = "seller/delete-seller",
  }else if(action === "Activate" && role === "seller"){
    user.activate_user = "/seller/activate-seller",
  }else if(action === "Deactivate" && role === "seller"){
    user.deactivate_user = "/seller/deactivate-seller"
  }else{
    console.log('Something went wrong!');
    
  }
  
  

  // Store users
  const [users, setUsers] = useState([]);

  // Store status
  const [deleteUser, setDeleteUser] = useState({});

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
  }, [deleteUser]);

  const actionHandler = async (userId, action) => {
    try {
      if(action === 'Delete'){
        const response = await axiosInstance({
        method: "DELETE",
        url: user.user_delete,
        data: { userId }});
       }else if(action === 'View'){
      const response = await axiosInstance({
        method: "GET",
        url: user.user_view,
        data: { userId }});
       }else if(action === 'Deactivate'){
      const response = await axiosInstance({
        method: "PUT",
        url: user.deactivate_user,
        data: { userId }});
       }else if(action === 'Activate'){
      const response = await axiosInstance({
        method: "PUT",
        url: user.activate_user,
        data: { userId }});
       }else{
        console.log('Something went wrong!');
        
       }
      
        setDeleteUser(response.data.data);
} catch (error) {
      console.log(error);
    }
  };

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
