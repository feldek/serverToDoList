const username = process.env.DB_CONFIG_USERNAME;
const password = process.env.DB_CONFIG_PASSWORD;
const database = process.env.DB_CONFIG_DATABASE;
const host = process.env.DB_CONFIG_HOST;

const development = production = {
  username,
  password,
  database,
  host,
  dialect: "postgres",
  port: "5432",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
    define: {
      freezeTableName: true,
    },
  },
};

module.exports = { development, production };
