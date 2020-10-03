"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,

        unique: true,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      confirm: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        allowNull: false,
        primaryKey: true,
      },
      updatedAt: Sequelize.DataTypes.DATE,
      createdAt: Sequelize.DataTypes.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  },
};
