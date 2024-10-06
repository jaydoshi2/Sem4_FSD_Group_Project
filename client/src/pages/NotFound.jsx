import React from 'react';
import styles from '../styles/PageNotFound.module.scss';

const NotFoundPage = () => {
  return (
    <div className={styles.face}>
      <div className={styles.band}>
        <div className={styles.red}></div>
        <div className={styles.white}></div>
        <div className={styles.blue}></div>
      </div>
      <div className={styles.eyes}></div>
      <div className={styles.dimples}></div>
      <div className={styles.mouth}></div>

      <h1 className={styles.heading}>404 PAGE NOT FOUND!</h1>
      <div className={styles.btn} onClick={() => window.location.href = '/'}>Return to Home</div>
    </div>
  );
};

export default NotFoundPage;
