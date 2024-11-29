import React, { useState, useEffect } from "react";
import axios from "axios";
import DefaultInput from "../components/defaultInput";
import "../styles/Signin.css";
import { IoMailOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/api/user/auth`, {
          withCredentials: true,
        });
        navigate("/"); 
      } catch (error) {
        console.log(error);
      } finally {
        setCheckingAuth(false); 
      }
    };

    checkAuth();
  }, [navigate]);

  const sign_in = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/signin`,
        {
          email,
          password,
          rememberMe
        },
        {
          withCredentials: true,
        }
      ).then((response) => {
        if (response.status === 200) {
          console.log(response);
          localStorage.setItem("publicId", response.data);
          navigate("/");
        }
      })            
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setErrorMessage("Credenciais inválidas");
      } else {
        setErrorMessage("Ocorreu um erro. Tente novamente.");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {    
    return (
      <div className="signin__wrapper">
      <div className="signin__loadingContainer">
        <div className="spinner"></div>
      </div>
      </div>
    );
  }

  return (
    <div className="signin__wrapper" data-theme={isDarkMode ? "dark" : "light"}>
      <div className="signin__formBody">
        <h1>Entrar</h1>
        <p className="signin__backToHome">Voltar à <label onClick={() => navigate("/")}>Página Inicial</label></p>
        <DefaultInput
          type="email"
          className="signin__input"
          icon={IoMailOutline}
          placeHolder="Email"
          maxLength={254}
          onChange={(e) => setEmail(e.target.value)}
        />
        <DefaultInput
          type="password"
          className="signin__input"
          placeHolder="Senha"
          maxLength={128}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorMessage && <p className="signin__error">{errorMessage}</p>}

        {loading ? (
          <div className="signin__loadingContainer">
            <div className="spinner"></div>
          </div>
        ) : (
          <button className="signin__button" onClick={sign_in}>
            ENTRAR
          </button>
        )}

        <div className="signin__options">
          <div className="signin__rememberMe">
            <input type="checkbox" id="remember-me" onClick={() => setRememberMe(!rememberMe)}></input>
            <label htmlFor="remember-me">Lembre de mim</label>
          </div>
          <button onClick={() => navigate("/forgot-password")}>
            Esqueceu sua senha?
          </button>
        </div>
        <div className="signin__signIn">
          <p className="signin__forgotPass">
            É novo por aqui?
            <button onClick={() => navigate("/signup")}>Registre-se</button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
