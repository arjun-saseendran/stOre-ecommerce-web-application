import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCategory } from "../../features/categorySlice";

function UserHeader() {
  // Config dispatch function
  const dispatch = useDispatch();

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
            <Link className="mt-2 nav-link ">
              <span className="text-white h5 hover">Home</span>
            </Link>
            <Link className="mt-2 nav-link">
              <span
                onClick={() => dispatch(setCategory("mobile"))}
                className="text-white h5 hover"
                role="button"
              >
                iPhone
              </span>
            </Link>
            <Nav.Link className="mt-2">
              <span
                onClick={() => dispatch(setCategory("laptop"))}
                className="text-white h5 hover"
              >
                Mackbook
              </span>
            </Nav.Link>
            <Nav.Link className="mt-2">
              <span
                onClick={() => dispatch(setCategory("ipad"))}
                className="text-white h5 hover"
              >
                iPad
              </span>
            </Nav.Link>
            <Nav.Link className="mt-2">
              <span
                onClick={() => dispatch(setCategory("airpods"))}
                className="text-white h5 hover"
              >
                Airpods
              </span>
            </Nav.Link>
            <Nav.Link className="mt-2">
              <span
                onClick={() => dispatch(setCategory("watch"))}
                className="text-white h5 hover"
              >
                Watch
              </span>
            </Nav.Link>
            <NavDropdown
              className="mt-2"
              title={<span className="text-white h5 hover ">Profile ↓</span>}
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item>
                <span className="text-black hover">Orders</span>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <span className="text-black hover">Wishlist</span>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <span className="text-black hover">Cart</span>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              style={{ background: "#D9D9D9" }}
            />
            <Button variant="outline-light">Search</Button>
          </Form>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-2 text-white m-2"
            height="30px"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default UserHeader;
