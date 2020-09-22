const { Sequelize, DataTypes } = require("sequelize");
const config = {
  username: "eglkvngmdupval",
  password: "a23764d8447a33c5234f186417acc03a7c2a4ed5448b818242ad87622826d91f",
  database: "d1neoolbks8vo2",
  host: "ec2-3-248-4-172.eu-west-1.compute.amazonaws.com",
  dialect: "postgres",
  port: "5432",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
    define: {
      freezeTableName: true,
    },
    findAll: {},
  },
  logging: false,
};
const sequelize = new Sequelize(config);

const users = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  confirm: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
});

sequelize.sync({ alter: true, logging: false });

module.exports.users = users;
