import React from "react";
import imgComplete from "../assets/images/icon-completed.svg";
import againPhoto from "../assets/images/icon-restart.svg";
import star2 from "../assets/images/pattern-star-2.svg";
import star1 from "../assets/images/pattern-star-1.svg";

export default function CompleteTest({wpm, accuaracy, wrongCharacters, goodCharacters, resetGame}) {
  return (
    <main className="hero-main">
      <div className="img-completed">
        <div className="shadow-1">
          <img src={imgComplete} />
        </div>
      </div>
      <div className="star-red">
        <img src={star2} />
      </div>
      <div className="star-gold">
        <img src={star1} />
      </div>
      <div className="annoucement-container">
        <h2>Test Complete!</h2>
        <p>Solid run. Keep pushing to beat your hight score.</p>
      </div>
      <section className="result-section">
        <div className="container-result">
          <div className="container-wpm">
            <h3>WPM:</h3>
            <p>{wpm}</p>
          </div>
          <div className="container-acc">
            <h3>Accuaracy</h3>
            { accuaracy < 100 ? <p style = {{color:"red"}}>{Math.floor(accuaracy)}%</p> : <p style = {{style: "green"}}>{Math.floor(accuaracy)}%</p>}
            
          </div>
          <div className="container-ch">
            <h3>Characters</h3>
            <span className = "good-ch">{goodCharacters}/<span className = "wrong-ch">{wrongCharacters}</span></span>
          </div>
          <div className="bt-container">
            <button className="bt-again" onClick = {() => resetGame()}>
              Go Again
              <img src={againPhoto} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
