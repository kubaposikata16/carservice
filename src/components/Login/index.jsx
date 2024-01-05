import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import styles from "./styles.module.css"
const Login = () => {
    const [data, setData] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:8080/login"
            const { data: res } = await axios.post(url, data)
            localStorage.setItem("token", res.data)
            window.location = "/"
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }
    const handleGoBack = () =>{
        window.location = "/"
    }
    return (
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container}
                        onSubmit={handleSubmit}>
                             
                        <h1>Zaloguj się</h1>
                        <input
                            type="email"
                            placeholder="E-mail"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Hasło"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                        />
                        {error && <div
                            className={styles.error_msg}>{error}</div>}
                        <button type="submit"
                            className={styles.black_btn}>
                            Zaloguj
                        </button>
                        
                        <Link to="/signup">
                        <button type="button"
                            className={styles.white_btn}>
                            Zarejestruj
                        </button>
                    </Link>
                    <Link to="/reset-password">
                        <button type="button"
                            className={styles.back_button}>
                            Przypomnij hasło
                        </button>
                    </Link>
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
export default Login;
