import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/esm/Button";
import { axiosInstance } from "../../config/axiosInstance";
import { useFetch } from "../../hooks/useFetch";


export const Profile = ({ role = "user", action }) => {
  // Config navigate
  const navigate = useNavigate();

  // Config params
  const {userId} = useParams()

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
  }else if(role === 'user' && action !== 'Details'){
    user.profile = '/user/profile'
  }else if(role === 'seller' && action !== 'Details'){
    user.profile = '/seller/profile'
  }else if(role === 'admin' && action !== 'Details'){
    user.profile = "/seller/admin-profile";
  }

  // Api call
  const [profile, loading, error] = useFetch(user.profile)

  
  // Logout handler
  const handleLogout = async () => {
    try {
      const response = await axiosInstance({
        method: "PUT",
        url: user.logout,
      });
      if (role === 'user') {
        navigate("/login");
      }else if(role === 'admin'){
        navigate('/admin/login')
      }else if(role === 'seller'){
        navigate('/seller/login')
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
        <h3 className="mt-2 fw-bold">Profile {action}</h3>

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
            onClick={handleLogout}
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
