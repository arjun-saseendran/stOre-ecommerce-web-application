import { Button, Container, Form, NavDropdown, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DarkMode } from "../shared/DarkMode";

export const AdminHeader = () => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);
  return (
    <Navbar
      expand="lg"
      className={
        theme ? "bg-warning py-4 fixed-top" : "bg-black py-4 fixed-top"
      }
    >
      <Container fluid>
        <Navbar.Brand className="mb-2 me-4" href="#">
          <span className="text-white h1 fw-bold">st</span>
          <span className="text-secondary h1 fw-bolder">O</span>
          <span className="text-white h1 fw-bold">re</span>
        </Navbar.Brand>
        <Navbar.Toggle className="bg-white" aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <NavDropdown
            className="mt-2  my-2 my-lg-0 me-4"
            title={<span className="text-white h5 hover">Admin ↓</span>}
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item>
              <Link to={"/user/profile"} className="text-decoration-none">
                <span className="text-black hover">Profile</span>
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>
              <span className="text-black hover">Orders</span>
            </NavDropdown.Item>

            <NavDropdown.Divider />

            <NavDropdown.Item as={Link} to={"user/cart"}>
              <span className="text-black hover">Cart</span>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to={"user/settings"}>
              <span className="text-black hover">Settings</span>
            </NavDropdown.Item>
            <NavDropdown.Divider />

            <NavDropdown.Item>
              <span role="button" className="text-black hover">
                Logout
              </span>
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            className="mt-2  my-2 my-lg-0 me-3"
            title={<span className="text-white h5 hover">Seller ↓</span>}
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
            className="mt-2  my-2 my-lg-0 me-3"
            title={<span className="text-white h5 hover">User ↓</span>}
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
            className="mt-2  my-2 my-lg-0 me-3"
            title={<span className="text-white h5 hover">Product ↓</span>}
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item as={Link} to={"/admin/products"}>
              <span className="text-black hover">Products</span>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link}>
              <span className="text-black hover">Add</span>
            </NavDropdown.Item>

            <NavDropdown.Divider />

            <NavDropdown.Item as={Link}>
              <span className="text-black hover">Update</span>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link}>
              <span className="text-black hover">Delete</span>
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            className="mt-2  my-2 my-lg-0 me-auto"
            title={<span className="text-white h5 hover">Order ↓</span>}
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item as={Link} to={"/admin/sellers"}>
              <span className="text-black hover">Orders</span>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to={"/admin/inactive-sellers"}>
              <span className="text-black hover">Aprove</span>
            </NavDropdown.Item>

            <NavDropdown.Divider />

            <NavDropdown.Item as={Link} to={"/admin/delete-seller"}>
              <span className="text-black hover">Delete</span>
            </NavDropdown.Item>
          </NavDropdown>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              style={{ background: theme ? "#F5F0CD" : "#D9D9D9" }}
            />
            <Button variant="outline-light">Search</Button>
          </Form>

          <span className="mx-2 mt-1">
            <DarkMode />
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
