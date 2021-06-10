export const interactionsPoleTTypeDefs = `
  type InteractionsPoleT {
    siret: String
    date: String
    pole: String
    unite: String
    type: String
    agent: String
    note: String
  }
`;

export const interactionsPoleTResolvers = {
  Entreprise: {
    interactions_T: (parent, _, { dataSources }) =>
      dataSources.interactionsT.getInteractionsBySiren(parent.siren)
  }
}
