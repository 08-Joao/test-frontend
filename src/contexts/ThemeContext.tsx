import React, { createContext, useContext } from 'react';
import useLocalStorage from 'use-local-storage';

// Criação do contexto
const ThemeContext = createContext<{
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}>({
  isDarkMode: true,
  toggleDarkMode: () => {},
});

// Provedor do contexto
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setDarkMode] = useLocalStorage('isDarkMode', true);

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useTheme = () => useContext(ThemeContext);
