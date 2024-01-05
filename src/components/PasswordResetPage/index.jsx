import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { useParams } from "react-router-dom";
const ResetPassword = () => {
  const { token } = useParams();
  const handleGoBack = () => {
    window.location = "/login";
  };
  //Zmiana Hasła:
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsAreCorrect, setPasswordsAreCorrect] = useState(true);
  const [passwordLengthValid, setPasswordLengthValid] = useState(true);
  const handleCancelEditPassword = () => {
    handleGoBack();
  };
  //zapisanie hasła
  const handleSavePassword = async (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      try {
        console.log(token);
        const data = { newPassword: newPassword };
        console.log(data);
        const url = `http://localhost:8080/user/reset-password/${token}`;
        const { data: res } = await axios.put(url, data);
        setNewPassword("");
        setConfirmPassword("");
        setPasswordsAreCorrect(true);
        setPasswordLengthValid(true);
        handleGoBack();
        alert("Hasło zostało zaktualizowane!");
      } catch (error) {
        console.error(
          "Wystąpił błąd podczas wysyłania żądania PUT:",
          error.message
        );
        console.log(error.response.data.message);
      }
    } else {
      //obsłużyć sytuację, gdy hasła się nie zgadzają
      setPasswordsAreCorrect(false);
    }
  };
  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setNewPassword(value);
    setPasswordLengthValid(value.length >= 8);
    if (value === confirmPassword && passwordLengthValid) {
      setPasswordsAreCorrect(true);
    } else {
      setPasswordsAreCorrect(false);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    if (newPassword === value) {
      setPasswordsAreCorrect(true);
    } else {
      setPasswordsAreCorrect(false);
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container}>
            <div>
              <p>
                Nowe Hasło:{" "}
                <input
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  required
                  onChange={handlePasswordChange}
                />
                {!passwordLengthValid && (
                  <p style={{ color: "red" }}>
                    Hasło musi mieć co najmniej 8 znaków.
                  </p>
                )}
              </p>
              <p>
                Potwierdź Hasło:{" "}
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </p>
              {!passwordsAreCorrect && (
                <p style={{ color: "red" }}>Hasła muszą być takie same.</p>
              )}
              {newPassword !== "" &&
                passwordLengthValid &&
                passwordsAreCorrect && (
                  <button className={styles.white_btn} onClick={handleSavePassword}>Zapisz</button>
                )}
              <button className={styles.white_btn} type="button" onClick={handleCancelEditPassword}>Anuluj</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ResetPassword;
