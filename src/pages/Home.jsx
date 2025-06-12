import React from "react";
import ProductDashboard from "../components/ProductDashboard"; // adjust path as needed

export default function Home() {
  return (
    <div className="home-container">
      <main>
        <h2 className="dashboard-heading">Dashboard</h2>
        <ProductDashboard />
      </main>

      <style>{`
        /* Heading style consistent with Default Design Guidelines */
        .dashboard-heading {
          font-size: 1.5rem; /* ~40px */
          color:rgb(52, 52, 53); /* dark neutral */
          user-select: none;
        }

        /* Ensure main fills width and uses vertical stacking */
        main {
          display: flex;
          flex-direction: column;
          padding: 0 0rem 0rem 0rem;
        }
      `}</style>
    </div>
  );
}
