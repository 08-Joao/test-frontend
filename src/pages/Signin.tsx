import React, { useState, useEffect } from "react";
import axios from "axios";
import DefaultInput from "../components/defaultInput";
import "../styles/Signin.css";
import { useNavigate } from "react-router-dom";
import { formatCPF } from "../services/CpfFormatter";
import { formatPhoneNumber } from "../services/PhoneFormatter";
import {
  IoPersonOutline,
  IoDocumentTextOutline,
  IoCallOutline,
  IoMailOutline,
  IoLockClosedOutline,
} from "react-icons/io5";
import { verifyAge } from "../services/DateVerifier";
import { verifyEmail } from "../services/EmailVerifier";
import { validName } from "../services/NameVerifier";
import { validPassword } from "../services/PasswordVerifier";

function Signin() {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isCpfDisabled, setIsCpfDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/user/auth`, {
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

  const signIn = async () => {
    setLoading(true);
    setErrorMessage("");

    if (!name || !cpf || !phone || !email || !password) {
      setErrorMessage("Preencha todos os campos");
      setLoading(false);
      return;
    }

    if (validName(name) === false) {
      setErrorMessage("O nome não pode conter caracteres especiais");
      setLoading(false);
      return;
    }

    if (cpf === "Cpf Inválido") {
      setErrorMessage("Cpf Inválido");
      setLoading(false);
      return;
    }

    if (verifyAge(birthdate) === false) {
      setErrorMessage("O usuário deve ter mais de 18 anos");
      setLoading(false);
      return;
    }

    if (verifyEmail(email) === false) {
      setErrorMessage("Email inválido");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("As senhas não conferem");
      setLoading(false);
      return;
    } else if (password.length < 8) {
      setErrorMessage("A senha deve ter pelo menos 8 caracteres");
      setLoading(false);
      return;
    } else if (validPassword(password) === false) {
      setErrorMessage(
        "A senha deve conter uma letra maiúscula, um número e um caractere especial"
      );
      setLoading(false);
      return;
    }

    try {
      await axios
        .post(
          `${import.meta.env.VITE_API_URL}/user/signin`,
          {
            name,
            cpf,
            phone,
            birthdate,
            email,
            password,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.status === 201) {
            navigate("/");
          }
        });
    } catch (error) {
      setErrorMessage("Erro ao criar usuário");
      setLoading(false);
      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cpf === "Cpf Inválido") {
      setIsCpfDisabled(true);
      setTimeout(() => {
        setIsCpfDisabled(false);
        setCpf("");
      }, 1500);
    }
  }, [cpf]);

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
    <div className="signin__wrapper">
      <div className="signin__formBody">
        <h1>REGISTRE-SE</h1>
        <div className="sigin__container">
          <DefaultInput
            className="signin__input"
            icon={IoPersonOutline}
            placeHolder="Nome"
            maxLenght={254}
            onChange={(e) => setName(e.target.value)}
          />
          <DefaultInput
            className="signin__input"
            icon={IoDocumentTextOutline}
            placeHolder="CPF"
            maxLenght={128}
            onChange={(e) => setCpf(formatCPF(e.target.value))}
            value={cpf}
            disabled={isCpfDisabled}
          />
        </div>
        <div className="sigin__container">
          <DefaultInput
            type="phone"
            className="signin__input"
            icon={IoCallOutline}
            placeHolder="Telefone"
            maxLenght={15}
            onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
            value={phone}
          />
          <DefaultInput
            type="date"
            className="signin__input"
            placeHolder="Data de Nascimento"
            maxLenght={128}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </div>
        <div className="sigin__container">
          <DefaultInput
            type="email"
            className="signin__input"
            icon={IoMailOutline}
            placeHolder="Email"
            maxLenght={254}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="sigin__container">
          <DefaultInput
            type="password"
            className="signin__input"
            placeHolder="Senha"
            maxLenght={128}
            onChange={(e) => setPassword(e.target.value)}
          />
          <DefaultInput
            type="password"
            className="signin__input"
            placeHolder="Repita a Senha"
            maxLenght={128}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {errorMessage && <p className="signin__error">{errorMessage}</p>}
        {loading ? (
          <div className="signin__loadingContainer">
            <div className="spinner"></div>
          </div>
        ) : (
          <button className="signin__button" onClick={signIn}>
            REGISTRAR
          </button>
        )}
        <div className="signin__logIn">
          <p className="signin__haveAccount">
            Já possui uma conta?
            <button onClick={() => navigate("/login")}>Entrar</button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
