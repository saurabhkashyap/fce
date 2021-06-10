import { SQLDataSource } from "datasource-sql";
import { getFormatedDate } from "../../utils/date";
import {trimValue} from "../../utils/string";

const CACHE_DURATION = 60*60*24;

export default class InteractionsPoleTDataSource extends SQLDataSource {
  async getInteractionsBySiren(siren) {
    const response = await this.knex("interactions_pole_t")
      .where({ siren })
      .select()
      .cache(CACHE_DURATION);

    return response.map(
      (interaction) => ({
        siret: interaction.siret,
        pole: "T",
        unite: trimValue(interaction.realise_pour),
        type: trimValue(interaction.type_intervention),
        date: getFormatedDate(interaction.date),
        agent: trimValue(interaction.intervenant),
        note: trimValue(interaction.action_sur)
      })
    )
  }
}
