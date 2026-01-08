// TypingTest.jsx
import React from "react";
import "../assets/css/typing.css";
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

      <div className="text-container">
        {isStarted === false ? (
          <>
            <div className="textWraper center-screen">
              <button className="bt-start" onClick={() => startGame()}>
                Start typing test
              </button>
            </div>

            <div className="p-click">
              <p>Or click the text and start typing</p>
            </div>

            <div className="blur-container">{currentText?.text}</div>
          </>
        ) : (
          <div className="noblur-container">
            {currentText?.text.split("").map((ch, i) => {
              if (i >= text.length) {
                return (
                  <span className="neutruCh" key={i}>
                    {ch}
                  </span>
                );
              }

              if (text[i] === ch) {
                return (
                  <span className="correctCh" key={i}>
                    {ch}
                  </span>
                );
              }

              return (
                <span className="wrongCh" key={i}>
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
