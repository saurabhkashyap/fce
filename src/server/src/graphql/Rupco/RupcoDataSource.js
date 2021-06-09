import { SQLDataSource } from "datasource-sql";
import { flow } from "lodash";
import {filterRupturesByType, renameRuptures} from "./rupcoDatasourceUtils";

const CACHE_DURATION = 60*60*24;

export const procedure = {
  PSE: "PSE",
  LiceC: "LiceC",
  RCC: "RCC"
};

export default class RupcoDataSource extends SQLDataSource {
  async getRupcoEtablissement(numero) {
    const response = await this.knex("rupco_etablissements")
      .select("*")
      .where({ numero })
      .cache(CACHE_DURATION);

    return renameRuptures(response);
  }

  async getRupcoProcedureBySiren(siren, type) {
    const response = await this.knex("rupco_procedures")
      .select("*")
      .where({ siren })
      .cache(CACHE_DURATION)

    return filterRupturesByType(type)(response);
  }

  async getRupcoEtablissementBySiret(siret, type) {
    const response = await this.knex("rupco_etablissements")
      .select("*")
      .where({ siret })
      .cache(CACHE_DURATION)

    return flow(
      filterRupturesByType(type),
      renameRuptures
    )(response);
  }
}
