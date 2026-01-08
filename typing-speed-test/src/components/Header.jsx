import React from "react";
import logoImg from "../assets/images/logo-large.svg";
import cupImg from "../assets/images/icon-personal-best.svg";
import "../assets/css/header.css";

export default function Header({wpm}) {
  return (
    <header className = "header">
      <div className="logo">
        <div className="img-logo">
          <img src={logoImg} alt="logo" />
        </div>
        <div className="best-score">
          <img src={cupImg} alt="cup" />
          <span>Personal best:{wpm}</span>
        </div>
      </div>
    </header>
  );
}
