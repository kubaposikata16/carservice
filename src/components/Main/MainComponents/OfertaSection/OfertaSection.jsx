import React from "react";
import styles from "./styles.module.css";
const OfertaSection = () => {
  const handleScrollToDescription = (descriptionId) => {
    const element = document.getElementById(descriptionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div>
      <div className={styles.table_container}>
        <table>
          <tbody>
            <tr>
              <td>
                <img src="../images/Mechanika_samochodowa.jpg" alt="Obrazek 1" />
                <h2>Mechanika samochodowa</h2>
                <button
                  onClick={() =>
                    handleScrollToDescription("mechanikaDescription")
                  }
                >
                  Więcej
                </button>
              </td>
              <td>
                <img src="../images/Wymiana_oleju.jpg" alt="Obrazek 2" />
                <h2>Wymiana oleju</h2>
                <button
                  onClick={() =>
                    handleScrollToDescription("wymianaOlejuDescription")
                  }
                >
                  Więcej
                </button>
              </td>
              <td>
              <img src="../images/Serwis_klimatyzacji.jpg" alt="Obrazek 6" />
                <h2>Serwis klimatyzacji</h2>
                <button
                  onClick={() =>
                    handleScrollToDescription("serwisKlimatyzacjiDescription")
                  }
                >
                  Więcej
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <img src="../images/Geometria_kol.jpg" alt="Obrazek 4" />
                <h2>Geometria kół</h2>
                <button
                  onClick={() =>
                    handleScrollToDescription("geometriaKolDescription")
                  }
                >
                  Więcej
                </button>
              </td>
              <td>
                <img src="../images/Wulkanizacja.jpg" alt="Obrazek 5" />
                <h2>Wulkanizacja</h2>
                <button
                  onClick={() =>
                    handleScrollToDescription("wulkanizacjaDescription")
                  }
                >
                  Więcej
                </button>
              </td>
              <td>
                
                <img src="../images/Cennik.jpg" alt="Obrazek 3" />
                <h2>Cennik</h2>
                <button
                  onClick={() => handleScrollToDescription("cennikDescription")}
                >
                  Więcej
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        id="mechanikaDescription"
        className={`${styles.description} ${styles.nieparzyste}`}
      >
        <p>
          Mechanika samochodowa obejmuje kompleksową diagnostykę oraz naprawę
          usterek. Od wymiany oleju po naprawy silnika, nasz zespół
          profesjonalnych mechaników zapewnia szybką i skuteczną obsługę, aby
          Twoje auto było zawsze w pełni sprawne.
        </p>
      </div>
      <div
        id="wymianaOlejuDescription"
        className={`${styles.description} ${styles.parzyste}`}
      >
        <p>
          Regularna wymiana oleju jest kluczowa dla utrzymania dobrego stanu
          silnika. Oferujemy wymianę oleju silnikowego oraz filtrów, korzystając
          z najwyższej jakości produktów, aby zapewnić długie i bezproblemowe
          użytkowanie Twojego pojazdu.
        </p>
      </div>
      <div
        id="serwisKlimatyzacjiDescription"
        className={`${styles.description} ${styles.nieparzyste}`}
      >
        <p>
          Serwis klimatyzacji to gwarancja świeżego i czystego powietrza w Twoim
          samochodzie. Zajmujemy się przeglądem, dezynfekcją oraz uzupełnieniem
          czynnika chłodzącego, dbając o komfort i zdrowie pasażerów w każdych
          warunkach.
        </p>
      </div>
      <div
        id="geometriaKolDescription"
        className={`${styles.description} ${styles.parzyste}`}
      >
        <p>
          Geometria kół to kluczowy element, który wpływa na bezpieczeństwo
          jazdy. Nasza usługa regulacji geometrii kół zapewnia prawidłowe
          ustawienie kół, co przekłada się na lepszą przyczepność, równomierne
          zużycie opon i większy komfort jazdy.
        </p>
      </div>
      <div
        id="wulkanizacjaDescription"
        className={`${styles.description} ${styles.nieparzyste}`}
      >
        <p>
          Wulkanizacja to nasza specjalność. Oferujemy szeroki zakres usług, od
          naprawy uszkodzonych opon po ich wymianę. Dzięki nowoczesnemu
          sprzętowi gwarantujemy szybką i skuteczną obsługę, abyś mógł
          bezpiecznie kontynuować podróż.
        </p>
      </div>
      <div
        id="cennikDescription"
        className={`${styles.description} ${styles.parzyste}`}
      >
         <table>
    <thead>
      <tr>
        <th>Usługa</th>
        <th>Opis</th>
        <th>Cena (PLN)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Badania techniczne</td>
        <td>Badania techniczne pojazdu</td>
        <td>100</td>
      </tr>
      <tr>
        <td>Diagnostyka</td>
        <td>Diagnostyka komputerowa</td>
        <td>150</td>
      </tr>
      <tr>
        <td>Geometria i zbieżność</td>
        <td>Geometria i zbieżność kół</td>
        <td>200</td>
      </tr>
      <tr>
        <td>Hamulce</td>
        <td>Wymiana klocków hamulcowych</td>
        <td>250</td>
      </tr>
      <tr>
        <td>Hamulce</td>
        <td>Wymiana płynu hamulcowego</td>
        <td>100</td>
      </tr>
      <tr>
        <td>Hamulce</td>
        <td>Wymiana tarcz hamulcowych</td>
        <td>300</td>
      </tr>
      <tr>
        <td>Klimatyzacja</td>
        <td>Diagnostyka niedziałającej klimatyzacji</td>
        <td>120</td>
      </tr>
      <tr>
        <td>Klimatyzacja</td>
        <td>Wymiana filtra</td>
        <td>80</td>
      </tr>
      <tr>
        <td>Koła i opony</td>
        <td>Wymiana kół</td>
        <td>70</td>
      </tr>
      <tr>
        <td>Koła i opony</td>
        <td>Wymiana opon</td>
        <td>100</td>
      </tr>
      <tr>
        <td>Naprawy i usterki</td>
        <td>Różne naprawy i usterki</td>
        <td>Według wyceny</td>
      </tr>
      <tr>
        <td>Obsługa okresowa</td>
        <td>Przegląd okresowy</td>
        <td>200</td>
      </tr>
      <tr>
        <td>Obsługa okresowa</td>
        <td>Przegląd przed zakupem</td>
        <td>250</td>
      </tr>
      <tr>
        <td>Obsługa okresowa</td>
        <td>Wymiana oleju</td>
        <td>180</td>
      </tr>
    </tbody>
  </table>
      </div>
    </div>
  );
};

export default OfertaSection;
