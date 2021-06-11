import {gql} from "apollo-server-express";
import {resolveRupcoProcedureFromSiren, resolveRupcoProcedureFromSiret} from "./rupcoDatasourceUtils";
import {procedure} from "./RupcoDataSource";

export const rupcoTypeDef = gql`
  type Rupco {
    date_enregistrement: String
    date_jugement: String
    etat: String
    nombre_de_ruptures: Int
    numero: Int
    situation_juridique: String
    type: String
    etablissements: [RupcoEtablissement]
  }
  type RupcoEtablissement {
    siret: String
    nombre_de_ruptures: Int
  }
`;

export const rupcoResolvers = {
  Rupco: {
    async etablissements(parent, _, { dataSources }) {
      return await dataSources.postgre.rupco().getRupcoEtablissement(parent.numero);
    },
  },
  Entreprise: {
    pse: resolveRupcoProcedureFromSiren(procedure.PSE),
    rcc: resolveRupcoProcedureFromSiren(procedure.RCC),
    lice: resolveRupcoProcedureFromSiren(procedure.LiceC)
  },
  Etablissement: {
    pse: resolveRupcoProcedureFromSiret(procedure.PSE),
    rcc: resolveRupcoProcedureFromSiret(procedure.RCC),
    lice: resolveRupcoProcedureFromSiret(procedure.LiceC)
  }
};
