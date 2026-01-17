import React from "react";
import DropdownDiff from "./DropdownDiff";
import CoutingBar from "./CoutingBar";
import DropdownMode from "./DropdownMode";

export default function Dashboard({
  wpm,
  timeLeft,
  accuaracy,
  onSetTime,
  onSetNoTime,
  onSetEasy,
  onSetMedium,
  onSetHard,
  disabled,
  isRunning,
  isPassage,
}) {
  const isMobile = window.innerWidth < 768;
  return (
    <>
      {isMobile ? (
        <div>
          <CoutingBar
            wpm={wpm}
            timeLeft={timeLeft}
            accuaracy={accuaracy}
            isRunning={isRunning}
            isPassage={isPassage}
          />
          <div className = "flex mt-7 justify-center gap-x-2 pb-10">
            <DropdownMode onSetTime = {onSetTime} onSetNoTime = {onSetNoTime}/>
            <DropdownDiff onSetEasy = {onSetEasy} onSetMedium ={onSetMedium} onSetHard = {onSetHard}/>
          </div>
        </div>
      ) : (
        <nav className="w-full md:h-10">
          <div className="flex justify-between flex-wrap">
            <div className="">
              <span className="ml-15">
                WPM:<span className="">{wpm}</span>
              </span>
            </div>
            <div className="">
              {isRunning === false && isNaN(accuaracy) ? (
                <span>
                  Accuaracy:<span className="">0%</span>
                </span>
              ) : (
                <span>
                  Accuaracy:<span className="">{Math.floor(accuaracy)}%</span>
                </span>
              )}
            </div>
            <div className="">
              {isPassage === true ? (
                <div className="flex gap-x-4">
                  <span>
                    Time:<span style={{ color: "white" }}>-</span>
                  </span>
                  <span>Difficulty:</span>
                  <div>
                    <button
                      onClick={() => onSetEasy()}
                      className="btn-dash text-sm"
                    >
                      Easy
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => onSetMedium()}
                      className="btn-dash text-sm"
                    >
                      Medium
                    </button>
                  </div>
                  <div>
                    {" "}
                    <button
                      onClick={() => onSetHard()}
                      className="btn-dash text-sm"
                    >
                      Hard
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-x-4">
                  <div>
                    <span>
                      Time:<span style={{ color: "white" }}>{timeLeft}</span>
                    </span>
                  </div>
                  <span>Difficulty:</span>
                  <div>
                    <button
                      onClick={() => onSetEasy()}
                      className="btn-dash text-sm"
                    >
                      Easy
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => onSetMedium()}
                      className="btn-dash text-sm"
                    >
                      Medium
                    </button>
                  </div>
                  <div>
                    {" "}
                    <button
                      onClick={() => onSetHard()}
                      className="btn-dash text-sm"
                    >
                      Hard
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-x-2 mr-5">
              <span>Mode:</span>{" "}
              <button onClick={() => onSetTime()} className="btn-dash">
                <span className="text-sm">Timed(60s)</span>
              </button>
              <button
                onClick={() => onSetNoTime()}
                disabled={disabled}
                className="btn-dash text-sm"
              >
                <span>Passage</span>
              </button>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
