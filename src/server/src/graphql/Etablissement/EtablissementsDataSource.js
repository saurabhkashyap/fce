import { SQLDataSource } from "datasource-sql";

const CACHE_DURATION = 60*60*24;

export default class EtablissementsDataSource extends SQLDataSource {
  async getEtablissementsBySiren(siren) {
    return this.knex("etablissements")
      .where({ siren })
      .select()
      .cache(CACHE_DURATION)
  }
}
