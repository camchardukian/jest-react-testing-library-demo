import React from "react";
import { useState } from "react";
import {
  CONFIRM_ORDER,
  AGREE_TO_TERMS,
  TERMS_AND_CONDITIONS,
} from "../../utils/constants";
import "./styles.scss";

const SummaryForm = () => {
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const handleToggleIsBtnDisabled = () => {
    setIsBtnDisabled((prevState) => {
      return !prevState;
    });
  };

  const handleBtnClick = () => {};

  const handleOnMouseEnter = () => {
    setIsTermsOpen(true);
  };

  const handleOnMouseLeave = () => {
    setIsTermsOpen(false);
  };

  return (
    <div className="summary-form">
      <button onClick={handleBtnClick} disabled={isBtnDisabled}>
        {CONFIRM_ORDER}
      </button>
      <div className="checkbox-container">
        <input
          onClick={handleToggleIsBtnDisabled}
          type="checkbox"
          id="termsCheckbox"
        />
        <label htmlFor="termsCheckbox">
          <div
            className="terms-and-conditions"
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          >
            {AGREE_TO_TERMS}
            {isTermsOpen && (
              <div className="terms-info">{TERMS_AND_CONDITIONS}</div>
            )}
          </div>
        </label>
      </div>
    </div>
  );
};

export default SummaryForm;
