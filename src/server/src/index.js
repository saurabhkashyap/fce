import path from "path";
import express from "express";
import bodyParser from "body-parser";
import * as Sentry from "@sentry/node";
import apiRouter from "./api";
// eslint-disable-next-line node/no-missing-import
import frentreprise from "frentreprise";
import EntrepriseModel from "./frentreprise/models/Entreprise";
import EtablissementModel from "./frentreprise/models/Etablissement";
import { isDev } from "./utils/isDev";
import fceGraphQL from "./graphql";
import { graphiqlExpress } from "apollo-server-express";

require("dotenv").config();
const config = require("config");
const app = express();
const port = (config.has("port") && +config.get("port")) || 80;
const host = (config.has("host") && config.get("host")) || undefined;
const sentryUrlKey = config.get("sentryUrlKey");

if (!isDev()) {
  Sentry.init({ dsn: sentryUrlKey });
}

async function init() {
  frentreprise.EntrepriseModel = EntrepriseModel;
  frentreprise.EtablissementModel = EtablissementModel;

  if (!isDev()) {
    frentreprise.initSentry(sentryUrlKey);
  }

  // remove "ApiGouvAssociations"
  ["ApiGouv"].forEach((sourceName) => {
    const source = frentreprise.getDataSource(sourceName).source;
    source.token = config.get("APIGouv.token");
    source.axiosConfig = {
      ...source.axiosConfig,
      proxy: (config.has("proxy") && config.get("proxy")) || false,
    };
    if (config.has("apiTimeout")) {
      source.axiosConfig.timeout = config.get("apiTimeout");
    }
  });

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
  });

  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
  await fceGraphQL(app);
  app.use("/graphiql", graphiqlExpress({ endpointURL: '/graphql' }));
}

function run() {
  const htdocs_path = path.resolve(__dirname, "./htdocs");
  app.use(Sentry.Handlers.requestHandler());
  app.use(express.static(htdocs_path));
  app.use("/api", apiRouter);

  app.get("*", function (req, res) {
    res.sendFile("index.html", { root: htdocs_path });
  });

  app.use(Sentry.Handlers.errorHandler());

  app.listen(
    port,
    () => {
      console.log(`Serving files from: ${htdocs_path}`);
      console.log(`Listening on ${host || ""}:${port}`);
    }
  );

  return app;
}

init();
export default run();
