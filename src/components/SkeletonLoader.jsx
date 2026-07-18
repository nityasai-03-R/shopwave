import React from 'react';

export default function SkeletonLoader({ count = 5 }) {
  const skeletons = Array.from({ length: count });

  return (
    <div className="product-grid">
      {skeletons.map((_, idx) => (
        <div key={idx} className="skeleton-card">
          <div className="skeleton-img skeleton-pulse"></div>
          <div className="skeleton-text skeleton-pulse"></div>
          <div className="skeleton-text short skeleton-pulse"></div>
          <div className="skeleton-text price skeleton-pulse"></div>
          <div className="skeleton-btn skeleton-pulse" style={{ marginTop: 'auto' }}></div>
        </div>
      ))}
    </div>
  );
}
