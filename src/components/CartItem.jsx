// Cart.jsx - This is the Shopping Cart page
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { increaseQuantity, decreaseQuantity, removeItem, clearCart } from '../store/CartSlice';
import './Cart.css';

function Cart() {
    const dispatch = useDispatch();
    const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);

    // Increase quantity
    const handleIncrease = (id) => {
        dispatch(increaseQuantity(id));
    };

    // Decrease quantity
    const handleDecrease = (id) => {
        dispatch(decreaseQuantity(id));
    };

    // Delete/Remove item
    const handleRemove = (id) => {
        dispatch(removeItem(id));
    };

    // Checkout button
    const handleCheckout = () => {
        alert('Coming Soon! 🚀');
    };

    // Empty cart
    if (items.length === 0) {
        return (
            <div className="cart-empty">
                <h2>🛒 Your cart is empty</h2>
                <p>Browse our plants and add some to your cart!</p>
                <Link to="/products">
                    <button className="btn-continue-shopping">Continue Shopping</button>
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h2>🛒 Shopping Cart</h2>
            <p className="cart-total-items">Total Items: {totalQuantity}</p>

            {/* Cart items */}
            <div className="cart-items">
                {items.map((item) => (
                    <div key={item.id} className="cart-item">
                        {/* Thumbnail */}
                        <img
                            src={`/images/${item.image}`}
                            alt={item.name}
                            className="cart-item-image"
                        />
                        <div className="cart-item-details">
                            {/* Name */}
                            <h3>{item.name}</h3>
                            {/* Unit Price */}
                            <p className="cart-item-price">Unit Price: ${item.price}</p>
                            {/* Quantity buttons */}
                            <div className="cart-item-quantity">
                                <button onClick={() => handleDecrease(item.id)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleIncrease(item.id)}>+</button>
                            </div>
                            {/* Total cost for each plant */}
                            <p className="cart-item-total">Total: ${item.totalPrice.toFixed(2)}</p>
                        </div>
                        {/* Delete button */}
                        <button
                            className="btn-delete"
                            onClick={() => handleRemove(item.id)}
                        >
                            🗑️ Delete
                        </button>
                    </div>
                ))}
            </div>

            {/* Cart summary */}
            <div className="cart-summary">
                {/* Total cart amount */}
                <h3>Total: ${totalAmount.toFixed(2)}</h3>
                <div className="cart-actions">
                    {/* Continue Shopping button */}
                    <Link to="/products">
                        <button className="btn-continue-shopping">Continue Shopping</button>
                    </Link>
                    {/* Checkout button */}
                    <button className="btn-checkout" onClick={handleCheckout}>
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
