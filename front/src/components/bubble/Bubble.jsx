import React from 'react';
import styles from './Bubble.module.css';

const Bubble = ({ title, url, image }) => {
  return (
    <>
      <div className={styles.bubbleContainer}>
        <div className={styles.content}>
          <img src={image} alt="Thumbnail" className={styles.thumbnail} />
          <div className={styles.titleOverlay}>
            <a href={url} target="_blank" rel="noopener noreferrer" className={styles.link}>
              {title}
            </a>
          </div>
        </div>
      </div>
      <div className={styles.arrow}></div>
    </>
  );
};

export default Bubble;
