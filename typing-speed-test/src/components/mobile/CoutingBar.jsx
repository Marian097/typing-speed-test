import React from "react";

export default function CoutingBar({
  wpm,
  accuaracy,
  timeLeft,
  isRunning,
  isPassage,
}) {
  return (
    <>
      <div className = "flex gap-x-4 w-screen justify-center items-center text-center mt-10 divide-x divide-white/20">
        <div className = "px-4">
          <h3>WPM:</h3>
          <p>{wpm}</p>
        </div>
        <div className = "px-4">
          {isRunning === true && isNaN(accuaracy) ? (
            <>
              <h3>Accuaracy:</h3>
              <p>0%</p>{" "}
            </>
          ) : (
            <>
              <h3>Accuaracy:</h3>
              <p>{Math.floor(accuaracy)}%</p>
            </>
          )}
        </div>
        <div className = "px-4">
          {isPassage === true ? (
            <>
              <h3>Time:</h3>
              <p>-</p>
            </>
          ) : (
            <>
              <h3>Time:</h3>
              <p>0:{timeLeft}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
