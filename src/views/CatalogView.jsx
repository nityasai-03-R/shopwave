import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import SkeletonLoader from '../components/SkeletonLoader';

export default function CatalogView({ wishlist, onToggleWishlist, onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch initial products and categories
  useEffect(() => {
    async function loadInitialData() {
      setLoading(true);
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch('https://fakestoreapi.com/products'),
          fetch('https://fakestoreapi.com/products/categories')
        ]);
        
        if (!prodRes.ok || !catRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const prodData = await prodRes.json();
        const catData = await catRes.json();

        setProducts(prodData);
        setCategories(catData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  // Fetch products by category when selectedCategory changes
  useEffect(() => {
    async function fetchCategoryProducts() {
      if (selectedCategory === 'all') return;
      
      setLoading(true);
      setCurrentPage(1);
      try {
        const res = await fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`);
        if (!res.ok) throw new Error('Failed to fetch category products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error category products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategoryProducts();
  }, [selectedCategory]);

  // Fetch all products again if selectedCategory goes back to 'all'
  const handleCategoryChange = async (e) => {
    const cat = e.target.value;
    setSelectedCategory(cat);
    
    if (cat === 'all') {
      setLoading(true);
      setCurrentPage(1);
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Discover Products</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Explore our high-quality catalog items handpicked for you.</p>
      </div>

      {/* Controls Bar */}
      <div className="controls-bar">
        {/* Search */}
        <div className="search-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search products by title..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Category Filter */}
        <div className="filter-wrapper">
          <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Category:</span>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid or Loader */}
      {loading ? (
        <SkeletonLoader count={5} />
      ) : paginatedProducts.length > 0 ? (
        <>
          <div className="product-grid">
            {paginatedProducts.map(product => {
              const isWishlisted = wishlist.some(item => item.id === product.id);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={isWishlisted}
                  onToggleWishlist={onToggleWishlist}
                  onAddToCart={onAddToCart}
                />
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous Page"
              >
                &laquo;
              </button>
              
              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNum = index + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next Page"
              >
                &raquo;
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon" style={{ fontSize: '3rem' }}>🔍</div>
          <h3>No products found</h3>
          <p>We couldn't find any products matching your criteria. Try adjusting your search query or filters.</p>
        </div>
      )}
    </div>
  );
}
