// /src/components/SkeletonLoader.js
import React from 'react';
import styles from '../styles/SkeletonLoader.module.css'; // Import the CSS Module

const SkeletonLoader = () => {
  return (
    <div className={styles.skeletonWrapper}>
      <div className={styles.skeletonThumbnail}></div>
      <div className={styles.skeletonTitle}></div>
      <div className={styles.skeletonButton}></div>
    </div>
  );
};

export default SkeletonLoader;