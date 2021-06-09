import { ApolloServer, gql } from 'apollo-server-express';
import dataSources from "./dataSources";
import {rupcoResolvers, rupcoTypeDef} from "./Rupco";
import {etablissementResolvers, etablissementTypeDef} from "./Etablissement";

// The GraphQL schema in string form
const typeDefs = gql`
  type Query {
    entreprise(siren: String): Entreprise
  }
  type Entreprise {
    siren: String
    pse: [Rupco]
    rcc: [Rupco]
    lice: [Rupco]
    etablissements: [Etablissement]
  }
`;

const resolvers = {
  Query: {
    entreprise(parent, query) {
      const { siren } = query;
      return {
        siren,
        name: siren
      }
    },
  },
};

const fceGraphQL = async (app) => {
  const server = new ApolloServer({
    typeDefs: [typeDefs, rupcoTypeDef, etablissementTypeDef],
    resolvers: [resolvers, rupcoResolvers, etablissementResolvers],
    dataSources
  });

  await server.start();

  server.applyMiddleware({ app });
}

export default fceGraphQL;
