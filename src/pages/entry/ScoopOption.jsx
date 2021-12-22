import { useState } from "react";

export default function ScoopOption({ name, imagePath, updateItemCount }) {
  const [itemCount, setItemCount] = useState("0");
  const handleChange = (e) => {
    const { value } = e.target;
    setItemCount(value);

    updateItemCount({ itemName: name, newItemCount: value });
  };
  const scoopCountAsInteger = Number(itemCount);
  const isValidScoopNumber =
    Number.isInteger(scoopCountAsInteger) &&
    scoopCountAsInteger >= 0 &&
    scoopCountAsInteger <= 10;
  return (
    <>
      <div className="option-container">
        <img src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`} />
        <div className="scoop-input-container">
          <label htmlFor={`${name}Scoop`}>{name}</label>
          <input
            role="spinbutton"
            type="number"
            aria-label={name}
            aria-invalid={!isValidScoopNumber}
            min="0"
            max="10"
            value={itemCount}
            id={`${name}Scoop`}
            onChange={handleChange}
            className={isValidScoopNumber ? "" : "input-error"}
          ></input>
        </div>
      </div>
    </>
  );
}
