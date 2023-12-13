import React from 'react';
import styles from './styles.module.css';

const OnasSection = () => {
  return (
    <div className={styles.onasSection}>
      <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          gravida euismod diam, nec tempus nunc tincidunt at. Suspendisse potenti. Vivamus eu metus
          ut justo scelerisque interdum nec ut mauris. Fusce pharetra velit non luctus fermentum.
          Integer sed volutpat risus. Vestibulum ullamcorper, sem id vestibulum rhoncus, urna urna
          elementum tellus, ac scelerisque mi elit ac nisi. Curabitur et lacus vel orci rhoncus
          finibus. Integer et augue vel justo sagittis cursus. Maecenas ultricies sapien a libero
          consectetur, et aliquet justo tempor.
      </p>
      <div className={styles.imageContainer}>
        <img
          src="https://example.com/image1.jpg"
          alt="Opis zdjęcia 1"
          className={styles.image}
        />
        <img
          src="https://example.com/image2.jpg"
          alt="Opis zdjęcia 2"
          className={styles.image}
        />
        <img
          src="https://example.com/image3.jpg"
          alt="Opis zdjęcia 3"
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default OnasSection;