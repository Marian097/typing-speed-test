
export default function DropdownMode({onSetTime, onSetNoTime}) {
  return (
    <>
    <select defaultValue = "60" className = "bg-black border-2 rounded-md w-30 text-amber-50 mt-15"
    onChange = {(e) => {
      const dif = e.target.value
      if (dif === "60") onSetTime()
      if (dif === "0") onSetNoTime()
    }}>
      <option value = "60">Time(60s)</option>
      <option value = "0">Passage</option>
    </select>
    </>
  );
}
