import { useCart } from "../contexts/CartContext";
import { useAuth } from "../hooks/useAuth";
import { deleteSweet } from "../services/api";
import "./SweetCard.css";

function SweetCard({ sweet, onDelete, onViewDetails }) {
  const { addToCart } = useCart();
  const { isAdmin } = useAuth();

  const handlePurchase = (e) => {
    e.stopPropagation(); // prevent opening details
    if (sweet.quantity > 0) {
      addToCart(sweet);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation(); // prevent opening details
    if (window.confirm(`Are you sure you want to delete ${sweet.name}?`)) {
      try {
        await deleteSweet(sweet.id);
        if (onDelete) onDelete();
      } catch (err) {
        console.error("Failed to delete sweet:", err);
        alert("Failed to delete sweet");
      }
    }
  };

  return (
    <div className={`sweet-card ${sweet.quantity === 0 ? "out-of-stock" : ""}`}>
      <div className="sweet-card-header">
        <h3
          className="sweet-name"
          onClick={() => onViewDetails && onViewDetails(sweet)}
          title="Click for details"
          style={{ cursor: "pointer" }}
        >
          {sweet.name}
        </h3>
        {sweet.quantity === 0 && (
          <span className="stock-badge out-of-stock-badge">Out of Stock</span>
        )}
        {sweet.quantity > 0 && sweet.quantity < 5 && (
          <span className="stock-badge low-stock-badge">Low Stock</span>
        )}
      </div>

      <div className="sweet-card-body">
        <div className="sweet-category">
          <span className="category-tag">{sweet.category}</span>
        </div>

        {sweet.image && (
          <div
            className="sweet-image-container"
            onClick={() => onViewDetails && onViewDetails(sweet)}
            style={{ cursor: "pointer" }}
            title="Click for details"
          >
            <img src={sweet.image} alt={sweet.name} className="sweet-image" />
          </div>
        )}

        {sweet.description && (
          <p className="sweet-description">{sweet.description}</p>
        )}

        <div className="sweet-details">
          <div className="sweet-price">
            <span className="price-label">Price:</span>
            <span className="price-value">₹{sweet.price}</span>
          </div>
          <div className="sweet-quantity">
            <span className="quantity-label">Available:</span>
            <span className="quantity-value">{sweet.quantity}</span>
          </div>
        </div>
      </div>

      <div className="sweet-card-footer">
        <button
          onClick={handlePurchase}
          disabled={sweet.quantity === 0}
          className={`purchase-button ${sweet.quantity === 0 ? "disabled" : ""
            }`}
        >
          {sweet.quantity === 0 ? "Out of Stock" : "Add to Cart"}
        </button>

        {isAdmin && (
          <button
            onClick={handleDelete}
            className="delete-button"
            title="Delete Sweet"
          >
            🗑️
          </button>
        )}
      </div>
    </div>
  );
}

export default SweetCard;
