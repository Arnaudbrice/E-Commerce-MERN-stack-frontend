import React, { useState } from "react";
import { toast } from "react-toastify";
import { customErrorMessage } from "../../utils/customErrorMessage.js";
import { useNavigate } from "react-router";
import useProducts from "../hooks/useProducts.jsx";
import useCategories from "../hooks/useCategories.jsx";

const AddProduct = () => {
  const navigate = useNavigate();

  const { products, setProducts } = useProducts();

  const { categories, setCategories } = useCategories();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [imageFile, setImageFile] = useState(null);
  const [formState, setFormState] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    stock: 0,
  });

  const [isClicked, setIsClicked] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleFileChange = (event) => {
    const { files } = event.target;
    console.log("files", files);

    if (files.length > 0) {
      //a file was selected
      const file = files[0];
      setImageFile(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsClicked(true);

      // validate image

      if (!imageFile) {
        toast.error("Please select an image");
        setIsClicked(false);
        return;
      }

      if (
        !formState.title ||
        !formState.price ||
        !formState.description ||
        !formState.category
      ) {
        toast.error("Please fill in all required fields");
        setIsClicked(false);
        return;
      }

      // Validate and format price
      const price = parseFloat(formState.price);
      if (isNaN(price) || price < 0 || price > 999999.99) {
        toast.error("Price must be a valid number between 0 and 999,999.99");
        setIsClicked(false);
        return;
      }

      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("title", formState.title);
      formData.append("price", price.toFixed(2)); // Convert price to string with 2 decimal places
      formData.append("description", formState.description);
      formData.append("category", formState.category);
      formData.append("stock", formState.stock);

      /*  for (let pair of formData.entries()) {
        // Debugging: Log FormData
        console.log(`${pair[0]}: ${pair[1]}`);
      } */
      const response = await fetch(`${baseUrl}/users/products`, {
        method: "POST",
        body: formData, //pass the form data as the request body (stringify not needed, browser will also set content type automatically)
        credentials: "include",
      });
      if (!response.ok) {
        const { message } = await response.json();
        customErrorMessage(message, 5000);
        return;
      }

      const product = await response.json();

      setProducts([...products, product]);

      toast.success("Product added successfully!");
      navigate("/");

      // Reset form
      setFormState({
        title: "",
        price: "",
        description: "",
        category: "",
        stock: 0,
      });
      setImageFile(null);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsClicked(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full  flex items-center justify-center bg-base-200  ">
      <fieldset className="fieldset w-full max-w-xl text-lg p-6 bg-base-100 border border-white rounded-2xl shadow-lg space-y-2 ">
        <legend className="fieldset-legend text-2xl font-semibold text-center  border-4 border-double  border-secondary text-base-content rounded-lg p-2">
          Add Product
        </legend>
        {/* Upload Image */}
        <div>
          <label className="label" htmlFor="imageFile">
            Upload Image
          </label>
          <input
            className="file-input file-input-secondary  file-input-lg w-full    rounded-lg border-1  border-white "
            type="file"
            id="imageFile"
            name="imageFile"
            onChange={handleFileChange}
            placeholder="Image"
          />
        </div>

        {/* Title */}

        <div>
          <label className="label" htmlFor="title">
            Title
          </label>
          <input
            className="input input-border input-lg w-full  inset-ring rounded-lg"
            type="text"
            id="title"
            name="title"
            value={formState.title}
            onChange={handleChange}
            placeholder="Title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="label" htmlFor="description">
            Description
          </label>
          <textarea
            className="textarea textarea-lg textarea-border  w-full  inset-ring rounded-lg overflow-y-scroll  "
            id="description"
            name="description"
            value={formState.description}
            onChange={handleChange}
            placeholder="Description"></textarea>
        </div>

        {/* Price */}
        <div>
          <label className="label" htmlFor="price">
            Price
          </label>
          <input
            className="input input-border input-lg w-full  inset-ring rounded-lg"
            type="number"
            step="0.01"
            id="price"
            name="price"
            value={formState.price}
            onChange={handleChange}
            placeholder="Price"
          />
        </div>

        {/* Stock */}

        <div>
          <label className="label" htmlFor="stock">
            Stock
          </label>
          <input
            className="input input-border input-lg w-full  inset-ring rounded-lg"
            type="number"
            id="stock"
            name="stock"
            value={formState.stock}
            onChange={handleChange}
            placeholder="Stock"
            min="0"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category">Category</label>
          <select
            className="select select-lg  w-full inset-ring rounded-lg "
            name="category"
            value={formState.category}
            onChange={handleChange}
            id="category">
            <option value="">-- Select a category --</option>

            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          className="btn btn-lg rounded-lg btn-secondary"
          type="submit"
          disabled={isClicked}>
          {isClicked ? "Adding..." : "Add Product"}
        </button>
      </fieldset>
    </form>
  );
};

export default AddProduct;
