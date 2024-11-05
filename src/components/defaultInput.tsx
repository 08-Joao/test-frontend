import React, { useState } from "react";
import "../styles/defaultInput.css";
import { IconType } from "react-icons";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

interface InputProps {
  placeHolder: string;
  style?: React.CSSProperties;
  className?: string;
  type?: string | "text";
  icon?: IconType;
  maxLenght?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  value?: string;
  disabled?: boolean;
}

function DefaultInput(props: InputProps): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const [passInputType, setPassInputType] = useState(props.type);

  const toggleShowPassword = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowPassword(!showPassword);
    setPassInputType(showPassword ? "password" : "text");
  };



  return (
    <div className="defaultInput__wrapper">
      <input
        type={passInputType}
        className={`${props.className} defaultInput__container`}
        style={props.style}
        placeholder={props.placeHolder}
        maxLength={props.maxLenght}
        onChange={props.onChange} 
        value={props.value}
        disabled={props.disabled}
      />
      {props.icon && props.type !== "password" ? (
        <props.icon size={20} className="defaultInput__icon" />
      ) : props.type === "password" ? (
        <button
          type="button"
          className="defaultInput__icon defaultInput__selectable"
          onClick={toggleShowPassword}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
          aria-label="Toggle password visibility"
        >
          {showPassword ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
        </button>
      ) : null}
    </div>
  );
}

export default DefaultInput;
