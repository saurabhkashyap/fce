import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { selectCustomStyles } from "./customStyles";

const EffectifFilter = ({
  filters,
  addFilter,
  removeFilter,
  trancheEffectif,
  id
}) => {
  const options = trancheEffectif.map(({ code, libelle }) => ({
    value: code,
    label: `${libelle}`
  }));

  return (
    <div>
      <label htmlFor={id} className="label">
        Tranche effectif (DSN)
      </label>
      <Select
        id={id}
        name={id}
        isMulti
        options={options}
        value={filters.effectif}
        onChange={effectif => {
          effectif ? addFilter(id, effectif) : removeFilter(id);
        }}
        isClearable
        placeholder=""
        styles={selectCustomStyles}
      />
    </div>
  );
};

EffectifFilter.propTypes = {
  filters: PropTypes.object,
  addFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  trancheEffectif: PropTypes.array.isRequired
};

export default EffectifFilter;
