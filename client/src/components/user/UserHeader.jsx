import { useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../redux/features/categorySlice";
import { apiHandler } from "../../utils/apiHandler";
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

  const { theme } = useSelector((state) => state.theme);

  // Config navigate
  const navigate = useNavigate();

  // Get api base url
  const apiUrl = import.meta.env.VITE_API_URL;

  // Handle logout
  const handleLogout = async () => {
    const [response, error] = await apiHandler(
      `${apiUrl}/api/v1/user/logout`,
      "POST"
    );
    if (response) {
      console.log(response);
    } else {
      console.error(error);
    }
  };
  
  return (
    <Navbar expand="lg" className={theme ? "bg-warning py-4" : "bg-black py-4"}>
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
            <Nav.Link className="mt-2">
              <span
                onClick={() => {
                  dispatch(setCategory("mobile"));
                  dispatch(setSearchValue(""));
                }}
                className="text-white h5 hover"
              >
                iPhone
              </span>
            </Nav.Link>
            <Nav.Link className="mt-2">
              <span
                onClick={() => {
                  dispatch(setCategory("laptop"));
                  dispatch(setSearchValue(""));
                }}
                className="text-white h5 hover"
              >
                Mackbook
              </span>
            </Nav.Link>
            <Nav.Link className="mt-2">
              <span
                onClick={() => {
                  dispatch(setCategory("ipad"));
                  dispatch(setSearchValue(""));
                }}
                className="text-white h5 hover"
              >
                iPad
              </span>
            </Nav.Link>
            <Nav.Link className="mt-2">
              <span
                onClick={() => {
                  dispatch(setCategory("airpods"));
                  dispatch(setSearchValue(""));
                }}
                className="text-white h5 hover"
              >
                Airpods
              </span>
            </Nav.Link>
            <Nav.Link className="mt-2">
              <span
                onClick={() => {
                  dispatch(setCategory("watch"));
                  dispatch(setSearchValue(""));
                }}
                className="text-white h5 hover"
              >
                Watch
              </span>
            </Nav.Link>
            <NavDropdown
              className="mt-2"
              title={<span className="text-white h5 hover ">Account ↓</span>}
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item>
                <span className="text-black hover">Profile</span>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <span className="text-black hover">Orders</span>
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item as={Link} to={"/cart"}>
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
