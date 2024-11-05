import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { isDarkMode } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Estado de autenticação
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/user/auth`, { withCredentials: true });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="home__loadingContainer">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="home__container" data-theme={isDarkMode ? 'dark' : 'light'}>
      <Navbar isLogged={isAuthenticated} />
    </div>
  );
}

export default Home;
