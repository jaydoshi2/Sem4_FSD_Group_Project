import React from 'react';
import styles from '../styles/Book.module.css'; // Import the CSS module

const BookLoader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.book}>
        <div className={styles.book__pgShadow}></div>
        <div className={styles.book__pg}></div>
        <div className={`${styles.book__pg} ${styles.book__pg__2}`}></div>
        <div className={`${styles.book__pg} ${styles.book__pg__3}`}></div>
        <div className={`${styles.book__pg} ${styles.book__pg__4}`}></div>
        <div className={`${styles.book__pg} ${styles.book__pg__5}`}></div>
      </div>
    </div>
  );
};

export default BookLoader;
