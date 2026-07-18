import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, ArrowLeft } from 'lucide-react';

export default function WishlistView({ wishlist, onToggleWishlist, onAddToCart }) {
  if (wishlist.length === 0) {
    return (
      <div className="empty-state">
        <Heart className="empty-state-icon" size={64} style={{ color: 'var(--text-muted)' }} />
        <h2>Your Wishlist is Empty</h2>
        <p>Save products you like to your wishlist by clicking the heart icon on cards. They will appear here!</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          <ArrowLeft size={16} /> Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1>My Wishlist</h1>
        <p>Here are the items you have saved. You can quickly add them to your cart or remove them.</p>
      </div>

      <div className="product-grid">
        {wishlist.map(product => (
          <div className="product-card" key={product.id}>
            {/* Remove heart toggle */}
            <button
              onClick={() => onToggleWishlist(product)}
              className="wishlist-btn active"
              aria-label="Remove from wishlist"
            >
              <Heart size={20} fill="currentColor" />
            </button>

            {/* Image */}
            <Link to={`/product/${product.id}`} className="product-image-container">
              <img src={product.image} alt={product.title} className="product-image" />
            </Link>

            {/* Category */}
            <div className="product-category">{product.category}</div>

            {/* Title */}
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
              <h3 className="product-title">{product.title}</h3>
            </Link>

            {/* Price */}
            <div className="product-price">${product.price.toFixed(2)}</div>

            {/* Actions */}
            <div className="product-actions">
              <button
                onClick={() => onAddToCart(product)}
                className="btn btn-primary"
                style={{ fontSize: '0.85rem', padding: '0.6rem' }}
              >
                <ShoppingCart size={16} />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
