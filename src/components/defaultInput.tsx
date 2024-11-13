import React, { useState } from "react";
import "../styles/defaultInput.css";
import { IconType } from "react-icons";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

interface InputProps {
  placeHolder?: string;
  style?: React.CSSProperties;
  className?: string;
  type?: string | "text";
  icon?: IconType;
  maxLenght?: number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  value?: string;
  flex?: number;
  disabled?: boolean;
  menuList?: string[] | number[];
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
    <div
      className="defaultInput__wrapper"
      style={{ flex: props.flex ? props.flex : 1 }}
    >
      {props.menuList ? (
        <>
          {props.icon && <props.icon size={20} className="" />}
          <select
            className={`${props.className} defaultInput__container`}
            value={props.value}
            onChange={props.onChange}
          >
            {props.menuList.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
        </>
      ) : (
        <>
          <input
            type={props.type}
            className={`${props.className} defaultInput__container`}
            style={props.style}
            placeholder={props.placeHolder}
            maxLength={props.maxLength}
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
        </>
      )}
    </div>
  );
  
  
}

export default DefaultInput;
