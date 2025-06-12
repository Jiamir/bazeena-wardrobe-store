// components/ProductCard.jsx
import React from "react";
import { Heart } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleFavorite } from "../redux/productSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product.id));
  };

  return (
    <>
      <article className="product-card" tabIndex={0} aria-label={product.name}>
        <div className="image-container">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            loading="lazy"
          />
          <button
            className="favorite-button"
            onClick={handleToggleFavorite}
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
        <p className="product-price">Rs. {product.price}</p>
      </article>

      <style>{`
        .product-card {
          background: #ffffff;
          border-radius: 0.75rem;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
          padding: 1rem;
                    margin: 1rem;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
          width:230px;
          height:380px;
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
          height: 310px;
          object-fit: cover;
          border-radius: 0.5rem;
          margin-bottom: 0.5rem;
          user-select: none;
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
        @media (max-width: 500px) {
  .product-card {
    width: 15%;
    height: 85%;
    padding: 0.75rem;
    margin: 0.75rem 0.95rem;
  }

  .product-image {
    height: 280px;
    object-fit: cover;
  }

  .product-name {
    font-size: 1rem;
  }

  .product-price {
    font-size: 0.85rem;
  }

  .action-button {
    padding: 0.4rem 0.75rem;
    font-size: 0.85rem;
    gap: 0.5rem;
  }
}

      `}</style>
    </>
  );
}
