import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import axios from "axios";
const WszystkieWizytySection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [visits, setVisits] = useState([]);
  const [displayMode, setDisplayMode] = useState("date")
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
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };
  useEffect(() => {
    const fetchVisitDataFromApi = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const config = {
          method: "get",
          url: "http://localhost:8080/forms",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        };
        const { data: res } = await axios(config);

        // Pobierz dane użytkowników dla każdej wizyty
        const visitsWithUserData = await Promise.all(
          res.data.map(async (visit) => {
            const userResponse = await axios.get(
              `http://localhost:8080/user/${visit.createdBy}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  "x-access-token": token,
                },
              }
            );
            return { ...visit, user: userResponse.data };
          })
        );
        setVisits(visitsWithUserData);
        console.log("Wizyty z danymi uzytkownika", visitsWithUserData);
      } catch (error) {
        console.error("Error getting visit info:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVisitDataFromApi();
  }, []);
  // Zmiana statusu wizyty na 'Oczekuje na potwierdzenie', 'Zaakceptowano', 'W trakcie realizacji', 'Zakończono'
  const handleChangeVisitStatus = async (visitId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8080/form/status/${visitId}`,
        {
          status: newStatus,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );

      if (response.status === 200) {
        console.log(`Status wizyty został zmieniony na ${newStatus}`);
        const updatedVisits = visits.map((visit) =>
          visit._id === visitId ? { ...visit, status: newStatus } : visit
        );
        setVisits(updatedVisits);
      }
    } catch (error) {
      console.error(
        "Wystąpił błąd podczas aktualizacji statusu wizyty:",
        error
      );
    }
  };
  const handleDeleteVisit = async (visitId) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        method: "delete",
        url: `http://localhost:8080/form/forEmployeeOrAdmin/${visitId}`,
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      await axios(config);
      setVisits((prevVisits) =>
        prevVisits.filter((visit) => visit._id !== visitId)
      );
    } catch (error) {
      console.error("Error deleting visit:", error);
    }
  };

  const renderVisitsTable = () => {
    const sortedVisits = displayMode === "date" 
      ? [...visits].sort((a, b) => new Date(a.date) - new Date(b.date))
      : [...visits].sort((a, b) => a.user.data.lastName.localeCompare(b.user.data.lastName));

    return (
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Usługa</th>
            <th>Marka samochodu</th>
            <th>Model</th>
            <th>Data</th>
            <th>Godzina</th>
            <th>Status</th>
            <th>Użytkownik</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {sortedVisits.map((visit) => (
            <tr key={visit._id}>
              <td>{visit.service}</td>
              <td>{visit.carBrand}</td>
              <td>{visit.carModel}</td>
              <td>{formatDate(visit.date)}</td>
              <td>{visit.time}</td>
              <td>{visit.status}</td>
              <td>{visit.user.data.firstName} {visit.user.data.lastName}</td>
              <td>
                {visit.status!=="Zakończono"&&(
              <button onClick={() => handleDeleteVisit(visit._id)}>
                  Odwołaj
                </button>)}
                {visit.status === "Oczekuje na potwierdzenie" && (
                  <button
                    onClick={() =>
                      handleChangeVisitStatus(visit._id, "Zaakceptowano")
                    }
                  >
                    Zaakceptuj
                  </button>
                )}
                {visit.status === "Zaakceptowano" && (
                  <button
                    onClick={() =>
                      handleChangeVisitStatus(visit._id, "W trakcie realizacji")
                    }
                  >
                    W trakcie realizacji
                  </button>
                )}
                {visit.status === "W trakcie realizacji" && (
                  <button
                    onClick={() =>
                      handleChangeVisitStatus(visit._id, "Zakończono")
                    }
                  >
                    Zakończ
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
        <div className={styles.wszystkieWizytySection}>
      {isLoading ? (
        <div className={styles.loading}>Wczytywanie danych...</div>
      ) : (
        <div className={styles.tableWrapper}>
          <div className={styles.buttonWrapper}>
  <button className={styles.button} onClick={() => setDisplayMode("date")}>Sortuj według daty</button>
  <button className={styles.button} onClick={() => setDisplayMode("user")}>Sortuj według użytkownika</button>
</div>
          <table className={styles.table}>
          {renderVisitsTable()}
          </table>
        </div>
      )}
    </div>
  );
};
export default WszystkieWizytySection;
