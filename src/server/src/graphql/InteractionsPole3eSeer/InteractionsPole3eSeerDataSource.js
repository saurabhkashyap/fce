import { map } from "lodash/fp";
import { getFormatedDate } from "../../utils/date";
import { trimValue } from "../../utils/string";
import interactionsDataSource from "../Interactions/interactionsDataSource";

const formatResponse = map((interaction) => ({
  siret: interaction.siret,
  date: getFormatedDate(interaction.date_visite),
  pole: "3E_SEER",
  unite: `Service Entreprise ${
    trimValue(interaction.region)
  }`,
  type: trimValue(interaction.type_suivi),
  agent: trimValue(interaction.inspecteurs),
  filiere: trimValue(interaction.filieres),
  eti_pepite: trimValue(interaction.suivi_eti),
}));

const interactionsPole3eSeer = interactionsDataSource({
  tableName: "interactions_pole_3e",
  formatResponse
})

export default interactionsPole3eSeer;

