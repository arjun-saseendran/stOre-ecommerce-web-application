import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

export const Footer = () => {
  // Get theme
  const { theme } = useSelector((state) => state.theme);
  return (
    <Row
      className={
        theme
          ? "bg-warning text-white mt-5 p-5"
          : "bg-black text-white mt-5 p-5 "
      }
    >
      <Col xs={6} sm={4}>
        <h6 className="text-uppercase font-weight-bold mb-3">BUSINESS</h6>
        <ul className="list-unstyled">
          <li>
            <Link
              to={"/seller/signup"}
              className="text-decoration-none text-white"
            >
              Sell on stOre
            </Link>
          </li>
          <li>
            <a href="#" className="text-decoration-none text-white">
              Design
            </a>
          </li>
          <li>
            <a href="#" className="text-decoration-none text-white">
              Marketing
            </a>
          </li>
          <li>
            <a href="#" className="text-decoration-none text-white">
              Advertisement
            </a>
          </li>
        </ul>
      </Col>
      <Col xs={6} sm={4}>
        <h6 className="text-uppercase font-weight-bold mb-3">Company</h6>
        <ul className="list-unstyled">
          <li>
            <Link to={"/about-us"} className="text-decoration-none text-white">
              About us
            </Link>
          </li>
          <li>
            <a href="#" className="text-decoration-none text-white">
              Contact
            </a>
          </li>
          <li>
            <a href="#" className="text-decoration-none text-white">
              Jobs
            </a>
          </li>
          <li>
            <a href="#" className="text-decoration-none text-white">
              Press kit
            </a>
          </li>
        </ul>
      </Col>
      <Col xs={6} sm={4}>
        <h6 className="text-uppercase font-weight-bold mb-3">Legal</h6>
        <ul className="list-unstyled">
          <li>
            <a href="#" className="text-decoration-none text-white">
              Terms of use
            </a>
          </li>
          <li>
            <a href="#" className="text-decoration-none text-white">
              Privacy policy
            </a>
          </li>
          <li>
            <a href="#" className="text-decoration-none text-white">
              Cookie policy
            </a>
          </li>
        </ul>
      </Col>
      <span>Copyright &copy; 2024 store.com</span> 
    </Row>
  );
};
