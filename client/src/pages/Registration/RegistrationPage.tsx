import { ChangeEvent, FormEvent, useState } from "react";
import { createUser } from "../../services/user";
import "./registration.css";

const RegistrationPage = ({}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [error, setError] = useState<string | null>(null);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "repeat-password") {
      setRepeatPass(value);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (repeatPass == password && password.length >= 8 && username.length != 0) {
      createUser({
        login: username,
        password: password,
      })
        .then((data) => {
          console.log("User created:", data);
        })
        .catch((error: Error) => {
          setError(error.message);
        });
    }
  };
  const resetData = () => {
    setUsername("");
    setPassword("");
    setRepeatPass("");
  };
  return (
    <div className="login-form">
      <h2>Регестрация</h2>
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

        <label htmlFor="repeat-password">Повторите пароль</label>
        <input
          type="password"
          id="repeat-password"
          value={repeatPass}
          onChange={handleInputChange}
          placeholder="Повторите пароль"
          name="repeat-password"
          required
        />

        <button type="submit" className="register-button" disabled={error ? true : false}>
          Зарегестрироваться
        </button>
        {error != null && (
          <div className="error">
            <p className="error-text">{error}</p>
          </div>
        )}
        <a className="login-link" href="/login">
          Уже есть аккаунт? Нажмите сюда.
        </a>
      </form>
    </div>
  );
};

export default RegistrationPage;
