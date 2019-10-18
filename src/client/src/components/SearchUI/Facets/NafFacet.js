import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { selectCustomStyles } from "./customStyles";

const NafFacet = ({ onChange, onRemove, values, options, divisionsNaf }) => {
  console.log(values);

  const optionsWithLabels = options
    .map(({ value }) => {
      const division = divisionsNaf.find(division => division.code === value);
      return {
        value: value,
        label: `${value} - ${division && division.libelle}`
      };
    })
    .sort((a, b) => a.value - b.value);

  const activeNafFilter = values[0];

  const selectedOption = optionsWithLabels.find(
    ({ value }) => value === activeNafFilter
  );

  return (
    <Select
      id="naf"
      name="naf"
      options={optionsWithLabels}
      onChange={option =>
        selectedOption ? onRemove(selectedOption.value) : onChange(option.value)
      }
      placeholder="Code NAF ou libellé"
      isClearable
      value={selectedOption}
      styles={selectCustomStyles}
    />
  );
};

NafFacet.propTypes = {
  values: PropTypes.array,
  onRemove: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  divisionsNaf: PropTypes.array.isRequired
};

export default NafFacet;
