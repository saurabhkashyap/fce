import {gql} from "apollo-server-express";
import {resolveRupcoProcedureFromSiret} from "../Rupco/rupcoDatasourceUtils";
import {procedure} from "../Rupco/RupcoDataSource";

export const etablissementTypeDef = gql`
  type Etablissement {
    siret: String
    pse: [Rupco]
    rcc: [Rupco]
    lice: [Rupco]
  }
`;

export const etablissementResolvers = {
  Entreprise: {
    etablissements: (parent, _, { dataSources }) => {
      return dataSources.etablissement.getEtablissementsBySiren(parent.siren)
    }
  },
}
