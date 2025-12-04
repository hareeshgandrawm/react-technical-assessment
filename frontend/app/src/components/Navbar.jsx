import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { Cart } from "./Cart"; // your Cart component
import './Navbar.css';

function Navbar() {
  const { cart } = useCart();
  const [showCart, setShowCart] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav>
      {isLoggedIn && (
        <div className="navbar">
          <div>
            <Link to="/products">Home</Link>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <button onClick={() => setShowCart(!showCart)}>
              Cart ({cart.length})
            </button>
            <button className="logout-section" onClick={handleLogout}>
              Logout
            </button>
          </div>

          {/* Cart Sidebar */}
          {showCart && (
            <div style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: 400,
              height: "100vh",
              background:'linear-gradient(135deg, #1dd2c4, #3b8dff)',
              padding: 20,
              overflowY: "auto",
              boxShadow: "-5px 0 15px rgba(0,0,0,0.5)",
              zIndex: 100
            }}>
              <button onClick={() => setShowCart(false)} style={{ marginBottom: 10 }}>
                Close
              </button>
              <Cart />
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
