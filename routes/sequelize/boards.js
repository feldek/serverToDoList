const { Sequelize, DataTypes } = require("sequelize");
const { users } = require("./users");
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
  },
  define: {
    timestamps: false,
    freezeTableName: true,
  },
  logging: false,
};
const sequelize = new Sequelize(config);

const boards = sequelize.define("boards", {
  userId: {
    type: DataTypes.UUID,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
});

users.hasMany(boards);

module.exports.boards = boards;
