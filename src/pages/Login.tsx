import React, { useEffect, useState } from "react";
import axios from "axios";
import DefaultInput from "../components/defaultInput";
import "../styles/Login.css";
import { IoPersonOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";



function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => { 
        console.log(password)
    },[password])
  const logIn = async () => {
    await axios
      .post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        {
          email: "maumau@gmail.com",
          password: "pass123",
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => console.log(res.data));
  };

  const changePass = async () => {
    await axios
      .put(
        `${import.meta.env.VITE_API_URL}/user/update`,
        {
          password: "pass123",
          phone: "(11)99999-9999",
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => console.log(res.data));
  };

  return (
    <div className="login__wrapper">
      <div className="login__formBody">
        <h1>LOGIN</h1>
        <DefaultInput
          type="email"
          className="login__input"
          icon={IoPersonOutline}
          placeHolder="Email"
          maxLenght={254}
          onChange={(e) => setEmail(e.target.value)}
        />
        <DefaultInput
          type="password"
          className="login__input"
          placeHolder="Senha"
          maxLenght={128}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login__button" onClick={logIn}>
          ENTRAR
        </button>
        <div className="login__options">
          <div className="login__rememberMe">
            <input type="checkbox" id="remember-me"></input>
            <label htmlFor="remember-me">Lembre de mim</label>
          </div>
          <button onClick={() => navigate("/forgot-password")}>Esqueci minha senha</button>
        </div>
        <div className="login__signIn">
          <p className="login__forgotPass">
            É novo por aqui?<button onClick={() => navigate("/signin")}>Registre-se</button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
