import React, { useRef, useState, useEffect } from "react";
import "../assets/css/typing.css";
import Dashboard from "./Dashboard";
import InputText from "./InputText";

export default function TypingTest() {
  const inputRef = useRef(null);
  const [text, setText] = useState("");
  const [wpm, setWpm] = useState(0);
  const [accuaracy, setAccuaracy] = useState(100);
  const [diffGame, setDiffGame] = useState("easy");
  const [data, setData] = useState(null);
  const [currentText, setCurrentText] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPassage, setIsPassage] = useState(false);
  const [finishTime, setFinishTime] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((r) => r.json())
      .then(setData);
  }, []);

  useEffect(() => {
    if (!data) return;
    console.log(Array.isArray(data.easy)); // true
    const list = data[diffGame];
    const randomIndex = Math.floor(Math.random() * list.length);
    setCurrentText(list[randomIndex]);
    console.log(Array.isArray(data.easy));
  }, [data, diffGame]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (!currentText) return;
    if (!isRunning) return;
    if (timeLeft === 0) return;

    if (text.length >= currentText.text.length) {
      if (finishTime === null) setFinishTime(timeLeft);
      return;
    }

    let typed = text.length;
    let target = currentText.text;
    let result = 0;

    for (let i = 0; i < typed; i++) {
      if (text[i]?.toLowerCase() === target[i]?.toLowerCase()) {
        result++;
      }
    }

    setAccuaracy(typed === 0 ? 100 : (result / typed) * 100);
  }, [text, currentText, isRunning, timeLeft, finishTime]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsRunning(false);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (!currentText) return;
    if (!isRunning) return;

    if (text.trim() === "") {
      setWpm(0);
      return;
    }

    const elapsedSeconds =
      finishTime !== null ? 60 - finishTime : 60 - timeLeft;

    const minutes = elapsedSeconds / 60;
    if (minutes <= 0) return;

    let listText = currentText.text.trim().split(/\s+/);
    let inputText = text.trim().split(/\s+/);
    let goodWords = 0;

    for (let i = 0; i < Math.min(inputText.length, listText.length); i++) {
      if (inputText[i] === listText[i]) {
        goodWords++;
      }
    }

    setWpm(Math.floor(goodWords / minutes));
  }, [text, currentText, isRunning, finishTime, timeLeft]);

  function easyBtn() {
    setDiffGame("easy");
  }

  function mediumBtn() {
    setDiffGame("medium");
  }

  function hardBtn() {
    setDiffGame("hard");
  }

  function startGame() {
    setIsStarted(true);
    inputRef.current?.focus();
  }

  function onKeyDown() {
    if (isStarted && !isRunning) {
      setIsRunning(true);
      return;
    }
  }

  function setNoTime() {
    setIsPassage(true);
  }

  function onSetTime() {
    setIsPassage(false);
    setTimeLeft(60);
  }

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
            <div className= "p-click">
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
              } else {
                return (
                  <span className="wrongCh" key={i}>
                    {ch}
                  </span>
                );
              }
            })}
          </div>
        )}
      </div>
    </>
  );
}
