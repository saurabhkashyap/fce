export const interactionsPole3eSrcTypeDefs = `
  type InteractionsPole3eSrc {
    siret: String
    date: String
    pole: String
    unite: String
    type: String
    agent: String
  }
`;

export const interactionsPole3eSrcResolvers = {
  Entreprise: {
    interactions_3E_SRC: (parent, _, { dataSources }) =>
      dataSources.postgre.interactionsPole3eSrc().getInteractionsBySiren(parent.siren)
  },
  Etablissement: {
    interactions_3E_SRC: (parent, _, { dataSources }) =>
      dataSources.postgre.interactionsPole3eSrc().getInteractionsBySiret(parent.siret)
  }
}
