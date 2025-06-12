import { Plus, Heart, List } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("all-products");
  const navigate = useNavigate();

  const handleClick = (item, path) => {
    setActiveItem(item);
    navigate(path);
  };

  return (
    <aside className="w-64 min-h-screen bg-gray-50 border-r px-4 py-6 flex flex-col gap-6 shadow-sm navbar">
      {/* Logo */}
      <div className="mb-4 flex justify-center">
        <img
          src="/assets/Logo.png"
          alt="Logo"
          className="w-[70px] h-[70px] object-contain"
        />
      </div>

      {/* All Products */}
      <button
        onClick={() => handleClick("all-products", "/")}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
          activeItem === "all-products"
            ? "bg-white text-black shadow"
            : "text-black hover:bg-gray-200"
        }`}
      >
        <List className="w-4 h-4" />
        <span>All Products</span>
      </button>

      {/* Add Product */}
      <button
        onClick={() => handleClick("add-product", "/add-product")}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
          activeItem === "add-product"
            ? "bg-white text-black shadow"
            : "text-black hover:bg-gray-200"
        }`}
      >
        <Plus className="w-4 h-4" />
        <span>Add Product</span>
      </button>

      {/* Favorites */}
      <button
        onClick={() => handleClick("favorites", "/favorites")}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
          activeItem === "favorites"
            ? "bg-white text-black shadow"
            : "text-black hover:bg-gray-200"
        }`}
      >
        <Heart className="w-4 h-4" />
        <span>Favorites</span>
      </button>
    </aside>
  );
}
