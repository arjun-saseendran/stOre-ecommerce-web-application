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
          ? "bg-warning text-white mt-5 p-5 w-100 m-auto"
          : "bg-black text-white mt-5 p-5 w-100 m-auto"
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
            <Link to={"/design"} className="text-decoration-none text-white">
              Design
            </Link>
          </li>
          <li>
            <Link to={"/marketing"} className="text-decoration-none text-white">
              Marketing
            </Link>
          </li>
          <li>
            <Link
              to={"/advertisement"}
              className="text-decoration-none text-white"
            >
              Advertisement
            </Link>
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
            <Link to={"/contact"} className="text-decoration-none text-white">
              Contact
            </Link>
          </li>
          <li>
            <Link to={"/jobs"} className="text-decoration-none text-white">
              Jobs
            </Link>
          </li>
          <li>
            <Link to={"/press-kit"} className="text-decoration-none text-white">
              Press kit
            </Link>
          </li>
        </ul>
      </Col>
      <Col xs={6} sm={4}>
        <h6 className="text-uppercase font-weight-bold mb-3">Legal</h6>
        <ul className="list-unstyled">
          <li>
            <Link
              to={"/terms-and-conditions"}
              className="text-decoration-none text-white"
            >
              Terms of use
            </Link>
          </li>
          <li>
            <Link
              to={"/privacy-policy"}
              className="text-decoration-none text-white"
            >
              Privacy policy
            </Link>
          </li>
          <li>
            <Link
              to={"/cookie-policy"}
              className="text-decoration-none text-white"
            >
              Cookie policy
            </Link>
          </li>
        </ul>
      </Col>
      <span>Copyright &copy; 2024 store.com</span>
    </Row>
  );
};
