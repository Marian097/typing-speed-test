import React from "react";
import logoImg from "../assets/images/logo-large.svg";
import cupImg from "../assets/images/icon-personal-best.svg";

export default function Header({ bestWpm }) {
  return (
    <header className="w-full h-10 md:h-20">
      <div className="mx-auto flex h-full w-full max-w-screen items-center px-3 md:px-6">
        {/* Logo */}
        <img src={logoImg} alt="logo" className="w-40 md:w-auto" />

        {/* Best score */}
        <div className="ml-auto flex items-center gap-2">
          <img src={cupImg} alt="cup" className="h-3 md:h-4" />

          <span className="text-xs sm:text-sm md:text-md lg:text-lg whitespace-nowrap sm:mr-5">
            <span className="md:inline">Personal best:</span>
            <span className="ml-2">{bestWpm}</span>
            <span className="mr-2">WPM</span>
          </span>
        </div>
      </div>
    </header>
  );
}
