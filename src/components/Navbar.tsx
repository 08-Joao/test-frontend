import React from "react";
import "../styles/Navbar.css";
import ToggleTheme from "./toggleTheme";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { 
  IoSearch,
  IoChevronDown
 } from "react-icons/io5";

const navButtons = {
  Inicío: "/",
  Comparar: "/comparar",
  Favoritos: "/favoritos",
  Sobre: "/sobre",
};

const dropdownButtons = {
  Profile: "/profile",
  ["Meus Imóveis"]: "/houses",
  Sair: "/sobre",
};


function Navbar({ isLogged, profilePicture } : {isLogged: boolean, profilePicture: string}) {
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
          {isLogged === false ? (
            <div
            onClick={() => {
              navigate("/login");
            }}
            className="navbar__button navbar__login"
          >
            <h3>ENTRAR</h3>
          </div>
          ) : (
           <div className="navbar__profilePic">
            <img src={profilePicture} className="navbar__profilePicture" />
            <div className="navbar__profileDropdown">
            {Object.entries(dropdownButtons).map(([label, index]) => (
              <div className="navbar__dropdownItem" key={label} onClick={() => navigate(index)}>
                <h3>{label}</h3>
              </div>
            ))}
            </div>
           </div>
          )}
        </div>
      </div>

      <div className="navbar__searchWrapper">
        <div className="navbar__searchContainer">
          <div className="navbar__searchFilter">
            <h3>Filtros</h3>
            <IoChevronDown size={20} style={{ color: "var(--text-contrast)" }}/>
          </div>
          <input placeholder="Busque por... Casa em Santa Bárbara"></input>
          <button>
            <IoSearch size={20} style={{ color: "var(--text-reverse)" }}/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
