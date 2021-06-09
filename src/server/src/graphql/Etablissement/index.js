import {gql} from "apollo-server-express";

export const etablissementTypeDef = gql`
  type Etablissement {
    siret: String
    pse: [Rupco]
    rcc: [Rupco]
    lice: [Rupco]
    activitePartielle: [ActivitePartielle]
  }
`;

export const etablissementResolvers = {
  Entreprise: {
    etablissements: (parent, _, { dataSources }) => {
      return dataSources.etablissement.getEtablissementsBySiren(parent.siren)
    }
  },
}
