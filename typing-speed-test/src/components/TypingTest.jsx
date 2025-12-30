import React, { useRef, useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import InputText from "./InputText";

export default function TypingTest() {
  const inputRef = useRef(null);
  const [text, setText] = useState("");
  const [wpm, setWpm] = useState(0);
  const [time, setTime] = useState(null);
  const [accuaracyText, setAccuaracyText] = useState(0);
  const [diffGame, setDiffGame] = useState("easy");
  const [data, setData] = useState(null);
  let randomNumber = 0


  useEffect(() => {
    fetch("/data.json")
      .then((r) => r.json())
      .then(setData);
  }, []);

 

  return (
    <>
      <Dashboard />
      <InputText />
      {data && data[diffGame].map(item => <p key = {item.id}>{item.text}</p>)}
    </>
  );
}
