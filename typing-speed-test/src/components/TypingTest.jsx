import React, { useRef, useState, useEffect, useMemo } from "react";
import "../assets/css/typing.css";
import Dashboard from "./Dashboard";
import InputText from "./InputText";

export default function TypingTest() {
  const inputRef = useRef(null);
  const [text, setText] = useState("");
  const [wpm, setWpm] = useState(0);
  const [accuaracyText, setAccuaracyText] = useState(0);
  const [diffGame, setDiffGame] = useState("easy");
  const [data, setData] = useState(null);
  const [currentText, setCurrentText] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

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
  }, [data, diffGame]);


  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [isRunning])


  useEffect(() => {
    if (timeLeft === 0)
    {
      setIsRunning(false)
    }
  }, [timeLeft])

  function easyBtn() {
    setDiffGame("easy");
  }

  function mediumBtn() {
    setDiffGame("medium");
  }

  function hardBtn() {
    setDiffGame("hard");
  }

  function startGame(){
    setIsStarted(true)
    inputRef.current?.focus();
  }

  function onKeyDown(){
    if (isStarted && !isRunning)
    {
      setIsRunning(true)
    }
  }



  return (
    <>
      <Dashboard
        onSetEasy={easyBtn}
        onSetMedium={mediumBtn}
        onSetHard={hardBtn}
        timeLeft = {timeLeft}
      />
      <InputText startTime = {onKeyDown} ref = {inputRef} disabled = {timeLeft == 0}/>
      <div className = "text-container">
      {isStarted === false ? (
        <>
          <div className="textWraper center-screen">
            <button className="bt-start" onClick = {() => startGame()}>Start typing test</button>
          </div>
          <div className="blur-container">{currentText?.text}</div>
        </>
      ) : (
        <div className="noblur-container">{currentText?.text}</div>
      )}
      </div>
    </>
  );
}
