import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { setSearchValue } from "../features/searchSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../features/categorySlice";
import { apiHandler } from "../utils/apiHandler";
import DarkMode from "./shared/DarkMode";

export const Header = () => {
  // Config dispatch function
  const dispatch = useDispatch();

  // Config navigate
  const navigate = useNavigate();

  // Check user
  const { role } = useSelector((state) => state.role);

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
  useEffect(() => {
    if (!role) {
      navigate("/login");
    }
  }, [role]);

  return (
    <Navbar expand="lg" className="bg-black py-4">
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
              <span className="text-white h5 hover">Account</span>
            </Nav.Link>
            <Nav.Link className="mt-2">
              <span className="text-white h5 hover">Orders</span>
            </Nav.Link>
            <Nav.Link className="mt-2">
              <span className="text-white h5 hover">Wishlist</span>
            </Nav.Link>
            <Nav.Link className="mt-2">
              <span className="text-white h5 hover">Cart</span>
            </Nav.Link>
            <Nav.Link className="mt-2">
              <span className="text-white h5 hover">Settings</span>
            </Nav.Link>
          </Nav>

          <DarkMode/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};


