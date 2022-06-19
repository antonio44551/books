import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faUser,
  faStar,
  faListAlt,
  faCheckCircle,
  faHeading,
  faRankingStar,
  faImage,
} from "@fortawesome/free-solid-svg-icons";

export default function Input(props) {
  const {
    onChangeHandler,
    title,
    ariaLabel,
    name,
    placeholder,
    type,
    value,
    icon,
  } = props;

  const getFaIcon = () => {
    if (icon === "pen") {
      return faPen;
    }
    if (icon === "user") {
      return faUser;
    }
    if (icon === "star") {
      return faStar;
    }
    if (icon === "list") {
      return faListAlt;
    }
    if (icon === "check") {
      return faCheckCircle;
    }
    if (icon === "heading") {
      return faHeading;
    }
    if (icon === "ranking") {
      return faRankingStar;
    }
    if (icon === "image") {
      return faImage;
    }
  };

  return (
    <>
      <div>{title}</div>
      <div className="input-wrapper">
        <input
          type={type}
          onChange={onChangeHandler}
          title={title}
          aria-label={ariaLabel}
          name={name}
          placeholder={placeholder}
          value={value}
        />
        {icon && <FontAwesomeIcon icon={getFaIcon()} />}
      </div>
    </>
  );
}
