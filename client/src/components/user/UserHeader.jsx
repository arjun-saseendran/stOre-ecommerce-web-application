import { useRef, useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
  NavItem,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../redux/features/categorySlice";
import { axiosInstance } from "../../config/axiosInstance";
import { setSearchValue } from "../../redux/features/searchSlice";
import { DarkMode } from "../../components/shared/DarkMode";
import { CartIcon } from "../shared/CartIcon";
import { HideBanner } from "../shared/HideBanner";
import { setCartData } from "../../redux/features/cartSlice";
import { setWishlistData } from "../../redux/features/wishlistSlice";
import { clearUserData } from "../../redux/features/userSlice";

export const UserHeader = () => {
  // Store cart data
  const [cart, setCart] = useState([]);

  // Store wishlist data
  const [wishlist, setWishlist] = useState([]);

  // Config ref
  const inputValue = useRef();

  // Config navigate
  const navigate = useNavigate("");

  // Config dispatch
  const dispatch = useDispatch();

  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Fetch cart

  const fetchCart = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/cart/cart",
        withCredentials: true,
      });
      setCart(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/user/logout",
        withCredentials:true
      });
      navigate("/login");
      dispatch(clearUserData());
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch wishlist
  const fetchWishlist = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/wishlist/wishlist",
      });
      setWishlist(response.data.data);
     
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

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

  //   // Store cart data to global variable
  useEffect(() => {
    dispatch(setCartData(cart));
    dispatch(setWishlistData(wishlist));
  }, [cart, wishlist]);

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
          <Link to={"/"} className="nav-link text-decoration-none hover">
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
            <NavDropdown
              className="mt-2"
              title={<span className="text-white h5 hover ">Account ↓</span>}
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item as={Link} to={"/user/profile"}>
                <span className="text-black hover">Profile</span>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to={"/user/orders"}>
                <span className="text-black hover">Orders</span>
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item as={Link} to={"user/cart"}>
                <span className="text-black hover">Cart</span>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to={"/user/wishlist"}>
                <span className="text-black hover">Wishlist</span>
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
            <NavItem className="mx-2" style={{ marginTop: 12 }}>
              <DarkMode />
            </NavItem>
            <NavItem className=" mx-2" style={{ marginTop: 15 }}>
              <HideBanner />
            </NavItem>
          </Nav>
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
          <Link to={"/user/cart"}>
            <span className="me-2" style={{ marginTop: 15 }}>
              <CartIcon component={"header"} />
            </span>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
