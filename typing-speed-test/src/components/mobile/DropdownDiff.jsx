
export default function DropdownDiff({ onSetEasy, onSetMedium, onSetHard }) {
  return (
    <>
    <select defaultValue = "easy" className = "bg-black border-2 rounded-md w-30 text-amber-50 mt-15"
    onChange = {(e) => {
      const dif = e.target.value
      if (dif === "easy") onSetEasy()
      if (dif === "medium") onSetMedium()
      if (dif === "hard") onSetHard()
    }}>
      <option value = "easy">Easy</option>
      <option value = "medium">Medium</option>
      <option value = "hard">Hard</option>
    </select>
    
    </>
  );
}
