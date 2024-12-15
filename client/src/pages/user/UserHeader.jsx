import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function UserHeader() {
  return (
    <Navbar expand="lg" className="bg-black py-4">
      <Container fluid>
        <Navbar.Brand href="#">
          <span className="text-white h1">stOre</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link className="mt-2" href="#action1">
              <span className="text-white h5">Home</span>
            </Nav.Link>
            <Nav.Link className="mt-2" href="#action1">
              <span className="text-white h5">iPhone</span>
            </Nav.Link>
            <Nav.Link className="mt-2" href="#action1">
              <span className="text-white h5">Mackbook</span>
            </Nav.Link>
            <Nav.Link className="mt-2" href="#action1">
              <span className="text-white h5">iPad</span>
            </Nav.Link>
            <Nav.Link className="mt-2" href="#action1">
              <span className="text-white h5">Airpods</span>
            </Nav.Link>
            <Nav.Link className="mt-2" href="#action1">
              <span className="text-white h5">Apple Watch</span>
            </Nav.Link>
            <NavDropdown
              className="mt-2"
              title={<span className="text-white h5 ">Profile ↓</span>}
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="#action4">
                <span className="text-black">Orders</span>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                <span className="text-black">Wishlist</span>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                <span className="text-black">Cart</span>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default UserHeader;
