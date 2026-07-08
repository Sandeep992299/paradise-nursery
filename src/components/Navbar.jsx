import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.css';

function Navbar() {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">🌿 Paradise Nursery</Link>
      </div>
      <div className="navbar-links">
        <Link to="/products">Plants</Link>
        <Link to="/about">About Us</Link>
      </div>
      <div className="navbar-right">
        <Link to="/cart" className="cart-link">
          🛒 Cart
          {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
