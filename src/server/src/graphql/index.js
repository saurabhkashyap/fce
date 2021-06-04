import { ApolloServer, gql } from 'apollo-server-express';

const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// The GraphQL schema in string form
const typeDefs = gql`
  type Query { books: [Book] }
  type Book { title: String, author: String }
`;

const resolvers = {
  Query: { books: () => books },
};

const fceGraphQL = async (app) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  try {
    await server.start();
  } catch (err) {
    console.error("Error starting gql server");
    console.error(err);
  }

  server.applyMiddleware({ app });
}

export default fceGraphQL;
