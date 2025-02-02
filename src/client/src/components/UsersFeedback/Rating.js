import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { SET_RATE } from "../../containers/UsersFeedback/actionTypes";
import { range } from "../../helpers/utils/utils";

const Rating = ({ min, max, rate = null, handleChange }) => {
  return (
    <div className="user-feedback__rating">
      <p>Recommanderiez-vous ce site à un(e) collègue ?</p>
      <div className="user-feedback__rates">
        {range(min, max).map((number, index) => (
          <label className="user-feedback__rate" key={`rating${number}`}>
            <input
              className="user-feedback__rate-radio"
              type="radio"
              name="rate"
              value={`${number}`}
              checked={parseInt(rate) === number}
              onChange={handleChange(SET_RATE)}
            />
            <span
              className={classNames("user-feedback__rate-span", {
                [`user-feedback__rate-span--${index}`]:
                  !rate || rate === `${index}`,
              })}
            >
              <strong>{number}</strong>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

Rating.propTypes = {
  handleChange: PropTypes.func.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  rate: PropTypes.string,
};

export default Rating;
