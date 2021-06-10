import {SQLDataSource} from "datasource-sql";

const CACHE_DURATION = 60*60*24;

export default class CategorieJuridiqueDataSource extends SQLDataSource {
  async getCategorieByCode(code) {
    const result = await this.knex("categorie_juridique")
      .where({ code })
      .select()
      .cache(CACHE_DURATION);

    return result[0] || null;
  }
}
