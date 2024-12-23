import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/esm/Button";
import { axiosInstance } from "../../config/axiosInstance";
import { useFetch } from "../../hooks/useFetch";

export const Profile = ({ role = "user" }) => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Confit navigate
  const naviagate = useNavigate();

  // Handle user
  const user = {
    role: "user",
    profile_api: "/user/profile",
    logout_api: "/user/logout",
  };

  // Handle seller role
  if (role === "seller") {
    (user.role = "seller"),
      (user.profile_api = "/seller/profile"),
      (user.logout_api = "/seller/logout");
  }

  // Api call
  const [profile, loading, error] = useFetch(user.profile_api);

  // Logout user
  const userLogout = async () => {
    try {
      const response = await axiosInstance({
        method: "PUT",
        url: user.logout_api,
      });
      if (response) {
        naviagate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        encType="multipart/form-data"
        className=" signup-box mt-5 mx-auto d-flex flex-column gap-2 align-items-center justify-content-center rounded-3"
        style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}
      >
        <h3 className="mt-2 fw-bold">Profile</h3>

        <div>
          <div>
            <img
              src={profile?.profilePicture}
              height="125px"
              className="rounded"
            />
          </div>
        </div>
        <div>
          <div
            className="rounded-2 bg-white border-0 text-center"
            style={{ padding: "8px 105px 8px 105px" }}
          >
            {profile?.name}
          </div>
        </div>
        <div>
          <div
            className="rounded-2 border-0 text-center bg-white"
            style={{ padding: "8px 61px 8px 61px" }}
          >
            {profile?.email}
          </div>
        </div>
        <div>
          <div
            className="rounded-2 border-0  text-center bg-white"
            style={{ padding: "8px 60px 8px 60px" }}
          >
            {profile?.mobile}
          </div>
        </div>

        <div>
          <Button
            onClick={userLogout}
            className="rounded-2 border-0 px-4 hover py-2 text-center 
            text-white mt-1"
            type="submit"
            variant={theme ? "warning" : "dark"}
          >
            Logout
          </Button>
        </div>
      </form>
    </div>
  );
};
