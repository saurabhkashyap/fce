import { fetchFromTable } from "../../utils/knex";

const getEtablissements = fetchFromTable({
  tableName: "etablissements",
})

const etablissements = (knex) => ({
  getEtablissementsBySiren: (siren) => getEtablissements(knex)({ siren })
});

export default etablissements;
