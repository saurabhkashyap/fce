import { SQLDataSource } from "datasource-sql";
import { getFormatedDate } from "../../utils/date";
import {trimValue} from "../../utils/string";

const CACHE_DURATION = 60*60*24;

export default class InteractionsPole3eSrcDataSource extends SQLDataSource {
  async getInteractionsBySiren(siren) {
    const response = await this.knex("interactions_pole_3e_src")
      .where({ siren })
      .select()
      .cache(CACHE_DURATION);

    return response.map(
      (interaction) => ({
        siret: interaction.siret,
        date: getFormatedDate(interaction.date),
        pole: "3E_SRC",
        unite: `SRC ${
          trimValue(interaction.libelle_region)
        }`,
        type: trimValue(interaction.type_controle),
        agent: null,
      })
    )
  }
}
