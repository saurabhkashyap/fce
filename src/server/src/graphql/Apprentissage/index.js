import {gql} from "apollo-server-express";

export const apprentissageTypeDef = gql`
  type Apprentissage {
    type_contrat: Int
    numero_enregistrement: String
    date_debut: String
    date_rupture: String
  }
`;

export const apprentissageResolver = {
  Entreprise: {
    apprentissage(parent, query, { dataSources }) {
      return dataSources.postgre.apprentissage().getApprentissageBySiren(parent.siren);
    }
  },
  Etablissement: {
    apprentissage(parent, query, { dataSources }) {
      return dataSources.postgre.apprentissage().getApprentissageBySiret(parent.siret);
    }
  }
}
