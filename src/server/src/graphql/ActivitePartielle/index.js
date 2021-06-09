import {gql} from "apollo-server-express";

export const activitePartielleTypeDef = gql`
  type ActivitePartielle {
    date: String
    nbHeuresAutorisees: Float
    nbHeuresConsommees: Float
    siret: String
    motif: String
    nbAvenants: Int
    numConvention: String
  }
`

export const activitePartielleResolvers = {
  Etablissement: {
    activitePartielle: (parent, _, { dataSources }) =>
      dataSources.activitePartielle.getActivitePartielleBySiret(parent.siret)
  }
}
