import React from "react";
import { useNavigate } from "react-router-dom";
import BookLogo from "../assets/books.svg";

function Header(props) {
  const navigate = useNavigate();
  const logoClickHandler = () => navigate("/");

  return (
    <header>
      <img
        className="move-picker-triangle-bg"
        src={BookLogo}
        alt="books on shelf"
      ></img>
      <h1 onClick={logoClickHandler}>BookWorm</h1>
    </header>
  );
}

export default Header;
