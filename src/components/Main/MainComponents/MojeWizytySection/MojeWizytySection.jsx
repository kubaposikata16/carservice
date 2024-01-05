import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import axios from "axios";

const MojeWizytySection = () => {
  //Załadowanie jednorazowo danych sekcji moje wizyty
  const [userVisitData, setUserVisitData] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const [error, setError] = useState(null);
  const months = [
    "styczeń",
    "luty",
    "marzec",
    "kwiecień",
    "maj",
    "czerwiec",
    "lipiec",
    "sierpień",
    "wrzesień",
    "październik",
    "listopad",
    "grudzień",
  ];
  
  // Załadowanie jednorazowo danych sekcji moje wizyty
  const handleGetVisitInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        method: "get",
        url: "http://localhost:8080/form",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      const { data: res } = await axios(config);
      setUserVisitData(res.data);
      setError("");
    } catch (error) {
      console.error("Error getting user info:", error);
    }
  };
  useEffect(() => {
    if (!dataFetched) {
      handleGetVisitInfo();
      setDataFetched(true);
    }
  }, [dataFetched]);
  const handleDeleteVisit = async (visitId) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        method: "delete",
        url: `http://localhost:8080/form/${visitId}`,
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      const response = await axios(config);
      if (response.status === 200) {
        console.log("Wizyta usunięta pomyślnie.");
        handleGetVisitInfo(); // Ponowne załadowanie danych
      }
    } catch (error) {
      setError(error.response.data.message);
      console.error("Error deleting visit:", error);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };
  if (!userVisitData || userVisitData.length === 0) {
    return <p>Brak danych do wyświetlenia.</p>;
  }

  const currentTime = new Date();
  const renderTable = () => {
    if (!userVisitData || userVisitData.length === 0) {
      return <p>Brak danych do wyświetlenia.</p>;
    }

    return (
      <table className={styles.myVisitsTable}>
        <thead>
          <tr>
            <th>Usługa</th>
            <th>Data</th>
            <th>Godzina</th>
            <th>Marka</th>
            <th>Model</th>
            <th>Status</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {userVisitData.map((visit, index) => (
            <tr key={index}>
              <td>{visit.service}</td>
              <td>{formatDate(visit.date)}</td>
              <td>{visit.time}</td>
              <td>{visit.carBrand}</td>
              <td>{visit.carModel}</td>
              <td>{visit.status}</td>
              <td>
              {visit.status!=="Zakończono"&&(<button 
                  onClick={() => handleDeleteVisit(visit._id)}
                >
                  Odwołaj
                </button>)}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <div className={styles.myVisitsContainer}>
        {renderTable()}
      </div>
      {error && <div className={styles.centered_container}><div className={styles.error_msg}>{error}</div></div>} 
    </div>
    
  );
};

export default MojeWizytySection;
