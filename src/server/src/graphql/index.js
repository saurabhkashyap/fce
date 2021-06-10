import { ApolloServer } from 'apollo-server-express';
import dataSources from "./dataSources";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const fceGraphQL = async (app) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources
  });

  await server.start();

  server.applyMiddleware({ app });
}

export default fceGraphQL;
