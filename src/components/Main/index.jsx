import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import OfertaSection from "./MainComponents/OfertaSection/OfertaSection";
import OnasSection from "./MainComponents/OnasSection/OnasSection";
import UmowSieSection from "./MainComponents/UmowSieSection/UmowSieSection";
import KontaktSection from "./MainComponents/KontaktSection/KontaktSection";
import MojeKontoSection from "./MainComponents/MojeKontoSection/MojeKontoSection";
import MojeWizytySection from "./MainComponents/MojeWizytySection/MojeWizytySection";
import WszyscyUzytkownicySection from "./MainComponents/WszyscyUzytkownicySection/WszyscyUzytkownicySection";
import WszystkieWizytySection from "./MainComponents/WszystkieWizytySection/WszystkieWizytySection";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Main = () => {
  //ustaw domyślnie widok sekcji "O nas"
  const [header, setHeader] = useState("O nas");
  const [showOnas, setShowOnas] = useState(true);
  const [showOferta, setShowOferta] = useState(false);
  const [showUmowSie, setShowUmowSie] = useState(false);
  const [showMojeKonto, setShowMojeKonto] = useState(false);
  const [showKontakt, setShowKontakt] = useState(false);
  const [showMojeWizyty, setShowMojeWizyty] = useState(false);
  const [showWszyscyuzytkownicy, setShowWszyscyuzytkownicy] = useState(false);
  const [showWszystkieWizyty, setShowWszystkieWizyty] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); //czy użytkownik zalogowany
  const [isEmployeeLoggedIn, setIsEmployeeLoggedIn] = useState(false); //czy pracownik zalogowany
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false); //czy admin zalogowany
  const [isClientLoggedIn, setIsClientLoggedIn] = useState(false); //czy klient zalgowoany
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  //Sprawdzenie czy użytkownik zalogowany i pobranie roli
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const config = {
            method: "get",
            url: "http://localhost:8080/user",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token,
            },
          };
          const response = await axios(config);
          const roleData = response.data;
          if (roleData.data.role === "client") {
            setIsClientLoggedIn(true);
            setIsEmployeeLoggedIn(false);
            setIsAdminLoggedIn(false);
          } else if (roleData.data.role === "employee") {
            setIsEmployeeLoggedIn(true);
            setIsAdminLoggedIn(false);
            setIsClientLoggedIn(false);
          } else if (roleData.data.role === "admin") {
            setIsAdminLoggedIn(true);
            setIsEmployeeLoggedIn(false);
            setIsClientLoggedIn(false);
          }
          setUserRole(roleData.data.role);
        }
      } catch (error) {
        console.error("Error getting user role:", error);
      }
    };
    fetchData();
  }, [isUserLoggedIn]); // Wywołaj useEffect tylko przy zmianie stanu isUserLoggedIn
  //Sprawdzenie czy użytkownik zalogowany
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, []);
  const clearAll = () =>{
    setHeader("");
    setShowOnas(false);
    setShowOferta(false);
    setShowUmowSie(false);
    setShowMojeKonto(false);
    setShowKontakt(false);
    setShowMojeWizyty(false);
    setShowWszyscyuzytkownicy(false);
    setShowWszystkieWizyty(false);
  }
  //Przycisk O nas
  const handleOnas = () => {
    clearAll();
    setHeader("O nas");
    setShowOnas(true);
  };
  //Przycisk Oferta
  const handleOferta = () => {
    clearAll();
    setHeader("Oferta");
    setShowOferta(true);
  };
  //Przycisk Moje Wizyty
  const handleMojeWizyty = () => {
    clearAll();
    setHeader("Moje wizyty");
    setShowMojeWizyty(true);
  };
  //Przycisk Umow Sie
  const handleUmowSie = () => {
    clearAll();
    if (isUserLoggedIn) {
      setHeader("Umów się");
      setShowUmowSie(true);
    } else {
      navigate("/login");
    }
  };
  //Przycisk Moje Konto
  const handleMojeKonto = () => {
    clearAll();
    setHeader("Moje konto");
    setShowMojeKonto(true);
  };
  //Przycisk Kontakt
  const handleKontakt = () => {
    clearAll();
    setHeader("Kontakt");
    setShowKontakt(true);
  };
  const handleWszyscyUzytkownicy = () => {
    clearAll();
    setHeader("Wszyscy użytkownicy");
    setShowWszyscyuzytkownicy(true);
  }
  const handleWszystkieWizyty = () => {
    clearAll();
    setHeader("WszystkieWizyty")
    setShowWszystkieWizyty(true);
  }
  //Wylogowywanie się
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // Ponowne wczytanie strony
  };
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
              {isEmployeeLoggedIn && (
                <span>
                  Witaj <span className={styles.employee}>Pracowniku</span> na
                  stronie naszego warsztatu samochodowego!
                </span>
              )}
              {isAdminLoggedIn && (
                <span>
                  Witaj <span className={styles.admin}>Administratorze</span> na
                  stronie naszego warsztatu samochodowego!
                </span>
              )}
              {isClientLoggedIn && (
                <span>
                  Witaj <span className={styles.client}>Kliencie</span> na
                  stronie naszego warsztatu samochodowego!
                </span>
              )}
              {!isEmployeeLoggedIn && !isAdminLoggedIn && !isClientLoggedIn && (
                <span>Witaj na stronie naszego warsztatu samochodowego!</span>
              )}
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

          {isClientLoggedIn&&(<button className={styles.white_btn} onClick={handleUmowSie}>
            Umów się
          </button>)}

          {isUserLoggedIn && isAdminLoggedIn&&(
            <div>
              <button className={styles.white_btn} onClick={handleWszyscyUzytkownicy}>Wszyscy Użytkownicy</button>

              <button className={styles.white_btn} onClick={handleWszystkieWizyty}>Wszystkie wizyty</button>
              </div>
            )}

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

          {isUserLoggedIn && isClientLoggedIn&&(
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
          {showWszyscyuzytkownicy && <WszyscyUzytkownicySection/>}
          {showWszystkieWizyty && <WszystkieWizytySection/>}
        </div>
      </div>
    </div>
  );
};

export default Main;
