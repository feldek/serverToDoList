const username = process.env.FELLDEK_DB_CONFIG_USERNAME;
const password = process.env.FELLDEK_DB_CONFIG_PASSWORD;
const database = process.env.FELLDEK_DB_CONFIG_DATABASE;
const host = process.env.FELLDEK_DB_CONFIG_HOST;

const development = {
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
const test = {
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
const production = {
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

module.exports = { development, test, production };
