import React from "react";
import DropdownDiff from "../components/mobile/DropdownDiff";
import CoutingBar from "./mobile/CoutingBar";
import DropdownMode from "./mobile/DropdownMode";


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
  return (
    <>
      <nav className="w-full flex">
        <div className="md:hidden flex flex-wrap text-lg">
          <CoutingBar
            wpm={wpm}
            accuaracy={accuaracy}
            timeLeft={timeLeft}
            isRunning={isRunning}
            isPassage={isPassage}
          />
          <div className="flex w-screen justify-center pb-5 border-b">
            <DropdownDiff
              onSetEasy={onSetEasy}
              onSetMedium={onSetMedium}
              onSetHard={onSetHard}
            />
            <DropdownMode onSetTime={onSetTime} onSetNoTime={onSetNoTime} />
          </div>
        </div>
        <div className="md:flex hidden md:gap-x-2 md:w-screen justify-between">
          <div>
            <span>
              WPM:<span>{wpm}</span>
            </span>
          </div>
          <div >
            {isRunning === false && isNaN(accuaracy) ? (
              <span>
                Accuaracy:<span>0%</span>
              </span>
            ) : (
              <span>
                Accuaracy:<span>{Math.floor(accuaracy)}%</span>
              </span>
            )}
          </div>
          <div >
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
    </>
  );
}
