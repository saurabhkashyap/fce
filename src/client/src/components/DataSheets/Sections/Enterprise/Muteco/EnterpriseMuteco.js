import React from "react";
import PropTypes from "prop-types";
import Value from "../../../../shared/Value";
import _get from "lodash.get";
import Data from "../../SharedComponents/Data";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faUmbrella } from "@fortawesome/fontawesome-pro-solid";
import { CountValueInArray } from "../../../../../helpers/Utils";

const EnterpriseMuteco = ({ enterprise }) => {
  const pseList = {
    inProcess:
      enterprise.liste_pse &&
      enterprise.liste_pse.filter(
        pse => pse.dossier.etat_du_dossier === "en_cours_procedure"
      ),
    validsOrProbates:
      enterprise.liste_pse &&
      enterprise.liste_pse.filter(
        pse =>
          pse.dossier.etat_du_dossier !== "en_cours_procedure" &&
          (pse.dossier.type_de_dossier !== "pse" ||
            pse.dossier.rupture_contrat_debut +
              pse.dossier.rupture_contrat_fin !==
              0)
      )
  };

  return (
    <section id="muteco" className="data-sheet__section">
      <div className="section-header">
        <span className="icon">
          <FontAwesomeIcon icon={faUmbrella} />
        </span>
        <h2 className="title">Mutations Economiques</h2>
      </div>
      <div className="section-datas">
        <Data name="Procédure en cours" value={!!pseList.inProcess} />
        {pseList.inProcess && (
          <Data
            name="Date d'enregistrement"
            value={pseList.inProcess.date_enregistrement}
          />
        )}
        {pseList.validsOrProbates && pseList.validsOrProbates.length && (
          <table className="table mt-2">
            <thead>
              <tr>
                <th>Numéro de dossier</th>
                <th>Date d'enregistrement</th>
                <th>
                  Situation juridique de l'entreprise au moment de la procédure
                </th>
                <th>Date du jugement</th>
                <th>
                  Nombre maximum de ruptures de contrats de travail envisagées
                </th>
                <th>Nombre d'établissements impactés</th>
              </tr>
            </thead>
            <tbody>
              {pseList.validsOrProbates.map((pse, index) => (
                <tr key={`pse-${pse.dossier.numero_de_dossier}-${index}`}>
                  <td className="has-text-centered">
                    <Value value={pse.dossier.numero_de_dossier} />
                  </td>
                  <td className="has-text-centered">
                    <Value value={pse.dossier.date_enregistrement} />
                  </td>
                  <td className="has-text-centered">
                    <Value value={pse.dossier.situation_juridique} />
                  </td>
                  <td className="has-text-centered">
                    <Value value={pse.dossier.date_de_jugement} />
                  </td>
                  <td className="has-text-centered">
                    <Value
                      value={
                        pse.establishments.contrats_ruptures_fin > 0
                          ? CountValueInArray(
                              pse.establishments,
                              "contrats_ruptures_fin"
                            )
                          : CountValueInArray(
                              pse.establishments,
                              "contrats_ruptures_debut"
                            )
                      }
                      nonEmptyValues="0"
                    />
                  </td>
                  <td className="has-text-centered has-text-link">
                    <Value value={pse.establishments.length} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

EnterpriseMuteco.propTypes = {
  enterprise: PropTypes.object.isRequired
};

export default EnterpriseMuteco;
