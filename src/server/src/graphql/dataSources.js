import config from "config";
import PostGreDataSource from "./PostGreDataSource";

const knexConfig = {
  client: "pg",
  connection: config.get("db")
};

export default () => ({
  postgre: new PostGreDataSource(knexConfig),
});
