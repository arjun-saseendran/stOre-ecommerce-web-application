import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

export const handleProductSubmit = async (
  data,
  role,
  navigate,
  endpoint = "/product/add-product"
) => {
  try {
    // Create form data
    const formData = new FormData();
    for (const key in data) {
      if (key === "image" && data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      } else {
        formData.append(key, data[key]);
      }
    }

    // API call
    const response = await axiosInstance({
      method: "POST",
      url: endpoint,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response && role === "seller") {
      navigate("/seller");
    } else if (response && role === "admin") {
      navigate("/admin");
    }

    toast.success("Operation successful");
  } catch (error) {
    toast.error("Operation failed. Please try again!");
    console.error(error);
  }
};
