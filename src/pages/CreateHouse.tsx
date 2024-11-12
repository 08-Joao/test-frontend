import React from "react";
import "../styles/CreateHouse.css";
import { useTheme } from "../contexts/ThemeContext";
import DefaultInput from "../components/defaultInput";

function CreateHouse() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className="createHouse__wrapper"
      meta-theme={isDarkMode ? "dark" : "light"}
    >
      <div className="createHouse__inputsWrapper">
        <div className="createHouse__container">
          <DefaultInput
            className="signup__input"
            // icon={IoPersonOutline}
            placeHolder="Nome"
            maxLenght={254}
            // onChange={(e) => setName(e.target.value)}
          />
          <DefaultInput
            className="signup__input"
            // icon={IoPersonOutline}
            placeHolder="Nome"
            maxLenght={254}
            // onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="createHouse__container">
          <DefaultInput
            className="signup__input"
            // icon={IoPersonOutline}
            placeHolder="Nome"
            maxLenght={254}
            // onChange={(e) => setName(e.target.value)}
          />{" "}
          <DefaultInput
            className="signup__input"
            // icon={IoPersonOutline}
            placeHolder="Nome"
            maxLenght={254}
            // onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="createHouse__container">
          <DefaultInput
            className="signup__input"
            // icon={IoPersonOutline}
            placeHolder="Nome"
            maxLenght={254}
            // onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="createHouse__container">
          <DefaultInput
            className="signup__input"
            // icon={IoPersonOutline}
            placeHolder="Nome"
            maxLenght={254}
            // onChange={(e) => setName(e.target.value)}
          />{" "}
          <DefaultInput
            className="signup__input"
            // icon={IoPersonOutline}
            placeHolder="Nome"
            maxLenght={254}
            // onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateHouse;
