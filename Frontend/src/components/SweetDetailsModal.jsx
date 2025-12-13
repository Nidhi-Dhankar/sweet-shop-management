import React from "react";
import { useCart } from "../contexts/CartContext";
import "./SweetDetailsModal.css";

function SweetDetailsModal({ sweet, onClose }) {
    const { addToCart } = useCart();

    if (!sweet) return null;

    const handlePurchase = () => {
        if (sweet.quantity > 0) {
            addToCart(sweet);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="details-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="details-close-button" onClick={onClose}>
                    ×
                </button>

                <div className="details-modal-body">
                    <div className="details-image-section">
                        <div className="details-image-container">
                            {sweet.image ? (
                                <img src={sweet.image} alt={sweet.name} className="details-image" />
                            ) : (
                                <div className="details-placeholder-image">
                                    <span>No Image Available</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="details-info-section">
                        <div className="details-header">
                            <span className="details-category">{sweet.category}</span>
                            <h2 className="details-title">{sweet.name}</h2>
                            <div className="details-price">₹{sweet.price}</div>
                        </div>

                        <div className="details-description">
                            <h3>Description</h3>
                            <p>{sweet.description || "No description available for this sweet."}</p>
                        </div>

                        <div className="details-specs">
                            <div className="spec-item">
                                <span className="spec-label">Availability</span>
                                <span className={`spec-value ${sweet.quantity > 0 ? "in-stock" : "out-of-stock"}`}>
                                    {sweet.quantity > 0 ? `In Stock (${sweet.quantity} left)` : "Out of Stock"}
                                </span>
                            </div>
                        </div>

                        <div className="details-actions">
                            <button
                                onClick={handlePurchase}
                                disabled={sweet.quantity === 0}
                                className={`details-purchase-button ${sweet.quantity === 0 ? "disabled" : ""}`}
                            >
                                {sweet.quantity === 0 ? "Out of Stock" : "Add to Cart"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SweetDetailsModal;
