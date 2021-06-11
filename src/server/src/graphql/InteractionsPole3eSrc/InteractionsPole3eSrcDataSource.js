import { getFormatedDate } from "../../utils/date";
import { trimValue } from "../../utils/string";
import { map } from "lodash/fp";
import interactionsDataSource from "../Interactions/interactionsDataSource";

const formatResponse = map(
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
);

const interactionsPole3eSrc = interactionsDataSource({
  tableName: "interactions_pole_3e_src",
  formatResponse
});

export default interactionsPole3eSrc;
