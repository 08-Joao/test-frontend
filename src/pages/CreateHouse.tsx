import React, { useEffect, useState } from "react";
import "../styles/CreateHouse.css";
import { useTheme } from "../contexts/ThemeContext";
import DefaultInput from "../components/defaultInput";
import { useNavigate } from "react-router-dom";
import { formatCEP } from "../services/CEPFormatter";
import axios from "axios";
import { FaBed, FaBath, FaCarSide } from "react-icons/fa6";
import { IoBed } from "react-icons/io5";
import { formatArea } from "../services/AreaFormatter";
import { formatCurrency } from "../services/PriceFormatter";

const ufOptions = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

const QuantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function CreateHouse() {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [cep, setCep] = useState("");
  const [city, setCity] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [uf, setUf] = useState("MG");
  const [price, setPrice] = useState("R$ 0");
  const [area, setArea] = useState("M² 0");
  const [description, setDescription] = useState("");
  const [suite, setSuite] = useState(0);
  const [rooms, setRooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [garages, setGarages] = useState(0);
  const [isCepDisabled, setIsCepDisabled] = useState(false);

  useEffect(() => {
    if (cep.length === 9) {
      setIsCepDisabled(true);
    }

    const getCEP = async () => {
      await axios
        .get(`https://viacep.com.br/ws/${cep.replace("-", "")}/json/`)
        .then((response) => {
          setCity(response.data.localidade);
          setBairro(response.data.bairro);
          setLogradouro(response.data.logradouro);
          setUf(response.data.uf);
          setComplemento(response.data.complemento);
          setIsCepDisabled(false);
        });
    };

    getCEP();
  }, [cep]);

  return (
    <div
      className="createHouse__wrapper"
      meta-theme={isDarkMode ? "dark" : "light"}
    >
      <div className="createHouse__inputsWrapper">
        <h1 className="createHouse__title">Adicionar Imóvel</h1>
        <p className="login__backToHome">
          Voltar à <label onClick={() => navigate("/")}>Página Inicial</label>
        </p>
        <div className="createHouse__container">
          <DefaultInput
            className="createHouse__input"
            // icon={IoPersonOutline}
            placeHolder="CEP"
            maxLenght={254}
            onChange={(e) => setCep(formatCEP(e.target.value))}
            value={cep}
            disabled={isCepDisabled}
          />
          <DefaultInput
            className="createHouse__input"
            // icon={IoPersonOutline}
            placeHolder="Logradouro"
            flex={2}
            maxLenght={254}
            onChange={(e) => setLogradouro(e.target.value)}
            value={logradouro}
          />
        </div>

        <div className="createHouse__container">
          <DefaultInput
            className="createHouse__input"
            // icon={IoPersonOutline}
            placeHolder="Complemento"
            maxLenght={254}
            onChange={(e) => setComplemento(e.target.value)}
            value={complemento}
          />
          <DefaultInput
            className="createHouse__input"
            // icon={IoPersonOutline}
            placeHolder="Bairro"
            maxLenght={254}
            onChange={(e) => setBairro(e.target.value)}
            value={bairro}
          />
        </div>

        <div className="createHouse__container">
          <DefaultInput
            className="createHouse__input"
            // icon={IoPersonOutline}
            placeHolder="Cidade"
            maxLenght={254}
            disabled={true}
            value={city}
            flex={2}
            // onChange={(e) => setName(e.target.value)}
          />
          <DefaultInput
            className="createHouse__input"
            // icon={IoPersonOutline}
            placeHolder="UF"
            maxLenght={254}
            disabled={true}
            value={uf}
            menuList={ufOptions}
            onChange={(e) => setUf(e.target.value)}
          />
        </div>
        <div className="createHouse__container">
          <DefaultInput
            className="createHouse__input"
            // icon={IoPersonOutline}
            placeHolder="Área Total"
            maxLenght={254}
            onChange={(e) => setArea(formatArea(e.target.value))}
            value={area}
          />
          <DefaultInput
            className="createHouse__input"
            // icon={IoPersonOutline}
            placeHolder="Valor"
            maxLenght={254}
            onChange={(e) => setPrice(formatCurrency(e.target.value))}
            value={price}
          />
        </div>
        <div className="createHouse__container">
          <DefaultInput
            className="createHouse__input"
            // icon={IoPersonOutline}
            placeHolder="Descrição"
            maxLenght={800}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="createHouse__container">
          <DefaultInput
            className="createHouse__input"
            icon={IoBed}
            maxLenght={254}
            menuList={QuantityOptions}
            onChange={(e) => setSuite(parseInt(e.target.value))}
          />
          <DefaultInput
            className="createHouse__input"
            icon={FaBed}
            maxLenght={254}
            menuList={QuantityOptions}
            onChange={(e) => setRooms(parseInt(e.target.value))}
          />
          <DefaultInput
            className="createHouse__input"
            icon={FaBath}
            maxLenght={254}
            menuList={QuantityOptions}
            onChange={(e) => setBathrooms(parseInt(e.target.value))}
          />
          <DefaultInput
            className="createHouse__input"
            icon={FaCarSide}            
            maxLenght={254}
            menuList={QuantityOptions}
            onChange={(e) => setGarages(parseInt(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateHouse;
