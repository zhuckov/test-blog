import { NavLink } from "react-router-dom";
import "./header.css";
import { Logo } from "../ui/icons/logo/Logo";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { isAuth, setIsAuth, logout } = useAuth();
  return (
    <div className="header-wrapper">
      <header className="header container">
        <Logo />
        <nav>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Записи
          </NavLink>
          {isAuth ? (
            <>
              <NavLink to="/create-post" className={({ isActive }) => (isActive ? "active" : "")}>
                Создать пост
              </NavLink>
              <NavLink to="/my-posts" className={({ isActive }) => (isActive ? "active" : "")}>
                Мои посты
              </NavLink>
              <a className="log-out" onClick={() => logout()}>
                Выйти
              </a>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
                Вход
              </NavLink>
              <NavLink to="/registration" className={({ isActive }) => (isActive ? "active" : "")}>
                Регистрация
              </NavLink>
            </>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
