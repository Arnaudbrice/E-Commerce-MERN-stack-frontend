import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { customErrorMessage } from "../../utils/customErrorMessage.js";
import { useNavigate } from "react-router";
import useCategories from "../hooks/useCategories.jsx";
import useProducts from "../hooks/useProducts.jsx";

const EditDialog = ({ product }) => {
  console.log("product in EditDialog", product);

  const navigate = useNavigate();

  const { products, setProducts } = useProducts();

  const { categories, setCategories } = useCategories();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [imageFile, setImageFile] = useState(product.image || null);

  const [previewImage, setPreviewImage] = useState(product.image);
  const [formState, setFormState] = useState({
    title: product.title || "",
    price: product.price || "",
    description: product.description || "",
    category: product.category || "",
    stock: product.stock || 0,
  });

  const [isClicked, setIsClicked] = useState(false);

  const [productId, setProductId] = useState(product._id);

  useEffect(() => {
    document.getElementById("editModal").showModal();
  }, [product]);

  useEffect(() => {
    setPreviewImage(product.image);
    setFormState({
      title: product.title || "",
      price: product.price || "",
      description: product.description || "",
      category: product.category || "",
      stock: product.stock || 0,
    });

    setImageFile(product.image || null);

    // update the productId state
    setProductId(product._id);
  }, [product]);

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

      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("product id", product._id);

    try {
      setIsClicked(true);

      // validate image

      console.log("imageFile", imageFile);

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
      // formData.append("image", imageFile);
      formData.append("title", formState.title);
      formData.append("price", price.toFixed(2)); // Convert price to string with 2 decimal places
      formData.append("description", formState.description);
      formData.append("category", formState.category);
      formData.append("stock", formState.stock);

      /*  for (let pair of formData.entries()) {
          // Debugging: Log FormData
          console.log(`${pair[0]}: ${pair[1]}`);
        } */

      const response = await fetch(`${baseUrl}/users/products/${productId}`, {
        method: "PUT",
        body: formData, //pass the form data as the request body (stringify not needed, browser will also set content type automatically)
        credentials: "include",
      });

      if (!response.ok) {
        const { message } = await response.json();
        customErrorMessage(message, 5000);
        return;
      }

      const product = await response.json();
      console.log("updated product", product);

      const updatedProducts = products.map((p) =>
        p._id === product._id ? product : p
      );

      console.log("updatedProducts", updatedProducts);
      setProducts(updatedProducts);

      toast.success("Product Updated successfully!");
      // navigate("/");

      // Reset form
      setFormState({
        title: "",
        price: "",
        description: "",
        category: "",
        stock: 0,
      });
      setImageFile(null);

      document.getElementById("editModal").close();
    } catch (error) {
      toast.error(error);
    } finally {
      setIsClicked(false);
    }
  };

  return (
    <dialog
      onClick={(e) => {
        if (e.target === document.getElementById("editModal")) {
          document.getElementById("editModal").close();
        }
      }}
      id="editModal"
      className="modal modal-bottom sm:modal-middle place-items-center">
      <div className="modal-box border border-white  rounded-2xl space-y-2">
        <button
          onClick={() => document.getElementById("editModal").close()}
          className="btn btn-sm btn-circle btn-outline  btn-secondary absolute right-2 top-2 ">
          ✕
        </button>
        <h3 className="font-bold text-lg text-center text-secondary mt-2">
          {" "}
          {product.title}
        </h3>

        <div className="modal-action">
          <form
            method="dialog"
            onSubmit={handleSubmit}
            className="h-full  flex items-center justify-center bg-base-200  ">
            <fieldset className="fieldset w-full max-w-xl text-lg p-6 bg-base-100 border border-white rounded-2xl shadow-lg space-y-2 ">
              <legend className="fieldset-legend text-2xl font-semibold text-center  border-4 border-double  border-secondary text-base-content rounded-lg p-2 glass">
                Edit Product
              </legend>
              {/* Image preview */}

              <div className="grid place-items-center ">
                <img
                  className="circle-image size-40 object-cover rounded-full"
                  src={previewImage}
                  alt="avatar preview"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="label text-gray-100" htmlFor="imageFile">
                  Upload New Image (optional)
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
                <label className="label text-gray-100" htmlFor="title">
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
                <label className="label text-gray-100" htmlFor="description">
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
                <label className="label text-gray-100" htmlFor="price">
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
                <label className="label text-gray-100" htmlFor="stock">
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
                <label className="label text-gray-100" htmlFor="category">
                  Category
                </label>
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
                {isClicked ? "Editing..." : "Edit Product"}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default EditDialog;
