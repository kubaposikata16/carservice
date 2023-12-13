import React from 'react';
import styles from './styles.module.css';
const OfertaSection = () => {
  const handleScrollToDescription = (descriptionId) => {
    const element = document.getElementById(descriptionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div>
      <div className={styles.table_container}>
        <table>
          <tbody>
            <tr>
              <td>
                <img src="sciezka/do/obrazka1.jpg" alt="Obrazek 1" />
                <h2>Mechanika samochodowa</h2>
                <button onClick={() => handleScrollToDescription('mechanikaDescription')}>
                  Więcej
                </button>
              </td>
              <td>
                <img src="sciezka/do/obrazka2.jpg" alt="Obrazek 2" />
                <h2>Wymiana oleju</h2>
                <button onClick={() => handleScrollToDescription('wymianaOlejuDescription')}>
                  Więcej
                </button>
              </td>
              <td>
                <img src="sciezka/do/obrazka3.jpg" alt="Obrazek 3" />
                <h2>Auto detailing</h2>
                <button onClick={() => handleScrollToDescription('autoDetailingDescription')}>
                  Więcej
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <img src="sciezka/do/obrazka4.jpg" alt="Obrazek 4" />
                <h2>Geometria kół</h2>
                <button onClick={() => handleScrollToDescription('geometriaKolDescription')}>
                  Więcej
                </button>
              </td>
              <td>
                <img src="sciezka/do/obrazka5.jpg" alt="Obrazek 5" />
                <h2>Wulkanizacja</h2>
                <button onClick={() => handleScrollToDescription('wulkanizacjaDescription')}>
                  Więcej
                </button>
              </td>
              <td>
                <img src="sciezka/do/obrazka6.jpg" alt="Obrazek 6" />
                <h2>Serwis klimatyzacji</h2>
                <button onClick={() => handleScrollToDescription('serwisKlimatyzacjiDescription')}>
                  Więcej
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="mechanikaDescription" className={`${styles.description} ${styles.nieparzyste}`}>
        <p>
          Opis dla Mechaniki samochodowej. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nulla gravida euismod diam, nec tempus nunc tincidunt at. Suspendisse potenti. Vivamus eu
          metus ut justo scelerisque interdum nec ut mauris. Fusce pharetra velit non luctus
          fermentum. Integer sed volutpat risus. Vestibulum ullamcorper, sem id vestibulum rhoncus,
          urna urna elementum tellus, ac scelerisque mi elit ac nisi. Curabitur et lacus vel orci
          rhoncus finibus. Integer et augue vel justo sagittis cursus. Maecenas ultricies sapien a
          libero consectetur, et aliquet justo tempor.
        </p>
      </div>
      <div id="wymianaOlejuDescription" className={`${styles.description} ${styles.parzyste}`}>
        <p>
          Opis dla Wymiany oleju. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          gravida euismod diam, nec tempus nunc tincidunt at. Suspendisse potenti. Vivamus eu metus
          ut justo scelerisque interdum nec ut mauris. Fusce pharetra velit non luctus fermentum.
          Integer sed volutpat risus. Vestibulum ullamcorper, sem id vestibulum rhoncus, urna urna
          elementum tellus, ac scelerisque mi elit ac nisi. Curabitur et lacus vel orci rhoncus
          finibus. Integer et augue vel justo sagittis cursus. Maecenas ultricies sapien a libero
          consectetur, et aliquet justo tempor.
        </p>
      </div>
      <div id="autoDetailingDescription" className={`${styles.description} ${styles.nieparzyste}`}>
      <p>
          Opis dla Auto detailing. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          gravida euismod diam, nec tempus nunc tincidunt at. Suspendisse potenti. Vivamus eu metus
          ut justo scelerisque interdum nec ut mauris. Fusce pharetra velit non luctus fermentum.
          Integer sed volutpat risus. Vestibulum ullamcorper, sem id vestibulum rhoncus, urna urna
          elementum tellus, ac scelerisque mi elit ac nisi. Curabitur et lacus vel orci rhoncus
          finibus. Integer et augue vel justo sagittis cursus. Maecenas ultricies sapien a libero
          consectetur, et aliquet justo tempor.
        </p>
      </div>
      <div id="geometriaKolDescription" className={`${styles.description} ${styles.parzyste}`}>
      <p>
          Opis dla Geometria kół. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          gravida euismod diam, nec tempus nunc tincidunt at. Suspendisse potenti. Vivamus eu metus
          ut justo scelerisque interdum nec ut mauris. Fusce pharetra velit non luctus fermentum.
          Integer sed volutpat risus. Vestibulum ullamcorper, sem id vestibulum rhoncus, urna urna
          elementum tellus, ac scelerisque mi elit ac nisi. Curabitur et lacus vel orci rhoncus
          finibus. Integer et augue vel justo sagittis cursus. Maecenas ultricies sapien a libero
          consectetur, et aliquet justo tempor.
        </p>
      </div>
      <div id="wulkanizacjaDescription" className={`${styles.description} ${styles.nieparzyste}`}>
      <p>
          Opis dla Wulkanizacja. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          gravida euismod diam, nec tempus nunc tincidunt at. Suspendisse potenti. Vivamus eu metus
          ut justo scelerisque interdum nec ut mauris. Fusce pharetra velit non luctus fermentum.
          Integer sed volutpat risus. Vestibulum ullamcorper, sem id vestibulum rhoncus, urna urna
          elementum tellus, ac scelerisque mi elit ac nisi. Curabitur et lacus vel orci rhoncus
          finibus. Integer et augue vel justo sagittis cursus. Maecenas ultricies sapien a libero
          consectetur, et aliquet justo tempor.
        </p>
      </div>
      <div id="serwisKlimatyzacjiDescription" className={`${styles.description} ${styles.parzyste}`}>
      <p>
          Opis dla Serwis klimatyzacji. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          gravida euismod diam, nec tempus nunc tincidunt at. Suspendisse potenti. Vivamus eu metus
          ut justo scelerisque interdum nec ut mauris. Fusce pharetra velit non luctus fermentum.
          Integer sed volutpat risus. Vestibulum ullamcorper, sem id vestibulum rhoncus, urna urna
          elementum tellus, ac scelerisque mi elit ac nisi. Curabitur et lacus vel orci rhoncus
          finibus. Integer et augue vel justo sagittis cursus. Maecenas ultricies sapien a libero
          consectetur, et aliquet justo tempor.
        </p>
      </div>
    </div>
  );
};

export default OfertaSection;