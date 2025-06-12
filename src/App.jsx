import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites"; // <-- ADD THIS

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/favorites"
          element={
            <MainLayout>
              <Favorites />
            </MainLayout>
          }
        />
        <Route
          path="/add-product"
          element={
            <MainLayout>
              <AddProduct />
            </MainLayout>
          }
        />
        <Route
          path="/edit-product"
          element={
            <MainLayout>
              <EditProduct />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}
