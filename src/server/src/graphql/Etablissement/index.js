import {gql} from "apollo-server-express";

export const etablissementTypeDef = gql`
  type Etablissement {
    siret: String
    pse: [Rupco]
    rcc: [Rupco]
    lice: [Rupco]
    activitePartielle: [ActivitePartielle]
    apprentissage: [Apprentissage]
    interactions_3E_SEER: [InteractionsPole3eSeer]
    interactions_3E_SRC: [InteractionsPole3eSrc]
    interactions_C: [InteractionsPoleC]
    interactions_T: [InteractionsPoleT]
  }
`;

export const etablissementResolvers = {
  Entreprise: {
    etablissements: (parent, _, { dataSources }) => {
      return dataSources.postgre.etablissements().getEtablissementsBySiren(parent.siren)
    }
  },
}
