import { SQLDataSource } from "datasource-sql";
import {renameKeys} from "../../utils";

const CACHE_DURATION = 60*60*24;

export default class IdccDataSource extends SQLDataSource {
  async getIdccBySiren(siren) {
    const response = await this.knex("etablissements_idcc")
      .where({ siren })
      .select()
      .cache(CACHE_DURATION);

    return response.map(renameKeys({
      idcc: "code"
    }));
  }

  async getIdccLibelleByCode(code) {
    const response = await this.knex("idcc")
      .where({ code })
      .select()
      .cache(CACHE_DURATION)

    return (response[0] || {}).libelle || "";
  }
}
