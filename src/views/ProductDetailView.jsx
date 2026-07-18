import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Heart } from 'lucide-react';

export default function ProductDetailView({ wishlist, onToggleWishlist, onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProductDetails() {
      setLoading(true);
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) {
          throw new Error('Product not found');
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message || 'Unable to load product.');
      } finally {
        setLoading(false);
      }
    }

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="detail-container" style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="skeleton-pulse" style={{ width: '50px', height: '50px', borderRadius: '50%', margin: '0 auto 1rem' }}></div>
          <p style={{ fontWeight: 600 }}>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon" style={{ fontSize: '3rem', color: 'var(--danger-color)' }}>⚠️</div>
        <h3>Error Loading Product</h3>
        <p>{error || 'The requested product could not be found.'}</p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          <ArrowLeft size={16} /> Back to Catalog
        </button>
      </div>
    );
  }

  const isWishlisted = wishlist.some(item => item.id === product.id);

  return (
    <div>
      {/* Back Link */}
      <button
        onClick={() => navigate(-1)}
        className="btn btn-outline"
        style={{ marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center' }}
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div className="detail-container">
        <div className="detail-layout">
          {/* Product Image */}
          <div className="detail-image-box">
            <img src={product.image} alt={product.title} className="detail-image" />
          </div>

          {/* Product Info */}
          <div className="detail-info">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.75rem' }}>
              <span className="detail-category-badge">{product.category}</span>
              <button
                onClick={() => onToggleWishlist(product)}
                className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                style={{ position: 'relative', top: 0, right: 0 }}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            <h1 className="detail-title">{product.title}</h1>

            {product.rating && (
              <div className="detail-meta">
                <div className="detail-rating">
                  <Star className="star-icon" />
                  <span style={{ fontWeight: 600 }}>{product.rating.rate}</span>
                  <span style={{ color: 'var(--text-muted)' }}>
                    ({product.rating.count} reviews)
                  </span>
                </div>
              </div>
            )}

            <div className="detail-price">${product.price.toFixed(2)}</div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Description</h3>
              <p className="detail-description">{product.description}</p>
            </div>

            <div className="detail-actions">
              <button onClick={() => onAddToCart(product)} className="btn btn-primary">
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
