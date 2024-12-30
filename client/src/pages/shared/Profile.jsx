import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";
import { useFetch } from "../../hooks/useFetch";

export const Profile = ({ role = "user", action }) => {
  // Config navigate
  const navigate = useNavigate();

  // Config params
  const { userId } = useParams();

  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Handle user
  const user = {
    role: "user",
    profile: "/user/profile",
    logout: "/user/logout",
  };

  // Handle seller role
  if (role === "seller") {
    (user.role = "seller"),
      (user.profile = "/seller/profile"),
      (user.logout = "/seller/logout");
  }

  if (role === "user" && action === "Details") {
    user.profile = `/user/user-details/${userId}`;
  } else if (role === "seller" && action === "Details") {
    user.profile = `seller/seller-details/${userId}`;
  } else if (role === "user" && action !== "Details") {
    user.profile = "/user/profile";
  } else if (role === "seller" && action !== "Details") {
    user.profile = "/seller/profile";
  } else if (role === "admin" && action !== "Details") {
    user.profile = "/seller/admin-profile";
  }

  // Api call
  const [profile, loading, error] = useFetch(user.profile);

  // Logout handler
  const handleLogout = async () => {
    try {
      const response = await axiosInstance({
        method: "PUT",
        url: user.logout,
      });
      if (role === "user") {
        navigate("/login");
      } else if (role === "admin") {
        navigate("/admin/login");
      } else if (role === "seller") {
        navigate("/seller/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <form
        encType="multipart/form-data"
        className="signup-box mt-5 d-flex mx-auto flex-column align-items-center justify-content-center gap-2 rounded-3"
        style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}
      >
        <h3 className="mt-2 fw-bold">Profile {action}</h3>

        <div>
          <div className="mb-1">
            <img
              src={profile?.profilePicture}
              height="125px"
              className="rounded-circle"
            />
          </div>
        </div>
        <div className="w-100 px-3">
          <div className="rounded-2 px-3 py-2 bg-white border-0 text-center">
            {profile?.name}
          </div>
        </div>
        <div className="w-100 px-3">
          <div className="rounded-2 px-3 py-2 border-0 text-center bg-white">
            {profile?.email}
          </div>
        </div>
        <div className="w-100 px-3">
          <div className="rounded-2 border-0 px-3 py-2  text-center bg-white">
            {profile?.mobile}
          </div>
        </div>

        <div>
          <Button
            onClick={handleLogout}
            className="rounded-2 border-0  hover py-2 text-center 
            text-white mt-1"
            type="submit"
            variant={theme ? "warning" : "dark"}
          >
            Logout
          </Button>
        </div>
      </form>
    </Container>
  );
};
