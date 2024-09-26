// /src/components/SkeletonSubNavbar.js
import React from 'react';
import styles from '../styles/SkeletonSubNavbar.module.css'; // Import the CSS Module

const SkeletonSubNavbar = () => {
    return (
        <div className={styles.skeletonSubNavbar}>
            <div className={styles.skeletonItem}></div>
            <div className={styles.skeletonItem}></div>
            <div className={styles.skeletonItem}></div>
            <div className={styles.skeletonItem}></div>
            <div className={styles.skeletonItem}></div>
            <div className={styles.skeletonItem}></div>
            <div className={styles.skeletonItem}></div>
            <div className={styles.skeletonItem}></div>
            <div className={styles.skeletonItem}></div>
        </div>
    );
};

export default SkeletonSubNavbar;