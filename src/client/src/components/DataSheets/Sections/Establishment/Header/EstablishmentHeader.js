import React from "react";
import PropTypes from "prop-types";
import Value from "../../../../shared/Value";
import Dashboard from "../Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faCircle } from "@fortawesome/pro-solid-svg-icons";
import { getEnterpriseName } from "../../../../../helpers/Enterprise";
import { isActiveEstablishment } from "../../../../../helpers/Establishment";
import { formatAddress } from "../../../../../helpers/Address";
import InfoBox from "../../../../shared/InfoBox";

const EstablishmentHeader = ({
  enterprise,
  establishment,
  establishment: { adresse_composant }
}) => {
  const address = adresse_composant && formatAddress(adresse_composant);

  const isActive = isActiveEstablishment(establishment);
  const stateClass = isActive ? "icon--success" : "icon--danger";

  return (
    <section id="header" className="data-sheet-header">
      <h1 className="is-capitalized has-text-weight-bold is-size-3 data-sheet-header__title">
        <Value value={getEnterpriseName(enterprise) || null} empty=" " />
      </h1>
      <div className="columns">
        <div className="column">
          <InfoBox
            value={establishment.categorie_etablissement}
            infoBoxClasses={[
              "has-text-weight-bold",
              "has-text-roboto",
              "is-size-6"
            ]}
          />
        </div>
      </div>
      <div className="columns is-vcentered">
        <div className="column is-4">
          <span className="is-size-6 has-text-roboto has-text-weight-semibold has-text-grey-dark">
            SIRET :{" "}
          </span>
          <span className="is-size-6 has-text-roboto has-text-weight-semibold has-text-grey-dark">
            <Value value={establishment.siret} empty="" />
          </span>
        </div>
        <div className="column is-8">
          <span className="is-size-6 has-text-segoe has-text-grey-dark">
            <Value value={address} empty="" />
          </span>
        </div>
      </div>
      <div className="columns">
        <div className="column is-4">
          <div className="data-sheet-header__status">
            <div>
              <FontAwesomeIcon
                icon={isActive ? faCircle : faSquare}
                className={`data-sheet-header__status-icon ${stateClass}`}
              />
            </div>
            <div className="is-size-6 has-text-segoe has-text-grey-dark">
              {isActive ? (
                <span>
                  Ouvert depuis le{" "}
                  <Value value={establishment.date_creation} empty="" />
                </span>
              ) : (
                <div>
                  <div>
                    Fermé depuis le{" "}
                    <Value
                      value={
                        establishment.date_fin ||
                        establishment.date_dernier_traitement_etablissement
                      }
                      empty=""
                    />
                  </div>
                  <div>
                    Date de création:{" "}
                    <Value value={establishment.date_creation} empty="" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="column is-8">
          <span className="is-size-6 has-text-segoe has-text-weight-semibold has-text-grey-dark">
            <Value value={establishment.naf} empty="-" />{" "}
            <Value
              value={
                establishment.libelle_naf &&
                establishment.libelle_naf.toLowerCase()
              }
              empty=""
            />
          </span>
        </div>
      </div>
      <Dashboard establishment={establishment} />
    </section>
  );
};

EstablishmentHeader.propTypes = {
  enterprise: PropTypes.object.isRequired,
  establishment: PropTypes.object.isRequired,
  adresse_composant: PropTypes.object
};

export default EstablishmentHeader;
