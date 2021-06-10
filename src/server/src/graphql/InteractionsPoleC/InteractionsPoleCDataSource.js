import { SQLDataSource } from "datasource-sql";
import { getFormatedDate } from "../../utils/date";
import {trimValue} from "../../utils/string";

const CACHE_DURATION = 60*60*24;

export default class InteractionsPoleTDataSource extends SQLDataSource {
  async getInteractionsBySiren(siren) {
    const response = await this.knex("interactions_pole_c")
      .where({ siren })
      .select()
      .cache(CACHE_DURATION);

    return response.map(
      (interaction) => ({
        siret: interaction.siret,
        pole: "C",
        unite: trimValue(interaction.unite),
        type: null,
        date: getFormatedDate(interaction.date),
        agent: null,
        note: null
      })
    )
  }
}
