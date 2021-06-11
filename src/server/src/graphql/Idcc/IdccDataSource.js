import { SQLDataSource } from "datasource-sql";
import {renameKeys} from "../../utils";
import {fetchFromTable} from "../../utils/knex";
import { map } from "lodash/fp";

const CACHE_DURATION = 60*60*24;

const formatEtablissementsIdcc = map(renameKeys({
  idcc: "code"
}));

const getEtablissementsIdcc = fetchFromTable({
  tableName: "etablissements_idcc",
  formatResponse: formatEtablissementsIdcc
});

const getIdcc =  fetchFromTable({
  tableName: "idcc",
  formatResponse: (response) => (response[0] || {}).libelle || ""
});

const idcc = (knex) => ({
  getIdccBySiren: (siren) => getEtablissementsIdcc(knex)({ siren }),
  getIdccLibelleByCode: (code) => getIdcc(knex)({ code }),
})

export default idcc;
