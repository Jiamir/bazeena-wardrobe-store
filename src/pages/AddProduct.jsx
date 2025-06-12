// src/pages/AddProduct.jsx
import React from "react";
import ProductForm from "../components/ProductForm";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/productSlice";

export default function AddProduct() {
  const dispatch = useDispatch();

  const handleAddProduct = (formData) => {
    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const image = formData.get("image");

    dispatch(addProduct({ name, description, price, image }));
  };

  return (
    <div className="add-product-page">
      <h2 className="add-product-heading">Add Product</h2>
      <ProductForm
        initialData={{}}
        onSubmit={handleAddProduct}
        submitLabel="Add Product"
      />

      <style>{`
        .add-product-page {
          width: 1100px;
          height: 550px;
          display: flex;
          flex-direction: column;
          padding: 0rem 1.5rem;
        }

        .add-product-heading {
          margin-bottom: 2rem;
          color: #111827;
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
    </div>
  );
}
