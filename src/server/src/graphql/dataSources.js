import config from "config";
import EtablissementsDataSource from "./Etablissement/EtablissementsDataSource";
import RupcoDataSource from "./Rupco/RupcoDataSource";
import ActivitePartielleDataSource from "./ActivitePartielle/ActivitePartielleDataSource";
import EntrepriseDataSource from "./Entreprise/EntrepriseDataSource";
import ApprentissageDataSource from "./Apprentissage/ApprentissageDataSource";
import CategorieJuridiqueDataSource from "./CategorieJuridique/CategorieJuridiqueDataSource";
import IdccDataSource from "./Idcc/IdccDataSource";

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
  idcc: new IdccDataSource(knexConfig)
});
