import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiHandler } from "../../utils/apiHandler";

function AddNewProduct() {
  // Get api base url
  const apiUrl = import.meta.env.VITE_API_URL;

  // Set product
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  // Handle submit
  const handleSubmit = async (e) => {
    // Block refresh
    e.preventDefault();

    // Handle file
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    // Set form data
    const newProduct = new FormData();
    newProduct.append("title", product.title);
    newProduct.append("description", product.description);
    newProduct.append("price", product.price);
    newProduct.append("stock", product.stock);
    newProduct.append("image", product.image);
    newProduct.append("category", product.category);

    // Api call
    const [response, error] = await apiHandler(
      `${apiUrl}/api/v1/product/add-product`,
      "POST",
      product,
      headers
    );

    // Check response
    if (response) {
      alert("Product added successfully");
      navigate("/");
    } else {
      alert("Something went wrong! Try again!");
      console.log(error);
    }
  };

  // Get input
  const handleInput = (e, field) => {
    setProduct({ ...product, [field]: e.target.value });
  };

  // Handle file
  const handleImage = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  return (
    <div className="vh-100">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className=" signup-box mt-5 mx-auto d-flex flex-column gap-2 align-items-center justify-content-center rounded-3"
      >
        <h3 className="mt-2 fw-bold">Add New Product</h3>
        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="text"
            placeholder="Title"
            name="title"
            required
            maxLength="100"
            onChange={(e) => handleInput(e, "title")}
          />
        </div>
        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="text"
            placeholder="Description"
            name="description"
            required
            minLength="20"
            maxLength="300"
            onChange={(e) => handleInput(e, "description")}
          />
        </div>
        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="number"
            placeholder="Price"
            name="price"
            required
            onChange={(e) => handleInput(e, "price")}
          />
        </div>
        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="number"
            placeholder="Stock"
            name="stock"
            onChange={(e) => handleInput(e, "stock")}
          />
        </div>
        <div>
          <input
            className="rounded-2 border-0 px-4 py-2 text-center"
            type="text"
            placeholder="Category"
            name="category"
            onChange={(e) => handleInput(e, "category")}
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
            Product image
            <input type="file" name="file" onChange={handleImage} />
          </label>
        </div>
        <div>
          <input
            className="rounded-2 border-0 px-4 hover py-2 text-center bg-black text-white mt-1"
            type="submit"
            value="Add"
          />
        </div>
      </form>
    </div>
  );
}

export default AddNewProduct;
