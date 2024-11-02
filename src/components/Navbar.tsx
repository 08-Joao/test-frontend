import React from "react";
import "../styles/Navbar.css";
import ToggleTheme from "./toggleTheme";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const navButtons = {
  Inicío: "/",
  Comparar: "/comparar",
  Favoritos: "/favoritos",
  Sobre: "/sobre",
};

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar__wrapper">
      <div className="navbar__container">
        <div className="navbar__half navbar__1st">
          <img
            src={logo}
            alt="logo"
            className="navbar__logo"
            onClick={() => {
              navigate("/");
            }}
          />
          {Object.entries(navButtons).map(([label, index]) => (
            <div
              key={label}
              onClick={() => {
                navigate(index);
              }}
              className="navbar__button"
            >
              <h3>{label}</h3>
              <div className="navbar__selected"></div>
            </div>
          ))}
        </div>
        <div className="navbar__half">
          <ToggleTheme />
          <div
            onClick={() => {
              navigate("/contato");
            }}
            className="navbar__button"
          >
            <h3>Contato</h3>
            <div className="navbar__selected"></div>
          </div>
          <div
            onClick={() => {
              navigate("/login");
            }}
            className="navbar__button navbar__login"
          >
            <h3>ENTRAR</h3>
          </div>
        </div>
      </div>

      <div className="navbar__searchContainer">
        <div className="navbar__body"></div>
      </div>
    </div>
  );
}

export default Navbar;
