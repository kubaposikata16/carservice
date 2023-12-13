import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import axios from "axios";

const MojeKontoSection = ({ onLogout }) => {
  const [userData, setUserData] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
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
      setEditedData(res.data);
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
      }}
      await axios(config);
    } catch (error) {
      console.error("Error deleting user info:", error);
      console.log("Detailed error response:", error.response);
    }
  }
  const handleSaveEdit = async () => {
    // Sprawdzamy, czy hasło zostało zmienione
    console.log(editedData);
    try {
      const token = localStorage.getItem("token");
      const { _id, ...dataWithoutId } = editedData;
      const { __v, ...dataWithoutV } = dataWithoutId;
      const { password, ...dataWithoutPassword } = dataWithoutV;
      const requestData = isPasswordChanged
        ? { ...dataWithoutPassword, password: editedData.password }
        : dataWithoutPassword;
      const config = {
        method: "put",
        url: "http://localhost:8080/user",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        data: requestData,
      };
      console.log("WYSŁANO:" + JSON.stringify(requestData, null, 2));
      console.log(
        `Hasło zostało zmienione: ${isPasswordChanged ? "Tak" : "Nie"}`
      );
      await axios(config);
      setIsEditing(false);
      await handleGetAccInfo();
    } catch (error) {
      console.error("Error updating user info:", error);
      console.log("Detailed error response:", error.response);
    }
  };
  const handleLogout = () => {
    onLogout();
  };
  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...userData });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedData({});
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Sprawdzamy, czy aktualnie edytowane jest hasło
    const isPasswordInput = name === "password";
  
    // Ustawiamy isPasswordChanged na true, jeśli edytowane jest hasło i wpisano jakąś wartość
    setIsPasswordChanged(isPasswordInput && value !== "");
  
    // Ustawiamy wartość dla edytowanych danych
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleDeleteAccount = () => {
    setShowConfirmation(true);
  };
  const handleCancelDeleteAccount = () => {
    setShowConfirmation(false);
  };
  const handleConfirmDeleteAccount = () => {
    // Tutaj umieść logikę usuwania konta
    console.log("Usuwanie konta...");
    handleDelete();
    // Następnie wyloguj użytkownika
    handleLogout();
  };
  return (
    <div>
      <div className={styles.accountContainer}>
        {isEditing ? (
          <div>
            <label>
              Imię:
              <input
                type="text"
                name="firstName"
                value={editedData.firstName || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Nazwisko:
              <input
                type="text"
                name="lastName"
                value={editedData.lastName || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={editedData.email || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Hasło:
              <input
                type="password"
                name="password"
                value={editedData.password}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Numer Telefonu:
              <input
                type="text"
                name="phoneNumber"
                value={editedData.phoneNumber || ""}
                onChange={handleInputChange}
              />
            </label>
            <button onClick={handleSaveEdit}>Zapisz</button>
            <button onClick={handleCancelEdit}>Anuluj</button>
          </div>
        ) : (
          <div className="user-info-container">
            <p>Imię: {userData?.firstName}</p>
            <p>Nazwisko: {userData?.lastName}</p>
            <p>Email: {userData?.email}</p>
            <p>Hasło: {Array(userData?.password.length).fill("•").join("")}</p>
            <p>Numer Telefonu: {userData?.phoneNumber}</p>
            <button onClick={handleEdit}>Edytuj</button>
          </div>
        )}
        {!showConfirmation && (
          <button className={styles.red_btn} onClick={handleDeleteAccount}>
            Usuń konto
          </button>
        )}
        {showConfirmation && (
          <div className={styles.confirmation}>
            <p>Czy na pewno chcesz usunąć konto?</p>
            <button onClick={handleConfirmDeleteAccount}>Tak</button>
            <button onClick={handleCancelDeleteAccount}>Anuluj</button>
          </div>
        )}
        <button className={styles.white_btn} onClick={handleLogout}>
          Wyloguj się
        </button>
      </div>
    </div>
  );
};

export default MojeKontoSection;
