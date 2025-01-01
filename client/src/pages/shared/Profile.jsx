import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";
import { useFetch } from "../../hooks/useFetch";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const Profile = ({ role = "user", action }) => {
  // Config navigate
  const navigate = useNavigate();

  // Config params
  const { userId } = useParams();

  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Config react form
  const { register, handleSubmit, setValue, watch } = useForm();

  // Handle user
  const user = {
    role: "user",
    profile: "/user/profile",
    updateProfile: "/user/update-profile",
    logout: "/user/logout",
  };

  // Handle seller role
  if (role === "seller") {
    (user.role = "seller"),
      (user.profile = "/seller/profile"),
      (user.updateProfile = "/seller/update-profile"),
        (user.logout = "/seller/logout")
      
  }

  // Handle admin role
  if (role === "admin") {
    (user.role = "admin"),
      (user.profile = "/seller/admin/profile"),
      (user.updateProfile = "/seller/admin/update-profile"),
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
  const [profile, loading, error, fetchData] = useFetch(user.profile);

  // Handle edit
  const [edit, setEdit] = useState(false);

  const profilePictureFile = watch("profilePicture");

  // Handle profile picture preview
  const [profilePicturePreview, setProfilePicturePreview] = useState("");

  // For update page
  const [profileUpdated, setProfileUpdated] = useState(false);

  // Update the value
  useEffect(() => {
    if (profile) {
      setValue("name", profile?.name || "");
      setValue("email", profile?.email || "");
      setValue("mobile", profile?.mobile || "");
      setProfilePicturePreview(profile?.profilePicture || "");
    }
  }, [profile, setValue]);

  // Handle profile picture preview
  useEffect(() => {
    if (profilePictureFile && profilePictureFile[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePicturePreview(reader.result);
      reader.readAsDataURL(profilePictureFile[0]);
    }
  }, [profilePicturePreview]);

  // Handle submit
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (key === "profilePicture" && data.profilePicture[0]) {
          formData.append(key, data.profilePicture[0]);
        } else {
          formData.append(key, data[key]);
        }
      }

      await axiosInstance({
        method: "PUT",
        url: user.updateProfile,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfileUpdated(true);
      toast.success("Profile updated successfully");

      setEdit(false);
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("Profile update failed. Please try again!");
    }
  };

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

  useEffect(() => {
    if (profileUpdated) {
      setProfileUpdated(false);
      fetchData();
    }
  }, [profileUpdated]);

  return (
    <Container>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="signup-box mt-5 d-flex mx-auto flex-column align-items-center justify-content-center gap-2 rounded-3"
        style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}
      >
        <h3 className="mt-2 fw-bold">Profile {action}</h3>

        <div>
          <div>
            {edit ? (
              <div className="mb-2">
                <label className="bg-white file-labal rounded-2 py-2 px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 me-1 mb-1"
                    height="20px"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  Upload New Profile Photo
                  <input
                    type="file"
                    {...register("profilePicture")}
                    accept="image/*"
                  />
                </label>
              </div>
            ) : (
              <div className="mb-1">
                <img
                  src={profilePicturePreview}
                  height="125px"
                  className="rounded-circle"
                />
              </div>
            )}
          </div>
        </div>

        {edit ? (
          <div>
            <input
              className="rounded-2 border-0 px-4 py-2 text-center"
              type="text"
              placeholder="Name"
              {...register("name", {
                required: true,
                minLength: 3,
                maxLength: 30,
              })}
              defaultValue={profile?.name}
            />
          </div>
        ) : (
          <div className="w-100 px-3">
            <div className="rounded-2 px-3 py-2 bg-white border-0 text-center">
              {profile?.name}
            </div>
          </div>
        )}

        {edit ? (
          <div>
            <input
              className="rounded-2 border-0 px-4 py-2 text-center"
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
              defaultValue={profile?.email}
            />
          </div>
        ) : (
          <div className="w-100 px-3">
            <div className="rounded-2 px-3 py-2 border-0 text-center bg-white">
              {profile?.email}
            </div>
          </div>
        )}

        {edit ? (
          <div>
            <input
              className="rounded-2 border-0 px-4 py-2 text-center"
              type="text"
              placeholder="Mobile"
              {...register("mobile", { required: true })}
              defaultValue={profile?.mobile}
            />
          </div>
        ) : (
          <div className="w-100 px-3">
            <div className="rounded-2 border-0 px-3 py-2  text-center bg-white">
              {profile?.mobile}
            </div>
          </div>
        )}

        <div>
          <Button
            onClick={() => (edit ? handleSubmit(onSubmit)() : setEdit(!edit))}
            className="rounded-2 border-0  hover py-2 text-center 
            text-white mt-1 me-1"
            type="button"
            variant={theme ? "warning" : "dark"}
          >
            {edit ? "Save" : "Edit"}
          </Button>
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
