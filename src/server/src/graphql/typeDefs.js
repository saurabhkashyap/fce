import {rupcoTypeDef} from "./Rupco";
import {etablissementTypeDef} from "./Etablissement";
import {activitePartielleTypeDef} from "./ActivitePartielle";
import {entrepriseTypeDef} from "./Entreprise";
import {apprentissageTypeDef} from "./Apprentissage";
import {categorieJuridiqueTypeDef} from "./CategorieJuridique";
import {idccTypeDef} from "./Idcc";
import {gql} from "apollo-server-express";
import {interactionsPole3eSeerTypeDefs} from "./InteractionsPole3eSeer";
import {interactionsPole3eSrcTypeDefs} from "./InteractionsPole3eSrc";
import {interactionsPoleCTypeDefs} from "./InteractionsPoleC";
import {interactionsPoleTTypeDefs} from "./InteractionsPoleT";

const queryTypeDef = gql`
  type Query {
    entreprise(siren: String): [Entreprise]
  }
`;

const typeDefs = [
  queryTypeDef,
  rupcoTypeDef,
  etablissementTypeDef,
  activitePartielleTypeDef,
  entrepriseTypeDef,
  apprentissageTypeDef,
  categorieJuridiqueTypeDef,
  idccTypeDef,
  interactionsPole3eSeerTypeDefs,
  interactionsPole3eSrcTypeDefs,
  interactionsPoleCTypeDefs,
  interactionsPoleTTypeDefs
];

export default typeDefs;
