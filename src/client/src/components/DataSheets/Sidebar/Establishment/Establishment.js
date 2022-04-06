import "./establishment.scss";

import { faCircle, faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import _get from "lodash.get";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import { isActiveEstablishment } from "../../../../helpers/Establishment";
import { formatSiret } from "../../../../helpers/utils";
import Value from "../../../shared/Value";

const Establishment = ({ establishment }) => {
  const isActive = isActiveEstablishment(establishment);
  const stateClass = isActive ? "icon--success" : "icon--danger";

  const codePostal = _get(establishment, "adresse_composant.code_postal");
  const formatedPostalCode = codePostal ? `${codePostal.slice(0, 2)} - ` : "";

  return (
    <section>
      <div className="establishment__siret">
        <FontAwesomeIcon
          className={classNames("establishment__state-icon", stateClass)}
          icon={isActive ? faCircle : faSquare}
        />
        <Link
          to={`/establishment/${establishment.siret}`}
          className="establishment__siret"
        >
          <Value value={formatSiret(establishment.siret)} empty="" />
        </Link>
      </div>
      <div className="establishment__location">
        <Value value={formatedPostalCode} empty="" />

        <Value
          value={
            establishment.adresse_composant &&
            establishment.adresse_composant.localite
          }
          empty=""
        />
      </div>
    </section>
  );
};

Establishment.propTypes = {
  establishment: PropTypes.object.isRequired,
};

export default Establishment;
