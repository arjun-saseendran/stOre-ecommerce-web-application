import { useRef } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../redux/features/categorySlice";
import { axiosInstance } from "../../config/axiosInstance";
import { setSearchValue } from "../../redux/features/searchSlice";
import { DarkMode } from "../../components/shared/DarkMode";

export const UserHeader = () => {
  // Config dispatch function
  const dispatch = useDispatch();

  // Config ref
  const inputValue = useRef();

  // Search value
  const handleSearch = () => {
    dispatch(setSearchValue(inputValue.current.value));
  };

  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Config navigate
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await axiosInstance({
        method: "PUT",
        url: "/user/logout",
      });

      if (response) {
        navigate("/login");
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
        <Navbar.Brand href="#">
          <span className="text-white h1 fw-bold">st</span>
          <span className="text-secondary h1 fw-bolder">O</span>
          <span className="text-white h1 fw-bold">re</span>
        </Navbar.Brand>
        <Navbar.Toggle className="bg-white" aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Link to={"/"} className="mt-2 nav-link ">
              <span
                onClick={() => {
                  dispatch(setCategory(""));
                  dispatch(setSearchValue(""));
                }}
                className="text-white h5 hover"
              >
                Home
              </span>
            </Link>
            <Link to={"/"} className="mt-2 nav-link">
              <span
                onClick={() => {
                  dispatch(setCategory("mobile"));
                  dispatch(setSearchValue(""));
                }}
                className="text-white h5 hover"
              >
                iPhone
              </span>
            </Link>
            <Link to={"/"} className="mt-2 nav-link">
              <span
                onClick={() => {
                  dispatch(setCategory("laptop"));
                  dispatch(setSearchValue(""));
                }}
                className="text-white h5 hover"
              >
                Mackbook
              </span>
            </Link>
            <Link to={"/"} className="mt-2 nav-link">
              <span
                onClick={() => {
                  dispatch(setCategory("ipad"));
                  dispatch(setSearchValue(""));
                }}
                className="text-white h5 hover"
              >
                iPad
              </span>
            </Link>
            <Link to={"/"} className="mt-2 nav-link">
              <span
                onClick={() => {
                  dispatch(setCategory("airpods"));
                  dispatch(setSearchValue(""));
                }}
                className="text-white h5 hover"
              >
                Airpods
              </span>
            </Link>
            <Link to={"/"} className="mt-2 nav-link">
              <span
                onClick={() => {
                  dispatch(setCategory("watch"));
                  dispatch(setSearchValue(""));
                }}
                className="text-white h5 hover"
              >
                Watch
              </span>
            </Link>
            <NavDropdown
              className="mt-2"
              title={<span className="text-white h5 hover ">Account ↓</span>}
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
                <span
                  role="button"
                  className="text-black hover"
                  onClick={handleLogout}
                >
                  Logout
                </span>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              ref={inputValue}
              style={{ background: theme ? "#F5F0CD" : "#D9D9D9" }}
            />
            <Button variant="outline-light" onClick={handleSearch}>
              Search
            </Button>
            <span className="mx-2 mt-1">
              <DarkMode />
            </span>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
