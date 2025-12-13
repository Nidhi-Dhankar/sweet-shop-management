import { useState } from "react";
import API from "../services/api"; // Ensure this path is correct based on your structure
import "./AddSweetModal.css";

function AddSweetModal({ onClose, onSweetAdded }) {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        quantity: "",
        description: "",
        image: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const value = e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Validate inputs
            if (!formData.name || !formData.category || !formData.price || formData.quantity === "") {
                throw new Error("Please fill in all required fields");
            }

            await API.post("/sweets", {
                ...formData,
                price: parseFloat(formData.price),
                quantity: parseInt(formData.quantity)
            });

            onSweetAdded();
            onClose();
        } catch (err) {
            console.error("Add sweet error:", err);
            setError(err.response?.data?.error || err.message || "Failed to add sweet");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Add New Sweet</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="add-sweet-form">
                    <div className="form-group">
                        <label>Name*</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Chocolate Truffle"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Category*</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Indian">Indian</option>
                            <option value="Western">Western</option>
                            <option value="Middle Eastern">Middle Eastern</option>
                            <option value="Chocolate">Chocolate</option>
                            <option value="Cake">Cake</option>
                            <option value="Candy">Candy</option>
                            <option value="Cookie">Cookie</option>
                            <option value="Ice Cream">Ice Cream</option>
                        </select>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Price (₹)*</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Quantity*</label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                min="0"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Description (Optional)</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe the sweet..."
                            rows="3"
                        />
                    </div>

                    <div className="form-group">
                        <label>Image URL (Optional)</label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image || ""}
                            onChange={handleChange}
                            placeholder="https://example.com/sweet.jpg"
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="cancel-button" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="submit-button" disabled={loading}>
                            {loading ? "Adding..." : "Add Sweet"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddSweetModal;
