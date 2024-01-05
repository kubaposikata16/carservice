import { useState } from "react"
import axios from "axios"
import styles from "./styles.module.css"
const ResetPassword = () => {
    const [data, setData] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
    const [success, setSucces] = useState("");
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:8080/user/reset-password"
            const { data: res } = await axios.post(url, data)
            localStorage.setItem("token", res.data)
            setSucces("Wysłano link, sprawdź poczte aby kontynuować");
            setError("");
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
                setSucces("");
            }
        }
    }
    const handleGoBack = () =>{
        window.location = "/login"
    }
    return (
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container}
                        onSubmit={handleSubmit}>
                             
                        <h1>Przypomnij hasło</h1>
                        <input
                            type="email"
                            placeholder="Podaj e-mail"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        />
                        {error && <div
                            className={styles.error_msg}>{error}</div>}
                        {success && <div className={styles.success_msg}>{success}</div>}
                        {success === ""&&(
                        <button type="submit"
                            className={styles.black_btn}>
                            Przypomnij
                        </button>
                        )}
                        {success !== ""&&(
                        <button type="submit"
                            className={styles.black_btn}>
                            Wyślij ponownie
                        </button>
                        )}
                    <button
                            type="button"
                            onClick={handleGoBack}
                            className={styles.back_button}
                        >
                            Wstecz
                        </button>
                    </form>
                </div>

            </div>
        </div>
    )
}
export default ResetPassword;