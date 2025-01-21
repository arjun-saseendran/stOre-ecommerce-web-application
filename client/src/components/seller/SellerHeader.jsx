import { Container, Navbar, NavDropdown, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { DarkMode } from "../shared/DarkMode";
import { axiosInstance } from "../../config/axiosInstance";
import { useRef } from "react";
import { setSearchValue } from "../../redux/features/searchSlice";

export const SellerHeader = () => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Config dispatch
  const dispatch = useDispatch();

  // Config ref
  const inputValue = useRef();

  // Config navigate
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/seller/logout",
      });

      if (response) {
        navigate("/seller/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Search value
  const handleSearch = () => {
    dispatch(setSearchValue(inputValue.current.value));
  };

  // Handler enter key press
  const handleKeyDown = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };
  return (
    <Navbar
      expand="lg"
      className={
        theme ? "bg-warning py-4 fixed-top" : "bg-black py-4 fixed-top"
      }
    >
      <Container fluid>
        <Navbar.Brand className="me-4">
          <Link to={"/seller"} className="nav-link hover">
            <span className="text-white h1 fw-bold">st</span>
            <span className="text-secondary h1 fw-bolder">O</span>
            <span className="text-white h1 fw-bold">re</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle className="bg-white" aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <NavDropdown
            className="mt-2 me-4 text-white"
            title={<span className="text-white h5 hover">Seller </span>}
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item>
              <Link to={"/seller/profile"} className="text-decoration-none">
                <span className="text-black hover">Profile</span>
              </Link>
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
            className="mt-2 me-4 text-white"
            title={<span className="text-white h5 hover">Product</span>}
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item as={Link} to={"/seller/seller-products"}>
              <span
                className="text-black hover"
                onClick={() => dispatch(setSearchValue(""))}
              >
                Products
              </span>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to={"/seller/add-product"}>
              <span className="text-black hover">Add</span>
            </NavDropdown.Item>

            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to={"/seller/delete-product"}>
              <span
                className="text-black hover"
                onClick={() => dispatch(setSearchValue(""))}
              >
                Delete
              </span>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to={"/seller/return-list-returned"}>
              <span
                className="text-black hover"
                onClick={() => dispatch(setSearchValue(""))}
              >
                Returns
              </span>
            </NavDropdown.Item>

            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to={"/seller/return-list-approved"}>
              <span
                className="text-black hover"
                onClick={() => dispatch(setSearchValue(""))}
              >
                Return: Approved
              </span>
            </NavDropdown.Item>

            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to={"/seller/return-list-rejected"}>
              <span
                className="text-black hover"
                onClick={() => dispatch(setSearchValue(""))}
              >
                Return: Rejected
              </span>
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            className="mt-2 me-4 text-white"
            title={<span className="text-white h5 hover">Banner</span>}
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item as={Link} to={"/seller/banners"}>
              <span
                className="text-black hover"
                onClick={() => dispatch(setSearchValue(""))}
              >
                Banners
              </span>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to={"/seller/add-banner"}>
              <span className="text-black hover">Add</span>
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown
            className="mt-2 text-white me-4"
            title={<span className="text-white h5 hover">Order</span>}
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item as={Link} to={"/seller/orders-processing"}>
              <span
                className="text-black hover"
                onClick={() => dispatch(setSearchValue(""))}
              >
                Processing
              </span>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to={"/seller/orders-success"}>
              <span
                className="text-black hover"
                onClick={() => dispatch(setSearchValue(""))}
              >
                Success
              </span>
            </NavDropdown.Item>

            <NavDropdown.Divider />

            <NavDropdown.Item as={Link} to={"/seller/orders-shipping"}>
              <span
                className="text-black hover"
                onClick={() => dispatch(setSearchValue(""))}
              >
                Shipping
              </span>
            </NavDropdown.Item>

            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to={"/seller/orders-delivery"}>
              <span
                className="text-black hover"
                onClick={() => dispatch(setSearchValue(""))}
              >
                Out for delivery
              </span>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to={"/seller/orders-delivered"}>
              <span
                className="text-black hover"
                onClick={() => dispatch(setSearchValue(""))}
              >
                Delivered
              </span>
            </NavDropdown.Item>
          </NavDropdown>
          <Form className="d-flex mt-2 me-auto w-100" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              ref={inputValue}
              style={{ background: theme ? "#F5F0CD" : "#D9D9D9" }}
            />
            <Button
              variant="outline-light"
              onClick={handleSearch}
              onKeyDown={handleKeyDown}
              className="me-2"
            >
              Search
            </Button>
          </Form>
          <span className="mx-2 mt-1">
            <DarkMode />
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
