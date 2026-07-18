import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart } from 'lucide-react';

export default function ProductCard({ product, isWishlisted, onToggleWishlist, onAddToCart }) {
  const { id, title, price, image, category, rating } = product;

  return (
    <div className="product-card">
      {/* Wishlist Button */}
      <button
        onClick={() => onToggleWishlist(product)}
        className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
      </button>

      {/* Image */}
      <Link to={`/product/${id}`} className="product-image-container">
        <img src={image} alt={title} className="product-image" loading="lazy" />
      </Link>

      {/* Category */}
      <div className="product-category">{category}</div>

      {/* Title */}
      <Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
        <h3 className="product-title">{title}</h3>
      </Link>

      {/* Rating */}
      {rating && (
        <div className="product-rating">
          <Star className="star-icon" />
          <span style={{ fontWeight: 600 }}>{rating.rate}</span>
          <span style={{ color: 'var(--text-muted)' }}>({rating.count})</span>
        </div>
      )}

      {/* Price */}
      <div className="product-price">${price.toFixed(2)}</div>

      {/* Action Buttons */}
      <div className="product-actions">
        <Link to={`/product/${id}`} className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '0.6rem' }}>
          View Details
        </Link>
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
  );
}
