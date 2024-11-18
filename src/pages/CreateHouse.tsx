import React, { useEffect, useState } from "react";
import "../styles/CreateHouse.css";
import { useTheme } from "../contexts/ThemeContext";
import DefaultInput from "../components/defaultInput";
import { useNavigate } from "react-router-dom";
import { formatCEP } from "../services/CEPFormatter";
import axios from "axios";
import {
  FaBed,
  FaBath,
  FaCarSide,
  FaDollarSign,
  FaCirclePlus,
} from "react-icons/fa6";
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

const QuantityOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const SaleTypeOptions = ["Venda", "Aluguel"];

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
  const [suites, setSuites] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [garages, setGarages] = useState(0);
  const [financialType, setFinancialType] = useState("Aluguel");
  const [isCepDisabled, setIsCepDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (cep.length === 9) {
      setIsCepDisabled(true);
    }

    const getCEP = async () => {
      if (cep.length !== 9) {
        return;
      }

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

  const createHouse = async () => {
    setLoading(true);

    try {
      const houseInfo = {
        status: financialType,
        price,
        adress: `${logradouro}, ${bairro}, ${complemento}, ${city}, ${uf}`,
        description,
        area,
        suites,
        bedrooms,
        bathrooms,
        garages,
      };

      await axios
        .post(
          `${import.meta.env.VITE_API_URL}/api/houses/createHouse`,
          houseInfo,
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.status === 200) {
            navigate("/");
          }
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="createHouse__wrapper"
      meta-theme={isDarkMode ? "dark" : "light"}
    >
      <div className="createHouse__inputsWrapper">
        {isModalOpen && (
          <div className="createHouse__modalWrapper">
            <div className="createHouse__modal">
              <div className="createHouse__hamburguer">
                <div className="createHouse__burguer"></div>            
                <div className="createHouse__burguer"></div>
              </div>
            </div>
          </div>
        )}
        <div className="createHouse__titleContainer">
          <h1 className="createHouse__title">Adicionar Imóvel</h1>
          <div className="createHouse__mediaContainer">
            <h2 className="createHouse__title">Adicionar Mídia</h2>
            <FaCirclePlus size={24} className="createHouse__mediaIcon" />
          </div>
        </div>
        <p className="login__backToHome">
          Voltar à <label onClick={() => navigate("/")}>Página Inicial</label>
        </p>
        <div className="createHouse__container">
          <DefaultInput
            className="createHouse__input"
            placeHolder="CEP"
            maxLength={254}
            onChange={(e) => setCep(formatCEP(e.target.value))}
            value={cep}
            disabled={isCepDisabled}
          />
          <DefaultInput
            className="createHouse__input"
            placeHolder="Logradouro"
            flex={2}
            maxLength={254}
            onChange={(e) => setLogradouro(e.target.value)}
            value={logradouro}
          />
        </div>

        <div className="createHouse__container">
          <DefaultInput
            className="createHouse__input"
            placeHolder="Complemento"
            maxLength={254}
            onChange={(e) => setComplemento(e.target.value)}
            value={complemento}
          />
          <DefaultInput
            className="createHouse__input"
            placeHolder="Bairro"
            maxLength={254}
            onChange={(e) => setBairro(e.target.value)}
            value={bairro}
          />
        </div>

        <div className="createHouse__container">
          <DefaultInput
            className="createHouse__input"
            placeHolder="Cidade"
            maxLength={254}
            disabled={true}
            value={city}
            flex={2}
          />
          <DefaultInput
            className="createHouse__input"
            placeHolder="UF"
            maxLength={254}
            disabled={true}
            value={uf}
            menuList={ufOptions}
            onChange={(e) => setUf(e.target.value)}
          />
        </div>
        <div className="createHouse__container">
          <DefaultInput
            className="createHouse__input"
            placeHolder="Área Total"
            maxLength={254}
            onChange={(e) => setArea(formatArea(e.target.value))}
            value={area}
          />
          <DefaultInput
            className="createHouse__input"
            placeHolder="Valor"
            maxLength={254}
            onChange={(e) => setPrice(formatCurrency(e.target.value))}
            value={price}
          />
        </div>
        <div className="createHouse__container">
          <DefaultInput
            className="createHouse__input"
            placeHolder="Descrição"
            maxLength={800}
            type="textarea"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="createHouse__container">
          <DefaultInput
            className="createHouse__input"
            icon={IoBed}
            maxLength={254}
            menuList={QuantityOptions}
            onChange={(e) => setSuites(parseInt(e.target.value))}
          />
          <DefaultInput
            className="createHouse__input"
            icon={FaBed}
            maxLength={254}
            menuList={QuantityOptions}
            onChange={(e) => setBedrooms(parseInt(e.target.value))}
          />
          <DefaultInput
            className="createHouse__input"
            icon={FaBath}
            maxLength={254}
            menuList={QuantityOptions}
            onChange={(e) => setBathrooms(parseInt(e.target.value))}
          />
          <DefaultInput
            className="createHouse__input"
            icon={FaCarSide}
            maxLength={254}
            menuList={QuantityOptions}
            onChange={(e) => setGarages(parseInt(e.target.value))}
          />
          <DefaultInput
            className="createHouse__input"
            icon={FaDollarSign}
            maxLength={254}
            menuList={SaleTypeOptions}
            onChange={(e) => setFinancialType(e.target.value.toUpperCase())}
          />
        </div>
        {errorMessage && <p className="signup__error">{errorMessage}</p>}
        {loading ? (
          <div className="createHouse__loadingContainer">
            <div className="spinner"></div>
          </div>
        ) : (
          <button className="createHouse__button" onClick={createHouse}>
            ADICIONAR
          </button>
        )}
      </div>
    </div>
  );
}

export default CreateHouse;
