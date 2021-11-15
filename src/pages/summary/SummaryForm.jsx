import React from "react";
import { useState } from "react";
import "./styles.scss";

const SummaryForm = () => {
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const handleToggleIsBtnDisabled = () => {
    setIsBtnDisabled((prevState) => {
      return !prevState;
    });
  };

  const handleBtnClick = () => {};

  return (
    <div className="summary-form">
      <div className="checkbox-container">
        <input
          onClick={handleToggleIsBtnDisabled}
          type="checkbox"
          id="termsCheckbox"
        />
        <label htmlFor="termsCheckbox">
          I agree to the terms and conditions
        </label>
      </div>
      <button onClick={handleBtnClick} disabled={isBtnDisabled}>
        Confirm order
      </button>
    </div>
  );
};

export default SummaryForm;
