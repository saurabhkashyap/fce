import {rupcoResolvers} from "./Rupco";
import {etablissementResolvers} from "./Etablissement";
import {activitePartielleResolvers} from "./ActivitePartielle";
import {entrepriseResolver} from "./Entreprise";
import {apprentissageResolver} from "./Apprentissage";
import {categorieJuridiqueResolver} from "./CategorieJuridique";
import {idccResolvers} from "./Idcc";
import {nafResolvers} from "./Naf";
import {interactionsPole3eSeerResolvers} from "./InteractionsPole3eSeer";
import {interactionsPole3eSrcResolvers} from "./InteractionsPole3eSrc";
import {interactionsPoleCResolvers} from "./InteractionsPoleC";
import {interactionsPoleTResolvers} from "./InteractionsPoleT";

const resolvers = [
  rupcoResolvers,
  etablissementResolvers,
  activitePartielleResolvers,
  entrepriseResolver,
  apprentissageResolver,
  categorieJuridiqueResolver,
  idccResolvers,
  nafResolvers,
  interactionsPole3eSeerResolvers,
  interactionsPole3eSrcResolvers,
  interactionsPoleCResolvers,
  interactionsPoleTResolvers
]

export default resolvers;
