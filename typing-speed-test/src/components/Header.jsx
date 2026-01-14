import React from "react";
import logoImg from "../assets/images/logo-large.svg";
import cupImg from "../assets/images/icon-personal-best.svg";
import "../assets/css/header.css";

export default function Header({bestWpm}) {
  return (
    <header className = "relative max-w-screen h-10 md:h-20">
      <div className="flex absolute w-full h-full items-center">
        <div className="h-sm w-sm">
          <img src={logoImg} alt="logo" className = "w-40 md:w-auto"/>
        </div>
        <div className="best-score flex absolute left-3/5 md:ml-90 items-center">
          <img src={cupImg} alt="cup" className = "h-3"/>
          <span className = "text-sm md:text-lg"><span className = "hidden">Personal best:</span><span className = "md:ml-2">{bestWpm}</span>WPM</span>
        </div>
      </div>
    </header>
  );
}
