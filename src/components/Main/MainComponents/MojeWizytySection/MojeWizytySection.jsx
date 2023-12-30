import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import axios from "axios";

const MojeWizytySection = () => {
  //Załadowanie jednorazowo danych sekcji moje wizyty
  const [userVisitData, setUserVisitData] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);

  // Załadowanie jednorazowo danych sekcji moje wizyty
  useEffect(() => {
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
      } catch (error) {
        console.error("Error getting user info:", error);
      }
    };

    if (!dataFetched) {
      handleGetVisitInfo();
      setDataFetched(true);
    }
  }, [dataFetched]);

  const renderTable = () => {
    if (!userVisitData || userVisitData.length === 0) {
      return <p>Brak danych do wyświetlenia.</p>;
    }

    // Pobierz nazwy zmiennych z pierwszej wizyty
    const variableNames = Object.keys(userVisitData[0]);
    return (
      <table className={styles.myVisitsTable}>
        <thead>
          <tr>
            {variableNames.map((name) => (
              <th key={name}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userVisitData.map((visit, index) => (
            <tr key={index}>
              {variableNames.map((name) => (
                <td key={name}>{visit[name]}</td>
              ))}
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
    </div>
    
  );
};

export default MojeWizytySection;
