import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';

export default function CartView({ cart, onUpdateQuantity, onRemoveFromCart, onClearCart }) {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.10;
  const total = subtotal + tax;

  const handleCheckout = () => {
    alert("Thank you for your purchase! Checkout completed.");
    onClearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="empty-state">
        <ShoppingBag className="empty-state-icon" size={64} />
        <h2>Your Shopping Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet. Head back to our catalog and discover amazing deals!</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          <ArrowLeft size={16} /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1>Shopping Cart</h1>
        <p>Review your selected items and complete your purchase.</p>
      </div>

      <div className="cart-layout">
        {/* Cart items list */}
        <div className="cart-items-container">
          {cart.map((item, idx) => (
            <div className="cart-item-row" key={`${item.id}-${idx}`}>
              <div className="cart-item-info">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <Link to={`/product/${item.id}`} style={{ textDecoration: 'none' }}>
                    <h3 className="cart-item-title">{item.title}</h3>
                  </Link>
                  <div className="cart-item-price">${item.price.toFixed(2)}</div>
                </div>
              </div>

              {/* Quantity Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', justifyContent: 'space-between' }}>
                <div className="cart-item-controls">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="quantity-btn"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal for line item */}
                <div style={{ fontWeight: 700, fontSize: '1.05rem', minWidth: '80px', textAlign: 'right' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                {/* Remove button */}
                <button
                  onClick={() => onRemoveFromCart(item.id)}
                  className="cart-item-remove"
                  aria-label="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
            <Link to="/" className="btn btn-outline">
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
            <button
              onClick={onClearCart}
              className="btn btn-outline"
              style={{ color: 'var(--danger-color)', borderColor: 'var(--danger-color)' }}
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="summary-card">
            <h2 className="summary-title">Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Tax (10%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="summary-row" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <span>Shipping</span>
              <span style={{ color: 'var(--success-color)', fontWeight: 600 }}>Free</span>
            </div>
            
            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button onClick={handleCheckout} className="btn btn-primary summary-btn">
              Proceed to Checkout
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
