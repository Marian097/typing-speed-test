import React from "react";
import imgComplete from "../assets/images/icon-completed.svg";
import againPhoto from "../assets/images/icon-restart.svg";
import star2 from "../assets/images/pattern-star-2.svg";
import star1 from "../assets/images/pattern-star-1.svg";
import BestScore from "./BestScore";

export default function CompleteTest({
  wpm,
  accuaracy,
  wrongCharacters,
  goodCharacters,
  resetGame,
  bestWpm,
}) {
  return (
    <>
      <main>
        {wpm > bestWpm ? (
          <>
            <BestScore
              wpm={wpm}
              accuaracy={accuaracy}
              wrongCharacters={wrongCharacters}
              goodCharacters={goodCharacters}
              resetGame={resetGame}
              bestWpm={bestWpm}
            />
          </>
        ) : (
          <>
            <div className="absolute top-1/12 left-1/12">
              <img className="w-20 h-20" src={star1} />
            </div>
            <div className="absolute top-10/12 left-10/12">
              <img className="w-20 h-20" src={star2} />
            </div>
            <div className="mt-10 flex mx-auto w-22 h-22 items-center justify-center bg-green-300/30 rounded-full ">
              <div className="flex justify-center items-center bg-green-300/40 w-17 h-17 rounded-full ">
                <img className="w-12 h-12" src={imgComplete} />
              </div>
            </div>
            <div>
              <div className="text-center pb-10">
                <h3 className="font-bold">Test Complete!</h3>
                <p className="text-gray-500/70">
                  Solid run. Keep pushing to beat your hightscore
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="mx-auto border border-gray-500/60 h-20 w-80 rounded-lg">
                <div className="ml-5">
                  <h3 className="text-gray-500/80 font-medium">WPM:</h3>
                  <p className="font-bold">{wpm}</p>
                </div>
              </div>
              <div>
                {accuaracy < 100 ? (
                  <>
                    <div className="mx-auto border border-gray-500/60 h-20 w-80 rounded-lg">
                      <div className="ml-5">
                        {" "}
                        <h3 className="text-gray-500/80 font-medium">
                          Accuaracy
                        </h3>
                        <p className="text-red-800 font-bold">
                          {Math.floor(accuaracy)}%
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mx-auto border border-gray-500/60 h-20 w-80 rounded-lg">
                      <div className="ml-5">
                        <h3 className="text-gray-500/80 font-medium">
                          Accuaracy
                        </h3>
                        <p className="text-green-600 font-bold">
                          {Math.floor(accuaracy)}%
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="mx-auto border border-gray-500/60 h-20 w-80 rounded-lg">
                <div className="ml-5">
                  <h3 className="text-gray-500/80 font-medium">Characters</h3>
                  <div className="font-bold flex">
                    <p className="text-green-600">{goodCharacters}</p>
                    <span className="text-gray-500/80 font-bold">/</span>
                    <p className="text-red-800">{wrongCharacters}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center my-5">
              <button
                className="bg-amber-100 text-black font-bold h-10 w-30 rounded-xl"
                onClick={() => resetGame()}
              >
                <span className="flex items-center justify-center gap-x-2">
                  Go Again{" "}
                  <span>
                    <img src={againPhoto} />
                  </span>
                </span>
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
}
