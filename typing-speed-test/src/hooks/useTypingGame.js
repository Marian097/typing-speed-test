// src/hooks/useTypingGame.js
import { useEffect, useRef, useState } from "react";

export default function useTypingGame() {
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

  // fetch data
  useEffect(() => {
    fetch("/data.json")
      .then((r) => r.json())
      .then(setData);
  }, []);

  // pick random text by difficulty
  useEffect(() => {
    if (!data) return;
    const list = data[diffGame];
    const randomIndex = Math.floor(Math.random() * list.length);
    setCurrentText(list[randomIndex]);
  }, [data, diffGame]);

  // timer
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  // accuracy
  useEffect(() => {
    if (!currentText) return;
    if (!isRunning) return;
    if (timeLeft === 0) return;

    if (text.length >= currentText.text.length) {
      if (finishTime === null) setFinishTime(timeLeft);
      return;
    }

    const typed = text.length;
    const target = currentText.text;

    let correct = 0;
    for (let i = 0; i < typed; i++) {
      if (text[i]?.toLowerCase() === target[i]?.toLowerCase()) {
        correct++;
      }
    }

    setAccuaracy(typed === 0 ? 100 : (correct / typed) * 100);
  }, [text, currentText, isRunning, timeLeft, finishTime]);

  // stop when time hits 0
  useEffect(() => {
    if (timeLeft === 0) setIsRunning(false);
  }, [timeLeft]);

  // WPM
  useEffect(() => {
    if (!currentText) return;
    if (!isRunning) return;

    if (text.trim() === "") {
      setWpm(0);
      return;
    }

    const elapsedSeconds = finishTime !== null ? 60 - finishTime : 60 - timeLeft;
    const minutes = elapsedSeconds / 60;
    if (minutes <= 0) return;

    const listText = currentText.text.trim().split(/\s+/);
    const inputText = text.trim().split(/\s+/);

    let goodWords = 0;
    for (let i = 0; i < Math.min(inputText.length, listText.length); i++) {
      if (inputText[i] === listText[i]) goodWords++;
    }

    setWpm(Math.floor(goodWords / minutes));
  }, [text, currentText, isRunning, finishTime, timeLeft]);

  // handlers (same ca în TypingTest.jsx :contentReference[oaicite:0]{index=0})
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

  return {
    // refs
    inputRef,

    // state
    text,
    wpm,
    accuaracy,
    currentText,
    isStarted,
    isRunning,
    timeLeft,
    isPassage,

    // setters/handlers
    setText,
    startGame,
    onKeyDown,
    setNoTime,
    onSetTime,
    easyBtn,
    mediumBtn,
    hardBtn,
  };
}
