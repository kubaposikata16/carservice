import React from 'react';
import styles from './styles.module.css';

const KontaktSection = () => {
  return (
    <div className={styles.contactSection}>
      <div className={styles.mapOuter}>
        <iframe
          width="400"
          height="400"
          id="gmap_canvas"
          src="https://maps.google.com/maps?q=Zamość%Lipska%2040b&t=&z=13&ie=UTF8&iwloc=&output=embed"
          style={{ border:0 }}
          allowFullScreen=""
          loading="lazy"
          title="Mapa lokalizacji ul. Lipska 40B, 22-400 Zamość"
        >
        </iframe>
      </div>
      <div className={styles.contactContainer}>
        <p>Adres: ul. Lipska 40B, 22-400 Zamość</p>
        <p>Telefon: 700 900 200</p>
        <p>Email: warsztat@ethereal.email</p>
      </div>
    </div>
  );
};

export default KontaktSection;