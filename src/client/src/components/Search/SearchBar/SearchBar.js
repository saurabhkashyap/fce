import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";

const SearchBar = ({ label, searchTerm, setSearchTerm }) => {
  return (
    <div className="control is-expanded">
      <label htmlFor="term" className="label">
        {label}
      </label>
      <div className="search-form__search">
        <div className="search-form__search-bar">
          <input
            type="text"
            name="q"
            id="term"
            className="input is-medium"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            value={searchTerm}
          />
          {searchTerm.length > 0 && (
            <button
              type="button"
              className="button is-text"
              onClick={() => {
                setSearchTerm("");
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  label: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default SearchBar;
