import { ChangeEvent, FormEvent, useState } from "react";
import { createUser } from "../../services/user";
import "./registration.css";
import { useAuth } from "../../context/AuthContext";

const RegistrationPage = ({}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { setIsAuth } = useAuth();
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
    if (repeatPass != password) {
      setError("Пароли не совпадают");
    } else if (password.length < 8) {
      setError("Длина пароля менее 8 символов");
    } else if (username.length <= 3) {
      setError("Имя пользователя должно быть более трех символов");
    } else {
      createUser({
        login: username,
        password: password,
      })
        .then((data) => {
          setIsAuth(true);
          setUsername(username);
          resetData();
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
    setError(null);
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

        <button type="submit" className="register-button">
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
