import React from "react";
import TypingTest from "./components/TypingTest";
import useTypingGame from "./hooks/useTypingGame";
import Header from "./components/Header";
import CompleteTest from "./components/CompleteTest";

export default function App() {
  const game = useTypingGame();
  return (
    <>
      <Header wpm = {game.wpm}/>
      <CompleteTest/>
      {/* <TypingTest {...game} />; */}
    </>
  );
}
