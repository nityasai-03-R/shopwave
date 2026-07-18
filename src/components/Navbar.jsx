import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, Store } from 'lucide-react';

export default function Navbar({ cartCount, wishlistCount }) {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header style={{
      backgroundColor: '#0f172a',
      color: 'white',
      borderBottom: '1px solid #1e293b',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '1rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          textDecoration: 'none',
          color: 'white'
        }}>
          <Store size={28} style={{ color: '#818cf8' }} />
          <span style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            background: 'linear-gradient(to right, #ffffff, #c7d2fe)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Shopwave
          </span>
        </Link>

        {/* Nav Links */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          <Link
            to="/"
            style={{
              color: isActive('/') ? '#818cf8' : '#94a3b8',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              transition: 'color 0.15s ease'
            }}
            onMouseOver={(e) => { if (!isActive('/')) e.target.style.color = '#e2e8f0'; }}
            onMouseOut={(e) => { if (!isActive('/')) e.target.style.color = '#94a3b8'; }}
          >
            Catalog
          </Link>

          {/* Wishlist Link */}
          <Link
            to="/wishlist"
            style={{
              color: isActive('/wishlist') ? '#f43f5e' : '#94a3b8',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'color 0.15s ease'
            }}
            onMouseOver={(e) => { if (!isActive('/wishlist')) e.target.style.color = '#e2e8f0'; }}
            onMouseOut={(e) => { if (!isActive('/wishlist')) e.target.style.color = '#94a3b8'; }}
          >
            <Heart size={18} style={{ fill: isActive('/wishlist') ? '#f43f5e' : 'none' }} />
            <span>Wishlist</span>
            {wishlistCount > 0 && (
              <span className="badge" style={{ backgroundColor: '#f43f5e' }}>{wishlistCount}</span>
            )}
          </Link>

          {/* Cart Link */}
          <Link
            to="/cart"
            style={{
              color: isActive('/cart') ? '#818cf8' : '#94a3b8',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'color 0.15s ease'
            }}
            onMouseOver={(e) => { if (!isActive('/cart')) e.target.style.color = '#e2e8f0'; }}
            onMouseOut={(e) => { if (!isActive('/cart')) e.target.style.color = '#94a3b8'; }}
          >
            <ShoppingCart size={18} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="badge" style={{ backgroundColor: '#4f46e5' }}>{cartCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
