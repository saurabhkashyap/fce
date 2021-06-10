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
      dataSources.interactions3eSrc.getInteractionsBySiren(parent.siren)
  }
}
