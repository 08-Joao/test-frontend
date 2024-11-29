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
  FaFileCirclePlus,
  FaImages,
  FaTrash,
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

function getExtension(mimetype: string): string | null {
  const mimeMap: { [key: string]: string } = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "video/mp4": ".mp4",
    "video/mpeg": ".mpeg",
    "video/quicktime": ".mov",
  };

  return mimeMap[mimetype] || null;
}

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
  const [financialType, setFinancialType] = useState("Venda");
  const [isCepDisabled, setIsCepDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);

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

  const handleFileUpload = (event) => {
    const files = event.target.files;

    const validFiles: File[] = Array.from(files)
      .map((file) => file as File)
      .filter((file) => getExtension(file.type) !== null);

    validFiles.map((file) => {
      console.log(file.name);
    });

    if (validFiles.length !== files.length) {
      setErrorMessage("Alguns arquivos têm extensões não suportadas.");
    }

    const newFiles = validFiles;

    if (newFiles.length < 10) {
      for (let i = 0; i < mediaFiles.length; i++) {
        const file = mediaFiles[i];
        if (newFiles.length === 10) {
          break;
        }
        if (!validFiles.includes(file)) {
          newFiles.push(file);
        }
      }
    }

    setMediaFiles(newFiles);
  };

  const [uploadProgress, setUploadProgress] = useState<number[]>([]);

  const handleUploadProgress = (index, progress) => {
    setUploadProgress((prevProgress) => {
      const updatedProgress = [...prevProgress];
      updatedProgress[index] = progress;
      return updatedProgress;
    });
  };

  const handleFileRemove = (index) => {
    setMediaFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setUploadProgress((prevProgress) =>
      prevProgress.filter((_, i) => i !== index)
    );
  };

  const createHouse = async () => {
    setLoading(true);
    setErrorMessage("");

    if (!financialType || !price || price === 'R$ 0' || !area || area === 'M² 0' || !description) {
      setErrorMessage("Preencha todos os campos");
      setLoading(false);
      return;
    }

    try {
      // Preparar o FormData
      const formData = new FormData();
      const filesName = [] as string[];


      // Adicionando os dados do imóvel ao FormData
      formData.append("status", financialType);
      formData.append("price", price);
      formData.append(
        "adress",
        `${logradouro}, ${bairro}, ${complemento}, ${city}, ${uf}`
      );
      formData.append("description", description);
      formData.append("area", area);
      formData.append("suites", String(suites));
      formData.append("bedrooms", String(bedrooms));
      formData.append("bathrooms", String(bathrooms));
      formData.append("garages", String(garages));

      // Adicionando os arquivos ao FormData
      mediaFiles.forEach((file) => {
        formData.append("file", file);
      });



      try {
        const uploadPromises = mediaFiles.map((file, index) => {
          const fileFormData = new FormData();
          fileFormData.append("file", file);
                  
          return axios.post(
            `${import.meta.env.VITE_API_URL}/api/upload/file`,
            fileFormData,
            {
              withCredentials: true,
              onUploadProgress: (progressEvent) => {
                const progress = (progressEvent.loaded / progressEvent.total) * 100;
                handleUploadProgress(index, progress);
              },
            }
          );
        });
      
        const responses = await Promise.all(uploadPromises);  // Aguarda todas as promessas
        responses.forEach((response, index) => {
          if (response.status === 200) {
            filesName.push(response.data)      
          }
        })
      } catch (error) {
        console.error("Erro durante o upload:", error);
      }
      
      const houseInfo = {
        status: financialType === "Venda" ? "SALE" : "RENT",
        price,
        address: `${logradouro}, ${bairro}, ${complemento}, ${city}, ${uf}`,
        description,
        area,
        suites,
        bedrooms,
        bathrooms,
        garages,
        files: filesName
      }

      // Fazer a requisição para o backend
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/houses/createHouse`,
        houseInfo,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Erro ao criar imóvel:", error);
      setErrorMessage(
        "Ocorreu um erro ao adicionar o imóvel. Tente novamente."
      );
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
              <div className="createHouse__modalTitle">
                <div className="createHouse__newMediaWrapper">
                  <input
                    type="file"
                    className="createHouse__inputFile"
                    multiple
                    onChange={(e) => handleFileUpload(e)}
                  />
                  <h2>Adicionar Mídia</h2>
                  <div className="createHouse__iconContainer">
                    <FaFileCirclePlus
                      size={18}
                      className="createHouse__mediaIcon"
                    />
                  </div>
                </div>
                <div
                  className="createHouse__hamburguer"
                  onClick={() => setIsModalOpen(false)}
                >
                  <div className="createHouse__burguer"></div>
                  <div className="createHouse__burguer"></div>
                </div>
              </div>
              {/* <div className="createHouse__mediaItens">
                {mediaFiles.map((file, index) => (
                  <div key={index}  className="createHouse__mediaItem">
                    <div className="createHouse__mediaInfo">
                      <h4>{file.name}</h4>      
                      <FaTrash size={20}/>
                    </div>
                    <div className="createHouse__progressBar">
                      {setMediaFiles(mediaFiles[1][])}
                    </div>
                  </div>
                ))}
              </div> */}
              <div className="createHouse__mediaItens">
                {mediaFiles.map((file, index) => (
                  <div key={index} className="createHouse__mediaItem">
                    <div className="createHouse__mediaInfo">
                      <h4>{file.name}</h4>
                      <FaTrash
                        size={20}
                        onClick={() => handleFileRemove(index)}
                      />
                    </div>
                    <div className="createHouse__progressBar">
                      <div
                        className="createHouse__progress"
                        style={{
                          width: `${uploadProgress[index] || 0}%`,
                          backgroundColor: "#4caf50",
                          height: "100%",
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="createHouse__titleContainer">
          <h1 className="createHouse__title">Adicionar Imóvel</h1>
          <div
            className="createHouse__mediaContainer"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <h2 className="createHouse__title">Mídia</h2>
            <div className="createHouse__iconContainer">
              <FaImages size={24} className="createHouse__mediaIcon" />
            </div>
          </div>
        </div>
        <p className="signin__backToHome">
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
