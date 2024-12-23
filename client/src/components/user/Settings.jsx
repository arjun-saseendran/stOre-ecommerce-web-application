import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/esm/Button";
import { axiosInstance } from "../../config/axiosInstance";
import { useFetch } from "../../hooks/useFetch";
import toast from "react-hot-toast";
import { useEffect } from "react";

export const Settings = ({ role = "user" }) => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Config navigate
  const navigate = useNavigate();

  // Config useForm
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      profilePicture: "",
      name: "",
      email: "",
      mobile: "",
    },
  });

  // Set user role
  const user = {
    role: "user",
    update_api: "/user/update-profile",
    profile_api: "/user/profile",
  };

  // Handle seller role
  if (role === "seller") {
    (user.role = "seller"),
      (user.update_api = "/seller/update-profile"),
      (user.profile_api = "/seller/profile");
  }

  // Api call
  const [profile, loading, error] = useFetch(user.profile_api);

  useEffect(() => {
    if (profile) {
      setValue("name", profile.name || "");
      setValue("email", profile.email || "");
      setValue("mobile", profile.mobile || "");
      // Do the same for the profilePicture field if needed
    }
  }, [profile, setValue]);

  // Handle on submit
  const onSubmit = async (data) => {
    try {
      // Create form data
      const formData = new FormData();
      for (const key in data) {
        if (key === "profilePicture") {
          // Check if a file is selected
          if (data.profilePicture && data.profilePicture[0]) {
            formData.append("profilePicture", data.profilePicture[0]);
          }
        } else {
          // Normal field
          formData.append(key, data[key]);
        }
      }

      // Api call
      const response = await axiosInstance({
        method: "PUT",
        url: user.update_api,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);

      toast.success("Profile updated!");
    } catch (error) {
      toast.error("Update failed. Please try again!");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className=" signup-box mt-5 mx-auto d-flex flex-column gap-2 align-items-center justify-content-center rounded-3"
        style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}
      >
        <h3 className="mt-2 fw-bold">Profile</h3>

        <div>
          {profile?.profilePicture && (
            <div>
              <img
                src={profile.profilePicture}
                alt="Profile"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                }}
              />
            </div>
          )}
        </div>
        <div>
          <label
            className=" bg-white text-black file-labal rounded-2 p-1 hover"
            style={{ cursor: "pointer" }}
          >
            Update photo
            <input
              type="file"
              {...register("profilePicture")}
              accept="image/*"
            />
          </label>
        </div>

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
          />
        </div>
        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="text"
            placeholder="Email"
            {...register("email", { required: true })}
          />
        </div>
        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="mobile"
            placeholder="Mobile"
            {...register("mobile", { required: true })}
          />
        </div>
        <div>
          <Button
            className="rounded-2 border-0 px-4 hover py-2 text-center 
            text-white mt-1"
            type="submit"
            variant={theme ? "warning" : "dark"}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};
