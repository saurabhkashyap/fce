import Sequelize from "sequelize";

const { PG_HOST, PG_USER, PG_PASSWORD, PG_DB, PG_SSL, PG_SSL_SELF_SIGNED, PG_PORT, PROD, SQL_LOGS } = process.env;

const sequelize = new Sequelize(PG_DB, PG_USER, PG_PASSWORD, {
  host: PG_HOST,
  port: PG_PORT,
  dialect: "postgres",
  dialectOptions: {
    ssl: PG_SSL_SELF_SIGNED === "true" ? { rejectUnauthorized: false } : PG_SSL === "true",
  },
  define: {
    timestamps: false,
  },
  logging: PROD === "true" || SQL_LOGS === "false" ? false : console.log,
});

const models = {};

const context = require.context("./", true, /\.(js)$/);
context.keys().forEach((filenameWithPath) => {
  const filename = filenameWithPath.split("/").pop();
  const filenameWithoutExtension = filename.split(".").shift();
  const modelName =
    filenameWithoutExtension.charAt(0).toUpperCase() +
    filenameWithoutExtension.slice(1);

  try {
    if (modelName === "Index") {
      return;
    }

    models[modelName] = context(filenameWithPath).default(
      sequelize,
      Sequelize.DataTypes
    );
  } catch (error) {
    console.error(`Cannot load model ${modelName}`);
  }
});

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
