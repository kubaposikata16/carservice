import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';


const MojeKontoSection = ({ onLogout }) => {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const token = localStorage.getItem('token');
              const response = await fetch("/user/", {
                headers: {
                    'x-access-token': token,
                },
            });
            
            const responseBody = await response.text();
            console.log(responseBody);

              if (response.ok) {
                  const data = await response.json();
                  setUserData(data.data);
              } else {
                  console.error('Nie udało się pobrać danych użytkownika');
              }
          } catch (error) {
              console.error('Błąd podczas pobierania danych użytkownika', error);
          }
      };

      fetchData();
  }, []); 



  const handleLogout = () => {
    onLogout();
  };

  return (
    <div>
      <div className={styles.accountContainer}>
      {userData && (
                    <>
                        <p>Imię: {userData.firstName}</p>
                        <p>Nazwisko: {userData.lastName}</p>
                        <p>Email: {userData.email}</p>
                    </>
                )}
        <button className={styles.white_btn} onClick={handleLogout}>
          Wyloguj się
        </button>
      </div>
    </div>
  );
};

export default MojeKontoSection;