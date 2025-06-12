import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { searchProducts } from "../redux/productSlice"; // adjust path if needed
import { useState } from "react";

export default function Navbar() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setInputValue(value);
    dispatch(searchProducts(value));
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center shadow-sm justify-between header">
      <div>
        <h2 className="text-4xl font-bold text-blue-600 mt-10 heading">
          <span>Manage Bazeena Wardrobe</span>
        </h2>
      </div>
      <div className="relative w-[300px] search-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleSearch}
          placeholder="Search products..."
          className="w-half pl-10 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 search"
        />
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500 icon" />
      </div>
    </header>
  );
}
