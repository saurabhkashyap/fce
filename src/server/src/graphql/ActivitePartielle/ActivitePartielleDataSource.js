import { SQLDataSource } from "datasource-sql";
import {formatActivitePartielleData} from "./activitePartielleUtils";

const CACHE_DURATION = 60*60*24;

export default class ActivitePartielleDataSource extends SQLDataSource {
  async getActivitePartielleBySiret(siret) {
    const data = await this.knex("etablissements_activite_partielle")
      .where({ siret })
      .select("*")
      .cache(CACHE_DURATION)

    return data.map(formatActivitePartielleData);
  }
}
