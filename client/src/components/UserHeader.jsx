import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavScrollExample() {
  return (
    <Navbar expand="lg" className="bg-black">
      <Container fluid>
        <Navbar.Brand className="text-white ps-3" href="#">
          stOre
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll ">
          <Nav className="me-auto my-2 my-lg-0 py-3" navbarScroll>
            <Nav.Link className="text-white" href="#action1">
              Home
            </Nav.Link>
            <Nav.Link className="text-white" href="#action2">
              Order
            </Nav.Link>
            <Nav.Link className="text-white" href="#action2">
              Cart
            </Nav.Link>
            <Nav.Link className="text-white" href="#action2">
              Whistlist
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-dark text-white border-light">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
