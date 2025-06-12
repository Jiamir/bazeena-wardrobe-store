// ProductForm.jsx
import React, { useState } from "react";
import ConfirmationPopup from "./ConfirmationPopup";

export default function ProductForm({
  initialData = {},
  onSubmit,
  submitLabel = "Submit",
}) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    description: initialData.description || "",
    price: initialData.price || "",
    image: null,
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
  });

  const [popupStatus, setPopupStatus] = useState(null); // "confirm", "success", "error"
  const [pendingPayload, setPendingPayload] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else if (name === "name") {
      const onlyLettersAndSpaces = /^[A-Za-z\s]*$/;
      if (onlyLettersAndSpaces.test(value) || value === "") {
        setFormData({ ...formData, name: value });
        setErrors((prev) => ({ ...prev, name: "" }));
      } else {
        setErrors((prev) => ({
          ...prev,
          name: "Only letters and spaces are allowed.",
        }));
      }
    } else if (name === "description") {
      if (value.length <= 500) {
        setFormData({ ...formData, description: value });
        setErrors((prev) => ({ ...prev, description: "" }));
      } else {
        setErrors((prev) => ({
          ...prev,
          description: "Description cannot exceed 500 characters.",
        }));
      }
    } else if (name === "price") {
      const onlyDigits = /^[0-9]*$/;
      if (onlyDigits.test(value) || value === "") {
        setFormData({ ...formData, price: value });
        setErrors((prev) => ({ ...prev, price: "" }));
      } else {
        setErrors((prev) => ({
          ...prev,
          price: "Only numbers are allowed.",
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("price", formData.price);
    payload.append("image", formData.image);

    setPendingPayload(payload);
    setPopupStatus("confirm");
  };

  const confirmAdd = () => {
    onSubmit(pendingPayload);
    setPopupStatus("success");
    setFormData({ name: "", description: "", price: "", image: null });

    setTimeout(() => setPopupStatus(null), 2000);
  };

  const discardAdd = () => {
    setPopupStatus("error");
    setTimeout(() => setPopupStatus(null), 2000);
  };

  return (
    <section className="form-container" aria-label="Add Product Form">
      <form
        onSubmit={handleSubmit}
        className="styled-form"
        encType="multipart/form-data"
      >
        <div className="form-group">
          <label className="form-label">Product Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Digital Printed Lawn"
            className="form-input"
            required
          />
          {errors.name && <p className="input-hint">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description (max 500 characters)"
            className="form-input"
            rows={4}
            required
          />
          {errors.description && (
            <p className="input-hint">{errors.description}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Price (Rs.)</label>
          <input
            name="price"
            type="text"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g. Rs. 4200"
            className="form-input"
            required
          />
          {errors.price && <p className="input-hint">{errors.price}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Upload Image</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="form-input"
            required={!initialData.image}
          />

          {initialData.image && !formData.image && (
            <div className="image-preview">
              <p>Current Image:</p>
              <img
                src={initialData.image}
                alt="Current product"
                className="preview-img"
              />
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            {submitLabel}
          </button>
        </div>
      </form>

      {popupStatus && (
        <ConfirmationPopup
          status={popupStatus}
          onConfirm={confirmAdd}
          onCancel={discardAdd}
        />
      )}

      <style>{`
        .form-container {
          background: #ffffff;
          padding: 3rem 2rem;
          border-radius: 0.75rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          max-width: 700px;
          justify-content: center;
          width: 100%;
        }

        .styled-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .image-preview {
          margin-top: 0.5rem;
        }

        .preview-img {
          max-width: 130px;
          max-height: 170px;
          border-radius: 0.5rem;
          border: 1px solid #ddd;
        }

        .form-label {
          font-weight: 600;
          font-size: 0.95rem;
          color: rgb(36, 34, 32);
          margin-bottom: 0.25rem;
        }

        .input-hint {
          color: rgb(224, 21, 21);
          font-size: 0.85rem;
          margin-top: 0.25rem;
        }

        .form-input {
          padding: 0.6rem 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid #d1d5db;
          font-size: 0.95rem;
          transition: border-color 0.2s ease;
          font-family: inherit;
          resize: vertical;
        }

        .form-input:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
        }

        .form-actions {
          margin-top: 1rem;
          display: flex;
          justify-content: flex-end;
        }

        .submit-button {
          background: #111827;
          color: #ffffff;
          padding: 0.6rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .submit-button:hover {
          background: #1f2937;
        }

        @media (max-width: 500px) {
          .form-container {
            padding: 1.5rem 1rem;
            width: 300px;
            height: 300px;
          }
        }
      `}</style>
    </section>
  );
}
