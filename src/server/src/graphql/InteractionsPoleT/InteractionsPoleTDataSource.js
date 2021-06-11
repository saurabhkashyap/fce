import { getFormatedDate } from "../../utils/date";
import { trimValue } from "../../utils/string";
import { map } from "lodash/fp";
import interactionsDataSource from "../Interactions/interactionsDataSource";

const formatResponse = map(
  (interaction) => ({
    siret: interaction.siret,
    pole: "T",
    unite: trimValue(interaction.realise_pour),
    type: trimValue(interaction.type_intervention),
    date: getFormatedDate(interaction.date),
    agent: trimValue(interaction.intervenant),
    note: trimValue(interaction.action_sur)
  })
);

const interactionsPoleT = interactionsDataSource({
  tableName: "interactions_pole_t",
  formatResponse
});

export default interactionsPoleT;
