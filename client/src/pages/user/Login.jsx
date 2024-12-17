import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiHandler } from "../../utils/apiHandler";

function Login() {
  // Get api base url
  const apiUrl = import.meta.env.VITE_API_URL;

  // Set user data
  const [user, setUser] = useState({});

  // Set login
  const [login, setLogin] = useState(false);

  // Config navigate
  const navigate = useNavigate();

  // Handle submit
  const HandleSubmit = async (e) => {
    // Set headers
    const headers = {
      "Content-Type": "application/json",
    };

    // Block refresh page
    e.preventDefault();

    // Api call
    const [response, error] = await apiHandler(
      `${apiUrl}/api/v1/user/login`,
      "POST",
      user,
      headers
    );

    if (response) {
      // Set login
      setLogin(true);
    } else {
      alert("Something went wrong! Try again!");
      console.log(error);
    }
  };

  // Get input
  const handleInput = (e, field) => {
    setUser({ ...user, [field]: e.target.value });
  };

  // Check login
  useEffect(() => {
    if (login) {
      navigate("/");
    }
  }, [login]);

  return (
    <div className="vh-100">
      <form
        onSubmit={HandleSubmit}
        className=" login-box mx-auto mt-5 d-flex flex-column gap-2 align-items-center justify-content-center rounded-3"
      >
        <h3 className="mt-2 fw-bold">Login</h3>

        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="text"
            placeholder="Email"
            required
            onChange={(e) => handleInput(e, "email")}
          />
        </div>

        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="password"
            placeholder="Password"
            required
            onChange={(e) => handleInput(e, "password")}
          />
        </div>

        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 hover text-center bg-black text-white mt-1"
            type="submit"
            value="Login"
          />
        </div>
        <div>
          <span className="text-secondary">Don't have an account?</span>{" "}
          <Link className="text-decoration-none text-black" to={"/signup"}>
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
