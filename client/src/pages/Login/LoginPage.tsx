import { ChangeEvent, FormEvent, useState } from "react";
import "./login.css";
import { loginUser } from "../../services/user";
import { useAuth } from "../../context/AuthContext";

const LoginPage = ({}) => {
  const { setIsAuth, setUserLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const resetData = () => {
    setUsername("");
    setPassword("");
    setError(null);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser({
      login: username,
      password: password,
    })
      .then((data) => {
        setIsAuth(true);
        setUserLogin(username);
        resetData();
      })
      .catch((error: Error) => {
        setError(error.message);
      });
  };

  return (
    <div className="login-form">
      <h2>Вход </h2>
      <form action="#" method="POST" onSubmit={handleSubmit}>
        <label htmlFor="username">Логин</label>
        <input
          type="text"
          value={username}
          onChange={handleInputChange}
          id="username"
          placeholder="Введите логин"
          name="username"
          required
        />

        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handleInputChange}
          placeholder="Введите пароль"
          name="password"
          required
        />

        <button type="submit" className="login-button">
          Войти
        </button>
        {error != null && (
          <div className="error">
            <p className="error-text">{error}</p>
          </div>
        )}
        <a className="login-link" href="/registration">
          У вас еще нету аккаунта? Зарегестрируйтесь сейчас.
        </a>
      </form>
    </div>
  );
};

export default LoginPage;
