import React from "react";
import "../assets/css/input.css";

const InputText = React.forwardRef(({ startTime, disabled, value, onChange}, ref) => {
  return (
    <div className="inputContainer">
      <input
        id="hiddenInput"
        ref={ref}
        onKeyDown={startTime}
        disabled = {disabled}
        value = {value}
        onChange = {onChange}        
      />
    </div>
  );
});

export default InputText;
