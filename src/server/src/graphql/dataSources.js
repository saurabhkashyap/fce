import config from "config";
import EtablissementsDataSource from "./Etablissement/EtablissementsDataSource";
import RupcoDataSource from "./Rupco/RupcoDataSource";
import ActivitePartielleDataSource from "./ActivitePartielle/ActivitePartielleDataSource";
import EntrepriseDataSource from "./Entreprise/EntrepriseDataSource";
import ApprentissageDataSource from "./Apprentissage/ApprentissageDataSource";
import CategorieJuridiqueDataSource from "./CategorieJuridique/CategorieJuridiqueDataSource";
import IdccDataSource from "./Idcc/IdccDataSource";
import NafDataSource from "./Naf/NafDataSource";
import InteractionsPole3eSeerDataSource from "./InteractionsPole3eSeer/InteractionsPole3eSeerDataSource";
import InteractionsPole3eSrcDataSource from "./InteractionsPole3eSrc/InteractionsPole3eSrcDataSource";
import InteractionsPoleCDataSource from "./InteractionsPoleC/InteractionsPoleCDataSource";
import InteractionsPoleTDataSource from "./InteractionsPoleT/InteractionsPoleTDataSource";

const knexConfig = {
  client: "pg",
  connection: config.get("db")
};

export default () => ({
  rupco: new RupcoDataSource(knexConfig),
  etablissement: new EtablissementsDataSource(knexConfig),
  activitePartielle: new ActivitePartielleDataSource(knexConfig),
  entreprise: new EntrepriseDataSource(knexConfig),
  apprentissage: new ApprentissageDataSource(knexConfig),
  categorieJuridique: new CategorieJuridiqueDataSource(knexConfig),
  idcc: new IdccDataSource(knexConfig),
  naf: new NafDataSource(knexConfig),
  interactions3eSeer: new InteractionsPole3eSeerDataSource(knexConfig),
  interactions3eSrc: new InteractionsPole3eSrcDataSource(knexConfig),
  interactionsC: new InteractionsPoleCDataSource(knexConfig),
  interactionsT: new InteractionsPoleTDataSource(knexConfig)
});
