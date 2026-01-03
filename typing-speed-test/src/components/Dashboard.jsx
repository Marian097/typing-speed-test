import React from "react";
import "../assets/css/dashboard.css";

export default function Dashboard({
  wpm,
  timeLeft,
  diffGame,
  accuaracyText,
  onSetTime,
  onSetNoTime,
  onSetEasy,
  onSetMedium,
  onSetHard,
}) {
  return (
    <nav className="m-dashboard">
      <div className="option">
        <div className="wpm-container">
          <span>WPM:</span>
        </div>
        <div className="acc-container">
          <span>Accuaracy:</span>
        </div>
        <div className="option-container">
          <span>Time:<span style = {{color: "white"}}>{timeLeft}</span></span>
          <span>
            Difficulty:<button onClick = {() => onSetEasy()}>Easy</button>
            <button onClick = {()=> onSetMedium()} >Medium</button>
            <button onClick= {() => onSetHard()}>Hard</button>
          </span>
        </div>
        <div className="mode-container">
          <span>
            Mode: <button>Timed(60s)</button>
            <button>Passage</button>
          </span>
        </div>
      </div>
    </nav>
  );
}
