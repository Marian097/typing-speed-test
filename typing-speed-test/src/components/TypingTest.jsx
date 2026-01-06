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
    let typed = text.length;
    let target = currentText.text;
    let result = 0;
    for (let i = 0; i < Math.min(typed, target.length); i++) {
      if (text[i].toLocaleLowerCase() === target[i].toLocaleLowerCase()) {
        result += 1;
      }
    }
    if (typed === 0)
    {
      setAccuaracy(100)
    }
    else {
      setAccuaracy((result / typed) * 100);
    }
    
  
  }, [text, currentText]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsRunning(false);
    }
  }, [timeLeft]);


  useEffect(() => {
    if (!currentText) return;
    let listText = currentText.text.split(" ");
    let inputText = text.split(" ");
    for (let i = 0; i < listText.length; i++)
    {
      for (let j = 0; j < inputText.length; j++)
      {
        if (inputText[j].trim() === listText[i].trim())
        {
          setWpm(prev => prev + 1)
        }
      }
    }

    console.log(wpm)

  }, [text, currentText])

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
        isPassage = {isPassage}
      />
      <InputText
        startTime={onKeyDown}
        ref={inputRef}
        disabled={timeLeft === 0}
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
