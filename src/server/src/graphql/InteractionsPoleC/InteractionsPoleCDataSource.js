import { getFormatedDate } from "../../utils/date";
import { trimValue } from "../../utils/string";
import { map } from "lodash/fp";
import interactionsDataSource from "../Interactions/interactionsDataSource";

const formatResponse = map(
  (interaction) => ({
    siret: interaction.siret,
    pole: "C",
    unite: trimValue(interaction.unite),
    type: null,
    date: getFormatedDate(interaction.date),
    agent: null,
    note: null
  })
);

const interactionsPoleC = interactionsDataSource({
  tableName: "interactions_pole_c",
  formatResponse
});

export default interactionsPoleC;
