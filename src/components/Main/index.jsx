import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import OfertaSection from "./MainComponents/OfertaSection/OfertaSection";
import OnasSection from "./MainComponents/OnasSection/OnasSection";
import UmowSieSection from "./MainComponents/UmowSieSection/UmowSieSection";
import KontaktSection from "./MainComponents/KontaktSection/KontaktSection";
import MojeKontoSection from "./MainComponents/MojeKontoSection/MojeKontoSection";
import MojeWizytySection from "./MainComponents/MojeWizytySection/MojeWizytySection";
import { useNavigate } from "react-router-dom";
const Main = () => {
  const [header, setHeader] = useState("O nas");
  const [showOnas, setShowOnas] = useState(true);
  const [showOferta, setShowOferta] = useState(false);
  const [showUmowSie, setShowUmowSie] = useState(false);
  const [showMojeKonto, setShowMojeKonto] = useState(false);
  const [showKontakt, setShowKontakt] = useState(false);
  const [showMojeWizyty, setShowMojeWizyty] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const navigate = useNavigate();
  const handleOnas = () => {
    setHeader("O nas");
    setShowOnas(true);
    setShowOferta(false);
    setShowUmowSie(false);
    setShowMojeKonto(false);
    setShowKontakt(false);
    setShowMojeWizyty(false);
  };

  const handleOferta = () => {
    setHeader("Oferta");
    setShowOnas(false);
    setShowOferta(true);
    setShowUmowSie(false);
    setShowMojeKonto(false);
    setShowKontakt(false);
    setShowMojeWizyty(false);
  };
  const handleMojeWizyty = () => {
    setHeader("Moje wizyty");
    setShowMojeWizyty(true);
    setShowOnas(false);
    setShowOferta(false);
    setShowUmowSie(false);
    setShowMojeKonto(false);
    setShowKontakt(false);
  };
  const handleUmowSie = () => {
    setShowOnas(false);
    setShowOferta(false);
    setShowUmowSie(false);
    setShowMojeKonto(false);
    setShowKontakt(false);
    setShowMojeWizyty(false);

    if (isUserLoggedIn) {
      setHeader("Umów się");
      setShowUmowSie(true);
    } else {
      navigate("/login");
    }
  };

  const handleMojeKonto = () => {
    setHeader("Moje konto");
    setShowOnas(false);
    setShowOferta(false);
    setShowUmowSie(false);
    setShowMojeKonto(true);
    setShowKontakt(false);
    setShowMojeWizyty(false);
  };

  const handleKontakt = () => {
    setHeader("Kontakt");
    setShowOnas(false);
    setShowOferta(false);
    setShowUmowSie(false);
    setShowMojeKonto(false);
    setShowKontakt(true);
    setShowMojeWizyty(false);
  };
  //Wylogowywanie się
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // Ponowne wczytanie strony
  };
  //Sprawdzenie czy użytkownik zalogowany
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, []);
  return (
    <div className={styles.background}>
      <div className={styles.main_container}>
        <div className={styles.top_bar}>
          <div className={styles.logo_container}>
            <a href="https://www.facebook.com" target="_blank">
              <img
                src="../images/fb_logo.png"
                alt="Facebook Logo"
                className={styles.logo_social}
              />
            </a>
            <span style={{ margin: "0 10px" }}></span>
            <a href="https://www.instagram.com" target="_blank">
              <img
                src="../images/inst_logo.png"
                alt="Instagram Logo"
                className={styles.logo_social}
              />
            </a>
            <img src="../images/logo.png" alt="Logo" className={styles.logo} />
            <p className={styles.phone_number}>+48 700 900 200</p>
          </div>
          <div className={styles.contact_info}>
            <p className={styles.welcome_text}>
              Witaj na stronie naszego warsztatu samochodowego!
            </p>
          </div>
        </div>
        <nav className={styles.navbar}>
          <button className={styles.white_btn} onClick={handleOnas}>
            O nas
          </button>
          <button className={styles.white_btn} onClick={handleOferta}>
            Oferta
          </button>
          <button className={styles.white_btn} onClick={handleUmowSie}>
            Umów się
          </button>
          {isUserLoggedIn ? (
            <button className={styles.white_btn} onClick={handleMojeKonto}>
              Moje konto
            </button>
          ) : (
            <button
              className={styles.white_btn}
              onClick={() => navigate("/login")}
            >
              Zaloguj się
            </button>
          )}
      {isUserLoggedIn && (
        <button className={styles.white_btn} onClick={handleMojeWizyty}>
          Moje wizyty
        </button>
      )}
          <button className={styles.white_btn} onClick={handleKontakt}>
            Kontakt
          </button>
        </nav>
        <div className={styles.content_container}>
          <div className={styles.header_container}>
            <h2>{header}</h2>
          </div>
          {showOnas && <OnasSection />}
          {showOferta && <OfertaSection />}
          {showUmowSie && isUserLoggedIn && <UmowSieSection />}
          {showMojeKonto && <MojeKontoSection onLogout={handleLogout} />}
          {showKontakt && <KontaktSection />}
          {showMojeWizyty && <MojeWizytySection />}
        </div>
      </div>
    </div>
  );
};

export default Main;
