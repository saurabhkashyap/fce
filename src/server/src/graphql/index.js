import { ApolloServer, gql } from 'apollo-server-express';
import pg from "../db/postgres";
import RupcoProcedures from "../models/RupcoProcedures";
import RupcoEtablissements from "../models/RupcoEtablissements";

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
  type Query {
    books: [Book]
    entreprise(siren: String): Entreprise
  }
  type PSE {
    date_enregistrement: String
    date_jugement: String
    etat: String
    nombre_de_ruptures: Int
    numero: Int
    situation_juridique: String
    type: String
    etablissements: [PseEtablissement]
  }
  type PseEtablissement {
    siret: String
    nombre_de_ruptures: Int
  }
  type Book { title: String, author: String }
  type Entreprise {
    siren: String
    pse: [PSE]
  }
`;

const resolvers = {
  Query: {
    books() {
      return books
    },
    entreprise(parent, query) {
      const { siren } = query;
      return {
        siren,
        name: siren
      }
    },
  },
  Entreprise: {
    async pse(parent) {
      return new RupcoProcedures().findBySiren(parent.siren, RupcoProcedures.types.PSE);
    }
  },
  PSE: {
    async etablissements(parent) {
      const response = await new RupcoEtablissements().findByNumero(parent.numero);

      return response.map(
        ({ nombre_de_ruptures_de_contrats_en_fin_de_procedure, ...rest}) => ({
        ...rest,
        nombre_de_ruptures: nombre_de_ruptures_de_contrats_en_fin_de_procedure
      }));
    },
  }
};

const fceGraphQL = async (app) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  await server.start();

  server.applyMiddleware({ app });
}

export default fceGraphQL;
