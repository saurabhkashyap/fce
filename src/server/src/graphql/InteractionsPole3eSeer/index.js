export const interactionsPole3eSeerTypeDefs = `
  type InteractionsPole3eSeer {
    date: String
    pole: String
    unite: String
    type: String
    agent: String
    filiere: String
    eti_pepite: String
  }
`;

export const interactionsPole3eSeerResolvers = {
  Entreprise: {
    interactions_3E_SEER: (parent, _, { dataSources }) =>
      dataSources.interactiions3eSeer.getInteractionsBySiren(parent.siren)
  }
}
