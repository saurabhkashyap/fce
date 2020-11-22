import React from "react";
import PropTypes from "prop-types";
import ClassNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/pro-solid-svg-icons";

import Button from "../../../shared/Button";

export const StepForm = ({
  inputLabel = "",
  inputValue,
  onChange,
  buttonText = "Me connecter",
  errorMessage = "",
  showMailingListSignup,
  isCheckedSubscription,
  setIsCheckedSubscription,
  hasError = false,
  loading = false,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit}>
      {hasError && (
        <div className="login__notif login__notif--error shake-horizontal">
          <FontAwesomeIcon icon={faExclamationTriangle} />
          <p>{errorMessage}</p>
        </div>
      )}
      {showMailingListSignup && (
        <div className="login__mailing-list">
          <input
            id="mailing-list"
            name="mailing-list"
            type="checkbox"
            checked={isCheckedSubscription}
            onChange={() => setIsCheckedSubscription(!isCheckedSubscription)}
          />
          <label htmlFor="mailing-list">
            <strong>Je souhaite recevoir des informations par email.</strong>
          </label>
          {isCheckedSubscription && (
            <div>
              Dès votre connexion votre adresse email sera ajoutée à notre liste
              de contacts. Un email de confirmation vous sera envoyé.
            </div>
          )}
        </div>
      )}
      <div className="field">
        <label htmlFor={inputLabel} className="label">
          {inputLabel}
        </label>
        <div className="control">
          <input
            id={inputLabel}
            type={inputLabel}
            name={inputLabel}
            className="input"
            required
            value={inputValue}
            onChange={e => onChange(e.target.value)}
          />
        </div>
      </div>
      <Button
        value={buttonText}
        buttonClasses={ClassNames("login__button", "is-secondary", {
          "is-loading": loading
        })}
      />
    </form>
  );
};

StepForm.propTypes = {
  inputLabel: PropTypes.string,
  inputValue: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  showMailingListSignup: PropTypes.bool.isRequired,
  isCheckedSubscription: PropTypes.bool.isRequired,
  setIsCheckedSubscription: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default StepForm;
