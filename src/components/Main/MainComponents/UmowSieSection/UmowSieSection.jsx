import React, { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
const UmowSieSection = () => {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    serviceType: "",
    service: "",
    carBrand: "",
    carModel: "",
    date: "",
    time: "",
    moreInfo: "",
    carProductionYear: "",
    engine: "",
    vin: "",
    registrationNumber: "",
  });
  const [availableHours, setAvailableHours] = useState([]);
  const fetchAvailableHours = async (date) => {
    if (!date) return; // Jeśli data nie jest ustawiona, nie rób nic
    try {
      const response = await axios.get(
        `http://localhost:8080/forms/available-hours/${date}`
      );
      if (response.data) {
        setAvailableHours(response.data.availableHours); // Ustaw dostępne godziny
        
      }
    } catch (error) {
      console.error("Error fetching available hours:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Resetowanie modelu samochodu przy zmianie marki
    if (name === "carBrand") {
      setFormData((prevData) => ({
        ...prevData,
        carModel: "",
        [name]: value,
      }));
    } else if (name === "serviceType") {
      // Resetowanie usługi przy zmianie typu usługi
      setFormData((prevData) => ({
        ...prevData,
        service: "",
        [name]: value,
      }));
    } else  if (name === "date") {
      const selectedDate = new Date(value);
      const selectedDay = selectedDate.getDay();
  
      if (selectedDay === 0) {
        // Jeśli wybrany dzień to niedziela, wyświetl alert i nie aktualizuj stanu
        alert("Niestety nasz warsztat jest zamknięty w niedziele. Proszę wybrać inny dzień.");
      } else {
        // Aktualizacja stanu dla daty i resetowanie godziny
        setFormData((prevData) => ({
          ...prevData,
          date: value,
          time: "", // Resetowanie godziny
        }));
        fetchAvailableHours(value); // Pobranie dostępnych godzin
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === "carProductionYear" ? parseInt(value, 10) : value,
      }));
    }

    // Sprawdzenie dla pola daty, czy to nie jest niedziela
    if (name === "date") {
      const selectedDate = new Date(value);
      const selectedDay = selectedDate.getDay();

      if (selectedDay === 0) { // Sprawdzenie, czy wybrany dzień to niedziela
        alert("Niestety nasz warsztat jest zamknięty w niedziele. Proszę wybrać inny dzień.");
        return; // Wyjście z funkcji, aby nie aktualizować stanu
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "carProductionYear" ? parseInt(value, 10) : value,
    }));
  };

  // Lista opcji dla Service Type
  // Lista opcji dla Service, zależna od wyboru w Service Type
  const serviceOptions = {
    "Badania techniczne": ["Badania techniczne"],
    "Diagnostyka": ["Diagnostyka komputerowa"],
    "Geometria i zbieżność": ["Geometria i zbieżność"],
    "Hamulce": ["Wymiana klocków hamulcowych", "Wymiana płynu hamulcowego", "Wymiana tarcz hamulcowych"],
    "Klimatyzacja": ["Diagnostyka niedziałającej klimatyzacji", "Wymiana filtra"],
    "Koła i opony": ["Wymiana kół", "Wymiana opon"],
    "Naprawy i usterki": ["Naprawy i usterki"],
    "Obsługa okresowa": ["Przegląd okresowy", "Przegląd przed zakupem", "Wymiana oleju"],
};

  const serviceTypeOptions = Object.keys(serviceOptions);
  const carModelOptions = {
    "Audi": ["A1", "A3", "A4", "A5", "A6", "Q3", "Q5"],
    "BMW": ["M3", "M4", "M5", "Seria 1", "Seria 3", "Seria 5", "X1", "X3", "X5"],
    "Chevrolet": ["Camaro", "Corvette", "Cruze", "Malibu", "Spark", "Trax"],
    "Citroen": ["Berlingo", "C1", "C3", "C4", "C5", "Cactus"],
    "Fiat": ["500", "500L", "500X", "Panda", "Punto", "Tipo"],
    "Ford": ["EcoSport", "Fiesta", "Focus", "Kuga", "Mondeo", "Mustang"],
    "Honda": ["Accord", "Civic", "City", "CR-V", "HR-V", "Jazz"],
    "Hyundai": ["i20", "i30", "Kona", "Santa Fe", "Sonata", "Tucson"],
    "Mercedes-Benz": ["AMG GT", "GLC", "Klasa A", "Klasa C", "Klasa E", "Klasa G"],
    "Nissan": ["Juke", "Leaf", "Micra", "Navara", "Qashqai", "X-Trail"],
    "Opel": ["Astra", "Corsa", "Crossland", "Grandland", "Insignia", "Mokka"],
    "Renault": ["Captur", "Clio", "Duster", "Kadjar", "Megane", "Scenic", "Twingo"],
    "SEAT": ["Alhambra", "Arona", "Ateca", "Ibiza", "Leon", "Tarraco"],
    "Skoda": ["Fabia", "Karoq", "Kodiaq", "Octavia", "Scala", "Superb"],
    "Toyota": ["Auris", "Aygo", "Camry", "Corolla", "RAV4", "Yaris"],
    "Volkswagen": ["Arteon", "Golf", "Passat", "Polo", "T-Roc", "Tiguan"],
};
  const carBrandOptions = Object.keys(carModelOptions);
  //Wyświetlanie komunikatu o Wysłaniu lub błędzie
  const setMessage = (text) => {
    const messageContainer = document.getElementById("message-container");

    if (messageContainer) {
      messageContainer.innerText = text;
    }
  };
  // Logika do sprawdzania daty
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1); // minimalna data to jutro

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 365); // maksymalna data to rok od dziś

  const handleSubmitVisit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = {
        method: "post",
        url: "http://localhost:8080/forms",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        data: formData,
      };
      const { data: res } = await axios(config);
      // Logika obsługi pomyślnego wysyłania:
      setFormData({
        serviceType: "",
        service: "",
        carBrand: "",
        carModel: "",
        date: "",
        time: "",
        moreInfo: "",
        carProductionYear: "",
        engine: "",
        vin: "",
        registrationNumber: "",
      });
      setMessage("Wysłano pomyślnie");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        // Logika obsługi błędu
        console.error("Error submitting form:", error.message);
        setMessage("Błąd wysyłania");
      }
    }
  };
  return (
    <form className={styles.form_container} onSubmit={handleSubmitVisit}>
      <div>
        <label>
          <select
            name="serviceType"
            value={formData.serviceType}
            required
            onChange={handleChange}
          >
            <option value="" disabled>
              Wybierz rodzaj serwisu
            </option>
            {serviceTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            disabled={!formData.serviceType}
          >
            <option value="" disabled>
              Wybierz usługę
            </option>
            {formData.serviceType &&
              serviceOptions[formData.serviceType].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          <select
            name="carBrand"
            value={formData.carBrand}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Wybierz markę pojazdu
            </option>
            {carBrandOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          <select
            name="carModel"
            value={formData.carModel}
            onChange={handleChange}
            required
            disabled={!formData.carBrand}
          >
            <option value="" disabled>
              Wybierz model pojazdu
            </option>
            {formData.carBrand &&
              carModelOptions[formData.carBrand].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Preferowana data i godzina:
          <br></br>
          <input
            type="date"
            name="date"
            value={formData.date}
            required
            onChange={handleChange}
            min={minDate.toISOString().split("T")[0]}
            max={maxDate.toISOString().split("T")[0]}
          />
          <select
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            disabled={!formData.date || availableHours.length === 0} // Wyłącz wybór godziny, jeśli data nie jest ustawiona lub nie ma dostępnych godzin
          >
            <option value="" disabled>
              Wybierz godzinę
            </option>
            {availableHours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          <input
            type="number"
            name="carProductionYear"
            value={formData.carProductionYear}
            placeholder="Rok produkcji"
            step="1"
            onChange={handleChange}
            required
            min="1886"
            max={currentYear}
          />
        </label>
      </div>
      <div>
        <label>
          <input
            type="number"
            name="engine"
            min="0.5"
            max="8.0"
            step="0.1"
            placeholder="Pojemność silnika w litrach"
            value={formData.engine}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label>
          <input
            type="text"
            name="vin"
            value={formData.vin}
            onChange={handleChange}
            required
            pattern="^[A-HJ-NPR-Z0-9]{17}$"
            placeholder="Wprowadź nr VIN"
          />
        </label>
      </div>
      <div>
        <label>
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            required
            pattern="^[a-zA-Z0-9]{3,8}$"
            placeholder="Wprowadź nr rejestracyjny"
          />
        </label>
      </div>
      <div>
        <label>
          <textarea
            name="moreInfo"
            value={formData.moreInfo}
            onChange={handleChange}
            maxLength="150"
            placeholder="Opis np. Wydaje mi się, że koła są źle wyważone"
            style={{ resize: "none" }}
          />
        </label>
      </div>
      <button type="submit">Wyślij formularz</button>
      <div id="message-container" className="message"></div>
    </form>
  );
};

export default UmowSieSection;
