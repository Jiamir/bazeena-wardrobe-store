// ConfirmationPopup.jsx
import React from "react";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export default function ConfirmationPopup({ onConfirm, onCancel, status }) {
  return (
    <div className="popup-overlay">
      <div className="popup-card">
        {status === "confirm" && (
          <>
            <AlertTriangle size={40} className="popup-icon warning" />
            <h3>Are you sure?</h3>
            <p>Do you want to add this product?</p>
            <div className="popup-actions">
              <button onClick={onConfirm} className="yes-button">
                Yes
              </button>
              <button onClick={onCancel} className="no-button">
                Discard
              </button>
            </div>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle size={40} className="popup-icon success" />
            <h3>Product Added!</h3>
            <p>Your product has been successfully added.</p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle size={40} className="popup-icon error" />
            <h3>Failed!</h3>
            <p>Product addition was discarded.</p>
          </>
        )}
      </div>

      <style>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
        }
        .popup-card {
          background: #fff;
          padding: 2rem;
          border-radius: 1rem;
          text-align: center;
          width: 320px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .popup-icon {
          margin-bottom: 1rem;
        }
        .popup-icon.success { color: #10b981; }
        .popup-icon.warning { color: #facc15; }
        .popup-icon.error { color: #ef4444; }

        .popup-actions {
          margin-top: 1rem;
          display: flex;
          justify-content: center;
          gap: 1rem;
        }
        .yes-button, .no-button {
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
        }
        .yes-button {
          background-color: #10b981;
          color: white;
        }
        .no-button {
          background-color: #ef4444;
          color: white;
        }
      `}</style>
    </div>
  );
}
