// TypingTest.jsx
import React from "react";
import Dashboard from "./Dashboard";
import InputText from "./InputText";

export default function TypingTest({
  inputRef,
  text,
  setText,
  wpm,
  accuaracy,
  currentText,
  isStarted,
  isRunning,
  timeLeft,
  isPassage,
  startGame,
  onKeyDown,
  setNoTime,
  onSetTime,
  easyBtn,
  mediumBtn,
  hardBtn,
}) {
  return (
    <>
      <Dashboard
        onSetEasy={easyBtn}
        onSetMedium={mediumBtn}
        onSetHard={hardBtn}
        timeLeft={timeLeft}
        onSetNoTime={setNoTime}
        onSetTime={onSetTime}
        disabled={isPassage === true}
        accuaracy={accuaracy}
        isRunning={isRunning}
        isPassage={isPassage}
        wpm={wpm}
      />

      <InputText
        startTime={onKeyDown}
        ref={inputRef}
        disabled={text.length >= currentText?.text.length}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex relative h-screen">
        {isStarted === false ? (
          <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/3">
              <button className="btn" onClick={() => startGame()}>
                Start typing test
              </button>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/5 md:w-auto">
              <p className = "text-sm md:text-lg text-center" onClick={() => startGame()}>Or click the text and start typing</p>
            </div>

            <div className="blur-sm absolute"><p>{currentText?.text}</p></div>
          </>
        ) : (
          <div>
            {currentText?.text.split("").map((ch, i) => {
              if (i >= text.length) {
                return (
                  <span className="text-gray-200" key={i}>
                    {ch}
                  </span>
                );
              }

              if (text[i] === ch) {
                return (
                  <span className="text-green-700" key={i}>
                    {ch}
                  </span>
                );
              }

              return (
                <span className="text-red-700 underline" key={i}>
                  {ch}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
