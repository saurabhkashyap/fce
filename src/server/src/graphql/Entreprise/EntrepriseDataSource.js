import { SQLDataSource } from "datasource-sql";
import {renameEntrepriseKeys} from "./entrepriseUtils";

const CACHE_DURATION = 60*60*24;

export default class EntrepriseDataSource extends SQLDataSource {
  async getEntrepriseBySiren(siren) {
    const result = await this.knex("entreprises")
      .where({ siren })
      .select()
      .cache(CACHE_DURATION);

    return result.map(renameEntrepriseKeys);
  }
}
