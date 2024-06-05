import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <NavLink to="/" className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}>
          Home
        </NavLink>
        <NavLink to="/login" className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}>
          Login
        </NavLink>
        <NavLink to="/registration" className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}>
          Registration
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
