import { renameEntrepriseKeys } from "./entrepriseUtils";
import { fetchFromTable } from "../../utils/knex";
import { map } from "lodash/fp";

const formatResponse = map(renameEntrepriseKeys);

const getEntreprise = fetchFromTable({
  tableName: "entreprises",
  formatResponse
})

const entreprise = (knex) => ({
  getEntrepriseBySiren: (siren) => getEntreprise(knex)({ siren }),
})

export default entreprise;
