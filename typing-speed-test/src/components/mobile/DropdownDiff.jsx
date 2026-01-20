import React from "react"; 

export default function DropdownDiff({ onSetEasy, onSetMedium, onSetHard, defaultDifficulty, setDefaultDifficulty}) {
  return (
    <>
        <select
          value = {defaultDifficulty}
          className="bg-black border-2 rounded-md w-30 text-amber-50 mt-15"
          onChange={(e) => {
            const dif = e.target.value;
            setDefaultDifficulty(dif);
            if (dif === "easy") onSetEasy?.();
            if (dif === "medium") onSetMedium?.();
            if (dif === "hard") onSetHard?.();
          }}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
    </>
  );
}
