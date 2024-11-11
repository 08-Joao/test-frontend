import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import { useTheme } from "../contexts/ThemeContext";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const { isDarkMode } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticação
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios
          .get(`${import.meta.env.VITE_API_URL}/api/user/auth`, {
            withCredentials: true,
          })
          .then((Response) => {
            console.log(Response.data);
            if (Response.status === 200) {
              setProfilePicture(Response.data.profilePicture);
            }
          });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
      checkAuth();
    
  }, []);

  if (isAuthenticated === null) {
    return (
      <div
        className="home__loadingContainer"
        data-theme={isDarkMode ? "dark" : "light"}
      >
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="home__container" data-theme={isDarkMode ? "dark" : "light"}>
      <Navbar isLogged={isAuthenticated} profilePicture={profilePicture} />
    </div>
  );
}

export default Home;
