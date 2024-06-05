import { ChangeEvent, FormEvent, useState } from "react";
import "./login.css";

const LoginPage = ({}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsername("");
    setPassword("");
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

        <button type="submit" disabled={error ? true : false}>
          Войти
        </button>
        <a className="login-link" href="/registration">
          У вас еще нету аккаунта? Зарегестрируйтесь сейчас.
        </a>
      </form>
    </div>
  );
};

export default LoginPage;
