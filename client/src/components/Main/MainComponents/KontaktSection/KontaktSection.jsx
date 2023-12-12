import React from 'react';
import styles from './styles.module.css';

  
const KontaktSection = () => {

  return (
    <div>
      <div className={styles.contactContainer}>
        <p>Adres: ul. Przykładowa 123, 00-001 Warszawa</p>
        <p>Telefon: 700 900 200</p>
        <p>Email: kontakt@example.com</p>
      </div>

    </div>
  );
};

export default KontaktSection;