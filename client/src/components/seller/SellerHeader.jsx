import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DarkMode } from "../shared/DarkMode";

export const SellerHeader = () => {
  
  // Get current theme
const {theme} = useSelector((state)=> state.theme)
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
            <Link to={"/seller"} className="mt-2 nav-link ">
              <span className="text-white h5 hover">SellerZone</span>
            </Link>
            <Link to={"/seller/profile"} className="mt-2 nav-link">
              <span className="text-white h5 hover" role="button">
                Profile
              </span>
            </Link>
            <Link to={"/seller/add-product"} className="mt-2 nav-link">
              <span className="text-white h5 hover">Add Product</span>
            </Link>
            <Link className="mt-2 nav-link">
              <span className="text-white h5 hover">All Orders</span>
            </Link>
          </Nav>
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
