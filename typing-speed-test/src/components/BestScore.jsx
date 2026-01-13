import React from 'react'
import againPhoto from "../assets/images/icon-restart.svg";
import confetti from "../assets/images/pattern-confetti.svg"
import newBs from "../assets/images/icon-new-pb.svg"

export default function BestScore({wpm, accuaracy, wrongCharacters, goodCharacters, resetGame}) {
  return (
    <>
    <main className="hero-main">
          <div className="img-completed">
            <div className="shadow-1">
              <img src={newBs} />
            </div>
          </div>
          <div className="annoucement-container">
            <h2>Hight Score Smashed!</h2>
            <p>You're getting faster. That was incredible typing</p>
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
                <span className = "good-ch">{goodCharacters}</span>/<span className = "wrong-ch">{wrongCharacters}</span>
              </div>
              <div className="bt-container">
                <button className="bt-again" onClick = {() => resetGame()}>
                  Beat this score
                  <img src={againPhoto} />
                </button>
              </div>
            </div>
          </section>
        </main>
         <footer className ="patt-confetti">
            <img src = {confetti}/>
          </footer>
    </>
  )
}
