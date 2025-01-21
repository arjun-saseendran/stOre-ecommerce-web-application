import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";
import { useFetch } from "../../hooks/useFetch";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Loading } from "../../components/shared/Loading";

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
  };

  // Handle seller role
  if (role === "seller") {
    (user.role = "seller"),
      (user.profile = "/seller/profile"),
      (user.updateProfile = "/seller/update-profile");
  }

  // Handle admin role
  if (role === "admin") {
    (user.role = "admin"),
      (user.profile = "/admin/profile"),
      (user.updateProfile = "/admin/update-profile");
  }

  if (role === "user" && action === "Details") {
    user.profile = `/user/details/${userId}`;
  } else if (role === "seller" && action === "Details") {
    user.profile = `seller/details/${userId}`;
  } else if (role === "admin" && action === "Details") {
    user.profile = `admin/details/${userId}`;
  } else if (role === "user" && action !== "Details") {
    user.profile = "/user/profile";
  } else if (role === "seller" && action !== "Details") {
    user.profile = "/seller/profile";
  } else if (role === "admin" && action !== "Details") {
    user.profile = "/admin/profile";
  }

  // Api call
  const [profile, loading, error, fetchData] = useFetch(user.profile);

  // Handle profile picture preview
  const [profilePicturePreview, setProfilePicturePreview] = useState("");

  // For update page
  const [profileUpdated, setProfileUpdated] = useState(false);

  // Handle edit
  const [edit, setEdit] = useState(false);

  const profilePictureFile = watch("profilePicture");

  // Update image preview when image file changes
  useEffect(() => {
    if (profilePictureFile && profilePictureFile[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePicturePreview(reader.result);
      reader.readAsDataURL(profilePictureFile[0]);
    }
  }, [profilePictureFile]);

  // Update the value
  useEffect(() => {
    if (profile) {
      setValue("name", profile?.name || "");
      setValue("email", profile?.email || "");
      setValue("mobile", profile?.mobile || "");
      if (profile?.profilePicture) {
        setProfilePicturePreview(profile.profilePicture);
      }
    }
  }, [profile, setValue]);

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

  // Handle update page
  useEffect(() => {
    if (profileUpdated) {
      setProfileUpdated(false);
      fetchData();
    }
  }, [profileUpdated]);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="signup-box mt-5 d-flex mx-auto flex-column align-items-center justify-content-center gap-2 rounded-3"
          style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}
        >
          <h3 className="mt-2 fw-bold">Profile {action}</h3>

          <div>
            <div>
              {profilePicturePreview && (
                <div className="mt-2 ms-4">
                  <img
                    src={profilePicturePreview}
                    alt="Preview"
                    height={"150px"}
                    width={"150px"}
                    className="ms-3 rounded"
                  />
                </div>
              )}
              <label
                className="bg-white file-label rounded-2 mt-2 py-2 px-5"
                style={{ cursor: "pointer" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 mb-1 me-1"
                  height="25px"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                  />
                </svg>
                Update image
                <input
                  type="file"
                  {...register("profilePicture")}
                  accept="image/*"
                />
              </label>
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
              className="rounded-2 border-0  hover py-2 px-5 text-center
            text-white mt-1 me-1"
              type="button"
              variant={theme ? "warning" : "dark"}
            >
              {edit ? "Save" : "Edit"}
            </Button>
          </div>
        </form>
      )}
    </Container>
  );
};
