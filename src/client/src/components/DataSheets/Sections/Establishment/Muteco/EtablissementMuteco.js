import { faUmbrella } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";

import { formatNumber } from "../../../../../helpers/utils";
import {
  getCumulatedValuesForEstablishment,
  getLatestConventionIteration,
} from "../../../../../utils/activite-partielle/activite-partielle";
import { getSirenFromSiret } from "../../../../../utils/establishment/establishment";
import {
  filterLice,
  filterPse,
  filterRcc,
} from "../../../../../utils/rupco/rupco";
import Value from "../../../../shared/Value";
import Data from "../../SharedComponents/Data";
import Subcategory from "../../SharedComponents/Subcategory";
import Table from "../../SharedComponents/Table";
import { useMutecoData } from "./EtablissementMuteco.gql";
import Lice from "./Lice";
import Pse from "./Pse";
import Rcc from "./Rcc";

const EtablissementMuteco = ({ siret }) => {
  const { data, loading, error } = useMutecoData(siret);

  if (loading || error) {
    return null;
  }

  const siren = getSirenFromSiret(siret);

  const activitePartielle = data.etablissements_activite_partielle;
  const hasActivitePartielle = activitePartielle.length > 0;

  const displayedActivitePartielle =
    getLatestConventionIteration(activitePartielle);

  const totalActivitePartielle =
    getCumulatedValuesForEstablishment(activitePartielle);

  const rupco = data.rupco_etablissements;

  const lice = filterLice(rupco);
  const pse = filterPse(rupco);
  const rcc = filterRcc(rupco);

  const otherRupco = data.otherRupco;

  return (
    <section id="muteco" className="data-sheet__section">
      <div className="section-header">
        <span className="icon">
          <FontAwesomeIcon icon={faUmbrella} />
        </span>
        <h2 className="title">Mutations Économiques</h2>
      </div>
      <div className="section-datas">
        <Subcategory subtitle="Activité partielle" sourceSi="APART">
          <Data
            name="Recours sur les 24 derniers mois"
            value={hasActivitePartielle}
            columnClasses={["is-8", "is-4"]}
          />
          {hasActivitePartielle && (
            <Table isBordered>
              <thead>
                <tr>
                  <th className="th">Numéro de convention</th>
                  <th className="th">Nombre d{"'"}avenants</th>
                  <th className="th">Date de décision (convention initiale)</th>
                  <th className="th">Nombre total d{"'"}heures autorisées</th>
                  <th className="th">Nombre total d{"'"}heures consommées</th>
                  <th className="th">Motif</th>
                </tr>
              </thead>
              <tbody>
                {displayedActivitePartielle.map(
                  ({
                    num_convention,
                    num_avenant,
                    date_decision,
                    nb_h_auto_cum,
                    nb_h_conso_cum,
                    cause,
                  }) => (
                    <tr key={num_convention}>
                      <td>{num_convention}</td>
                      <td>{num_avenant + 1}</td>
                      <td>{<Value value={date_decision} />}</td>
                      <td className="has-text-right">
                        {formatNumber(Math.round(nb_h_auto_cum))}
                      </td>
                      <td className="has-text-right">
                        {formatNumber(Math.round(nb_h_conso_cum))}
                      </td>
                      <td>{cause}</td>
                    </tr>
                  )
                )}
              </tbody>

              {totalActivitePartielle && (
                <tfoot>
                  <tr>
                    <th colSpan="3" className="has-text-right">
                      Total{" "}
                    </th>
                    <td className="has-text-right">
                      {formatNumber(
                        Math.round(totalActivitePartielle.nb_h_auto_cum)
                      )}
                    </td>
                    <td className="has-text-right">
                      {formatNumber(
                        Math.round(totalActivitePartielle.nb_h_conso_cum)
                      )}
                    </td>
                    <td />
                  </tr>
                </tfoot>
              )}
            </Table>
          )}
        </Subcategory>

        <Pse pseList={pse} siren={siren} otherRucpo={otherRupco} />
        <Lice liceList={lice} siren={siren} otherRupco={otherRupco} />
        <Rcc rccList={rcc} siren={siren} otherRupco={otherRupco} />
      </div>
    </section>
  );
};

EtablissementMuteco.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default EtablissementMuteco;
