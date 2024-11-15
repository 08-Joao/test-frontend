import React, { useState, useEffect } from "react";
import axios from "axios";
import DefaultInput from "../components/defaultInput";
import "../styles/Login.css";
import { IoMailOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

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

  const logIn = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/login`,
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
      <div className="login__wrapper">
      <div className="login__loadingContainer">
        <div className="spinner"></div>
      </div>
      </div>
    );
  }

  return (
    <div className="login__wrapper">
      <div className="login__formBody">
        <h1>LOGIN</h1>
        <p className="login__backToHome">Voltar à <label onClick={() => navigate("/")}>Página Inicial</label></p>
        <DefaultInput
          type="email"
          className="login__input"
          icon={IoMailOutline}
          placeHolder="Email"
          maxLength={254}
          onChange={(e) => setEmail(e.target.value)}
        />
        <DefaultInput
          type="password"
          className="login__input"
          placeHolder="Senha"
          maxLength={128}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorMessage && <p className="login__error">{errorMessage}</p>}

        {loading ? (
          <div className="login__loadingContainer">
            <div className="spinner"></div>
          </div>
        ) : (
          <button className="login__button" onClick={logIn}>
            ENTRAR
          </button>
        )}

        <div className="login__options">
          <div className="login__rememberMe">
            <input type="checkbox" id="remember-me" onClick={() => setRememberMe(!rememberMe)}></input>
            <label htmlFor="remember-me">Lembre de mim</label>
          </div>
          <button onClick={() => navigate("/forgot-password")}>
            Esqueceu sua senha?
          </button>
        </div>
        <div className="login__signIn">
          <p className="login__forgotPass">
            É novo por aqui?
            <button onClick={() => navigate("/signup")}>Registre-se</button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
