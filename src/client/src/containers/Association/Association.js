import PropTypes from "prop-types";
import React from "react";

import Data from "../../components/DataSheets/Sections/SharedComponents/Data";
import { renderIfSiret } from "../../helpers/hoc/renderIfSiret";
import {
  getNumeroRna,
  isAssociation,
} from "../../utils/association/association";
import { useAssociationData } from "./Association.gql";

const Association = ({ siret }) => {
  const { loading, data, error } = useAssociationData(siret);
  if (error || loading) {
    return null;
  }

  const { association } = data;
  return (
    <>
      <Data name="Association" value={isAssociation(association)} />
      {isAssociation(association) && (
        <Data name="Numéro RNA" value={getNumeroRna(association)} />
      )}
    </>
  );
};

Association.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default renderIfSiret(Association);
