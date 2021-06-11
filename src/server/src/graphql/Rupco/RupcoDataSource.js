import { flow } from "lodash";
import {filterRupturesByType, renameRuptures} from "./rupcoDatasourceUtils";
import {fetchFromTable} from "../../utils/knex";

export const procedure = {
  PSE: "PSE",
  LiceC: "LiceC",
  RCC: "RCC"
};

const getRupcoEtablissement = fetchFromTable({
  tableName: "rupco_etablissements",
  formatResponse: renameRuptures
});

const getRupcoProcedure = (type) => fetchFromTable({
  tableName: "rupco_procedures",
  formatResponse: filterRupturesByType(type)
});

const getRupcoEtablissementWithFilter = (type) => fetchFromTable({
  tableName: "rupco_etablissements",
  formatResponse: flow(
    filterRupturesByType(type),
    renameRuptures
  )
});

const rupco = (knex) => {
  return {
    getRupcoEtablissement: (numero) => getRupcoEtablissement(knex)({ numero }),
    getRupcoProcedureBySiren: (siren, type) => getRupcoProcedure(type)(knex)({ siren }),
    getRupcoEtablissementBySiret: (siret,type) => getRupcoEtablissementWithFilter(type)(knex)({ siret })
  }
}

export default rupco;
