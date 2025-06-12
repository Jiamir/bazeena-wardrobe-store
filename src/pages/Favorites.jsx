import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
export default function Favorites() {
  const favoriteProducts = useSelector((state) =>
    state.products.products.filter((p) => p.isFavorite)
  );

  return (
    <div className="favorites-container">
      <main>
        <h2 className="favorites-heading">Favorite Products</h2>
        <div className="product-grid">
          {favoriteProducts.length > 0 ? (
            favoriteProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="no-favorites">No favorites yet.</p>
          )}
        </div>
      </main>

      <style>{`
        .favorites-heading {
          font-size: 1.5rem;
          color: rgb(52, 52, 53);
          user-select: none;
          padding: 0rem 1.5rem;

        }

        main {
          display: flex;
          flex-direction: column;
          padding: 0;
          width: 1400px;
          height: 550px;
        }

        .no-favorites {
          margin: 1.5rem;
          color: #666;
        }
      `}</style>
    </div>
  );
}
