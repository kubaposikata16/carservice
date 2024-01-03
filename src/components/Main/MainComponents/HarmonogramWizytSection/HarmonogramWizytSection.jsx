import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import {
  startOfWeek,
  endOfWeek,
  addWeeks,
  format,
  addDays,
  parseISO,
} from "date-fns";

const HarmonogramWizytSection = () => {
  const [isLoading, setIsLoading] = useState(false); //Wczytywanie harmonogramu
  const [visits, setVisits] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(0);
  const timeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
  ];
  const fetchVisitDataFromApi = async () => {
    setIsLoading(true);
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
      setVisits(groupVisitsByWeek(visitsWithUserData, currentWeek));
      console.log(visits);
    } catch (error) {
      console.error("Error getting visit info:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchVisitDataFromApi();
  }, [currentWeek]);

  const groupVisitsByWeek = (visits, weekOffset) => {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });
    const weekStart = addDays(start, 7 * weekOffset);
    const groupedVisits = {};

    for (let i = 0; i < 6; i++) {
      const day = format(addDays(weekStart, i), "yyyy-MM-dd");
      groupedVisits[day] = {};
      timeSlots.forEach((time) => {
        const visit = visits.find(
          (v) => v.date.startsWith(day) && v.time === time
        );
        if (visit) {
          groupedVisits[day][time] = visit;
        }
      });
    }
    return groupedVisits;
  };

  const renderTimeRows = () => {
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    const days = Array.from({ length: 6 }, (_, i) =>
      format(addDays(weekStart, i + currentWeek * 7), "yyyy-MM-dd")
    );

    return timeSlots.map((time) => (
      <tr key={time}>
        <td>{time}</td>
        {days.map((day) => {
          const visit = visits[day] && visits[day][time];
          return (
            <td key={day} onClick={() => visit && showVisitDetails(visit)}>
              {visit ? `${visit.service}` : ""}
            </td>
          );
        })}
      </tr>
    ));
  };
  //Wyświetlanie szczególów wizyty
  const [selectedVisit, setSelectedVisit] = useState(null);

  const showVisitDetails = (visit) => {
    setSelectedVisit(visit);
  };

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, "dd-MM-yyyy");
  };
  // Zmiana statusu wizyty
  const handleChangeVisitStatus = async (visitId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8080/form/status/${visitId}`,
        { status: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        }
      );

      if (response.status === 200) {
        console.log(`Status wizyty został zmieniony na ${newStatus}`);
        // Aktualizacja stanu wizyty
        setSelectedVisit((prevVisit) => ({ ...prevVisit, status: newStatus }));
      }
    } catch (error) {
      console.error(
        "Wystąpił błąd podczas aktualizacji statusu wizyty:",
        error
      );
    }
  };
  // Usunięcie wizyty
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
      const response = await axios(config);
      if (response.status === 200) {
        console.log("Wizyta usunięta pomyślnie.");
        fetchVisitDataFromApi(); // Ponowne załadowanie danych
      }
      setSelectedVisit(null);
    } catch (error) {
      console.error("Error deleting visit:", error);
    }
  };
  // W funkcji renderującej szczegóły wizyty
  const renderDetailsView = () => {
    if (!selectedVisit) {
      return null;
    }

    return (
      <div>
        <h2>Szczegóły wizyty</h2>
        <p>Imię: {selectedVisit.user.data.firstName}</p>
        <p>Nazwisko: {selectedVisit.user.data.lastName}</p>
        <p>E-mail: {selectedVisit.user.data.email}</p>
        <p>Telefon: {selectedVisit.user.data.phoneNumber}</p>
        <p>Usługa: {selectedVisit.service}</p>
        <p>Typ usługi: {selectedVisit.serviceType}</p>
        <p>Marka samochodu: {selectedVisit.carBrand}</p>
        <p>Model samochodu: {selectedVisit.carModel}</p>
        <p>Rok produkcji: {selectedVisit.carProductionYear}</p>
        <p>Silnik: {selectedVisit.engine} L</p>
        <p>Numer rejestracyjny: {selectedVisit.registrationNumber}</p>
        <p>Numer VIN: {selectedVisit.vin}</p>
        <p>Opis: {selectedVisit.moreinfo}</p>
        <p>Data: {formatDate(selectedVisit.date)}</p>
        <p>Godzina: {selectedVisit.time}</p>
        <button onClick={() => handleDeleteVisit(selectedVisit._id)}>
          Odwołaj
        </button>
        {selectedVisit.status === "Oczekuje na potwierdzenie" && (
          <button
            onClick={() =>
              handleChangeVisitStatus(selectedVisit._id, "Zaakceptowano")
            }
          >
            Zaakceptuj
          </button>
        )}
        {selectedVisit.status === "Zaakceptowano" && (
          <button
            onClick={() =>
              handleChangeVisitStatus(selectedVisit._id, "W trakcie realizacji")
            }
          >
            W trakcie realizacji
          </button>
        )}
        {selectedVisit.status === "W trakcie realizacji" && (
          <button
            onClick={() =>
              handleChangeVisitStatus(selectedVisit._id, "Zakończono")
            }
          >
            Zakończ
          </button>
        )}
        <button onClick={() => setSelectedVisit(null)}>
          Powrót do harmonogramu
        </button>
      </div>
    );
  };

  const getCurrentWeekRange = () => {
    const today = new Date();
    const start = startOfWeek(addWeeks(today, currentWeek), {
      weekStartsOn: 1,
    });
    const end = endOfWeek(addWeeks(today, currentWeek), { weekStartsOn: 1 });

    return `${format(start, "yyyy-MM-dd")} - ${format(end, "yyyy-MM-dd")}`;
  };
  return (
    <div>
      {selectedVisit ? (
        renderDetailsView()
      ) : (
        <div>
          {isLoading ? (
            <div>Wczytywanie danych...</div>
          ) : (
            <div>
              <div className={styles.week_navigation}>
                <button onClick={() => setCurrentWeek(currentWeek - 1)}>
                  Poprzedni tydzień
                </button>
                <span>{getCurrentWeekRange()}</span>
                <button onClick={() => setCurrentWeek(currentWeek + 1)}>
                  Następny tydzień
                </button>
              </div>
              <table className={styles.harmonogramTable}>
                <thead>
                  <tr>
                    <th>Godzina</th>
                    <th>Poniedziałek</th>
                    <th>Wtorek</th>
                    <th>Środa</th>
                    <th>Czwartek</th>
                    <th>Piątek</th>
                    <th>Sobota</th>
                  </tr>
                </thead>
                <tbody>{renderTimeRows()}</tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default HarmonogramWizytSection;
