// src/hooks/useTypingGame.js
import { useEffect, useRef, useState } from "react";

function loadResults() {
  try {
    return JSON.parse(localStorage.getItem("results") ?? "[]");
  } catch {
    return [];
  }
}

function loadBest() {
  try {
    return JSON.parse(localStorage.getItem("best") ?? "[]");
  } catch {
    return [];
  }
}

function loadDefaultMode(){
  try{
    return JSON.parse(localStorage.getItem("mode") ?? "60")
  }
  catch{
    return "60";
  }
}

function loadDefaultDifficulty(){
  try{
    return JSON.parse(localStorage.getItem("dif") ?? "easy")
  }
  catch{
    return "easy";
  }
}

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
  const [results, setResults] = useState(loadResults);
  const [bestWpm, setBestWpm] = useState(loadBest);
  const [isFinish, setIsFinish] = useState(false);
  const [wrongCharacters, setWrongCharacters] = useState(0);
  const [goodCharacters, setGoodCharacters] = useState(0);
  const [defaultMode, setDefaultMode] = useState(loadDefaultMode);
  const [defaultDifficulty, setDefaultDifficulty] = useState(loadDefaultDifficulty);

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
      setIsFinish(true);
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

    const elapsedSeconds =
      finishTime !== null ? 60 - finishTime : 60 - timeLeft;
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

  // Result
  useEffect(() => {
    if (!isFinish) return;
    const score = wpm;

    setResults((prev) => {
      const next = [...prev, score];
      localStorage.setItem("results", JSON.stringify(next));
      return next;
    });
  }, [isFinish, wpm]);

  //Set best score in localStorage
  useEffect(() => {
    if (!isFinish) return;
    const list = results;
    let best = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i] > best) {
        best = list[i];
        localStorage.setItem("best", JSON.stringify(best));
      }
    }
  }, [isFinish, results]);

  //Best score on page
  useEffect(() => {
    if (!isFinish) return;
    const best = JSON.parse(localStorage.getItem("best"));
    setBestWpm(best);
  }, [isFinish]);

  useEffect(() => {
    if (!currentText) return;
    if (!isRunning) return;

    const target = currentText.text;

    let correct = 0;
    let wrong = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === target[i]) {
        correct++;
      } else {
        wrong++;
      }
    }

    setGoodCharacters(correct);
    setWrongCharacters(wrong);
  }, [currentText, isRunning, text]);

  useEffect(() => {
    if (isStarted && !isRunning) {
      inputRef.current?.focus();
    }
  }, [isStarted, isRunning]);

  useEffect(() => {
    const mode = defaultMode
    setDefaultMode(mode);
    localStorage.setItem("mode", JSON.stringify(mode))
      
  }, [defaultMode])

  useEffect(() => {
    const dif = defaultDifficulty;
    setDefaultDifficulty(dif)
    localStorage.setItem("dif", JSON.stringify(dif))
  },[defaultDifficulty])

  
  
  useEffect(() => {
  setIsPassage(defaultMode === "0");
  if (defaultMode === "60") setTimeLeft(60);
}, [defaultMode]);


useEffect(() => {
  if (defaultDifficulty === "easy")
  {
    setDiffGame("easy")
  }
   if (defaultDifficulty === "medium")
  {
    setDiffGame("medium")
  }
   if (defaultDifficulty === "hard")
  {
    setDiffGame("hard")
  }
}, [defaultDifficulty])


  
  
  function easyBtn() {
    setDiffGame("easy");
    inputRef.current?.focus();
  }
  function mediumBtn() {
    setDiffGame("medium");
    inputRef.current?.focus();
  }
  function hardBtn() {
    setDiffGame("hard");
    inputRef.current?.focus();
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
    inputRef.current?.focus();
  }

  function onSetTime() {
    setIsPassage(false);
    inputRef.current?.focus();
    setTimeLeft(60);
  }

  function resetGame() {
    setBestWpm(loadBest);
    setText("");
    setWpm(0);
    setAccuaracy(100);
    setTimeLeft(60);
    setWrongCharacters(0);
    setGoodCharacters(0);
    setFinishTime(null);
    setIsFinish(false);
    setIsRunning(false);
    setIsStarted(true);
    setDefaultMode(loadDefaultMode);
    setDefaultDifficulty(loadDefaultDifficulty);
  }

  return {
    // refs
    inputRef,

    // state
    text,
    bestWpm,
    wpm,
    accuaracy,
    currentText,
    isStarted,
    isRunning,
    timeLeft,
    isPassage,
    isFinish,
    wrongCharacters,
    goodCharacters,
    defaultMode,
    defaultDifficulty,
   
    

    // setters/handlers
    setText,
    startGame,
    onKeyDown,
    setNoTime,
    onSetTime,
    easyBtn,
    mediumBtn,
    hardBtn,
    resetGame,
    setDefaultMode,
    setDefaultDifficulty,
  };
}
