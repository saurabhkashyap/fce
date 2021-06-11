import { fetchFromTable } from "../../utils/knex";

const interactionsDataSource = ({ tableName, formatResponse }) => {
  const getInteractions = fetchFromTable({
    tableName,
    formatResponse
  });

  return (knex) => {
    const getKnexInteractions = getInteractions(knex);
    return {
      getInteractionsBySiren: (siren) => getKnexInteractions({ siren }),
      getInteractionsBySiret: (siret) => getKnexInteractions({ siret })
    };
  }
}

export default interactionsDataSource;
