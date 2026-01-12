import React from "react";
import TypingTest from "./components/TypingTest";
import useTypingGame from "./hooks/useTypingGame";
import Header from "./components/Header";
import CompleteTest from "./components/CompleteTest";

export default function App() {
  const game = useTypingGame();
  return (
    <>
      <Header bestWpm = {game.bestWpm}/>
      {
        game.isFinish === true  ? <CompleteTest wpm = {game.wpm} accuaracy = {game.accuaracy} resetGame = {game.resetGame} wrongCharacters = {game.wrongCharacters} goodCharacters = {game.goodCharacters} />  : <TypingTest {...game} />
      }
    </>
  );
}
