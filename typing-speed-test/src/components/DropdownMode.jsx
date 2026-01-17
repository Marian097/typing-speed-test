import React from 'react'

export default function DropdownMode({ onSetTime,
  onSetNoTime}) {
  return (
    <div>
        <select
        className = "bg-black border-2 rounded-md sm:text-xl sm:mt-10"
        defaultValue = "62s"
        onChange = {(e) => {
            let mode = e.target.value
            if (mode === "62s") onSetTime?.();
            if (mode === "0") onSetNoTime?.();
        }}>
            <option value = "62s">Time(60s)</option>
            <option value = "0">No time</option>
        </select>
    </div>
  )
}
