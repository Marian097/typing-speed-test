import React from "react";
import "../assets/css/input.css";

const InputText = React.forwardRef(({ startTime, disabled }, ref) => {
  return (
    <div className="inputContainer">
      <input
        id="hiddenInput"
        ref={ref}
        onKeyDown={startTime}
        disabled = {disabled}
      />
    </div>
  );
});

export default InputText;
