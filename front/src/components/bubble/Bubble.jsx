import React, { useState } from 'react';
import styles from './Bubble.module.css';
import bookmark from "../../assets/bookmark.svg";
import bookmarked from "../../assets/bookmarked.svg";

const Bubble = ({ title, url, image }) => {
  let [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <>
      <div className={styles.bubbleContainer}>
        <div className={styles.bookmarkIcon} onClick={() => {setIsBookmarked(!isBookmarked)}}>{isBookmarked ? <img src={bookmarked}/> : <img src={bookmark}/>}</div>
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
