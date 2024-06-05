import { NavLink } from "react-router-dom";
import "./header.css";
import { Logo } from "../ui/icons/logo/Logo";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { isAuth } = useAuth();
  return (
    <div className="header-wrapper">
      <header className="header container">
        <Logo />
        <nav>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Записи
          </NavLink>
          {isAuth ? (
            <a className="log-out">Выйти</a>
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
