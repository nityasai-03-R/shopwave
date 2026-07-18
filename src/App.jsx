import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CatalogView from './views/CatalogView';
import ProductDetailView from './views/ProductDetailView';
import CartView from './views/CartView';
import WishlistView from './views/WishlistView';

let toastIdCounter = 0;

export default function App() {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem('cart')) || [];
  });

  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem('wishlist')) || [];
  });

  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (message) => {
    const id = toastIdCounter++;
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const idx = prevCart.findIndex((item) => item.id === product.id);
      if (idx !== -1) {
        const newCart = [...prevCart];
        newCart[idx].quantity += 1;
        showToast(`Increased quantity of "${product.title}" in cart.`);
        return newCart;
      } else {
        showToast(`"${product.title}" added to cart.`);
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };


  const handleUpdateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handleRemoveFromCart = (productId) => {
    const itemToRemove = cart.find((item) => item.id === productId);
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    if (itemToRemove) {
      showToast(`"${itemToRemove.title}" removed from cart.`);
    }
  };

  const handleClearCart = () => {
    setCart([]);
    showToast("Cart cleared.");
  };


  const handleToggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const idx = prevWishlist.findIndex((item) => item.id === product.id);
      if (idx === -1) {
        showToast(`"${product.title}" added to wishlist.`);
        return [...prevWishlist, product];
      } else {
        showToast(`"${product.title}" removed from wishlist.`);
        return prevWishlist.filter((item) => item.id !== product.id);
      }
    });
  };


  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalWishlistCount = wishlist.length;

  return (
    <Router>
      <div className="app-container">
        {/* Navigation Bar */}
        <Navbar cartCount={totalCartCount} wishlistCount={totalWishlistCount} />

        {/* Views Router */}
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <CatalogView
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                  onAddToCart={handleAddToCart}
                />
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProductDetailView
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                  onAddToCart={handleAddToCart}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <CartView
                  cart={cart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveFromCart={handleRemoveFromCart}
                  onClearCart={handleClearCart}
                />
              }
            />
            <Route
              path="/wishlist"
              element={
                <WishlistView
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                  onAddToCart={handleAddToCart}
                />
              }
            />
          </Routes>
        </main>

        {/* Toast alerts element */}
        <div className="toast-container">
          {toasts.map((t) => (
            <div key={t.id} className="toast">
              <span>✨</span>
              <span>{t.message}</span>
            </div>
          ))}
        </div>
      </div>
    </Router>
  )
}
