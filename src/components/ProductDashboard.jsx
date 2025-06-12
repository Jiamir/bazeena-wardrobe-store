import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Heart, ListFilter, Pencil, Trash } from "lucide-react";
import {
  deleteProduct,
  toggleFavorite,
  sortProducts,
} from "../redux/productSlice";

export default function ProductDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Safe defaults
  const { products = [], searchTerm = "" } = useSelector(
    (state) => state.products || {}
  );

  const handleDelete = (id) => dispatch(deleteProduct(id));
  const handleToggleFavorite = (id) => dispatch(toggleFavorite(id));
  const handleEdit = (product) => navigate("/edit-product", { state: product });
  const handleSort = (type) => {
    dispatch(sortProducts(type));
    setSortMenuOpen(false);
  };

  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const sortMenuRef = useRef(null);
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const productsToRender = searchTerm ? filteredProducts : products;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target)) {
        setSortMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-topbar">
          <div className="topbar-buttons">
            <button
              className="icon-button"
              title="Favorites"
              onClick={() => navigate("/favorites")}
            >
              <Heart size={20} strokeWidth={2} />
            </button>

            <div className="relative inline-block" ref={sortMenuRef}>
              <button
                className="icon-button"
                title="Sort"
                onClick={() => setSortMenuOpen(!sortMenuOpen)}
              >
                <ListFilter size={20} strokeWidth={2} />
              </button>

              {sortMenuOpen && (
                <div className="context-menu">
                  <div className="context-menu-header">Sort by:</div>
                  <button
                    className="context-menu-button"
                    onClick={() => handleSort("low-to-high")}
                  >
                    Price: Low to High
                  </button>
                  <button
                    className="context-menu-button"
                    onClick={() => handleSort("high-to-low")}
                  >
                    Price: High to Low
                  </button>
                  <button
                    className="context-menu-button"
                    onClick={() => handleSort("newest")}
                  >
                    Newest First
                  </button>
                  <button
                    className="context-menu-button"
                    onClick={() => handleSort("oldest")}
                  >
                    Oldest First
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <section className="product-grid" aria-label="Product list">
          {productsToRender.length > 0 ? (
            productsToRender.map((product) => (
              <article
                key={product.id}
                className="product-card"
                tabIndex={0}
                aria-label={product.name}
              >
                <div className="image-container">
                  <img
                    src={product.image || "https://via.placeholder.com/300x280"}
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                  />
                  <button
                    className="favorite-button"
                    onClick={() => handleToggleFavorite(product.id)}
                    title="Toggle Favorite"
                  >
                    <Heart
                      size={18}
                      strokeWidth={2}
                      fill={product.isFavorite ? "red" : "none"}
                      color={product.isFavorite ? "red" : "black"}
                    />
                  </button>
                </div>

                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">Rs. {product.price}</p>

                <div className="product-actions">
                  <button
                    className="action-button edit"
                    onClick={() => handleEdit(product)}
                  >
                    <Pencil size={16} />
                    Edit
                  </button>
                  <button
                    className="action-button delete"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash size={16} />
                    Delete
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p>No products match your search.</p>
          )}
        </section>
      </div>

      <style>{`
        .dashboard-container {
          max-width: 1200px;
          margin: 0.5rem auto;
          padding: 1rem;
          background: #ffffff;
          border-radius: 0.75rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          min-height: 80vh;
        }

        .dashboard-topbar {
          display: flex;
          align-items: center;
        }

        .topbar-buttons {
          display: flex;
          gap: 0.75rem;
          padding: 0.5rem 1rem 0.5rem 0rem;
          margin-left: auto;
        }

        .icon-button {
          background: #f3f4f6;
          border: none;
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, transform 0.2s;
        }

        .icon-button:hover {
          background: #e5e7eb;
          transform: scale(1.05);
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          padding-top: 2rem;
          flex-grow: 1;
          padding: 1rem;
        }

        @media (max-width: 900px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .product-grid {
            grid-template-columns: 1fr;
          }
        }

        .product-card {
          background: #ffffff;
          border-radius: 0.75rem;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
          padding: 1rem;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }

        .product-card:focus,
        .product-card:hover {
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
          transform: translateY(-4px);
          outline: none;
        }

        .image-container {
          position: relative;
        }

        .product-image {
          width: 100%;
          height: 280px;
          object-fit: cover;
          border-radius: 0.5rem;
          margin-bottom: 0.5rem;
          user-select: none;
        }
        .product-description {
  font-size: 0.9rem;
  color:rgb(130, 136, 145); /* slightly lighter gray */
  margin: 0.25rem 0 0.2rem 0;
  font-family: 'Poppins', sans-serif;
}

        .favorite-button {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: rgba(255, 255, 255, 0.55);
          border: none;
          border-radius: 50%;
          padding: 0.35rem;
          cursor: pointer;
          transition: background 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .favorite-button:hover {
          background: rgb(235, 120, 120);
        }

        /* Context Menu Dropdown */
.context-menu {
  position: absolute;
  right: 0;
  margin-top: 0.5rem;
  width: 12rem;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  z-index: 50;
  animation: fadeIn 0.2s ease-out;
}

.context-menu-header {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 650;
  color:rgb(34, 38, 44);
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
}

.context-menu-button {
  width: 100%;
  text-align: left;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #1f2937;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
}

.context-menu-button:hover {
  background-color: #f3f4f6;
}

/* Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


        .product-name {
          font-weight: 700;
          font-size: 1.15rem;
          margin: 0 0 0rem 0;
          color: #111827;
          font-family: 'Poppins', sans-serif;
        }

        .product-price {
          font-weight: 550;
          font-size: 0.95rem;
          margin: 0.25rem 0 0.5rem;
          color: rgb(65, 72, 85);
          font-family: 'Poppins', sans-serif;
        }

        .product-actions {
          display: flex;
          justify-content: space-between;
          margin-top: auto;
        }

        .action-button {
          background: #f3f4f6;
          border: none;
          padding: 0.5rem 1rem;
          margin: 0rem 0.25rem;
          border-radius: 0.5rem;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: background 0.2s ease;
        }

        .action-button:hover {
          background: #e5e7eb;
        }
      `}</style>
    </>
  );
}
