import config from "config";
import EtablissementsDataSource from "./Etablissement/EtablissementsDataSource";
import RupcoDataSource from "./Rupco/RupcoDataSource";
import ActivitePartielleDataSource from "./ActivitePartielle/ActivitePartielleDataSource";

const knexConfig = {
  client: "pg",
  connection: config.get("db")
};

export default () => ({
  rupco: new RupcoDataSource(knexConfig),
  etablissement: new EtablissementsDataSource(knexConfig),
  activitePartielle: new ActivitePartielleDataSource(knexConfig)
});
