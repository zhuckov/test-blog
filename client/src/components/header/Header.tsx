import { NavLink } from "react-router-dom";
import "./header.css";
import { Logo } from "../ui/icons/logo/Logo";

const Header = () => {
  return (
    <div className="header-wrapper">
      <header className="header container">
        <Logo />
        <nav>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
          <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
            Login
          </NavLink>
          <NavLink to="/registration" className={({ isActive }) => (isActive ? "active" : "")}>
            Registration
          </NavLink>
        </nav>
      </header>
    </div>
  );
};

export default Header;
