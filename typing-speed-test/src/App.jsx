import React from "react";
import TypingTest from "./components/TypingTest";
import useTypingGame from "./hooks/useTypingGame";
import Header from "./components/Header";
import CompleteTest from "./components/CompleteTest";
import BestScore from "./components/BestScore";
import Complete from "./components/mobile/Complete";

export default function App() {
  const game = useTypingGame();
  return (
    <>
      <Header bestWpm={game.bestWpm} />
      {game.isFinish ? (
        game.wpm > game.bestWpm ? (
          <BestScore
            wpm={game.wpm}
            accuaracy={game.accuaracy}
            wrongCharacters={game.wrongCharacters}
            goodCharacters={game.goodCharacters}
            resetGame={game.resetGame}
          />
        ) : (
          <>
            <div className="md:hidden block">
              <Complete
                wpm={game.wpm}
                accuaracy={game.accuaracy}
                wrongCharacters={game.wrongCharacters}
                goodCharacters={game.goodCharacters}
                resetGame={game.resetGame}
                bestWpm={game.bestWpm}
              />
            </div>
            <div className="hidden">
              <CompleteTest
                wpm={game.wpm}
                accuaracy={game.accuaracy}
                wrongCharacters={game.wrongCharacters}
                goodCharacters={game.goodCharacters}
                resetGame={game.resetGame}
              />
            </div>
          </>
        )
      ) : (
        <TypingTest
          inputRef={game.inputRef}
          text={game.text}
          setText={game.setText}
          wpm={game.wpm}
          accuaracy={game.accuaracy}
          currentText={game.currentText}
          isStarted={game.isStarted}
          isRunning={game.isRunning}
          timeLeft={game.timeLeft}
          isPassage={game.isPassage}
          startGame={game.startGame}
          onKeyDown={game.onKeyDown}
          setNoTime={game.setNoTime}
          onSetTime={game.onSetTime}
          easyBtn={game.easyBtn}
          mediumBtn={game.mediumBtn}
          hardBtn={game.hardBtn}
        />
      )}
    </>
  );
}
