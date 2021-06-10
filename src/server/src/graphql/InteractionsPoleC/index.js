export const interactionsPoleCTypeDefs = `
  type InteractionsPoleC {
    siret: String
    date: String
    pole: String
    unite: String
    type: String
    agent: String
    note: String
  }
`;

export const interactionsPoleCResolvers = {
  Entreprise: {
    interactions_C: (parent, _, { dataSources }) =>
      dataSources.interactionsC.getInteractionsBySiren(parent.siren)
  }
}
