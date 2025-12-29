import React from "react";
import "../assets/css/dashboard.css";

export default function Dashboard() {
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
          <span>Time:</span>
          <span>
            Difficulty:<button>Easy</button>
            <button>Medium</button>
            <button>Hard</button>
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
