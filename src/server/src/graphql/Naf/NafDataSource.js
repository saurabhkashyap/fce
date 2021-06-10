import { SQLDataSource } from "datasource-sql";

const CACHE_DURATION = 60*60*24;

export default class NafDataSource extends SQLDataSource {
  async getNafLibelleByCode(code) {
    const response = await this.knex("naf")
      .where({ code })
      .select()
      .cache(CACHE_DURATION);
    return (response[0] || {}).libelle;
  }
}
