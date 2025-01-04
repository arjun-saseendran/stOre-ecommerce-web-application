import { Container, NavDropdown, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { DarkMode } from "../shared/DarkMode";
import { axiosInstance } from "../../config/axiosInstance";

export const AdminHeader = () => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Config navigate
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await axiosInstance({
        method: "PUT",
        url: "/seller/logout",
      });

      if (response) {
        navigate("/admin/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar
      expand="lg"
      className={
        theme ? "bg-warning py-4 fixed-top" : "bg-black py-4 fixed-top"
      }
    >
      <Container fluid>
        <Navbar.Brand className="mb-2 me-4" >
          <Link to={"/admin"} className="text-decoration-none hover">
            <span className="text-white h1 fw-bold">st</span>
            <span className="text-secondary h1 fw-bolder">O</span>
            <span className="text-white h1 fw-bold">re</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle className="bg-white" aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <NavDropdown
            className="mt-2  my-2 my-lg-0 me-4 text-white"
            title={<span className="text-white h5 hover">Admin </span>}
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item>
              <Link to={"/admin/profile"} className="text-decoration-none">
                <span className="text-black hover">Profile</span>
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />

            <NavDropdown.Item as={Link} to={"user/cart"}>
              <span className="text-black hover">Cart</span>
            </NavDropdown.Item>

            <NavDropdown.Divider />

            <NavDropdown.Item>
              <span
                role="button"
                className="text-black hover"
                onClick={handleLogout}
              >
                Logout
              </span>
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            className="mt-2  my-2 my-lg-0 me-3 text-white"
            title={<span className="text-white h5 hover">Seller</span>}
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item as={Link} to={"/admin/sellers"}>
              <span className="text-black hover">Sellers</span>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to={"/admin/inactive-sellers"}>
              <span className="text-black hover">Inactive</span>
            </NavDropdown.Item>
            <NavDropdown.Divider />

            <NavDropdown.Item as={Link} to={"/admin/delete-seller"}>
              <span className="text-black hover">Delete</span>
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            className="mt-2  my-2 my-lg-0 me-3 text-white"
            title={<span className="text-white h5 hover">User</span>}
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item as={Link} to={"/admin/users"}>
              <span className="text-black hover">Users</span>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to={"/admin/inactive-users"}>
              <span className="text-black hover">Inactive</span>
            </NavDropdown.Item>

            <NavDropdown.Divider />

            <NavDropdown.Item as={Link} to={"/admin/delete-user"}>
              <span className="text-black hover">Delete</span>
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            className="mt-2  my-2 my-lg-0 me-3 text-white"
            title={<span className="text-white h5 hover">Product</span>}
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item as={Link} to={"/admin/products"}>
              <span className="text-black hover">Products</span>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to={"/admin/add-product"}>
              <span className="text-black hover">Add</span>
            </NavDropdown.Item>

            <NavDropdown.Divider />

            <NavDropdown.Item as={Link} to={"/admin/delete-product"}>
              <span className="text-black hover">Delete</span>
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            className="mt-2  my-2 my-lg-0 me-3 text-white"
            title={<span className="text-white h5 hover">Banner</span>}
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item as={Link} to={"/admin/banners"}>
              <span className="text-black hover">Banners</span>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to={"/admin/add-banner"}>
              <span className="text-black hover">Add</span>
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            className="mt-2  my-2 my-lg-0 text-white me-auto"
            title={<span className="text-white h5 hover">Order</span>}
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item as={Link} to={"/admin/orders-processing"}>
              <span className="text-black hover">Processing</span>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to={"/admin/orders-success"}>
              <span className="text-black hover">Success</span>
            </NavDropdown.Item>

            <NavDropdown.Divider />

            <NavDropdown.Item as={Link} to={"/admin/orders-shipping"}>
              <span className="text-black hover">Shipping</span>
            </NavDropdown.Item>

            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to={"/admin/orders-delivery"}>
              <span className="text-black hover">Out for delivery</span>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to={"/admin/orders-delivered"}>
              <span className="text-black hover">Delivered</span>
            </NavDropdown.Item>
          </NavDropdown>

          <span className="mx-2 mt-1">
            <DarkMode />
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
