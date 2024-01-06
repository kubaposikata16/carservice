import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import axios from "axios";

const WszyscyUzytkownicySection = ({ isAdminLoggedIn, isEmployeeLoggedIn }) => {
  const [users, setUsers] = useState([]); // Tutaj trzymamy dane o użytkownikach
  const [selectedUser, setSelectedUser] = useState(null); // ID aktualnie wybranego użytkownika
  const [visits, setVisits] = useState([]); // Tutaj trzymamy dane o wizytach
  const roles = ["client", "employee", "admin"];
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
  // Pobieranie danych o użytkownikach z serwera (możesz użyć useEffect do tego celu)
  useEffect(() => {
    const fetchDataFromApi = async () => {
      if (isAdminLoggedIn)
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
      else if (isEmployeeLoggedIn) {
        try {
          const token = localStorage.getItem("token");
          const config = {
            method: "get",
            url: "http://localhost:8080/users/forEmployee",
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
            url: `http://localhost:8080/forms/userVisits/${selectedUser._id}`,
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
      }
    };
    fetchVisitDataFromApi();
  }, [selectedUser]);

  const handleDeleteUser = async (userId) => {
    try {
      // Wywołaj zapytanie do API, aby usunąć użytkownika
      const token = localStorage.getItem("token");
      const config = {
        method: "delete",
        url: `http://localhost:8080/user/${userId}`,
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      };
      const response = await axios(config);
      // Jeśli odpowiedź jest pomyślna, zaktualizuj stan użytkowników
      if (response.status === 200) {
        // Usuń użytkownika z listy
        const updatedUsers = users.filter((user) => user._id !== userId);
        // Aktualizuj stan użytkowników
        setUsers(updatedUsers);
      }
    } catch (error) {
      // Obsłuż błąd, np. poprzez wyświetlenie komunikatu użytkownikowi
      console.error("Error deleting user:", error.response.data);
    }
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
  const renderUserTable = (role, roleName) => (
    <table className={styles.table}>
      <thead>
        <tr>
          <th colSpan="100%">Wszyscy {roleName}</th>
        </tr>
        <tr>
          <th>Imię</th>
          <th>Nazwisko</th>
          <th>E-mail</th>
          <th>Telefon</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        {filterUsersByRole(role).map((user) => (
          <tr key={user._id}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.phoneNumber}</td>
            <td>
              {isAdminLoggedIn && (
                <>
                   
                  {user.role === "client" && (
                    <button onClick={() => handleUserClick(user)}>
                      Pokaż wizyty
                    </button>
                  )}
                  <button onClick={() => handleDeleteUser(user._id)}>
                    Usuń
                  </button>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    {roles.map((roleOption) => (
                      <option key={roleOption} value={roleOption}>
                        {roleOption}
                      </option>
                    ))}
                  </select>
                </>
              )}
              {isEmployeeLoggedIn && user.role === "client" && (
                <button onClick={() => handleUserClick(user)}>
                  Pokaż wizyty
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  // Funkcja do filtrowania użytkowników według roli
  const filterUsersByRole = (role) =>
    users.filter((user) => user.role === role);
  // Funkcja obsługująca kliknięcie na użytkownika, aby pokazać jego wizyty
  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  // Funkcja obsługująca powrót do listy użytkowników
  const handleBackToUsers = () => {
    setSelectedUser(null);
  };
  // Renderowanie wizyt wybranego użytkownika
  const renderUserVisits = () => {
    return (
      <div>
        <h2>
          Wizyty użytkownika {selectedUser.firstName} {selectedUser.lastName}
        </h2>
        <button onClick={handleBackToUsers}>
          Powrót do listy użytkowników
        </button>
        <table className={styles.background}>
          <thead>
            <tr>
              <th>Usługa</th>
              <th>Marka samochodu</th>
              <th>Model</th>
              <th>Data</th>
              <th>Godzina</th>
              <th>Status</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {visits.map((visit) => (
              <tr key={visit._id}>
                <td>{visit.service}</td>
                <td>{visit.carBrand}</td>
                <td>{visit.carModel}</td>
                <td>{formatDate(visit.date)}</td>
                <td>{visit.time}</td>
                <td>{visit.status}</td>
                <td>
                    
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
                        handleChangeVisitStatus(
                          visit._id,
                          "W trakcie realizacji"
                        )
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
                  {visit.status !== "Zakończono"&&(
                  <button onClick={() => handleDeleteVisit(visit._id)}>
                    Odwołaj
                  </button>)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  return (
    <div>
      {selectedUser ? (
        renderUserVisits()
      ) : (
        <div className={styles.contactContainer}>
          {renderUserTable("client", "Klienci")}
          {renderUserTable("employee", "Pracownicy")}
          {isAdminLoggedIn && (
            <>{renderUserTable("admin", "Administratorzy")}</>
          )}
        </div>
      )}
    </div>
  );
};
export default WszyscyUzytkownicySection;
