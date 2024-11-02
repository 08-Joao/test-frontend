import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/toggleTheme.css'
function ToggleTheme(): JSX.Element {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="toggleTheme__container" onClick={toggleDarkMode}>
      <div className={`toggleTheme__circle ${isDarkMode ? 'toggleTheme__circleActive' : ''}`}></div>
    </div>
  );
}

export default ToggleTheme;
