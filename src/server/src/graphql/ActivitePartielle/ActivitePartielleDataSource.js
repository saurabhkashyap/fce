import { formatActivitePartielleData } from "./activitePartielleUtils";
import { map } from "lodash/fp";
import { fetchFromTable } from "../../utils/knex";

const formatResponse = map(formatActivitePartielleData);

const getActivitePartielle = fetchFromTable({
  tableName: "etablissements_activite_partielle",
  formatResponse
});

const activitePartielle = (knex) => ({
  getActivitePartielleBySiret: (siret) => getActivitePartielle(knex)({ siret })
});

export default activitePartielle;
