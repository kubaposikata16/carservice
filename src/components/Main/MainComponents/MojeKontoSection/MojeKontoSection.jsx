import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import axios from "axios";

const MojeKontoSection = ({ onLogout }) => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [dataFetched, setDataFetched] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  //Załadowanie jednorazowo danych sekcji moje konto
  useEffect(() => {
    if (!dataFetched) {
      handleGetAccInfo();
      setDataFetched(true);
    }
  }, [dataFetched]);

  const handleGetAccInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        method: "get",
        url: "http://localhost:8080/user",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      const { data: res } = await axios(config);
      setUserData(res.data); // Ustaw dane użytkownika w stanie
      console.log("User Data:", res.data);
    } catch (error) {
      console.error("Error getting user info:", error);
    }
  };
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        method: "delete",
        url: "http://localhost:8080/user",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      await axios(config);
    } catch (error) {
      console.error("Error deleting user info:", error);
      console.log("Detailed error response:", error.response);
    }
  };

  const handleLogout = () => {
    onLogout();
  };
  const handleDeleteAccount = () => {
    setShowConfirmation(true);
  };
  const handleCancelDeleteAccount = () => {
    setShowConfirmation(false);
  };
  const handleConfirmDeleteAccount = () => {
    console.log("Usuwanie konta...");
    //usuń konto
    handleDelete();
    // Następnie wyloguj użytkownika
    handleLogout();
  };
  const [isDataChanged, setIsDataChanged] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
    setIsDataChanged(true);
  };
  const handleSave = async (event) => {
    
    // Wykluczanie pól, które nie powinny być zapisane
    const { __v, _id, password, role, ...filteredUserData } = userData;
    console.log("Dane wysyłane do serwera:", filteredUserData);
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
        const config = {
          method: "put",
          url: "http://localhost:8080/user",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          data: filteredUserData
        };
      await axios(config);
      alert("Dane zostały pomyślnie zaktualizowane!");
      setIsDataChanged(false);
      window.location.href = '/';
    } catch (error) {
      console.error(
        "Wystąpił błąd podczas wysyłania żądania PUT:",
        error.message
      );
    }
    
  };
  //Zmiana Hasła:
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsAreCorrect, setPasswordsAreCorrect] = useState(true);
  const [passwordLengthValid, setPasswordLengthValid] = useState(true);
  const handleEditPassword = () => {
    setShowChangePassword(true);
  };
  const handleCancelEditPassword = () => {
    setNewPassword("");
    setConfirmPassword("");
    setShowChangePassword(false);
    setPasswordsAreCorrect(true);
    setPasswordLengthValid(true);
  };
  //zapisanie hasła
  const handleSavePassword = async () => {
    if (newPassword === confirmPassword) {
      try {
        const token = localStorage.getItem("token");
        const config = {
          method: "put",
          url: "http://localhost:8080/user",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          data: {
            password: newPassword,
          },
        };
        await axios(config);
        //powrót do danych konta wraz z alertem o sukcesie
        setNewPassword("");
        setConfirmPassword("");
        setShowChangePassword(false);
        setPasswordsAreCorrect(true);
        setPasswordLengthValid(true);
        alert("Hasło zostało zaktualizowane!");
      } catch (error) {
        console.error(
          "Wystąpił błąd podczas wysyłania żądania PUT:",
          error.message
        );
      }
    } else {
      //obsłużyć sytuację, gdy hasła się nie zgadzają
      setPasswordsAreCorrect(false);
    }
  };
  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setNewPassword(value);
    setPasswordLengthValid(value.length >= 8);
    if (value === confirmPassword && passwordLengthValid) {
      setPasswordsAreCorrect(true);
    } else {
      setPasswordsAreCorrect(false);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    if (newPassword === value) {
      setPasswordsAreCorrect(true);
    } else {
      setPasswordsAreCorrect(false);
    }
  };
  return (
    <div>
      <div className={styles.accountContainer}>
        {showChangePassword && (
          <div>
            <p>
              Nowe Hasło:{" "}
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                required
                onChange={handlePasswordChange}
              />
              {!passwordLengthValid && (
                <p style={{ color: "red" }}>
                  Hasło musi mieć co najmniej 8 znaków.
                </p>
              )}
            </p>
            <p>
              Potwierdź Hasło:{" "}
              <input
                type="password"
                name="confirmPassword"
                required
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </p>
            {!passwordsAreCorrect && (
              <p style={{ color: "red" }}>Hasła muszą być takie same.</p>
            )}
            {newPassword !== "" &&
              passwordLengthValid &&
              passwordsAreCorrect && (
                <button onClick={handleSavePassword}>Zapisz</button>
              )}
            <button onClick={handleCancelEditPassword}>Anuluj</button>
          </div>
        )}
        {!showChangePassword && !showConfirmation && (
          <div className={styles.accountContainer}>
            <form className={styles.form_container} onSubmit={handleSave}>
              <p>
                Imię:{" "}
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                  pattern="^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+$"
                  required
                />
              </p>
              <p>
                Nazwisko:{" "}
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                  pattern="^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+$"
                  required
                />
              </p>
              <p>
                E-mail:{" "}
                <input
                  type="text"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
              </p>
              <p>
                Hasło: ••••••••••••{"    "}
                <button onClick={handleEditPassword}>Edytuj</button>
              </p>
              <p>
                Numer telefonu:{" "}
                <input
                  type="text"
                  name="phoneNumber"
                  value={userData.phoneNumber}
                  onChange={handleChange}
                  pattern="[0-9]{9}"
                  required
                />
              </p>
              <p>Rola: {userData.role}</p>
              {isDataChanged && <button type="submit">Zapisz</button>}
            </form>
            <button className={styles.red_btn} onClick={handleDeleteAccount}>
              Usuń konto
            </button>
            <button className={styles.white_btn} onClick={handleLogout}>
              Wyloguj się
            </button>
          </div>
        )}
        {showConfirmation && (
          <div className={styles.confirmation}>
            <p>Czy na pewno chcesz usunąć konto?</p>
            <button onClick={handleConfirmDeleteAccount}>Tak</button>
            <button onClick={handleCancelDeleteAccount}>Anuluj</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MojeKontoSection;
