import React from "react";
import DropdownDiff from "../components/DropdownDiff";

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
    <nav className="w-full h-15 md:h-10">
      <div className="flex justify-between flex-wrap">
        <div className="ml-5">
          <span className = "ml-15">
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
            <>
              <span>
                Time:<span style={{ color: "white" }}>-</span>
              </span>
            </>
          ) : (
            <>
              {isMobile ? (
                <div className = "relative">
                  {" "}
                  <DropdownDiff
                    onSetEasy={onSetEasy}
                    onSetMedium={onSetMedium}
                    onSetHard={onSetHard}
                  />
                </div>
              ) : (
                <div className="flex gap-2">
                  <span>
                    Time:<span style={{ color: "white" }}>{timeLeft}</span>
                  </span>
                  <span className="flex gap-2">
                    Difficulty:
                    <button
                      onClick={() => onSetEasy()}
                      className="btn-dash text-sm"
                    >
                      Easy
                    </button>
                    <button
                      onClick={() => onSetMedium()}
                      className="btn-dash text-sm"
                    >
                      Medium
                    </button>
                    <button
                      onClick={() => onSetHard()}
                      className="btn-dash text-sm"
                    >
                      Hard
                    </button>
                  </span>
                </div>
              )}
            </>
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
  );
}
