import React from "react";
import styles from "./styles.module.css";

const OnasSection = () => {
  return (
    <div className={styles.onasSection}>
      <p>
        Witamy w naszym warsztacie samochodowym, gdzie pasja do motoryzacji
        łączy się z profesjonalizmem. Dzięki wieloletniemu doświadczeniu
        oferujemy pełen zakres usług - od prostych napraw po zaawansowane
        diagnostyki. Nasze motto to jakość, dokładność i zadowolenie klienta.
        Nasz zespół składa się z wykwalifikowanych mechaników, którzy stale
        podnoszą swoje kwalifikacje. Zawsze jesteśmy gotowi sprostać wszelkim
        wyzwaniom, aby Twoje auto wróciło na drogę w jak najlepszym stanie.
      </p>
      <div className={styles.imageContainer}>
        <img
          src="../images/onas1.jpg"
          alt="Opis zdjęcia 1"
          className={styles.image}
        />
        <img
          src="../images/onas2.jpg"
          alt="Opis zdjęcia 2"
          className={styles.image}
        />
        <img
          src="../images/onas3.jpg"
          alt="Opis zdjęcia 3"
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default OnasSection;
