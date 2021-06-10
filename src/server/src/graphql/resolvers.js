import {rupcoResolvers} from "./Rupco";
import {etablissementResolvers} from "./Etablissement";
import {activitePartielleResolvers} from "./ActivitePartielle";
import {entrepriseResolver} from "./Entreprise";
import {apprentissageResolver} from "./Apprentissage";
import {categorieJuridiqueResolver} from "./CategorieJuridique";
import {idccResolvers} from "./Idcc";
import {nafResolvers} from "./Naf";
import {interactionsPole3eSeerResolvers} from "./InteractionsPole3eSeer";

const resolvers = [
  rupcoResolvers,
  etablissementResolvers,
  activitePartielleResolvers,
  entrepriseResolver,
  apprentissageResolver,
  categorieJuridiqueResolver,
  idccResolvers,
  nafResolvers,
  interactionsPole3eSeerResolvers
]

export default resolvers;
