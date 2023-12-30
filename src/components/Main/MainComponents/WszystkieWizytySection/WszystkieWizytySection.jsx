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
      "grudzień"
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
                setVisits(res.data);
              } catch (error) {
                console.error("Error getting user info:", error);
              }
        };
        fetchVisitDataFromApi();
      }, []);
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
          //console.log("Usuwam wizyte o id:", visitId);
        } catch (error) {
          console.error("Error deleting user info:", error);
          console.log("Detailed error response:", error.response);
        }
      }
      return(
        <div>
          <p>
            Wizyty:
          </p>
          <ul>
            {visits.map((visit) => (
              <li key={visit._id}>
                {visit.service}, {visit.carBrand} {visit.carModel} - {formatDate(visit.date)} godzina {visit.time} - {visit.status}
                <button onClick={() => handleDeleteVisit(visit._id)}>Usuń</button>
                {visit.status!=="finished"&&<button>Zmień Status</button>}
              </li>
            ))}
          </ul>
        </div>
      );
};
export default WszystkieWizytySection;