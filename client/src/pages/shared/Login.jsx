import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import Button from "react-bootstrap/esm/Button";
import { useSelector } from "react-redux";

export const Login = ({ role = "user" }) => {
  // Get theme
  const { theme } = useSelector((state) => state.theme);

  // Get user status
  const { isAdminAuth } = useSelector((state) => state.admin);

  //config register
  const { register, handleSubmit } = useForm();

  // config navigate
  const navigate = useNavigate();

  // Set user
  const user = {
    role: "user",
    login_api: "/user/login",
    profile_route: "/user/profile",
    signup_route: "/signup",
    home_route: "/",
  };

  // Handle seller role
  if (role === "seller") {
    user.role = "seller";
    user.login_api = "/seller/login";
    user.profile_route = "/seller/profile";
    user.signup_route = "/seller/signup";
    user.home_route = "/seller";
  }

  const onSubmit = async (data) => {
    try {
      // Api call
      const response = await axiosInstance({
        method: "POST",
        url: user.login_api,
        data,
      });
      toast.success("Login success");

      // Handle admin login
      if (isAdminAuth) {
        return navigate("/admin/products");
      }

      // Navigate to profile page
      navigate(user.home_route);
    } catch (error) {
      toast.error("Login failed");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" login-box mx-auto mt-5 d-flex flex-column gap-2 align-items-center justify-content-center rounded-3"
        style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}
      >
        <h3 className="mt-2 fw-bold text-black">Login {role}</h3>

        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="text"
            {...register("email")}
            placeholder="Email"
            required
          />
        </div>

        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="password"
            {...register("password")}
            placeholder="Password"
            required
          />
        </div>

        <div>
          <Button
            className="rounded-2 border-0 px-4 py-2 hover text-black text-center text-white mt-1"
            type="submit"
            variant={theme ? "warning" : "dark"}
          >
            Login
          </Button>
        </div>
        <div>
          <span className="text-secondary">Don't have an account?</span>{" "}
          <Link
            className="text-decoration-none text-black"
            to={user.signup_route}
          >
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};
