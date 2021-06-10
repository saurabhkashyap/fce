import { SQLDataSource } from "datasource-sql";
import { getFormatedDate } from "../../utils/date";

const CACHE_DURATION = 60*60*24;

const trimValue = (value) => value && value.trim();

export default class InteractionsPole3eSeerDataSource extends SQLDataSource {
  async getInteractionsBySiren(siren) {
    const response = await this.knex("interactions_pole_3e")
      .where({ siren })
      .select()
      .cache(CACHE_DURATION);

    return response.map(
      (interaction) => ({
        date: getFormatedDate(interaction.date_visite),
        pole: "3E_SEER",
        unite: `Service Entreprise ${
          trimValue(interaction.region)
        }`,
        type: trimValue(interaction.type_suivi),
        agent: trimValue(interaction.inspecteurs),
        filiere: trimValue(interaction.filieres),
        eti_pepite: trimValue(interaction.suivi_eti),
      })
    )
  }
}
