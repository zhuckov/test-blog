import { ChangeEvent, FormEvent, useState } from "react";
import "./login.css";
import { loginUser } from "../../services/user";
import { useAuth } from "../../context/AuthContext";
import { updatePassword } from "../../services/post";

const LoginPage = ({}) => {
  const { setIsAuth, setUserLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [forgetPass, setForgetPass] = useState("");
  const [isForget, setIsForget] = useState(false);
  const [forgetLogin, setForgetLogin] = useState<string>();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
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
        localStorage.setItem("user", JSON.stringify({ login: username, token: data.token }));
        resetData();
      })
      .catch((error: Error) => {
        setError(error.message);
      });
  };
  const getPasswordHandler = async () => {
    const formData = new FormData();
    if (forgetLogin) {
      formData.append("login", forgetLogin?.toString());
    } else {
      return;
    }
    formData.append("password", forgetPass.toString());

    const response = updatePassword(formData);
    setSuccessMessage("Пароль успешно обновлен");
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
        <a className="login-link" href="#forget-password" onClick={() => setIsForget(true)}>
          Забыли пароль ?
        </a>
      </form>

      {isForget && (
        <>
          <input
            type="text"
            id="res-password"
            onChange={(e) => {
              setForgetLogin(e.target.value);
            }}
            placeholder="Введите логин"
            name="res-login"
          />
          <input
            type="text"
            id="res-password"
            onChange={(e) => {
              setForgetPass(e.target.value);
            }}
            placeholder="Введите новый пароль"
            name="res-password"
          />
          <button className="login-button" onClick={() => getPasswordHandler()}>
            Обновить пароль
          </button>
        </>
      )}
      {successMessage && <p className="success-pass-reset">{successMessage}</p>}
    </div>
  );
};

export default LoginPage;
