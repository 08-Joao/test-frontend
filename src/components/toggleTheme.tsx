import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import "../styles/toggleTheme.css";
import { FaRegMoon, FaRegSun } from "react-icons/fa6";

function ToggleTheme(): JSX.Element {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="toggleTheme__wrapper">
      {isDarkMode ? (
        <FaRegMoon size={20} style={{ color: "var(--text-color)"}} />
      ) : (
        <FaRegSun size={18} style={{ color: "var(--text-color)" }} />
      )}
      <div className="toggleTheme__container" onClick={toggleDarkMode}>
        <div
          className={`toggleTheme__circle ${
            isDarkMode ? "toggleTheme__circleActive" : ""
          }`}
        ></div>
      </div>
    </div>
  );
}

export default ToggleTheme;
