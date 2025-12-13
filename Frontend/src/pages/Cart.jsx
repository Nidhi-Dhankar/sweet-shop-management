import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

import { purchaseSweet } from "../services/api";

function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart, showToast } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      showToast("Please login to purchase items");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      // Process each item in sequence
      for (const item of cart) {
        await purchaseSweet(item.id, item.quantity);
      }
      clearCart();
      showToast("Order placed successfully! 🍬");
      navigate("/dashboard");
    } catch (error) {
      console.error("Checkout failed:", error);
      showToast(error.response?.data?.error || "Failed to place order. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some delicious sweets to your cart!</p>
          <button onClick={() => navigate("/")} className="cart-empty-button">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p>{cart.length} {cart.length === 1 ? "item" : "items"} in your cart</p>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-info">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-category">{item.category}</p>
                <p className="cart-item-price">₹{item.price} each</p>
              </div>

              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="quantity-button"
                  >
                    −
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="quantity-button"
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-total">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-button"
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-card">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <button
              className="checkout-button"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Processing..." : "Proceed to Checkout"}
            </button>
            <button
              onClick={() => navigate("/")}
              className="continue-shopping-button"
              disabled={loading}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

