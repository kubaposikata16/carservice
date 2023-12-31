import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import axios from "axios";
const WszystkieWizytySection = () => {
  const [visits, setVisits] = useState([]); // Tutaj trzymamy dane o wizytach
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
            const userResponse = await axios.get(`http://localhost:8080/user/${visit.createdBy}`, {
              headers: { "Content-Type": "application/json", "x-access-token": token },
            });
            return { ...visit, user: userResponse.data };
          })
        );
        setVisits(visitsWithUserData);
        console.log("Wizyty z danymi uzytkownika",visitsWithUserData);
      } catch (error) {
        console.error("Error getting visit info:", error);
      }
    };
    fetchVisitDataFromApi();
  }, []);
  // Zmiana statusu wizyty na 'Oczekuje na potwierdzenie', 'Zaakceptowano', 'W trakcie realizacji', 'Zakończono', 'Odwołano'
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

  return (
    <div>
      <p>Wizyty:</p>
      <ul>
      {visits.map((visit) => (
        <li key={visit._id}>
          {visit.service}, {visit.carBrand} {visit.carModel} - {formatDate(visit.date)} godzina {visit.time} - {visit.status}
          {visit.user && (
            <div>
              <p>Użytkownik: {visit.user.data.firstName} {visit.user.data.lastName}</p>
              <p>Email: {visit.user.data.email}</p>
              <p>Numer Telefonu: {visit.user.data.phoneNumber}</p>
            </div>
          )}
            <button onClick={() => handleDeleteVisit(visit._id)}>Usuń</button>
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
                onClick={() => handleChangeVisitStatus(visit._id, "Zakończono")}
              >
                Zakończ
              </button>
            )}
            {visit.status !== "Zakończono" && visit.status !== "Odwołano" && (
              <button
                onClick={() => handleChangeVisitStatus(visit._id, "Odwołano")}
              >
                Odwołaj
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default WszystkieWizytySection;
