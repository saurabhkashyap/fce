import {gql} from "apollo-server-express";

export const idccTypeDef = gql`
  type Idcc {
    code: String
    libelle: String
  }
`;

export const idccResolvers = {
  Entreprise: {
    idcc: (parent, _, { dataSources }) => {
      return dataSources.idcc.getIdccBySiren(parent.siren)
    }
  },
  Idcc: {
    libelle: (parent, _, { dataSources }) => {
      return dataSources.idcc.getIdccLibelleByCode(parent.code)
    }
  }
}
