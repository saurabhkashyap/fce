import { fetchFromTable } from "../../utils/knex";

const getApprentissage = fetchFromTable({
  tableName: "etablissements_apprentissage"
});

const apprentissage = (knex) => {
  const getApprentissageFromKnex = getApprentissage(knex);

  return {
    getApprentissageBySiren: (siren) => getApprentissageFromKnex({ siren }),
    getApprentissageBySiret: (siret) => getApprentissageFromKnex({ siret })
  }
}

export default apprentissage;
