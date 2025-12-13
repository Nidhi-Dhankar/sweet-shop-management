import { useState, useEffect } from "react";
import SweetCard from "../components/SweetCard";
import AddSweetModal from "../components/AddSweetModal";
import SweetDetailsModal from "../components/SweetDetailsModal";
import FeaturedCarousel from "../components/FeaturedCarousel";
import API from "../services/api";
import { useAuth } from "../hooks/useAuth";
import "./Dashboard.css";

function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSweet, setSelectedSweet] = useState(null);

  const { isAdmin } = useAuth();

  const getMockSweets = () => {
    return [
      {
        id: 1,
        name: "Ladoo",
        category: "Indian",
        price: 20,
        quantity: 10,
        description: "Traditional Indian sweet made with gram flour",
        image: "https://images.unsplash.com/photo-1599596321239-014c4078bac8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 2,
        name: "Barfi",
        category: "Indian",
        price: 30,
        quantity: 5,
        description: "Rich milk-based sweet",
        image: "https://images.unsplash.com/photo-1601302830303-a417578ec7b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      },
      // ... keep existing mocks if needed, or remove for brevity
    ];
  };

  const fetchSweets = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await API.get("/sweets");
      if (
        response.data &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        setSweets(response.data);
      } else {
        // If API returns empty, use mock data
        setSweets(getMockSweets());
      }
    } catch (err) {
      console.log("API call failed, using mock data:", err.message);
      // If API fails, use mock data
      setSweets(getMockSweets());
      setError("Using demo data. Connect to backend for real data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handleSweetDeleted = (id) => {
    setSweets(sweets.filter(sweet => sweet.id !== id));
  };

  const filteredSweets = sweets.filter((sweet) => {
    const matchesSearch = sweet.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" ||
      sweet.category?.toLowerCase() === filterCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Get unique categories from sweets
  const uniqueCategories = Array.from(
    new Set(sweets.map((sweet) => sweet.category).filter(Boolean))
  );
  const categories = ["all", ...uniqueCategories];

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading sweets...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Dynamic Showcase */}
      <FeaturedCarousel sweets={sweets} />

      <div className="dashboard-header-controls">
        {isAdmin && (
          <button
            className="add-sweet-btn"
            onClick={() => setShowAddModal(true)}
          >
            + Add New Sweet
          </button>
        )}
      </div>

      <div className="dashboard-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search sweets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-box">
          <label>Category: </label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="error-message" style={{ marginBottom: "1rem" }}>
          {error}
        </div>
      )}

      {sweets.length === 0 && !loading && (
        <div className="no-results">
          <p>No sweets available. Please add some sweets to get started.</p>
        </div>
      )}

      <div className="sweets-grid">
        {filteredSweets.length > 0 ? (
          filteredSweets.map((sweet) => (
            <SweetCard
              key={sweet.id}
              sweet={sweet}
              onDelete={() => handleSweetDeleted(sweet.id)}
              onViewDetails={setSelectedSweet}
            />
          ))
        ) : sweets.length > 0 ? (
          <div className="no-results">
            <p>No sweets found matching your search criteria.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterCategory("all");
              }}
              style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                background: "#667eea",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : null}
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>{sweets.length}</h3>
          <p>Total Sweets</p>
        </div>
        <div className="stat-card">
          <h3>{sweets.filter((s) => s.quantity > 0).length}</h3>
          <p>In Stock</p>
        </div>
        <div className="stat-card">
          <h3>{sweets.filter((s) => s.quantity === 0).length}</h3>
          <p>Out of Stock</p>
        </div>
      </div>

      {showAddModal && (
        <AddSweetModal
          onClose={() => setShowAddModal(false)}
          onSweetAdded={() => {
            fetchSweets();
          }}
        />
      )}

      {selectedSweet && (
        <SweetDetailsModal
          sweet={selectedSweet}
          onClose={() => setSelectedSweet(null)}
        />
      )}
    </div>
  );
}

export default Dashboard;
