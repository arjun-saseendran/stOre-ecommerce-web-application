import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/esm/Button";
import toast from "react-hot-toast";

export const AddBanner = ({ role = "seller" }) => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Config navigate
  const navigate = useNavigate();

  // Config useForm
  const { register, handleSubmit } = useForm();

  // Handle on submit
  const onSubmit = async (data) => {
    try {
      // Create form data
      const formData = new FormData();
      for (const key in data) {
        if (key === "image") {
          // Check if a file is selected
          if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
          }
        } else {
          // Normal field
          formData.append(key, data[key]);
        }
      }

      // Api call
      const response = await axiosInstance({
        method: "POST",
        url: "/banner/add-banner",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Banner added successful");
      if (response) {
        if (role === "seller") {
          navigate("/seller/banners");
        } else if (role === "admin") {
          navigate("/admin/banners");
        }
      }
    } catch (error) {
      toast.error("Banner added  failed. Please try again!");
      console.log(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="banner-box mt-5 mx-auto d-flex flex-column gap-2 align-items-center justify-content-center rounded-3"
        style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9", minHeight: '400px' }}
      >
        <h3 className=" fw-bold">Add New Banner</h3>
        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="text"
            placeholder="Title"
            name="title"
            {...register("title", {
              required: true,
              maxLength: 100,
            })}
          />
        </div>
        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="text"
            placeholder="Color"
            name="color"
            {...register("color", {
              required: true,
              maxLength: 10,
            })}
          />
        </div>

        <div>
          <label className=" bg-white file-labal rounded-2 py-2 px-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 me-1"
              height="20px"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
              />
            </svg>
            Banner image
            <input type="file" {...register("image")} accept="image/*" />
          </label>
        </div>
        <div>
          <Button
            variant={theme ? "warning" : "dark"}
            className="rounded-2 border-0 px-4 hover py-2 text-center  text-white mt-1"
            type="submit"
          >
            {" "}
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
