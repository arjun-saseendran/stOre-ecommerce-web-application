import { useRef } from "react";
import { Button, Container, Form, Nav, Navbar, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../redux/features/categorySlice";
import { setSearchValue } from "../../redux/features/searchSlice";
import { DarkMode } from "../../components/shared/DarkMode";
import { HideBanner } from "./HideBanner";

export const Header = () => {
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

  return (
    <Navbar
      expand="lg"
      className={
        theme ? "bg-warning py-4 fixed-top" : "bg-black py-4 fixed-top"
      }
    >
      <Container fluid>
        <Navbar.Brand
          onClick={() => {
            dispatch(setCategory(""));
            dispatch(setSearchValue(""));
          }}
        >
          <Link to={"/"} className="nav-link hover">
            <span className="text-white h1 fw-bold">st</span>
            <span className="text-secondary h1 fw-bolder">O</span>
            <span className="text-white h1 fw-bold">re</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle className="bg-white" aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
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
                Macbook
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
            <Link to={"/login"} className="nav-link mt-2">
              <span className="text-white h5 hover">Login</span>
            </Link>

            <NavItem className="mx-2" style={{ marginTop: 12 }}>
              <span>
                <DarkMode />
              </span>
            </NavItem>
            <NavItem className="mx-2" style={{ marginTop: 15 }}>
              <HideBanner />
            </NavItem>
          </Nav>
          <Form className="d-flex me-auto w-100 mt-2">
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
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
