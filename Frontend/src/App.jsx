import { Routes, Route } from "react-router-dom";
import { CartProvider, useCart } from "./contexts/CartContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import Toast from "./components/Toast";
import "./App.css";

function AppContent() {
  const { toast, hideToast } = useCart();

  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <Toast message={toast.message} show={toast.show} onClose={hideToast} />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
