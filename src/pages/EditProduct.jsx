import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ProductForm from "../components/ProductForm";
import { editProduct } from "../redux/productSlice";

export default function EditProduct() {
  const { state: product } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = (formData) => {
    const updatedProduct = {
      id: product.id,
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
      image: formData.get("image") || product.image,
    };

    dispatch(editProduct(updatedProduct));
    navigate("/"); // or wherever your product list is
  };

  return (
    <div style={{ padding: "2rem", width: "1400px" }}>
      <h1>Edit Product</h1>
      <ProductForm
        className="form"
        initialData={product}
        onSubmit={handleUpdate}
        submitLabel="Update Product"
      />
    </div>
  );
}
