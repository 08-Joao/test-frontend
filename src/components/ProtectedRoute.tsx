import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../contexts/ThemeContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/api/user/auth`, { withCredentials: true });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false); 
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="home__loadingContainer" data-theme={isDarkMode ? 'dark' : 'light'}>
        <div className="spinner"></div>
      </div>
    ) // Exiba um carregando enquanto verifica a autenticação
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" />; // Redireciona para signin se não estiver autenticado
  }

  console.log(children)
  return children; // Retorna os filhos se estiver autenticado
};

export default ProtectedRoute;
