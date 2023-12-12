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

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Sprawdzenie dla pola daty, czy to nie jest niedziela
    if (name === "date") {
      const selectedDate = new Date(value);
      const selectedDay = selectedDate.getDay();

      if (selectedDay === 0) {
        alert(
          "Niestety nasz warsztat jest zamknięty w niedziele. Proszę wybrać inny dzień."
        );
        return; // Przerwij działanie funkcji, aby uniknąć aktualizacji stanu
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
    "Naprawy i usterki": ["Naprawy i usterki"],
    "Koła i opony": ["Wymiana opon", "wymiana kół"],
    "Obsługa okresowa": [
      "Wymiana oleju",
      "Przegląd okresowy",
      "Przegląd przed zakupem",
    ],
    Hamulce: [
      "Wymiana klocków hamulcowych",
      "Wymiana tarcz hamulcowych",
      "Wymiana płynu hamulcowego",
    ],
    Diagnostyka: ["Diagnostyka komputerowa"],
    "Geometria i zbieżność": ["Geometria i zbieżność"],
    Klimatyzacja: ["Diagnostyka niedziałającej klimatyzacji", "Wymiana filtra"],
    "Badania techniczne": ["Badania techniczne"],
  };
  const serviceTypeOptions = Object.keys(serviceOptions);
  const carModelOptions = {
    Volkswagen: ["Amarok", "Passat"],
    Opel: ["GT", "Insignia"],
    Ford: ["Mondeo", "Focus"],
    BMW: ["M3", "M4", "M5"],
    Audi: ["A3", "A4"],
    "Mercedes-Benz": ["AMG GT", "Klasa G"],
    Toyota: ["Auris", "Supra"],
    Renault: ["Clio", "Twingo"],
    Skoda: ["Octavia", "Fabia"],
  };
  const timeOptions = [
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
    "15:00"
  ];
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
  maxDate.setDate(maxDate.getDate() + 14); // maksymalna data to za 2 tygodnie

  const handleSubmitCar = async (e) => {
    e.preventDefault();

    try {
      const config = {
        method: "post",
        url: "http://localhost:3000/form",
        headers: { "Content-Type": "application/json" },
        data: formData,
      };
      const { data: res } = await axios(config);
      console.log(res.data);
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
      // Logika obsługi błędu
      console.error("Error submitting form:", error);
      setMessage("Błąd wysyłania");
    }
  };
  return (
    <form className={styles.form_container} onSubmit={handleSubmitCar}>
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
          >
            <option value="" disabled></option>
            {timeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
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
            minLength="10"
            maxLength="150"
            required
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
