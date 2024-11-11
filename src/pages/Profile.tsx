import React, { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import "../styles/Profile.css";
import { useTheme } from "../contexts/ThemeContext";
import { useParams } from "react-router-dom";
import { ProfileUserInformationType } from "../types/profileUserInformation";
import { IoHome, IoShieldCheckmark, IoPerson, IoShareSocial } from "react-icons/io5";

const getRole: { [key: string]: string } = {
  ADMIN: "Administrador",
  AGENT: "Corretor",
  USER: "Cliente",
};

function Profile() {
  const [files, setFiles] = useState<File[]>([]); // Estado para armazenar os arquivos selecionados
  const [error, setError] = useState<string>(""); // Estado para erros
  const [uploadProgress, setUploadProgress] = useState<number>(0); // Estado para o progresso do upload
  const { isDarkMode } = useTheme();
  const { profileId } = useParams();
  const [userInformation, setUserInformation] =
    useState<ProfileUserInformationType>({
      name: "",
      profilePicture: "",
      profileBanner: "",
      role: "",
      profileOwnership: false,
      houses: [],
    });
  const [infoLoaded, setInfoLoaded] = useState(false); // Estado de autenticação

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    // Limite de arquivos
    if (selectedFiles && selectedFiles.length > 10) {
      setError("Você pode selecionar no máximo 10 arquivos");
    } else {
      setError("");
      setFiles(Array.from(selectedFiles || []));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    // Adicionando os arquivos ao FormData
    files.forEach((file) => {
      formData.append("file", file); // 'files' é o nome do campo que o backend espera
    });

    try {
      // Enviando os arquivos para o backend com monitoramento de progresso
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Importante para enviar arquivos
            uploadType: "profilePic",
          },
          withCredentials: true, // Caso precise enviar cookies ou autenticação
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percent); // Atualizando o progresso
            }
          },
        }
      );

    } catch (error) {
      console.error("Erro ao enviar os arquivos:", error);
      setError("Erro ao enviar os arquivos");
    }
  };

  useEffect(() => {
    const getInfo = async () => {
      try {
        await axios
          .get(
            `${import.meta.env.VITE_API_URL}/api/user/profile/${profileId}`,
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            setUserInformation(response.data);
            setInfoLoaded(true);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getInfo();
  }, []);

  if (infoLoaded === false) {
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
    <div
      className="profile__wrapper"
      data-theme={isDarkMode ? "dark" : "light"}
    >
      <div className="profile__infoContainer">
        <div className="profile__infoBg">
          <img
            src={userInformation.profileBanner}
            className="profile__banner"
          />
          <div className="profile__picHolder">
            <img
              src={userInformation.profilePicture}
              className="profile__picture"
            />
            <div className="profile__nameContainer">
              <p className="profile__name">{userInformation.name}</p>
              <div className="profile__roleContainer">
                {getRole[userInformation.role] === "Administrador" ? (
                  <IoShieldCheckmark size={16} />
                ) : getRole[userInformation.role] === "Corretor" ? (
                  <IoHome size={16} />
                ) : (
                  <IoPerson size={16} />
                )}
                <p className="profile__role">{getRole[userInformation.role]}</p>
              </div>
            </div>
          </div>
          <div className="profile__profileIcons">
            <div className="profile__iconItem">
              <IoHome className="profile__icon" size={16} />
              <p>{userInformation.houses.length}</p>
            </div>
            <div className="profile__iconItem">
              <IoShareSocial size={16} className="profile__icon"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
