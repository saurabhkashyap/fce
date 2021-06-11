import {SQLDataSource} from "datasource-sql";
import interactionsPole3eSeer from "./InteractionsPole3eSeer/InteractionsPole3eSeerDataSource";
import interactionsPole3eSrc from "./InteractionsPole3eSrc/InteractionsPole3eSrcDataSource";
import interactionsPoleC from "./InteractionsPoleC/InteractionsPoleCDataSource";
import interactionsPoleT from "./InteractionsPoleT/InteractionsPoleTDataSource";
import etablissements from "./Etablissement/EtablissementsDataSource";
import naf from "./Naf/NafDataSource";
import rupco from "./Rupco/RupcoDataSource";
import idcc from "./Idcc/IdccDataSource";
import activitePartielle from "./ActivitePartielle/ActivitePartielleDataSource";
import entreprise from "./Entreprise/EntrepriseDataSource";
import apprentissage from "./Apprentissage/ApprentissageDataSource";
import categorieJuridique from "./CategorieJuridique/CategorieJuridiqueDataSource";

export default class PostGreDataSource extends SQLDataSource {
  entreprise() {
    return entreprise(this.knex);
  }

  etablissements() {
    return etablissements(this.knex);
  }

  apprentissage() {
    return apprentissage(this.knex);
  }

  categorieJuridique() {
    return categorieJuridique(this.knex);
  }

  rupco() {
    return rupco(this.knex);
  }

  idcc() {
    return idcc(this.knex);
  }

  activitePartielle() {
    return activitePartielle(this.knex);
  }

  naf() {
    return naf(this.knex);
  }

  interactionsPole3eSeer() {
    return interactionsPole3eSeer(this.knex);
  }

  interactionsPole3eSrc() {
    return interactionsPole3eSrc(this.knex);
  }

  interactionsPoleC() {
    return interactionsPoleC(this.knex);
  }

  interactionsPoleT() {
    return interactionsPoleT(this.knex);
  }
}
