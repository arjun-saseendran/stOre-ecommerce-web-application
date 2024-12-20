import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { DarkMode } from "../shared/DarkMode";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Header = () => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

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
            <Nav.Link to={"/"} as={Link} className="mt-2">
              <span className="text-white h5 hover">Home</span>
            </Nav.Link>
            <Nav.Link to={"/seller/signup"} as={Link} className="mt-2">
              <span className="text-white h5 hover">Become Seller</span>
            </Nav.Link>
            <Nav.Link to={"/seller/login"} as={Link} className="mt-2">
              <span className="text-white h5 hover">Seller Login</span>
            </Nav.Link>
            <Nav.Link as={Link} to={"/signup"} className="mt-2">
              <span className="text-white h5 hover">User Registration</span>
            </Nav.Link>
            <Nav.Link as={Link} to={"/login"} className="mt-2">
              <span className="text-white h5 hover">User Login</span>
            </Nav.Link>
          </Nav>

          <DarkMode />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
