import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import axios from "axios";

const WszyscyUzytkownicySection = () => {
  const [users, setUsers] = useState([]); // Tutaj trzymamy dane o użytkownikach
  const [selectedUser, setSelectedUser] = useState(null); // ID aktualnie wybranego użytkownika
  const [visits, setVisits] = useState([]); // Tutaj trzymamy dane o wizytach
  const roles = ["client", "admin", "employee"];
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
  // Pobieranie danych o użytkownikach z serwera (możesz użyć useEffect do tego celu)
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          method: "get",
          url: "http://localhost:8080/users/forAdmin",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        };

        const { data } = await axios(config);
        console.log("API Response:", data.data);
        setUsers(data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Wywołanie funkcji
    fetchDataFromApi();
  }, []);

  // Pobieranie danych o wizytach dla wybranego użytkownika
  useEffect(() => {
    const fetchVisitDataFromApi = async () => {
    if (selectedUser !== null) {
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
    }};
    fetchVisitDataFromApi();
  }, [selectedUser]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleDeleteUser = (userId) => {
    // Tutaj wykonaj zapytanie do API, aby usunąć użytkownika
    // np. axios.delete(`http://localhost:8080/users/${userId}`)
    // Następnie zaktualizuj stan setUsers po udanej operacji
  };
  const handleRoleChange = async (userId, newRole) => {
    try {
      // Wywołaj zapytanie do API, aby zmienić rolę użytkownika
      const token = localStorage.getItem("token");
      const config = {
        method: "put",
        url: `http://localhost:8080/user/role/${userId}`,
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        data: {
          role: newRole,
        },
      };
      console.log(userId);
      console.log(newRole);
      const response = await axios(config);
  
      // Jeśli odpowiedź jest pomyślna, zaktualizuj stan użytkowników
      if (response.status === 200) {
        const updatedUsers = users.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        );
  
        // Aktualizuj stan użytkowników
        setUsers(updatedUsers);
      }
    } catch (error) {
      // Obsłuż błąd, np. poprzez wyświetlenie komunikatu użytkownikowi
      console.error("Error changing user role:", error.response.data);
    }
  };
  // Usuwanie wybranej wizyty
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
  // Funkcja do filtrowania użytkowników według roli
  const filterUsersByRole = (role) =>
    users.filter((user) => user.role === role);
  return (
    <div>
      <div className={styles.contactContainer}>
        <p>Wszyscy Klienci</p>
        <ul>
        {filterUsersByRole("client").map((user) => (
          <li key={user._id} onClick={() => handleUserClick(user)}>
            <span className={styles.userName}>
              {user.firstName} {user.lastName}
            </span>
            <span className={styles.userInfo}>
              {user.email} {user.phoneNumber}
            </span>
            <span className={styles.adminActions}>
              <button onClick={() => handleDeleteUser(user._id)}>Usuń</button>
              <select
                value={user.role} // Ustawienie domyślnej wartości na aktualną rolę użytkownika
                onChange={(e) => handleRoleChange(user._id, e.target.value)}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </span>
          </li>
        ))}
        </ul>

        <p>Wszyscy Pracownicy</p>
        <ul>
        {filterUsersByRole("employee").map((user) => (
          <li key={user._id} onClick={() => handleUserClick(user)}>
            <span className={styles.userName}>
              {user.firstName} {user.lastName}
            </span>
            <span className={styles.userInfo}>
              {user.email} {user.phoneNumber}
            </span>
            <span className={styles.adminActions}>
              <button onClick={() => handleDeleteUser(user._id)}>Usuń</button>
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(user._id, e.target.value)}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </span>
          </li>
        ))}
        </ul>

        <p>Wszyscy Administratorzy</p>
        <ul>
        {filterUsersByRole("admin").map((user) => (
          <li key={user._id} onClick={() => handleUserClick(user)}>
            <span className={styles.userName}>
              {user.firstName} {user.lastName}
            </span>
            <span className={styles.userInfo}>
              {user.email} {user.phoneNumber}
            </span>
            <span className={styles.adminActions}>
              <button onClick={() => handleDeleteUser(user._id)}>Usuń</button>
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(user._id, e.target.value)}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </span>
          </li>
        ))}
        </ul>
      </div>

      {selectedUser !== null && (
        <div>
          <p>
            Wizyty użytkownika {selectedUser.firstName} {selectedUser.lastName}
          </p>
          <ul>
            {visits.map((visit) => (
              <li key={visit._id}>
                {visit.service}, {visit.carBrand} {visit.carModel} - {formatDate(visit.date)} godzina {visit.time} - {visit.status}
                <button onClick={() => handleDeleteVisit(visit._id)}>Usuń</button>
                <button>Zmień Status</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WszyscyUzytkownicySection;
