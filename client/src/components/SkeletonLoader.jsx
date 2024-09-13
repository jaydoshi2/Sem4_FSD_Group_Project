import React from 'react';
import '../styles/SkeletonLoader.css'; // Import the CSS for styling the skeleton loader

const SkeletonLoader = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-thumbnail"></div>
      <div className="skeleton-title"></div>
      <div className="skeleton-button"></div>
    </div>
  );
};

export default SkeletonLoader;
