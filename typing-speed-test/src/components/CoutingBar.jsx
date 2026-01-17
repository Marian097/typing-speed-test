import React from "react";

export default function CoutingBar({
  wpm,
  timeLeft,
  accuaracy,
  isRunning,
  isPassage,
}) {
  return (
    <nav className = "w-full h-10 mt-4">
      <div className="flex gap-x-5 justify-center text-center sm:text-2xl">
        <div>
          <h3>WPM:</h3>
          <p>{wpm}</p>
        </div>
        <div>
          <h3>Accuaracy:</h3>
          {isRunning === false && isNaN(accuaracy) ? (
            <p>0%</p>
          ) : (
            <p>{Math.floor(accuaracy)}%</p>
          )}
        </div>
        <div>
          <h3>Time:</h3>
          {isPassage === true ? <p>-</p> : <p>0:{timeLeft}</p>}
        </div>
      </div>
    </nav>
  );
}
