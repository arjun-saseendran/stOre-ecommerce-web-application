import { useSelector } from "react-redux";

export const Footer = () => {

  // Get theme
  const {theme} = useSelector((state)=> state.theme)
  return (
    <footer
      className={
        theme
          ? "w-100 text-white bg-warning mt-5"
          : "w-100 text-white bg-black mt-5"
      }
      style={{ padding: "24px" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h6 className="text-uppercase font-weight-bold mb-3">Services</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-decoration-none text-white">
                  Branding
                </a>
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
          </div>
          <div className="col-md-4">
            <h6 className="text-uppercase font-weight-bold mb-3">Company</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-decoration-none text-white">
                  About us
                </a>
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
          </div>
          <div className="col-md-4">
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
          </div>
        </div>
      </div>
      Copyright &copy; 2024 store.com
    </footer>
  );
};
