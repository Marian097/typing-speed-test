import React from "react";
import Icon from "../../assets/images/download.svg";
import NewPb from "../../assets/images/icon-new-pb.svg";
import confetti from "../../assets/images/pattern-confetti.svg";

export default function NewBest({
  wpm,
  accuaracy,
  wrongCharacters,
  goodCharacters,
  resetGame,
}) {
  return (
    <>
      <div className="flex justify-center">
        <img src={NewPb} />
      </div>
      <div>
        <div className="text-center pb-10">
          <h3 className="font-bold">Hight Score Smashed!</h3>
          <p className="text-gray-500/70">
            You're getting faster. That was incredible typing.
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
                  <h3 className="text-gray-500/80 font-medium">Accuaracy</h3>
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
                  <h3 className="text-gray-500/80 font-medium">Accuaracy</h3>
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
              <img src={Icon} />
            </span>
          </span>
        </button>
      </div>
      <footer>
        <div>
          <img src={confetti} />
        </div>
      </footer>
    </>
  );
}
