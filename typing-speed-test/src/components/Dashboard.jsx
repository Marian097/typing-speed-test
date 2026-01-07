import React from "react";
import "../assets/css/dashboard.css";

export default function Dashboard({
  wpm,
  timeLeft,
  accuaracy,
  onSetTime,
  onSetNoTime,
  onSetEasy,
  onSetMedium,
  onSetHard,
  disabled,
  isRunning,
  isPassage
}) {
  return (
    <nav className="m-dashboard">
      <div className="option">
        <div className="wpm-container">
          <span>WPM:<span className = "wpm-score">{wpm}</span></span>
        </div>
        <div className="acc-container">
          {isRunning === false && isNaN(accuaracy) ? (
            <span>
              Accuaracy:<span className="acc-color">0%</span>
            </span>
          ) : (
            <span>
              Accuaracy:<span className="acc-color">{Math.floor(accuaracy)}%</span>
            </span>
          )}
        </div>
        <div className="option-container">
          {isPassage === true ? (
            <span>
              Time:<span style={{ color: "white" }}>-</span>
            </span>
          ) : (
            <span>
              Time:<span style={{ color: "white" }}>{timeLeft}</span>
            </span>
          )}
          <span>
            Difficulty:<button onClick={() => onSetEasy()}>Easy</button>
            <button onClick={() => onSetMedium()}>Medium</button>
            <button onClick={() => onSetHard()}>Hard</button>
          </span>
        </div>
        <div className="mode-container">
          <span>
            Mode: <button onClick={() => onSetTime()}>Timed(60s)</button>
            <button onClick={() => onSetNoTime()} disabled={disabled}>
              Passage
            </button>
          </span>
        </div>
      </div>
    </nav>
  );
}
