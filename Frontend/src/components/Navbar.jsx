import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import "./Navbar.css";

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const { cartCount } = useCart();

  useEffect(() => {
    // Check if user is logged in (check localStorage)
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      const newAuthStatus = !!token;
      if (isAuthenticated !== newAuthStatus) {
        setIsAuthenticated(newAuthStatus);
      }

      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          // Simple check to avoid deep equality complexity, just check ID or Email
          if (user?.email !== parsedUser.email) {
            setUser(parsedUser);
          }
        } catch (e) {
          console.error("Error parsing user data", e);
        }
      } else if (user !== null) {
        setUser(null);
      }
    };

    checkAuth();

    // Listen for storage changes to update user state
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);
    // Check periodically for changes (in case of same-tab updates)
    const interval = setInterval(checkAuth, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileMenu && !event.target.closest(".profile-item")) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileMenu]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🍰</span> Sweet Shop
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Dashboard
            </Link>
          </li>
          {isAuthenticated && (
            <li className="navbar-item">
              <div
                className="cart-icon-wrapper"
                onClick={() => navigate("/cart")}
              >
                <span className="cart-icon">🛒</span>
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </div>
            </li>
          )}
          {!isAuthenticated ? (
            <>
              <li className="navbar-item">
                <Link to="/login" className="navbar-link">
                  Login
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/register" className="navbar-link">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <li className="navbar-item profile-item">
              <div
                className="profile-wrapper"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <div className="profile-avatar">
                  {getInitials(user?.name || user?.email)}
                </div>
                <span className="profile-name">
                  {user?.name || user?.email?.split("@")[0]}
                </span>
                <span className="profile-arrow">▼</span>
              </div>
              {showProfileMenu && (
                <div className="profile-menu">
                  <div className="profile-menu-header">
                    <div className="profile-menu-avatar">
                      {getInitials(user?.name || user?.email)}
                    </div>
                    <div className="profile-menu-info">
                      <div className="profile-menu-name">
                        {user?.name || "User"}
                      </div>
                      <div className="profile-menu-email">{user?.email}</div>
                    </div>
                  </div>
                  <div className="profile-menu-divider"></div>
                  <button onClick={handleLogout} className="profile-menu-item">
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
