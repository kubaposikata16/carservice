import React, { useState, useEffect } from "react";
import styles from './styles.module.css';
import axios from "axios";

const HarmonogramWizytSection = () => {
    const [visits, setVisits] = useState([]); // Tutaj trzymamy dane o wizytach
    const timeSlots = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00"];
    const [currentWeek, setCurrentWeek] = useState(0); // Licznik tygodni, 0 oznacza bieżący tydzień
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
      
      const groupVisitsByDayAndTime = (visits) => {
        const groupedVisits = {};
        // Logika do grupowania wizyt według daty i godziny
        return groupedVisits;
    };

    // Utwórz wiersze tabeli
    const renderTimeRows = () => {
        return timeSlots.map(time => (
            <tr key={time}>
                <td>{time}</td>
                {renderVisitCellsForTime(time)}
            </tr>
        ));
    };

    // Utwórz komórki tabeli dla danego czasu
    const renderVisitCellsForTime = (time) => {
        const days = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"]; // Dni tygodnia
        return days.map(day => (
            <td key={day}>
                {visits[day] && visits[day][time]
                    ? `${visits[day][time].user.firstName} ${visits[day][time].user.lastName}, ${visits[day][time].service}`
                    : ""}
            </td>
        ));
    };
    return (
        <div>
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
                <tbody>
                    {renderTimeRows()}
                </tbody>
            </table>
    </div>
  );
};

export default HarmonogramWizytSection;