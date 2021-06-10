import { SQLDataSource } from "datasource-sql";

const CACHE_DURATION = 60*60*24;

export default class ApprentissageDataSource extends SQLDataSource {
  async getApprentissageBySiren(siren) {
    return this.knex("etablissements_apprentissage")
      .where({ siren })
      .select()
      .cache(CACHE_DURATION);
  }

  async getApprentissageBySiret(siret) {
    return this.knex("etablissements_apprentissage")
      .where({ siret })
      .select()
      .cache(CACHE_DURATION);
  }
}
